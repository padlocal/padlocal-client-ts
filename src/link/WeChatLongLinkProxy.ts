import { RetryStrategy, RetryStrategyRule } from "../utils/RetryStrategy";
import { PromiseCallback } from "../utils/PromiseUtils";
import { PadLocalClient } from "../PadLocalClient";
import { EventEmitter } from "events";
import { Socket } from "net";
import { Bytes, bytesToHexString, MAX_LOG_BYTES_LEN } from "../utils/ByteUtils";
import {
  LongLinkHeartBeatRequest,
  LongLinkInitRequest,
  LongLinkMessage,
  LongLinkMessagePushType,
  LongLinkMessageType,
  LongLinkPackRequest,
  LongLinkPackResponse,
  LongLinkUnpackRequest,
  LongLinkUnpackResponse,
  WeChatLongLinkRequest,
} from "../proto/padlocal_pb";
import VError from "verror";
import { SerialExecutor } from "../utils/SerialExecutor";
import { genUUID } from "../utils/Utils";
import {Host, HostResolver} from "../utils/Host";
import Log from "../utils/Log";

export type WeChatLongLinkProxyEvent = "heartbeat" | "message-push" | "push" | "status";

const LOGPRE = "[LongLink]";

export class WeChatLongLinkProxy extends EventEmitter {
  private static readonly REQUEST_TIMEOUT = 10 * 1000;
  private static readonly CONNECT_TIMEOUT = 10 * 1000;
  private static readonly SOCKET_TIMEOUT = 180 * 1000;
  private static readonly HEART_BEAT_INTERVAL = 160 * 1000;

  private _heartBeatTimer?: NodeJS.Timeout;

  private _hostList?: Array<Host>;
  private _status = Status.IDLE;
  private _socket?: Socket;
  private _socketConnectTimeout?: NodeJS.Timeout;
  private _id?: string;
  private readonly _instanceId: string;

  private _socketPromise?: Promise<void>;
  private _reconnectDelayTimer?: NodeJS.Timeout;
  private readonly _reconnectStrategy = RetryStrategy.getStrategy(RetryStrategyRule.FAST, Number.MAX_SAFE_INTEGER); // reconnect infinitely
  private readonly _requestCallbackMap: Map<string, PromiseCallback> = new Map();
  private readonly _serialExecutor: SerialExecutor;
  private _streamCallback?: LongLinkStreamCallback;

  private readonly _client: PadLocalClient;

  emit(event: "heartbeat", detail: HeartBeatEventPayload): boolean;
  emit(event: "message-push"): boolean;
  emit(event: "push", detail: Array<LongLinkMessage>): boolean;
  emit(event: "status", detail: StatusEventPayload): boolean;

  emit(event: WeChatLongLinkProxyEvent, ...args: any[]): boolean {
    return super.emit(event, ...args);
  }

  constructor(client: PadLocalClient) {
    super();

    this._client = client;
    this._serialExecutor = new SerialExecutor();

    this._instanceId = genUUID();
  }

  updateHostList(hostList: Array<Host>): boolean {
    if (!hostList || hostList.length === 0) {
      return false;
    }

    this._hostList = hostList;

    this.logDebug(`update longlink host: ${JSON.stringify(hostList)}`);

    return true;
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

    this.logDebug("longlink shutdown");

    this._clearReconnectTimer();
    this._reconnectStrategy.reset();

    // call before _destroyLongLink, forbid future socket close or error event to trigger reconnect
    this._updateStatus(Status.STOP);

    this._destroyLongLink();

    if (clearHost) {
      this._hostList = undefined;
    }
  }

  isConnected(): boolean {
    return this._status === Status.CONNECTED;
  }

