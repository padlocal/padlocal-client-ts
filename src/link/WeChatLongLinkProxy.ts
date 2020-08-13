import { RetryStrategy } from "../utils/RetryStrategy";
import { PromiseCallback } from "../utils/PromiseUtils";
import { PadLocalClient } from "../PadLocalClient";
import { log } from "../utils/log";
import { EventEmitter } from "events";
import { Socket } from "net";
import { ByteUtils, Bytes } from "../utils/ByteUtils";
import {
  LongLinkUnpackRequest,
  LongLinkUnpackResponse,
  ActionMessage,
  LongLinkPacket,
  LongLinkPacketPushType,
} from "../proto/padlocal_pb";
import VError from "verror";

export class WeChatLongLinkProxy extends EventEmitter {
  private static readonly REQUEST_TIMEOUT = 10 * 1000;
  private static readonly CONNECT_TIMEOUT = 10 * 1000;
  private static readonly SOCKET_TIMEOUT = 180 * 1000;
  private static readonly HEART_BEAT_INTERVAL = 160 * 1000;

  private readonly _connectRetryStrategy = RetryStrategy.getStrategy(RetryStrategy.Rule.FAST, Number.MAX_SAFE_INTEGER); // reconnect inifintely
  private readonly _heartBeatRetryStrategy = RetryStrategy.getStrategy(RetryStrategy.Rule.FAST, 3);

  private _heartBeatSeq = 0;
  private _heartBeatTimer?: NodeJS.Timeout;

  private _host?: string;
  private _port?: number;
  private _status = WeChatLongLinkProxy.Status.IDLE;
  private _socket?: Socket;
  private _socketPromise?: Promise<Socket>;
  private _reconnectDelayTimer?: NodeJS.Timeout;
  private _requestCallbackMap: Map<number, PromiseCallback> = new Map();
  private _socketDataBuffer: Bytes = ByteUtils.newBytes();

  private readonly _client: PadLocalClient;

  constructor(client: PadLocalClient) {
    super();

    this._client = client;
  }

