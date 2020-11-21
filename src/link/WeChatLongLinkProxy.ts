import { RetryStrategy, RetryStrategyRule } from "../utils/RetryStrategy";
import { PromiseCallback } from "../utils/PromiseUtils";
import { PadLocalClient } from "../PadLocalClient";
import { logDebug, logWarn } from "../utils/log";
import { EventEmitter } from "events";
import { Socket } from "net";
import { Bytes, bytesToHexString } from "../utils/ByteUtils";
import {
  LongLinkUnpackRequest,
  LongLinkUnpackResponse,
  LongLinkPacket,
  LongLinkPacketPushType,
  LongLinkInitRequest,
  WeChatResponse,
  WeChatLongLinkResponse,
  WeChatStreamAck,
} from "../proto/padlocal_pb";
import VError from "verror";
import { SerialExecutor } from "../utils/SerialExecutor";
import { genUUID } from "../utils/Utils";
import { GrpcClient, SubResponseWrap } from "../GrpcClient";

export type WeChatLongLinkProxyEvent = "heartbeat" | "message-push" | "status";

export class WeChatLongLinkProxy extends EventEmitter {
  private static readonly REQUEST_TIMEOUT = 10 * 1000;
  private static readonly CONNECT_TIMEOUT = 10 * 1000;
  private static readonly SOCKET_TIMEOUT = 180 * 1000;
  private static readonly HEART_BEAT_INTERVAL = 160 * 1000;

  private readonly _connectRetryStrategy = RetryStrategy.getStrategy(RetryStrategyRule.FAST, Number.MAX_SAFE_INTEGER); // reconnect infinitely
  private readonly _heartBeatRetryStrategy = RetryStrategy.getStrategy(RetryStrategyRule.FAST, 3);

  private _heartBeatSeq = 0;
  private _heartBeatTimer?: NodeJS.Timeout;

  private _host?: string;
  private _port?: number;
  private _status = Status.IDLE;
  private _socket?: Socket;
  private _id?: string;
  private _socketPromise?: Promise<Socket>;
  private _reconnectDelayTimer?: NodeJS.Timeout;
  private _requestCallbackMap: Map<number, PromiseCallback> = new Map();
  private _socketEventExecutor: SerialExecutor;
  private _initContext?: InitContext;

  private readonly _client: PadLocalClient;

  emit(event: "heartbeat", detail: HeartBeatEventPayload): boolean;
  emit(event: "message-push"): boolean;
  emit(event: "status", detail: StatusEventPayload): boolean;

  emit(event: WeChatLongLinkProxyEvent, ...args: any[]): boolean {
    return super.emit(event, ...args);
  }

  constructor(client: PadLocalClient) {
    super();

    this._client = client;
    this._socketEventExecutor = new SerialExecutor();
  }

  updateHostPort(host: string, port: number, reconnect: boolean = true) {
    if (this._host === host && this._port === port) {
      return;
    }

    this._host = host;
    this._port = port;

    if (reconnect) {
      this.reconnect().then();
    }
  }

  async reconnect() {
    this.shutdown();
    await this.makeSureConnected();
  }

  /**
   * disconnect long link
   */
  shutdown(clearHost: boolean = false): void {
    if (this._status === Status.STOP) {
      return;
    }

    logDebug("longlink shutdown");

    this._clearReconnectTimer();
    this._connectRetryStrategy.reset();

    // call before _resetLongLink, forbid future socket close or error event to trigger reconnect
    this._updateStatus(Status.STOP);

    this._resetLongLink();

    if (clearHost) {
      this._host = undefined;
      this._port = undefined;
    }
  }

  isConnected(): boolean {
    return this._status === Status.CONNECTED;
  }

  getId(): string | undefined {
    return this._id;
  }

  async makeSureConnected(): Promise<void> {
    if (this.isConnected()) {
      return;
    }

    // trigger connect immediately
    try {
      await this._connect();
    } catch (e) {
      throw new IOError(e, `longlink fail to connect, host:${this._host}, port:${this._port}`);
    }
  }

  sendInitData(data: Bytes, grpcClient: GrpcClient, ack: number) {
    this._initContext = new InitContext(grpcClient, ack);
    this._socket!.write(data);
  }

  async send(seq: number, data: Bytes): Promise<Bytes> {
    await this.makeSureConnected();

    logDebug(`long link send: ${bytesToHexString(data)}`);

    return new Promise((resolve, reject) => {
      this._socket!.write(data, (error) => {
        if (!error) {
          this._resetHeartBeatTimer(true);

          const timeoutId = setTimeout(() => {
            this._notifyRequestCallback(seq, undefined, new IOError("long link send request timeout"));
          }, WeChatLongLinkProxy.REQUEST_TIMEOUT);

          this._requestCallbackMap.set(seq, new PromiseCallback(resolve, reject, timeoutId));
        } else {
          reject(error);
        }
      });
    });
  }