  isIdle(): boolean {
    return (
      this._status !== Status.CONNECTING && this._status !== Status.CONNECTED && this._status !== Status.HALF_CONNECTED
    );
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
      throw new IOError(e, `longlink fail to connect`);
    }
  }

  sendStreamData(data: Bytes, streamCallback?: LongLinkStreamCallback) {
    if (streamCallback) {
      this._streamCallback = streamCallback;
    }

    this.logDebug(`socket send:${bytesToHexString(data, MAX_LOG_BYTES_LEN)}`);
    this._socket!.write(data);
  }

  async sendRequest(longLinkRequest: WeChatLongLinkRequest): Promise<void> {
    if (longLinkRequest.getLonglinkid() && longLinkRequest.getLonglinkid() !== this._id) {
      throw new Error(
        `request must be sent by longlink with id:${longLinkRequest.getLonglinkid()}, but current id is: ${this._id}`
      );
    }

    // during init phase, long link status is not connected, makeSureConnected will be blocked.
    if (!longLinkRequest.getInitphase()) {
      await this.makeSureConnected();
    }

    const messageId = longLinkRequest.getMessageid();

    let packResponse: LongLinkPackResponse;
    try {
      packResponse = await this._serialExecutor.execute(async () => {
        return this._client.request(new LongLinkPackRequest().setLonglinkid(this._id!).setMessageid(messageId));
      });
    } catch (e) {
      this._onSocketError(new IOError(e, "Exception while packing long link data"));

      throw e;
    }

    const buffer: Bytes = Buffer.from(packResponse.getPayload());

    return new Promise(async (resolve, reject) => {
      this.logDebug(`socket send:${bytesToHexString(buffer, MAX_LOG_BYTES_LEN)}`);

      this._socket!.write(buffer, (error) => {
        if (!error) {
          this._resetHeartBeatTimer(true);

          const timeoutId = setTimeout(() => {
            this._notifyRequestCallback(messageId, new IOError("long link send request timeout"));
          }, WeChatLongLinkProxy.REQUEST_TIMEOUT);

          this._requestCallbackMap.set(messageId, new PromiseCallback(resolve, reject, timeoutId));
        } else {
          reject(error);
        }
      });
    });
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

  private _resetHeartBeatTimer(start: boolean, delay?: number): void {
    if (this._heartBeatTimer) {
      clearTimeout(this._heartBeatTimer);
      this._heartBeatTimer = undefined;
    }

    if (!start) {
      return;
    }

    this._heartBeatTimer = setTimeout(async () => {
      try {
        await this._client.request(new LongLinkHeartBeatRequest().setLonglinkid(this._id!));
        this._resetHeartBeatTimer(true);
      } catch (e) {
        this._onSocketError(new IOError(e, "send heart beat failed"));
      }
    }, delay || WeChatLongLinkProxy.HEART_BEAT_INTERVAL);
  }

  private _startHeartbeat(): void {
    if (this._heartBeatTimer) {
      return;
    }

    this.logDebug("longlink startHeartbeat");

    this._resetHeartBeatTimer(true);
  }

  private _stopHeartbeat(): void {
    if (!this._heartBeatTimer) {
      return;
    }

    this.logDebug("longlink stopHeartbeat");

    this._resetHeartBeatTimer(false);
  }

  private _clearReconnectTimer(): void {
    if (!this._reconnectDelayTimer) {
      return;
    }

    clearInterval(this._reconnectDelayTimer);
    this._reconnectDelayTimer = undefined;
  }

  private _notifyRequestCallback(messageId: string, error?: Error): void {
    const promiseCallback = this._requestCallbackMap.get(messageId);
    this._requestCallbackMap.delete(messageId);

    if (!promiseCallback) {
      return;
    }

    if (!error) {
      promiseCallback.resolve();
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

  private _destroyLongLink(error?: Error): void {
    if (error) {
      this._notifyAllRequestCallbackWithError(error);
    } else {
      this._notifyAllRequestCallbackWithError(new Error("longlink reset"));
    }

    this._stopHeartbeat();

    if (this._socketConnectTimeout) {
      clearTimeout(this._socketConnectTimeout!);
      this._socketConnectTimeout = undefined;
    }

    if (this._socket) {
      this._socket.removeAllListeners();

      this._socket!.destroy();
      this._socket = undefined;
    }

    this._id = undefined;
    this._socketPromise = undefined;
    this._serialExecutor.clear();
    this._streamCallback = undefined;
  }

  private _onSocketError(error: Error): void {
    const preStatus = this._status;
    if (preStatus === Status.STOP || preStatus === Status.ERROR) {
      return;
    }

    this.logDebug("close connection on error", error);

    this._destroyLongLink(error);
    this._updateStatus(Status.ERROR);

    this._tryReconnect();
  }

  private _tryReconnect(): void {
    // already reconnecting
    if (this._reconnectDelayTimer) {
      this.logDebug("dup reconnect, skip");
      return;
    }

    if (!this._reconnectStrategy.canRetry()) {
      this.logDebug("reconnect policy failed");
      // 重试失败，关闭
      this.shutdown();
      return;
    }

    const delay = this._reconnectStrategy.nextRetryDelay();

    this.logDebug(`longlink reconnect [${this._reconnectStrategy.retryCount}] after delay:${delay}ms`);

    this._reconnectDelayTimer = setTimeout(() => {
      this._clearReconnectTimer();
      this._connect().then();
    }, delay);
  }

  private async _connect(): Promise<void> {
    const host = HostResolver.selectBestHostFromList(this._hostList!);
    if (!host) {
      throw new Error("longlink host port is not configured yet");
    }

    if (!this._socketPromise) {
      this._socketPromise = new Promise((resolve, reject) => {
        const startDate = new Date();


        this.logDebug(`longlink start connect: ${host.host}:${host.port}`);

        const socket = new Socket();
        socket.setTimeout(WeChatLongLinkProxy.SOCKET_TIMEOUT);

        this._socket = socket;
        this._id = `${this._instanceId.substr(0, 2)}:${genUUID().substr(0, 4)}`;

        // node socket doesn't support connect timeout natively, so implement our own version.
        this._socketConnectTimeout = setTimeout(() => {
          this.logDebug(`longlink socket[${host.host}:${host.port}] connect timeout`);

          this._adjustHostQuality(host, false);

          const error = new IOError("longlink socket connect timeout");
          this._onSocketError(error);
          reject(error);
        }, WeChatLongLinkProxy.CONNECT_TIMEOUT);

        this._updateStatus(Status.CONNECTING);


        socket.connect(
          {
            host: host.host,
            port: host.port,
          },
          async () => {
            const endDate = new Date();
            this.logDebug(`longlink connect success, cost ${endDate.getTime() - startDate.getTime()}ms`);

            this._adjustHostQuality(host, true);

            clearTimeout(this._socketConnectTimeout!);
            this._socketConnectTimeout = undefined;

            this._updateStatus(Status.HALF_CONNECTED);

            try {
              const startDate = new Date();
              this.logDebug(`longlink start init`);

              await this._client.request(new LongLinkInitRequest().setLonglinkid(this._id!));

              this.logDebug(`longlink init done, cost ${new Date().getTime() - startDate.getTime()}ms`);

              this._reconnectStrategy.reset();
              this._updateStatus(Status.CONNECTED);

              resolve();

              this._startHeartbeat();
            } catch (e) {
              this._onSocketError(new IOError(e, "long link init failed"));
            }
          }
        );

        socket.on("data", (data) => {
          this.logDebug(`socket recv:${bytesToHexString(data, MAX_LOG_BYTES_LEN)}`);

          // stream mode
          if (this._streamCallback) {
            this._serialExecutor.execute(async () => {
              const eof = await this._streamCallback!.onStreamData(data);
              if (eof) {
                // end stream mode, switch to normal
                this._streamCallback = undefined;
              }
            });
          } else {
            this._onSocketData(data);
          }
        });

        socket.on("close", () => {
          this._serialExecutor.execute(async () => {
            await this._onSocketError(new IOError("longlink socket is closed"));
          });
        });

        socket.on("timeout", () => {
          this._serialExecutor.execute(async () => {
            await this._onSocketError(new IOError("longlink socket is read-write timeout"));
          });
        });

        socket.on("error", (error) => {
          this._serialExecutor.execute(async () => {
            await this._onSocketError(error);
          });
        });
      });
    } else {
      this.logDebug("longlink duplicated connect");
    }

    return this._socketPromise;
  }

  private async _onSocketData(data: Bytes): Promise<void> {
    let unpackResponse: LongLinkUnpackResponse;

    try {
      unpackResponse = await this._serialExecutor.execute(async () => {
        return this._client.request(new LongLinkUnpackRequest().setLonglinkid(this._id!).setPayload(data));
      });
    } catch (e) {
      // if longlink unpack failed, notify all longlink pending callback with error,
      // bcz we don't know which request corresponding to current unpackResponse exactly.
      this._onSocketError(new IOError(e, "Exception while unpacking long link data"));

      throw e;
    }

    const pushMessageList: LongLinkMessage[] = [];

    const messageList = unpackResponse.getMessageList();
    for (const message of messageList) {
      if (message.getType() === LongLinkMessageType.NORMAL_MESSAGE) {
        this._notifyRequestCallback(message.getMessageid());
      } else if (message.getType() === LongLinkMessageType.PUSH_MESSAGE) {
        const pushMessage = message.getPush()!;
        if (pushMessage.getType() === LongLinkMessagePushType.NEW_MESSAGE) {
          this.emit("message-push");
        } else {
          pushMessageList.push(message);
        }
      }
    }

    if (pushMessageList.length) {
      this.emit("push", pushMessageList);
    }
  }

  private logDebug(...args: any[]): void {
    Log.silly(LOGPRE, `[${this._id}]`, ...args);
  }

  private _adjustHostQuality(host: Host, connectSuccess: boolean) {
    HostResolver.adjustHostQuality(host, connectSuccess);
    this.logDebug(`adjust host quality:${JSON.stringify(host)}, connect success:${connectSuccess}, host list:${JSON.stringify(this._hostList)}`);
  }
}

export enum Status {
  IDLE,
  CONNECTING,
  HALF_CONNECTED,
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

export interface LongLinkStreamCallback {
  onStreamData(data: Bytes): Promise<boolean>;
}
