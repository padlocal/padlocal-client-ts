import { PadLocalClient } from "./PadLocalClient";
import { Metadata, CallCredentials, ClientDuplexStream } from "@grpc/grpc-js";
import { Constant } from "./utils/Constant";
import { IPadLocalClient } from "./proto/padlocal_grpc_pb";
import { ActionMessage, ActionMessageHeader, SystemEventRequest, WeChatRequest, WeChatResponse, WeChatRequestChannel, SystemEventResponse } from "./proto/padlocal_pb";
import cryptoRandomString from "crypto-random-string";
import { Message } from "google-protobuf";
import { ActionMessageUtils } from "./utils/ActionMessageUtils";
import { log } from "./utils/log";
import { PromiseCallback } from "./utils/PromiseUtils";
import { Bytes } from "./utils/ByteUtils";
import { WeChatShortLinkProxy } from "./link/WeChatShortLinkProxy";
import { WeChatSocketProxy } from "./link/WeChatSocketProxy";
import { WeChatCdnProxy } from "./link/WeChatCdnProxy";
import VError from "verror";
import { Utils } from "./utils/Utils";
import { PadLocalClientPlugin } from "./PadLocalClientPlugin";

export type OnMessageCallback = (actionMessage: ActionMessage) => void;
export type OnSystemEventCallback = (systempEventRequest: SystemEventRequest) => void;

export class GrpcClient extends PadLocalClientPlugin {
    private static readonly DEFAULT_REQUEST_TIMEOUT = 60 * 1000;

    private _status: GrpcClient.Status;
    private _seqId: number = 0;
    private readonly _requestTimeout: number;
    private _grpcStream: ClientDuplexStream<ActionMessage, ActionMessage>;
    private _pendingCallbacks: Map<number, PromiseCallback> = new Map();

    readonly traceId: string;
    onMessageCallback?: OnMessageCallback;
    onSystemEventCallback?: OnSystemEventCallback;

    constructor(client: PadLocalClient, stub: IPadLocalClient, callCredentials: CallCredentials, options?: Partial<GrpcClient.Options>) {
        super(client);

        this._status = GrpcClient.Status.OK;
        this.traceId = cryptoRandomString({ length: 8 });

        this._requestTimeout = options?.requestTimeout || GrpcClient.DEFAULT_REQUEST_TIMEOUT;

        let metaData = new Metadata();
        metaData.set(Constant.TRACE_ID_METADATA_KEY, this.traceId);
        if (options?.idempotentId) {
            metaData.set(Constant.IDEMPOTENT_ID_KEY, options.idempotentId);
        }

        this._grpcStream = stub.action(metaData, {
            credentials: callCredentials,
            deadline: Date.now() + this._requestTimeout
        });

        this._grpcStream.on("data", (serverMessage: ActionMessage) => {
            this._onServerMessage(serverMessage);
        });

        this._grpcStream.on("end", () => {
            if (this._status !== GrpcClient.Status.OK) {
                return;
            }

            this._failAllPendingRequest(GrpcClient.Status.SERVER_COMPLETE, new Error("Server complete"));
            this._status = GrpcClient.Status.SERVER_COMPLETE;
        });

        this._grpcStream.on("error", (error: Error) => {
            if (this._status != GrpcClient.Status.OK) {
                return;
            }

            this._failAllPendingRequest(GrpcClient.Status.SERVER_ERROR, error);

            this._status = GrpcClient.Status.SERVER_ERROR;
        });
    }

    async request<REQ extends Message, RES extends Message>(request: REQ): Promise<RES> {
        return this.subRequest(request, false) as Promise<RES>;
    }

    /**
     * @param request: request payload
     * @param sendOnly: if true, do not wait for server's ask, return null immediately
     * @param <REQ>:
     * @param <RES>:
     * @return response
     */
    async subRequest<REQ extends Message, RES extends Message>(request: REQ, sendOnly: boolean): Promise<RES | void> {
        if (sendOnly) {
            this._sendMessage(request);
        }
        else {
            const newSeqId = ++this._seqId;

            return new Promise((resolve, reject) => {
                let timeoutId = setTimeout(() => {
                    this._failPendingRequest(newSeqId, new GrpcClient.IOError("subRequest timeout"))
                }, this._requestTimeout);

                this._pendingCallbacks.set(newSeqId, new PromiseCallback(resolve, reject, timeoutId));

                this._sendMessage(request, newSeqId);
            });
        }
    }

    subReply<T extends Message>(originalMessage: ActionMessage, replay: T): void {
        const ack = originalMessage.getHeader()?.getSeq();
        this._sendMessage(replay, undefined, ack);
    }

    private async _onServerMessage(serverMessage: ActionMessage): Promise<void> {
        let seq = serverMessage.getHeader()?.getSeq();
        let ack = serverMessage.getHeader()?.getAck();

        let payload = ActionMessageUtils.getPayload(serverMessage);

        log.debug(`[tid:${this.traceId}] receive event from server, seq:${seq} ack:${ack}, type:${serverMessage.getPayloadCase()}, payload:${Utils.stringifyPB(payload)}`);

        // server response, execute on stream executor thread directly
        if (ack) {
            this._completePendingRequest(ack, ActionMessageUtils.getPayload(serverMessage));
        }
        else {
            // forward payload to wechat server, and then forward response to our server
            if (serverMessage.getPayloadCase() == ActionMessage.PayloadCase.WECHATREQUEST) {
                try {
                    const weChatResponse = await this._sendWeChatRequest(serverMessage.getWechatrequest()!);
                    this.subReply(serverMessage, weChatResponse);
                }
                catch (e) {
                    this.error(new GrpcClient.IOError(e, `[tid:${this.traceId}] Exception while forwarding message to wechat`))
                }
            }
            else if (serverMessage.getPayloadCase() == ActionMessage.PayloadCase.SYSTEMEVENTREQUEST) {
                this.subReply(serverMessage, new SystemEventResponse());
                this.onSystemEventCallback?.(serverMessage.getSystemeventrequest()!);
            }
            else {
                this.onMessageCallback?.(serverMessage);
            }
        }
    }

