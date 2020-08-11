import * as padlocal from "./proto/padlocal_grpc_pb";
import { credentials, Metadata, CallCredentials } from "@grpc/grpc-js";
import { Constant } from "./utils/Constant";
import { GrpcClient } from "./GrpcClient";
import { Host, Contact, SystemEventRequest, SystemEventType, ActionMessage, Message } from "./proto/padlocal_pb";
import { WeChatLongLinkProxy } from "./link/WeChatLongLinkProxy";
import { EventEmitter } from "events";
import { log } from "./utils/log";
import { PadLocalClientApi } from "./PadLocalClientApi";
import { Message as GrpcMessage } from "google-protobuf";

export class PadLocalClient extends EventEmitter {
    private readonly _stub: padlocal.PadLocalClient;
    private readonly _callCredentials: CallCredentials;
    private readonly _longLinkProxy: WeChatLongLinkProxy;
    selfContact?: Contact;

    readonly api: PadLocalClientApi = new PadLocalClientApi(this);

    constructor(host: string, port: number, token: string) {
        super();

        // Oops, @grpc/grpc-js does not support retry yet
        this._stub = new padlocal.PadLocalClient(
            `${host}:${port}`,
            credentials.createInsecure(),
            {
                'grpc.default_compression_algorithm': 2,
                'grpc.default_compression_level': 2
            });

        this._callCredentials = credentials.createFromMetadataGenerator((params, callback) => {
            const metaData = new Metadata();
            metaData.set(Constant.AUTHORIZATION_METADATA_KEY, `Bearer ${token}`);
            callback(null, metaData);
        });

        this._longLinkProxy = new WeChatLongLinkProxy(this);

        this._longLinkProxy.on(WeChatLongLinkProxy.Event.HeartBeatEvent, async (event: WeChatLongLinkProxy.HeartBeatEventPayload) => {
            try {
                await this.api.sendLongLinkHeartBeat(event.heartBeatSeq);
                this._longLinkProxy.onHeartBeatResult(true);
            }
            catch (e) {
                log.error(`error to send longlink heartbeat: ${e}`);
                this._longLinkProxy.onHeartBeatResult(false);
            }
        })

        this._longLinkProxy.on(WeChatLongLinkProxy.Event.OnPushNewMessageEvent, async () => {
            try {
                const syncEvent = await this.api.sync();

                log.debug(`on push notification, contact count:${syncEvent.getContactList().length}, message count:${syncEvent.getMessageList().length}`);

                if (syncEvent.getContactList().length > 0) {
                    this._postEvent(PadLocalClient.Event.OnPushContactEvent, {
                        contactList: syncEvent.getContactList()
                    });
                }
                if (syncEvent.getMessageList().length > 0) {
                    this._postEvent(PadLocalClient.Event.OnPushNewMessageEvent, {
                        messageList: syncEvent.getMessageList()
                    })
                }
            } catch (e) {
                log.error(`error while syncing onpush: ${e}`);
            }
        });
    }

    get isOnline(): boolean {
        return !!this.selfContact;
    }

    updateLongLinkHost(longLinkHostInfo: Host) {
        this._longLinkProxy.updateHostPort(longLinkHostInfo.getHost(), longLinkHostInfo.getPort(), false)
    }

    isSelf(userName: string): boolean {
        return this.selfContact?.getUsername() === userName;
    }

    createGrpcClient(options?: Partial<GrpcClient.Options>): GrpcClient {
        const ret = new GrpcClient(this, this._stub, this._callCredentials, options);

        ret.onSystemEventCallback = (systemEventRequest: SystemEventRequest) => {
            const systemEventType = systemEventRequest.getType();
            if (systemEventType == SystemEventType.DID_KICKOUT) {
                this.reset();

                this._postEvent(PadLocalClient.Event.KickOutEvent, {
                    errorCode: systemEventRequest.getKickoutevent()!.getErrorcode(),
                    errorMessage: systemEventRequest.getKickoutevent()!.getErrormessage()
                });
            }
            else if (systemEventType == SystemEventType.DID_REFRESH_TOKEN) {
                // re-connect longlink after token refresh
                this.getLongLinkProxy(true);
            }
        };

        return ret;
    }

    public async grpcRequest<REQ extends GrpcMessage, RES extends GrpcMessage>(request: REQ, options?: Partial<GrpcClient.Options>): Promise<RES> {
        const grpcClient = this.createGrpcClient(options);
        return await grpcClient.request(request);
    }

    async getLongLinkProxy(reset?: boolean): Promise<WeChatLongLinkProxy> {
        if (this._longLinkProxy.isConnected() && !reset) {
            return this._longLinkProxy;
        }

        await this._longLinkProxy.reconnect();
        return this._longLinkProxy;
    }

    public reset(): void {
        this.selfContact = undefined;
        this._longLinkProxy.shutdown(true);
    }

    private _postEvent(eventName: PadLocalClient.Event, payload: PadLocalClient.KickOutEvent | PadLocalClient.OnPushNewMessageEvent | PadLocalClient.OnPushContactEvent) {
        this.emit(eventName, payload);
    }

    static setLogLevel(logLevel: log.LogLevel): void {
        log.setLogLevel(logLevel);
    }
}

export namespace PadLocalClient {
    export enum Event {
        KickOutEvent = "KickOutEvent",
        OnPushNewMessageEvent = "OnPushNewMessageEvent",
        OnPushContactEvent = "OnPushContactEvent",
    }

    export interface KickOutEvent {
        readonly errorCode: number;
        readonly errorMessage: string;
    }

    export interface OnPushNewMessageEvent {
        readonly messageList: Array<Message>;
    }

    export interface OnPushContactEvent {
        readonly contactList: Array<Contact>;
    }
}