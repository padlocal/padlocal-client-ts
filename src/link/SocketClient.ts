import { Socket } from "net";
import { RetryStrategy, RetryStrategyRule } from "../utils/RetryStrategy";
import { Bytes, bytesToHexString, MAX_LOG_BYTES_LEN, subBytes } from "../utils/ByteUtils";
import VError from "verror";
import { SerialExecutor } from "../utils/SerialExecutor";
import { genUUID } from "../utils/Utils";
import Log from "../utils/Log";

class SendDataBlockQueue {
  private static readonly BLOCK_MAX_SIZE = 65536;

  private readonly _dataToSendBlocks: Bytes[];
  private _cursor: number;

  constructor(data: Bytes) {
    const blocksCount = Math.floor(
      (data.length + SendDataBlockQueue.BLOCK_MAX_SIZE - 1) / SendDataBlockQueue.BLOCK_MAX_SIZE
    );
    if (blocksCount > 1) {
      this._dataToSendBlocks = [];
      for (let i = 0; i < blocksCount; ++i) {
        const start = i * SendDataBlockQueue.BLOCK_MAX_SIZE;
        const end = Math.min(data.length, start + SendDataBlockQueue.BLOCK_MAX_SIZE);
        const block = subBytes(data, start, end);
        this._dataToSendBlocks.push(block);
      }
    } else {
      this._dataToSendBlocks = [data];
    }
    this._cursor = 0;
  }

  public hasMoreDataToSend(): boolean {
    return this._cursor < this._dataToSendBlocks.length;
  }

  public getNextDataBlock(): Bytes {
    return this._dataToSendBlocks[this._cursor++];
  }

  public resetCursor(): void {
    this._cursor = 0;
  }
}

export class SocketClient {
  private static readonly CONNECT_TIMEOUT = 10 * 1000;
  private static readonly READ_WRITE_TIMEOUT = 10 * 1000;

  private readonly _id: string;
  private _socket?: Socket;
  private readonly _callback: Partial<Callback>;
  private _retryOnError: boolean;
  private _callbackExecutor: SerialExecutor;
  private _sendDataBlockQueue?: SendDataBlockQueue;

  readonly host: string;
  readonly port: number;
  readonly traceId: string;
  readonly retryStrategy = RetryStrategy.getStrategy(RetryStrategyRule.FAST, 5); // retry almost 1 min

  get LOGPRE(): string {
    return `[SocketClient] [${this._id}]`;
  }

  constructor(host: string, port: number, traceId: string, callback: Partial<Callback>) {
    this._id = genUUID().substr(0, 4);
    this.host = host;
    this.port = port;
    this.traceId = traceId;
    this._callback = callback;
    this._retryOnError = true;
    this._callbackExecutor = new SerialExecutor();
  }

  async send(data: Bytes): Promise<void> {
    this._retryOnError = true;
    this._callbackExecutor.clear();

    try {
      await this._sendImpl(data);
    } catch (error) {
      if (!this._retryOnError || !this.retryStrategy.canRetry()) {
        const des = `[tid:${this.traceId}] Fail to send socket to:\"${this.host}:${
          this.port
        }\", data:${bytesToHexString(data, MAX_LOG_BYTES_LEN)}, after max retry:${this.retryStrategy.retryCount}`;
        throw new IOError(error, des);
      }

      const delay = this.retryStrategy.nextRetryDelay();

      Log.silly(
        this.LOGPRE,
        `[tid:${this.traceId}] socket #${this.retryStrategy.retryCount} retry send, after delay: ${delay}ms, addr:\"${
          this.host
        }:${this.port}\" data:${bytesToHexString(data, MAX_LOG_BYTES_LEN)}`
      );

      return new Promise(async (resolve, reject) => {
        setTimeout(() => {
          try {
            this.send(data);
            resolve();
          } catch (e) {
            reject(e);
          }
        }, delay);
      });
    }
  }