  onHeartBeatResult(success: boolean): void {
    if (!this.isConnected()) {
      return;
    }

    if (success) {
      this._heartBeatRetryStrategy.reset();
      this._heartBeatSeq++;
      this._resetHeartBeatTimer(true);
    } else {
      if (this._heartBeatRetryStrategy.canRetry()) {
        const delay = this._heartBeatRetryStrategy.nextRetryDelay();
        this._resetHeartBeatTimer(true, delay);
        logDebug(`retry send heart beat after:${delay}ms`);
      } else {
        this._onSocketError(new IOError("send heart beat failed after max retries"));
      }
    }
  }

  private _updateStatus(newStatus: Status): void {
    const oldStatus = this._status;
    if (oldStatus === newStatus) {
      return;
    }

    this._status = newStatus;

    this.emit("status", {
      newStatus,
      oldStatus,
    });
  }

  private _heartBeatTick(): void {
    this.emit("heartbeat", {
      heartBeatSeq: this._heartBeatSeq,
    });
  }

  private _resetHeartBeatTimer(start: boolean, delay?: number): void {
    if (this._heartBeatTimer) {
      clearTimeout(this._heartBeatTimer);
      this._heartBeatTimer = undefined;
    }

    if (!start) {
      return;
    }

    this._heartBeatTimer = setTimeout(() => {
      this._heartBeatTick();
    }, delay || WeChatLongLinkProxy.HEART_BEAT_INTERVAL);
  }

  private _startHeartbeat(): void {
    if (this._heartBeatTimer) {
      return;
    }

    logDebug("longlink startHeartbeat");

    this._heartBeatSeq = 0;

    this._heartBeatTick();
    this._resetHeartBeatTimer(true);
  }

  private _stopHeartbeat(): void {
    if (!this._heartBeatTimer) {
      return;
    }

    logDebug("longlink stopHeartbeat");

    this._heartBeatSeq = 0;
    this._resetHeartBeatTimer(false);
    this._heartBeatRetryStrategy.reset();
  }

  private _clearReconnectTimer(): void {
    if (!this._reconnectDelayTimer) {
      return;
    }

    clearInterval(this._reconnectDelayTimer);
    this._reconnectDelayTimer = undefined;
  }

  private _notifyRequestCallback(seqId: number, data?: Bytes, error?: Error): void {
    const promiseCallback = this._requestCallbackMap.get(seqId);
    this._requestCallbackMap.delete(seqId);

    if (!promiseCallback) {
      return;
    }

    if (!error) {
      promiseCallback.resolve(data);
    } else {
      promiseCallback.reject(error);
    }
  }

  private _notifyAllRequestCallbackWithError(error: Error): void {
    for (const [, promiseCallback] of this._requestCallbackMap.entries()) {
      promiseCallback.reject(error);
    }

    this._requestCallbackMap.clear();
  }

  private _resetLongLink(error?: Error): void {
    if (error) {
      this._notifyAllRequestCallbackWithError(error);
    } else {
      this._notifyAllRequestCallbackWithError(new Error("longlink reset"));
    }

    this._stopHeartbeat();

    if (this._socket) {
      this._socket.destroy();
      this._socket = undefined;
    }

    this._id = undefined;
    this._socketPromise = undefined;
    this._socketEventExecutor.clear();
    this._initContext = undefined;
  }

  private _onSocketError(error: Error): void {
    const preStatus = this._status;
    if (preStatus === Status.STOP || preStatus === Status.ERROR) {
      return;
    }

    logDebug("close connection on error", error);

    this._resetLongLink(error);
    this._updateStatus(Status.ERROR);

    this._tryReconnect();
  }

  private _tryReconnect(): void {
    // already reconnecting
    if (this._reconnectDelayTimer) {
      logDebug("dup reconnect, forbid");
      return;
    }

    if (!this._connectRetryStrategy.canRetry()) {
      logDebug("reconnect policy failed");
      // 重试失败，关闭
      this.shutdown();
      return;
    }

    const delay = this._connectRetryStrategy.nextRetryDelay();

    logDebug(`longlink reconnect [${this._connectRetryStrategy.retryCount}] after delay:${delay}ms`);

    this._reconnectDelayTimer = setTimeout(() => {
      this._clearReconnectTimer();
      this._connect().then();
    }, delay);
  }