    /**
     * @param payload: message payload
     * @param payloadCase: message payload case. Since ts or js is weak at runtime type reflection, so have to supply payload case explicitly.
     * @param seq: payload action and require ack reply
     * @param ack: reply action and reply #seq payload with ack
     * @param <T>
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
     *  │notnull│notnull│no usage                                       │
     *  └───────┴───────┴───────────────────────────────────────────────┘
     *  */
    private _sendMessage<T extends Message>(payload: T, seq?: number, ack?: number) {
        if (this._status !== GrpcClient.Status.OK && this._status !== GrpcClient.Status.SERVER_COMPLETE) {
            throw new GrpcClient.SubRequestCancelError(this._status, "can not send message while stream status is not illegal");
        }

        const actionMessageHeader = new ActionMessageHeader();
        if (seq != undefined) {
            actionMessageHeader.setSeq(seq);
        }
        if (ack != undefined) {
            actionMessageHeader.setAck(ack);
        }

        const actionMessage = new ActionMessage();
        actionMessage.setHeader(actionMessageHeader);
        ActionMessageUtils.setPayload(actionMessage, payload);

        log.debug(`tid:[${this.traceId}] send event to server, seq:${seq}, ack:${ack}, type: ${actionMessage.getPayloadCase()}, payload: ${Utils.stringifyPB(payload)}`);

        this._grpcStream.write(actionMessage);
    }

    private _completePendingRequest(ack: number, payload: Message): void {
        const p = this._pendingCallbacks.get(ack);
        this._pendingCallbacks.delete(ack);

        p?.resolve(payload);
    }

    private _failPendingRequest(ack: number, error: Error): void {
        const p = this._pendingCallbacks.get(ack);
        this._pendingCallbacks.delete(ack);

        p?.reject(error);
    }

    private _failAllPendingRequest(status: GrpcClient.Status, error: Error): void {
        for (const [seqId, p] of this._pendingCallbacks.entries()) {
            p.reject(error);
        }

        this._pendingCallbacks.clear();
    }

    private async _sendWeChatRequest(weChatRequest: WeChatRequest): Promise<WeChatResponse> {
        let responseData: Bytes;

        if (weChatRequest.getChannel() == WeChatRequestChannel.LONG) {
            const longlinkProxy = await this.client.getLongLinkProxy();
            responseData = await longlinkProxy.send(weChatRequest.getSeq(), Buffer.from(weChatRequest.getPayload()));
        }
        else if (weChatRequest.getChannel() == WeChatRequestChannel.SHORT) {
            const shortLinkProxy = new WeChatShortLinkProxy(
                weChatRequest.getHost()!.getHost(),
                weChatRequest.getHost()!.getPort(),
                this.traceId);
            responseData = await shortLinkProxy.send(weChatRequest.getPath(), Buffer.from(weChatRequest.getPayload()));
        }
        else if (weChatRequest.getChannel() == WeChatRequestChannel.SOCKET) {
            const socketProxy = new WeChatSocketProxy(
                weChatRequest.getHost()!.getHost(),
                weChatRequest.getHost()!.getPort(),
                weChatRequest.getSocketresponsedatalen(),
                this.traceId);
            responseData = await socketProxy.send(Buffer.from(weChatRequest.getPayload()));
        }
        else if (weChatRequest.getChannel() == WeChatRequestChannel.CDN) {
            const cdnProxy = new WeChatCdnProxy(this.traceId);
            responseData = await cdnProxy.send(weChatRequest.getCdnrequest()!);
        }
        else {
            throw new Error(`unsupported channel: ${weChatRequest.getChannel()}`);
        }

        return (new WeChatResponse()).setPayload(responseData);
    }

    error(e: Error): void {
        if (this._status != GrpcClient.Status.OK) {
            return;
        }

        this._failAllPendingRequest(GrpcClient.Status.CLIENT_ERROR, e);

        // set before requestObserver.onError, because requestObserver.onError will cause onError callback
        this._status = GrpcClient.Status.CLIENT_ERROR;

        // whatever exception called in client.onError, server will receive "cancelled before receiving half close" error.
        this._grpcStream.cancel();
    }

    complete(): void {
        if (this._status != GrpcClient.Status.OK) {
            return;
        }

        this._failAllPendingRequest(GrpcClient.Status.CLIENT_COMPLETE, new Error("Grpc client complete"));

        // set before requestObserver.onCompleted, because requestObserver.onCompleted will cause onCompleted callback
        this._status = GrpcClient.Status.CLIENT_COMPLETE;

        this._grpcStream.end();
    }
}

export namespace GrpcClient {
    export interface Options {
        requestTimeout: number;
        idempotentId: string;
    }

    export enum Status {
        OK,
        SERVER_ERROR,
        SERVER_COMPLETE,
        CLIENT_ERROR,
        CLIENT_COMPLETE
    }

    export class SubRequestCancelError extends VError {
        reason: GrpcClient.Status;

        constructor(reason: GrpcClient.Status, message: string) {
            super(`sub request has been cancelled reason: ${reason}, ${message}`);
            this.reason = reason;
        }
    }

    export class IOError extends VError {
    }
}

