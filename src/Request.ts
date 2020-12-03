import { PadLocalClient } from "./PadLocalClient";
import { ClientDuplexStream } from "@grpc/grpc-js";
import {
  ActionMessage,
  ActionMessageHeader,
  SystemEventRequest,
  SystemEventResponse,
  WeChatLongLinkResponse,
  WeChatRequest,
  WeChatResponse,
  WeChatShortLinkResponse,
  WeChatStreamRequest,
} from "./proto/padlocal_pb";
import { Message } from "google-protobuf";
import { getPayload, setPayload } from "./utils/ActionMessageUtils";
import { logDebug } from "./utils/log";
import { PromiseCallback } from "./utils/PromiseUtils";
import { WeChatShortLinkProxy } from "./link/WeChatShortLinkProxy";
import VError from "verror";
import { stringifyPB } from "./utils/Utils";
import { SocketStreamHandler } from "./link/SocketStreamHandler";
import { LongLinkStreamHandler } from "./link/LongLinkStreamHandler";
import { PushStreamHandler } from "./link/PushStreamHandler";
import { WeChatLongLinkProxy } from "./link/WeChatLongLinkProxy";
import { GrpcClient, GrpcOptions, IOError } from "./GrpcClient";
import { PadLocalClientPlugin } from "./PadLocalClientPlugin";

export type OnMessageCallback = (actionMessage: ActionMessage) => void;
export type OnSystemEventCallback = (systemEventRequest: SystemEventRequest) => void;

export class Request extends PadLocalClientPlugin {
  private _status: Status;
  private _seqId: number = 0;
  private _grpcStream?: ClientDuplexStream<ActionMessage, ActionMessage>;
  private _pendingCallbacks: Map<number, PromiseCallback> = new Map();
  private readonly _requestTimeout: number;

  readonly traceId: string;

  onMessageCallback?: OnMessageCallback;
  onSystemEventCallback?: OnSystemEventCallback;

  constructor(client: PadLocalClient, options?: Partial<GrpcOptions>) {
    super(client);

    this._status = Status.OK;

    const meta = client.grpcClient.newRequestMeta(options);
    this.traceId = GrpcClient.getTraceId(meta);
    this._requestTimeout = GrpcClient.getTimeout(options);

    this._grpcStream = client.grpcClient.stub.action(meta, client.grpcClient.newRequestOptions(options));

    this._grpcStream.on("data", (serverMessage: ActionMessage) => {
      this._onServerMessage(serverMessage).then();
    });

    this._grpcStream.on("end", () => {
      if (this._status !== Status.OK) {
        return;
      }

      this._failAllPendingRequest(Status.SERVER_COMPLETE, new Error("Server complete"));
      this._status = Status.SERVER_COMPLETE;
    });

    this._grpcStream.on("error", (error: Error) => {
      if (this._status !== Status.OK) {
        return;
      }

      this._failAllPendingRequest(Status.SERVER_ERROR, error);

      this._status = Status.SERVER_ERROR;
    });
  }

  async request<REQ extends Message, RES extends Message>(request: REQ): Promise<RES> {
    const subResponse = (await this.subRequest(request, false)) as SubResponse<RES>;
    return subResponse.payload;
  }

  /**
   * @param request: request payload
   * @param sendOnly: if true, do not wait for server's ask, return null immediately
   * @return response
   */
  async subRequest<REQ extends Message, RES extends Message>(
    request: REQ,
    sendOnly: boolean
  ): Promise<SubResponse<RES> | void> {
    return this._sendMessage(request, sendOnly);
  }

  subReply<T extends Message>(ack: number, replay: T): void {
    this._sendMessage(replay, true, ack).then();
  }

  /**
   * reply to ack, and send request need peer ack too
   * @param ack
   * @param request
   */
  async subReplyAndRequest<REQ extends Message, RES extends Message>(
    ack: number,
    request: REQ
  ): Promise<SubResponse<RES>> {
    return (await this._sendMessage(request, false, ack)) as SubResponse<RES>;
  }

  private async _sendMessage<REQ extends Message, RES extends Message>(
    request: REQ,
    sendOnly: boolean,
    ack?: number
  ): Promise<SubResponse<RES> | void> {
    if (sendOnly) {
      this.__sendMessage(request, undefined, ack);
    } else {
      const newSeqId = ++this._seqId;

      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          this._failPendingRequest(newSeqId, new IOError(`[tid:${this.traceId}] subRequest timeout`));
        }, this._requestTimeout);

        this._pendingCallbacks.set(newSeqId, new PromiseCallback(resolve, reject, timeoutId));