  private async _connect(): Promise<void> {
    if (!this._host || !this._port) {
      throw new Error("longlink host port is not configured yet");
    }

    if (!this._socketPromise) {
      this._socketPromise = new Promise((resolve, reject) => {
        const startDate = new Date();

        logDebug(`longlink start connect: ${this._host}:${this._port}`);

        const socket = new Socket();
        socket.setTimeout(WeChatLongLinkProxy.SOCKET_TIMEOUT);

        this._socket = socket;
        this._id = genUUID();

        // node socket doesn't support connect timeout natively, so implement our own version.
        const connectTimeout = setTimeout(() => {
          logDebug(`longlink socket[${this._host}:${this._port}] connect timeout`);

          const error = new IOError("longlink socket connect timeout");
          this._onSocketError(error);
          reject(error);
        }, WeChatLongLinkProxy.CONNECT_TIMEOUT);

        this._updateStatus(Status.CONNECTING);

        socket.connect(
          {
            host: this._host!,
            port: this._port!,
          },
          () => {
            const endDate = new Date();
            logDebug(`longlink connect success, cost ${endDate.getTime() - startDate.getTime()}ms`);

            clearTimeout(connectTimeout);

            this._connectRetryStrategy.reset();
            this._updateStatus(Status.CONNECTED);

            resolve(socket);

            // do not use _socketEventExecutor to execute, or socket.on("data") will be blocked
            this._onSocketConnect();
          }
        );

        socket.on("data", (data) => {
          this._socketEventExecutor.execute(async () => {
            if (this._initContext) {
              await this._onSocketInitData(data);
            } else {
              await this._onSocketData(data);
            }
          });
        });

        socket.on("close", () => {
          // in case connectTimeout is still valid
          clearTimeout(connectTimeout);

          this._socketEventExecutor.execute(async () => {
            await this._onSocketError(new IOError("socket is closed"));
          });
        });

        socket.on("timeout", () => {
          this._socketEventExecutor.execute(async () => {
            await this._onSocketError(new IOError("socket is read-write timeout"));
          });
        });

        socket.on("error", (error) => {
          // in case connectTimeout is still valid
          clearTimeout(connectTimeout);

          this._socketEventExecutor.execute(async () => {
            await this._onSocketError(error);
          });
        });
      });
    } else {
      logWarn("longlink duplicated connect");

      await this._socketPromise;
    }
  }

  private async _onSocketConnect() {
    try {
      const startDate = new Date();
      logDebug(`longlink start init`);

      await this._client.grpcRequest(new LongLinkInitRequest());

      logDebug(`longlink init done, cost ${new Date().getTime() - startDate.getTime()}ms`);
    } catch (e) {
      this._onSocketError(new IOError(e, "long link init failed"));
      return;
    }

    this._startHeartbeat();
  }

  private async _onSocketInitData(data: Bytes): Promise<void> {
    const response: SubResponseWrap<WeChatStreamAck> = await this._initContext!.grpcClient.subReplyAndRequest(
      this._initContext!.ack,
      new WeChatResponse().setLonglinkresponse(new WeChatLongLinkResponse().setPayload(data))
    );

    const streamAck = response.payload;
    if (!streamAck.getFinish()) {
      // not finished, continue to receive data
      this._initContext!.ack = response.ack!;
    } else {
      // init finished, send data and switch to normal logic.
      const dataToSend: Bytes = Buffer.from(streamAck.getSenddata());
      this._socket!.write(dataToSend);

      this._initContext = undefined;
    }
  }

  private async _onSocketData(data: Bytes): Promise<void> {
    logDebug(`long link receive data: ${bytesToHexString(data)}`);

    let response: LongLinkUnpackResponse;

    try {
      response = await this._client.grpcRequest(new LongLinkUnpackRequest().setStreamdata(data));
    } catch (e) {
      // if longlink unpack failed, notify all longlink pending callback with error,
      // bcz we don't known which request corresponding to current response exactly.
      const desc = `Exception while unpack long link data`;
      this._notifyAllRequestCallbackWithError(new IOError(e, desc));

      return;
    }

    const packetList = response.getPacketList();
    for (const packet of packetList) {
      if (packet.getTypeCase() === LongLinkPacket.TypeCase.NORMAL) {
        const normalPacket = packet.getNormal()!;
        this._notifyRequestCallback(normalPacket.getSeq(), Buffer.from(normalPacket.getPayload()));
      } else if (packet.getTypeCase() === LongLinkPacket.TypeCase.PUSH) {
        const pushPacket = packet.getPush()!;
        if (pushPacket.getType() === LongLinkPacketPushType.NEW_MESSAGE) {
          this.emit("message-push");
        }
      }
    }
  }
}

export enum Status {
  IDLE,
  CONNECTING,
  CONNECTED,
  STOP,
  ERROR,
}

export interface StatusEventPayload {
  newStatus: Status;
  oldStatus: Status;
}

export interface HeartBeatEventPayload {
  heartBeatSeq: number;
}

export class IOError extends VError {}

class InitContext {
  public grpcClient: GrpcClient;
  public ack: number;

  constructor(grpcClient: GrpcClient, ack: number) {
    this.grpcClient = grpcClient;
    this.ack = ack;
  }
}