  updateHostPort(host: string, port: number, reconnect: boolean = true) {
    if (this._host === host && this._port === port) {
      return;
    }

    this._host = host;
    this._port = port;

    if (reconnect) {
      this.reconnect();
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
    if (this._status == WeChatLongLinkProxy.Status.STOP) {
      return;
    }

    log.debug("longlink shutdown");

    this._clearReconnectTimer();
    this._connectRetryStrategy.reset();

    // call before _resetLongLink, forbid future socket close or error event to trigger reconnect
    this._updateStatus(WeChatLongLinkProxy.Status.STOP);

    this._resetLongLink();

    if (clearHost) {
      this._host = undefined;
      this._port = undefined;
    }
  }

  isConnected(): boolean {
    return this._status == WeChatLongLinkProxy.Status.CONNECTED;
  }

  async makeSureConnected(): Promise<void> {
    if (this.isConnected()) {
      return;
    }

    // trigger connect immediatlly
    try {
      await this._connect();
    } catch (e) {
      throw new WeChatLongLinkProxy.IOError(e, `longlink fail to connect, host:${this._host}, port:${this._port}`);
    }
  }

  async send(seq: number, data: Bytes): Promise<Bytes> {
    await this.makeSureConnected();

    log.debug(`long link send: ${ByteUtils.bytesToHexString(data)}`);

    return new Promise((resolve, reject) => {
      this._socket!.write(data, (error) => {
        if (!error) {
          this._resetHeartBeatTimer(true);

          let timeoutId = setTimeout(() => {
            this._notifyRequestCallback(
              seq,
              undefined,
              new WeChatLongLinkProxy.IOError("long link send request timeout")
            );
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
        log.debug(`retry send heart beat after:${delay}ms`);
      } else {
        this._onSocketError(new WeChatLongLinkProxy.IOError("send heart beat failed after max retries"));
      }
    }
  }

  private _postEvent(
    name: WeChatLongLinkProxy.Event,
    payload?: WeChatLongLinkProxy.StatusEventPayload | WeChatLongLinkProxy.HeartBeatEventPayload
  ): void {
    this.emit(name, payload);
  }

  private _updateStatus(newStatus: WeChatLongLinkProxy.Status): void {
    const oldStatus = this._status;
    if (oldStatus == newStatus) {
      return;
    }

    this._status = newStatus;

    this._postEvent(WeChatLongLinkProxy.Event.StatusEvent, {
      newStatus: newStatus,
      oldStatus: oldStatus,
    });
  }

  private _heartBeatTick(): void {
    this._postEvent(WeChatLongLinkProxy.Event.HeartBeatEvent, {
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

    log.debug("longlink startHeartbeat");

    this._heartBeatSeq = 0;

    this._heartBeatTick();
    this._resetHeartBeatTimer(true);
  }

  private _stopHeartbeat(): void {
    if (!this._heartBeatTimer) {
      return;
    }

    log.debug("longlink stopHeartbeat");

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

    if (promiseCallback == null) {
      return;
    }

    if (!error) {
      promiseCallback.resolve(data);
    } else {
      promiseCallback.reject(error);
    }
  }

  private _notifyAllRequestCallbackWithError(error: Error): void {
    for (const [seqId, promiseCallback] of this._requestCallbackMap.entries()) {
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

    this._destroySocket();
  }

  private _destroySocket(): void {
    if (!this._socket) {
      return;
    }

    this._socket.destroy();
    this._socket = undefined;
    this._socketPromise = undefined;
  }

  private _onSocketError(error: Error): void {
    const preStatus = this._status;
    if (preStatus == WeChatLongLinkProxy.Status.STOP || preStatus == WeChatLongLinkProxy.Status.ERROR) {
      return;
    }

    log.debug("close connection on error", error);

    this._resetLongLink(error);
    this._updateStatus(WeChatLongLinkProxy.Status.ERROR);

    this._tryReconnect();
  }

  private _tryReconnect(): void {
    // already reconnecting
    if (this._reconnectDelayTimer) {
      log.debug("dup reconnect, forbid");
      return;
    }

    if (!this._connectRetryStrategy.canRetry()) {
      log.debug("reconnect policy failed");
      // 重试失败，关闭
      this.shutdown();
      return;
    }

    const delay = this._connectRetryStrategy.nextRetryDelay();

    log.info(`longlink reconnect [${this._connectRetryStrategy.retryCount}] after delay:${delay}ms`);

    this._reconnectDelayTimer = setTimeout(() => {
      this._clearReconnectTimer();
      this._connect();
    }, delay);
  }

  private async _connect(): Promise<void> {
    if (!this._host || !this._port) {
      throw new Error("longlink host port is not configured yet");
    }

    if (!this._socketPromise) {
      this._socketPromise = new Promise((resolve, reject) => {
        const startDate = new Date();

        log.debug(`longlink start connect: ${this._host}:${this._port}`);

        const socket = new Socket();
        socket.setTimeout(WeChatLongLinkProxy.SOCKET_TIMEOUT);

        this._socket = socket;

        // node socket doesn't support connecet timeout natively, so implement our own version.
        const connectTimeout = setTimeout(() => {
          log.debug(`longlink socket[${this._host}:${this._port}] connect timeout`);

          const error = new WeChatLongLinkProxy.IOError("longlink socket connect timeout");
          this._onSocketError(error);
          reject(error);
        }, WeChatLongLinkProxy.CONNECT_TIMEOUT);

        this._updateStatus(WeChatLongLinkProxy.Status.CONNECTING);

        socket.connect(
          {
            host: this._host!,
            port: this._port!,
          },
          () => {
            const endDate = new Date();
            log.debug(`longlink connect success, cost ${endDate.getTime() - startDate.getTime()}ms`);

            clearTimeout(connectTimeout);

            this._connectRetryStrategy.reset();
            this._updateStatus(WeChatLongLinkProxy.Status.CONNECTED);

            // 同步心跳，当完成第一个 heart beat 后才可请求以发送
            this._startHeartbeat();

            resolve(socket);
          }
        );

        socket.on("data", (data) => {
          this._processSocketData(data);
        });

        socket.on("close", (hadError) => {
          // in case connectTimeout is still valid
          clearTimeout(connectTimeout);

          this._onSocketError(new WeChatLongLinkProxy.IOError("socket is closed"));
        });

        socket.on("timeout", () => {
          this._onSocketError(new WeChatLongLinkProxy.IOError("socket is read-write timeout"));
        });

        socket.on("error", (error) => {
          // in case connectTimeout is still valid
          clearTimeout(connectTimeout);

          this._onSocketError(error);
        });
      });
    } else {
      log.warn("longlink duplicated connect");

      await this._socketPromise;
    }
  }

  private async _processSocketData(data: Bytes): Promise<void> {
    log.debug(`long link receive data: ${ByteUtils.bytesToHexString(data)}`);

    this._socketDataBuffer = ByteUtils.joinBytes(this._socketDataBuffer, data);

    let response: LongLinkUnpackResponse;

    try {
      response = await this._client.grpcRequest(new LongLinkUnpackRequest().setStreamdata(this._socketDataBuffer));
    } catch (e) {
      // if longlink unpack failed, notify all longlink pending callback with error,
      // bcz we dont't known which request corresponding to current response exactly.
      const desc = `Exception while unpack long link data:${ByteUtils.bytesToHexString(this._socketDataBuffer)}`;
      this._notifyAllRequestCallbackWithError(new WeChatLongLinkProxy.IOError(e, desc));

      return;
    }

    const packetList = response.getPacketList();
    for (const packet of packetList) {
      if (packet.getTypeCase() == LongLinkPacket.TypeCase.NORMAL) {
        const normalPacket = packet.getNormal()!;
        this._notifyRequestCallback(normalPacket.getSeq(), Buffer.from(normalPacket.getPayload()));
      } else if (packet.getTypeCase() == LongLinkPacket.TypeCase.PUSH) {
        const pushPacket = packet.getPush()!;
        if (pushPacket.getType() == LongLinkPacketPushType.NEW_MESSAGE) {
          this._postEvent(WeChatLongLinkProxy.Event.OnPushNewMessageEvent);
        }
      }
    }

    // data is consumed completely
    const consumedLen = response.getStreamdataconsumedlen();
    if (consumedLen == this._socketDataBuffer.length) {
      this._socketDataBuffer = ByteUtils.newBytes();
    } else {
      if (this._socketDataBuffer.length > 0) {
        this._socketDataBuffer = ByteUtils.subBytes(this._socketDataBuffer, consumedLen, this._socketDataBuffer.length);
      } else {
        // do not change buffer, if none byte is consumed
      }
    }
  }
}

export namespace WeChatLongLinkProxy {
  export enum Status {
    IDLE,
    CONNECTING,
    CONNECTED,
    STOP,
    ERROR,
  }

  export interface StatusEventPayload {
    newStatus: WeChatLongLinkProxy.Status;
    oldStatus: WeChatLongLinkProxy.Status;
  }

  export interface HeartBeatEventPayload {
    heartBeatSeq: number;
  }

  export enum Event {
    StatusEvent = "longLinkStatusEvent",
    HeartBeatEvent = "longLinkHeartBeatEvent",
    OnPushNewMessageEvent = "longLinkOnPushNewMessageEvent",
  }

  export class IOError extends VError {}
}