        this.__sendMessage(request, newSeqId, ack);
      });
    }
  }

  /**
   * @param payload: message payload
   * @param seq: payload action and require ack reply
   * @param ack: reply action and reply #seq payload with ack
   *
   * Example:
   *  ┌───────┬───────┬───────────────────────────────────────────────┐
   *  │  seq  │  ack  │                  description                  │
   *  ├───────┼───────┼───────────────────────────────────────────────┤
   *  │ null  │ null  │send only action, no ack required              │
   *  ├───────┼───────┼───────────────────────────────────────────────┤
   *  │ null  │notnull│reply action, reply to payload that seq == ack │
   *  ├───────┼───────┼───────────────────────────────────────────────┤
   *  │notnull│ null  │payload action, need ack                       │
   *  ├───────┼───────┼───────────────────────────────────────────────┤
   *  │notnull│notnull│reply action, and also need peer to reply      │
   *  └───────┴───────┴───────────────────────────────────────────────┘
   */
  private __sendMessage<T extends Message>(payload: T, seq?: number, ack?: number) {
    if (this._status !== Status.OK && this._status !== Status.SERVER_COMPLETE) {
      throw new SubRequestCancelError(
        this.traceId,
        this._status,
        undefined,
        "can not send message while stream status is not illegal"
      );
    }

    const actionMessageHeader = new ActionMessageHeader();
    if (seq !== undefined) {
      actionMessageHeader.setSeq(seq);
    }
    if (ack !== undefined) {
      actionMessageHeader.setAck(ack);
    }

    const actionMessage = new ActionMessage();
    actionMessage.setHeader(actionMessageHeader);
    setPayload(actionMessage, payload);

    logDebug(
      `tid:[${
        this.traceId
      }] send event to server, seq:${seq}, ack:${ack}, type: ${actionMessage.getPayloadCase()}, payload: ${stringifyPB(
        payload
      )}`
    );

    this._grpcStream!.write(actionMessage);
  }

  private async _onServerMessage(serverMessage: ActionMessage): Promise<void> {
    const seq = serverMessage.getHeader()!.getSeq();
    const ack = serverMessage.getHeader()!.getAck();

    const payload = getPayload(serverMessage);

    logDebug(
      `[tid:${
        this.traceId
      }] receive event from server, seq:${seq} ack:${ack}, type:${serverMessage.getPayloadCase()}, payload:${stringifyPB(
        payload
      )}`
    );

    // server response, execute on stream executor thread directly
    if (ack) {
      this._completePendingRequest(ack, getPayload(serverMessage), seq);
    } else {
      // forward payload to wechat server, and then forward response to our server
      if (serverMessage.getPayloadCase() === ActionMessage.PayloadCase.WECHATREQUEST) {
        try {
          await this._handleNormalRequest(serverMessage.getWechatrequest()!, seq);
        } catch (e) {
          this.error(new IOError(e, `[tid:${this.traceId}] Exception while handling wechat request`));
        }
      } else if (serverMessage.getPayloadCase() === ActionMessage.PayloadCase.WECHATSTREAMREQUEST) {
        try {
          await this._handleStreamRequest(serverMessage.getWechatstreamrequest()!, seq);
        } catch (e) {
          this.error(new IOError(e, `[tid:${this.traceId}] Exception while handling wechat stream request`));
        }
      } else if (serverMessage.getPayloadCase() === ActionMessage.PayloadCase.SYSTEMEVENTREQUEST) {
        this.subReply(seq, new SystemEventResponse());
        this.onSystemEventCallback?.(serverMessage.getSystemeventrequest()!);
      } else {
        this.onMessageCallback?.(serverMessage);
      }
    }
  }

  private async _handleStreamRequest(wechatStreamRequest: WeChatStreamRequest, ack: number) {
    if (wechatStreamRequest.getPayloadCase() == WeChatStreamRequest.PayloadCase.SOCKETREQUEST) {
      const socketStreamHandler = new SocketStreamHandler(this);
      await socketStreamHandler.handleRequest(wechatStreamRequest, ack);
    } else if (wechatStreamRequest.getPayloadCase() == WeChatStreamRequest.PayloadCase.LONGLINKREQUEST) {
      const longLinkRequest = wechatStreamRequest.getLonglinkrequest()!;

      let longLinkProxy: WeChatLongLinkProxy;
      if (longLinkRequest.getInitphase()) {
        longLinkProxy = this.client.getLongLinkProxyDirect();
      } else {
        longLinkProxy = await this.client.getLongLinkProxy();
      }

      const longLinkStreamHandler = new LongLinkStreamHandler(this, longLinkProxy);
      await longLinkStreamHandler.handleRequest(wechatStreamRequest, ack);
    } else if (wechatStreamRequest.getPayloadCase() == WeChatStreamRequest.PayloadCase.PUSHSUBSCRIBEREQUEST) {
      const longLinkProxy = await this.client.getLongLinkProxy();
      const pushStreamHandler = new PushStreamHandler(this, longLinkProxy);
      await pushStreamHandler.handleRequest(wechatStreamRequest, ack);
    } else {
      throw new Error(`unsupported wechat request case: ${wechatStreamRequest.getPayloadCase()}`);
    }
  }

  private async _handleNormalRequest(wechatRequest: WeChatRequest, ack: number) {
    if (wechatRequest.getPayloadCase() === WeChatRequest.PayloadCase.LONGLINKREQUEST) {
      const longLinkRequest = wechatRequest.getLonglinkrequest()!;

      let longLinkProxy: WeChatLongLinkProxy;
      if (longLinkRequest.getInitphase()) {
        longLinkProxy = this.client.getLongLinkProxyDirect();
      } else {
        longLinkProxy = await this.client.getLongLinkProxy();
      }

      await longLinkProxy.sendRequest(longLinkRequest);

      this.subReply(ack, new WeChatResponse().setLonglinkresponse(new WeChatLongLinkResponse()));
    } else if (wechatRequest.getPayloadCase() === WeChatRequest.PayloadCase.SHORTLINKREQUEST) {
      const shortLinkRequest = wechatRequest.getShortlinkrequest()!;

      const shortLinkProxy = new WeChatShortLinkProxy(
        shortLinkRequest.getHost()!.getHost(),
        shortLinkRequest.getHost()!.getPort(),
        this.traceId
      );

      const responseData = await shortLinkProxy.send(
        shortLinkRequest.getPath(),
        Buffer.from(shortLinkRequest.getPayload())
      );

      const weChatResponse = new WeChatResponse().setShortlinkresponse(
        new WeChatShortLinkResponse().setPayload(responseData)
      );

      this.subReply(ack, weChatResponse);
    } else {
      throw new Error(`unsupported wechat request case: ${wechatRequest.getPayloadCase()}`);
    }
  }

  private _completePendingRequest(ack: number, payload: Message, seq?: number): void {
    const p = this._pendingCallbacks.get(ack);
    this._pendingCallbacks.delete(ack);

    if (!p) {
      return;
    }

    p.resolve({
      ack: seq,
      payload,
    } as SubResponse<Message>);
  }

  private _failPendingRequest(ack: number, error: Error): void {
    const p = this._pendingCallbacks.get(ack);
    this._pendingCallbacks.delete(ack);

    p?.reject(error);
  }

  private _failAllPendingRequest(status: Status, error: Error): void {
    const e = new SubRequestCancelError(this.traceId, status, error);
    for (const [, p] of this._pendingCallbacks.entries()) {
      p.reject(e);
    }

    this._pendingCallbacks.clear();
  }

  error(e: Error): void {
    if (this._status !== Status.OK) {
      return;
    }

    this._failAllPendingRequest(Status.CLIENT_ERROR, e);

    // set before requestObserver.onError, because requestObserver.onError will cause onError callback
    this._status = Status.CLIENT_ERROR;

    // whatever exception called in client.onError, server will receive "cancelled before receiving half close" error.
    this._grpcStream!.cancel();
  }

  complete(): void {
    if (this._status !== Status.OK) {
      return;
    }

    this._failAllPendingRequest(Status.CLIENT_COMPLETE, new Error("Grpc client complete"));

    // set before requestObserver.onCompleted, because requestObserver.onCompleted will cause onCompleted callback
    this._status = Status.CLIENT_COMPLETE;

    this._grpcStream!.end();
  }
}

export enum Status {
  OK,
  SERVER_ERROR,
  SERVER_COMPLETE,
  CLIENT_ERROR,
  CLIENT_COMPLETE,
}

export class SubRequestCancelError extends VError {
  reason: Status;

  constructor(traceId: string, reason: Status, cause?: Error, message?: string) {
    if (cause) {
      super(
        cause,
        `[tid:${traceId}] request has been cancelled for reason: ${Status[reason]}${message ? ", " + message : ""}`
      );
    } else {
      super(
        `[tid:${traceId}] request has been cancelled for reason: ${Status[reason]}${message ? ", " + message : ""}`
      );
    }

    this.reason = reason;
  }
}

export interface SubResponse<T extends Message> {
  payload: T;
  ack?: number;
}

export interface Options {}
