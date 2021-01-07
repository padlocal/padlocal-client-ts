import { RetryStrategy, RetryStrategyRule } from "../utils/RetryStrategy";
import { Bytes, bytesToHexString, joinBytes, newBytes } from "../utils/ByteUtils";
import http from "http";
import VError from "verror";
import { log } from "brolog";

const LOGPRE = "[ShortLink]";

export class WeChatShortLinkProxy {
  private static readonly REQ_TIMEOUT = 10 * 1000;

  readonly retryStrategy = RetryStrategy.getStrategy(RetryStrategyRule.FAST, 5); // retry almost 1 min

  readonly host: string;
  readonly port: number;
  readonly traceId: string;
  readonly reqTimeout: number;

  constructor(host: string, port: number, traceId: string, timeout?: number) {
    this.host = host;
    this.port = port;
    this.traceId = traceId;
    this.reqTimeout = timeout || WeChatShortLinkProxy.REQ_TIMEOUT;
  }

  async send(path: string, data: Bytes): Promise<Bytes> {
    try {
      return await this._sendImpl(path, data);
    } catch (e) {
      if (!(e instanceof IOError)) {
        throw e;
      }

      if (!this.retryStrategy.canRetry()) {
        const message = `[tid:${this.traceId}] Fail to request short link for path:${path}, data: ${bytesToHexString(
          data,
          1024
        )}, after max retry:${this.retryStrategy.retryCount}`;
        throw new IOError(e, message);
      }

      const delay = this.retryStrategy.nextRetryDelay();

      log.verbose(
        LOGPRE,
        `[tid:${this.traceId}] short link #${
          this.retryStrategy.retryCount
        } retry request, after delay: ${delay}ms, path: ${path} data: ${bytesToHexString(data, 1024)}`
      );

      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await this.send(path, data);
            resolve(response);
          } catch (e) {
            reject(e);
          }
        }, delay);
      });
    }
  }

  private async _sendImpl(path: string, data: Bytes): Promise<Bytes> {
    log.verbose(
      LOGPRE,
      `[tid:${this.traceId}] short link send, ${this.host}:${this.port}${path}, request: ${bytesToHexString(
        data,
        1024
      )}`
    );

    return new Promise((resolve, reject) => {
      let responseBuffer = newBytes();

      const req = http.request(
        `http://${this.host}:${this.port}${path}`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Cache-Control": "no-cache",
            Connection: "close",
            "Content-Length": data.length,
            "Content-Type": "application/octet-stream",
            Upgrade: "mmtls",
            "User-Agent": "MicroMessenger Client",
          },
          timeout: this.reqTimeout,
        },
        (res) => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new HttpError(`http status error, status: ${res.statusCode}, message:${res.statusMessage}`));
          }

          res.on("data", (chunk) => {
            responseBuffer = joinBytes(responseBuffer, chunk);
          });

          res.on("end", () => {
            log.verbose(
              LOGPRE,
              `[tid:${this.traceId}] short link receive, response: ${bytesToHexString(responseBuffer, 1024)}`
            );

            resolve(responseBuffer);
          });
        }
      );

      req.on("timeout", () => {
        req.destroy(new IOError("timeout"));
      });

      req.on("error", (e: NodeJS.ErrnoException) => {
        const errorCode = e.code;
        // dns resolve failed
        if (errorCode === "ENOTFOUND") {
          e = new IOError(e, "ENOTFOUND");
        } else if (errorCode === "ETIMEDOUT") {
          e = new IOError(e, "ETIMEDOUT");
        }

        reject(e);
      });

      req.write(data);
      req.end();
    });
  }
}

export class IOError extends VError {}

export class HttpError extends VError {}
