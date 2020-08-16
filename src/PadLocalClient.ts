import * as padlocal from "./proto/padlocal_grpc_pb";
import { credentials, Metadata, CallCredentials } from "@grpc/grpc-js";
import { AUTHORIZATION_METADATA_KEY } from "./utils/Constant";
import { GrpcClient, Options } from "./GrpcClient";
import { Host, Contact, SystemEventRequest, SystemEventType, Message } from "./proto/padlocal_pb";
import { WeChatLongLinkProxy, EventName as LongLinkEvent, HeartBeatEventPayload } from "./link/WeChatLongLinkProxy";
import { EventEmitter } from "events";
import { logDebug, logError } from "./utils/log";
import { PadLocalClientApi } from "./PadLocalClientApi";
import { Message as GrpcMessage } from "google-protobuf";

export class PadLocalClient extends EventEmitter {
  private readonly _stub: padlocal.PadLocalClient;
  private readonly _callCredentials: CallCredentials;
  private readonly _longLinkProxy: WeChatLongLinkProxy;
  selfContact?: Contact;

  readonly api: PadLocalClientApi = new PadLocalClientApi(this);

  constructor(serverAddr: string, token: string) {
    super();

    // Oops, @grpc/grpc-js does not support retry yet
    this._stub = new padlocal.PadLocalClient(serverAddr, credentials.createInsecure(), {
      "grpc.default_compression_algorithm": 2,
      "grpc.default_compression_level": 2,
    });

    this._callCredentials = credentials.createFromMetadataGenerator((params, callback) => {
      const metaData = new Metadata();
      metaData.set(AUTHORIZATION_METADATA_KEY, `Bearer ${token}`);
      callback(null, metaData);
    });

    this._longLinkProxy = new WeChatLongLinkProxy(this);

    this._longLinkProxy.on(LongLinkEvent.HeartBeatEvent, async (event: HeartBeatEventPayload) => {
      try {
        await this.api.sendLongLinkHeartBeat(event.heartBeatSeq);
        this._longLinkProxy.onHeartBeatResult(true);
      } catch (e) {
        logError(`error to send longlink heartbeat: ${e}`);
        this._longLinkProxy.onHeartBeatResult(false);
      }
    });

    this._longLinkProxy.on(LongLinkEvent.OnPushNewMessageEvent, async () => {
      try {
        const syncEvent = await this.api.sync();

        logDebug(
          `on push notification, contact count:${syncEvent.getContactList().length}, message count:${
            syncEvent.getMessageList().length
          }`
        );

        if (syncEvent.getContactList().length > 0) {
          this._postEvent(EventName.OnPushContactEvent, {
            contactList: syncEvent.getContactList(),
          });
        }
        if (syncEvent.getMessageList().length > 0) {
          this._postEvent(EventName.OnPushNewMessageEvent, {
            messageList: syncEvent.getMessageList(),
          });
        }
      } catch (e) {
        logError(`error while syncing onpush: ${e}`);
      }
    });
  }

  get isOnline(): boolean {
    return !!this.selfContact;
  }

  updateLongLinkHost(longLinkHostInfo: Host) {
    this._longLinkProxy.updateHostPort(longLinkHostInfo.getHost(), longLinkHostInfo.getPort(), false);
  }

  isSelf(userName: string): boolean {
    return this.selfContact?.getUsername() === userName;
  }

  createGrpcClient(options?: Partial<Options>): GrpcClient {
    const ret = new GrpcClient(this, this._stub, this._callCredentials, options);

    ret.onSystemEventCallback = (systemEventRequest: SystemEventRequest) => {
      const systemEventType = systemEventRequest.getType();
      if (systemEventType === SystemEventType.DID_KICKOUT) {
        this._reset();

        this._postEvent(EventName.KickOutEvent, {
          errorCode: systemEventRequest.getKickoutevent()!.getErrorcode(),
          errorMessage: systemEventRequest.getKickoutevent()!.getErrormessage(),
        });
      } else if (systemEventType === SystemEventType.DID_REFRESH_TOKEN) {
        // re-connect longlink after token refresh
        this.getLongLinkProxy(true).then();
      }
    };

    return ret;
  }

  async grpcRequest<REQ extends GrpcMessage, RES extends GrpcMessage>(
    request: REQ,
    options?: Partial<Options>
  ): Promise<RES> {
    return this.createGrpcClient(options).request(request);
  }

  async getLongLinkProxy(reset?: boolean): Promise<WeChatLongLinkProxy> {
    if (this._longLinkProxy.isConnected() && !reset) {
      return this._longLinkProxy;
    }

    await this._longLinkProxy.reconnect();
    return this._longLinkProxy;
  }

  public shutdown() {
    this._reset();
  }

  private _reset(): void {
    this.selfContact = undefined;
    this._longLinkProxy.shutdown(true);
  }

  private _postEvent(eventName: EventName, payload: KickOutEvent | OnPushNewMessageEvent | OnPushContactEvent) {
    this.emit(eventName, payload);
  }
}

export enum EventName {
  KickOutEvent = "KickOutEvent",
  OnPushNewMessageEvent = "OnPushNewMessageEvent",
  OnPushContactEvent = "OnPushContactEvent",
}

export interface KickOutEvent {
  readonly errorCode: number;
  readonly errorMessage: string;
}

export interface OnPushNewMessageEvent {
  readonly messageList: Message[];
}

export interface OnPushContactEvent {
  readonly contactList: Contact[];
}