  cancel(): void {
    if (!this._socket) {
      return;
    }

    this._socket.destroy();
    this._socket = undefined;

    this._callbackExecutor
      .execute(async () => {
        await this._callback?.onCancel?.();
      })
      .then();
  }

  private async _sendImpl(sendData: Bytes): Promise<void> {
    if (this._socket) {
      Log.warn(this.LOGPRE, "can not send again while socket is working");
      return;
    }

    this._sendDataBlockQueue = new SendDataBlockQueue(sendData);

    const sendDataBlock = (socket: Socket, dataQueue: SendDataBlockQueue) => {
      if (socket.destroyed || !dataQueue.hasMoreDataToSend()) {
        return;
      }

      const block = dataQueue.getNextDataBlock();

      Log.silly(this.LOGPRE, `socket send:${bytesToHexString(block, MAX_LOG_BYTES_LEN)}`);

      socket.write(block, (err) => {
        if (err) {
          // stop sending next block while error happen.
          // do not handle this error, because on-error event will be issued.
          return;
        }

        sendDataBlock(socket, dataQueue);
      });
    };

    return new Promise((resolve, reject) => {
      const onSocketFinish = (error?: Error, retryOnError: boolean = true) => {
        if (!this._socket) {
          return;
        }

        if (error) {
          this._callbackExecutor.execute(async () => {
            await this._callback?.onError?.(error);
          });

          Log.silly(this.LOGPRE, `socket on error: ${error}, retryOnError:${retryOnError}`);

          this._retryOnError = retryOnError;

          reject(error);
        } else {
          resolve();
        }

        Log.silly(this.LOGPRE, `destroy socket`);

        this._socket.destroy();
        this._socket = undefined;
      };

      const startDate = new Date();
      Log.silly(this.LOGPRE, `socket start connect: ${this.host}:${this.port}`);

      const socket = new Socket();
      socket.setTimeout(SocketClient.READ_WRITE_TIMEOUT);
      this._socket = socket;

      const connectTimeout = setTimeout(() => {
        onSocketFinish(new IOError("[SocketClient] socket connect timeout"));
      }, SocketClient.CONNECT_TIMEOUT);

      socket.connect(
        {
          host: this.host,
          port: this.port,
        },
        () => {
          clearTimeout(connectTimeout);

          const endDate = new Date();
          Log.silly(this.LOGPRE, `socket connect success, cost: ${endDate.getTime() - startDate.getTime()}ms`);

          this._callbackExecutor.execute(async () => {
            await this._callback?.onConnect?.();
          });

          sendDataBlock(socket, this._sendDataBlockQueue!);
        }
      );

      socket.on("data", (data) => {
        Log.silly(this.LOGPRE, `socket recv:${bytesToHexString(data, MAX_LOG_BYTES_LEN)}`);

        this._callbackExecutor.execute(async () => {
          try {
            const finished = await this._callback.onReceive!(data);

            Log.silly(this.LOGPRE, `process data, finished:${finished}`);

            if (finished) {
              // do not execute onReceive in queue
              this._callbackExecutor.clear("onReceive");
              onSocketFinish();
            }
          } catch (e) {
            // do not execute onReceive in queue
            this._callbackExecutor.clear("onReceive");
            onSocketFinish(e, false);
          }
        }, "onReceive");
      });

      socket.on("close", () => {
        this._callbackExecutor.execute(async () => {
          await this._callback?.onClose?.();
        });

        onSocketFinish();
      });

      socket.on("timeout", () => {
        onSocketFinish(new IOError("[SocketClient] socket is read-write timeout"));
      });

      socket.on("error", (error: Error) => {
        onSocketFinish(new IOError(error, "[SocketClient] socket error"));
      });
    });
  }
}

export interface Callback {
  onConnect(): Promise<void>;

  // return true, all data are received, be able to close the socket
  onReceive(data: Bytes): Promise<boolean>;

  onClose(): Promise<void>;

  onError(error: Error): Promise<void>;

  onCancel(): Promise<void>;
}

export class IOError extends VError {}
