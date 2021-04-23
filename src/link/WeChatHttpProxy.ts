import { RetryStrategy, RetryStrategyRule } from "../utils/RetryStrategy";
import { bytesToHexString, joinBytes, MAX_LOG_BYTES_LEN, newBytes } from "../utils/ByteUtils";
import http, { OutgoingHttpHeaders } from "http";
import { log } from "brolog";
import { IOError } from "./erros";
import { WeChatHttpRequest, WeChatHttpResponse } from "../proto/padlocal_pb";
import * as https from "https";

const LOGPRE = "[HTTP]";

export class WeChatHttpProxy {
  readonly retryStrategy = RetryStrategy.getStrategy(RetryStrategyRule.FAST, 5); // retry almost 1 min
  readonly traceId: string;
  readonly request: WeChatHttpRequest;

  constructor(traceId: string, request: WeChatHttpRequest) {
    this.traceId = traceId;
    this.request = request;
  }

  async send(): Promise<WeChatHttpResponse> {
    try {
      return await this._sendImpl();
    } catch (e) {
      if (!(e instanceof IOError)) {
        throw e;
      }

      if (!this.retryStrategy.canRetry()) {
        const message = `[tid:${
          this.traceId
        }] Fail to send http request, [${this.request.getMethod()}]${this.request.getUrl()}, after max retry:${
          this.retryStrategy.retryCount
        }`;
        throw new IOError(e, message);
      }

      const delay = this.retryStrategy.nextRetryDelay();

      log.silly(
        LOGPRE,
        `[tid:${this.traceId}] http #${
          this.retryStrategy.retryCount
        } retry request, after delay: ${delay}ms, [${this.request.getMethod()}]${this.request.getUrl()}`
      );

      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await this.send();
            resolve(response);
          } catch (e) {
            reject(e);
          }
        }, delay);
      });
    }
  }

  private async _sendImpl(): Promise<WeChatHttpResponse> {
    log.silly(LOGPRE, `[tid:${this.traceId}] http send, [${this.request.getMethod()}]${this.request.getUrl()}`);

    return new Promise((resolve, reject) => {
      let responseDataBuffer = newBytes();

      const headers: OutgoingHttpHeaders = {};
      for (const [key, value] of this.request.getHeadersMap().getEntryList()) {
        headers[key] = value;
      }

      const url = new URL(this.request.getUrl());
      const protocol = url.protocol === "https:" ? https : http;
      const req = protocol.request(
        this.request.getUrl(),
        {
          method: this.request.getMethod(),
          headers,
          timeout: this.request.getTimeout(),
        },
        (res) => {
          const wechatResponse = new WeChatHttpResponse();

          if (res.statusCode !== undefined) {
            wechatResponse.setStatuscode(res.statusCode);
          }

          for (const key of Object.keys(res.headers)) {
            wechatResponse.getHeadersMap().set(key, res.headers[key] + "");
          }

          res.on("data", (chunk) => {
            responseDataBuffer = joinBytes(responseDataBuffer, chunk);
          });

          res.on("end", () => {
            log.silly(
              LOGPRE,
              `[tid:${this.traceId}] http receive, response: ${bytesToHexString(responseDataBuffer, MAX_LOG_BYTES_LEN)}`
            );

            wechatResponse.setPayload(responseDataBuffer);

            resolve(wechatResponse);
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

      this.request.getPayload() && req.write(this.request.getPayload());

      req.end();
    });
  }
}
