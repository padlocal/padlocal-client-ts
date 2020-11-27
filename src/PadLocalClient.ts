import * as padlocal from "./proto/padlocal_grpc_pb";
import { credentials, Metadata, CallCredentials } from "@grpc/grpc-js";
import { AUTHORIZATION_METADATA_KEY } from "./utils/Constant";
import { GrpcClient, Options } from "./GrpcClient";
import { Contact, SystemEventRequest, Message } from "./proto/padlocal_pb";
import { WeChatLongLinkProxy, HeartBeatEventPayload } from "./link/WeChatLongLinkProxy";
import { EventEmitter } from "events";
import { logDebug, logError, logInfo } from "./utils/log";
import { PadLocalClientApi } from "./PadLocalClientApi";
import { Message as GrpcMessage } from "google-protobuf";
import * as grpc from "@grpc/grpc-js";
import * as fs from "fs";
import { VERSION } from "./version";

export type PadLocalClientEvent = "kickout" | "contact" | "message";

export class PadLocalClient extends EventEmitter {
  private readonly _stub: padlocal.PadLocalClient;
  private readonly _callCredentials: CallCredentials;
  private readonly _longLinkProxy: WeChatLongLinkProxy;
  selfContact?: Contact;

  readonly api: PadLocalClientApi = new PadLocalClientApi(this);

  emit(event: "kickout", detail: KickOutEvent): boolean;
  emit(event: "contact", contactList: Contact[]): boolean;
  emit(event: "message", messageList: Message[]): boolean;

  emit(event: PadLocalClientEvent, ...args: any[]): boolean {
    return super.emit(event, ...args);
  }

  constructor(serverAddr: string, token: string, serverCAFilePath?: string, skipPrintVersion: boolean = false) {
    super();

    let creds: grpc.ChannelCredentials;
    if (serverCAFilePath) {
      creds = credentials.createSsl(fs.readFileSync(serverCAFilePath));
    } else {
      creds = credentials.createInsecure();
    }

    // Oops, @grpc/grpc-js does not support retry yet
    this._stub = new padlocal.PadLocalClient(serverAddr, creds, {
      "grpc.ssl_target_name_override": "client.pad-local.com",
      "grpc.default_compression_algorithm": 2,
      "grpc.default_compression_level": 2,
    });

    this._callCredentials = credentials.createFromMetadataGenerator((params, callback) => {
      const metaData = new Metadata();
      metaData.set(AUTHORIZATION_METADATA_KEY, `Bearer ${token}`);
      callback(null, metaData);
    });

    this._longLinkProxy = new WeChatLongLinkProxy(this);

    this._longLinkProxy.on("message-push", async () => {
      try {
        const syncEvent = await this.api.sync();

        logDebug(
          `on push notification, contact count:${syncEvent.getContactList().length}, message count:${
            syncEvent.getMessageList().length
          }`
        );

        if (syncEvent.getContactList().length > 0) {
          this.emit("contact", syncEvent.getContactList());
        }
        if (syncEvent.getMessageList().length > 0) {
          this.emit("message", syncEvent.getMessageList());
        }
      } catch (e) {
        logError(`error while syncing onpush: ${e.stack}`);
      }
    });

    if (!skipPrintVersion) {
      logInfo(`
      ============================================================
                    Welcome to padlocal-client-ts !
                           version: ${this.version}
      ============================================================
     `);
    }
  }

  get isOnline(): boolean {
    return !!this.selfContact;
  }

  get version(): string {
    return VERSION;
  }

  isSelf(userName: string): boolean {
    return this.selfContact?.getUsername() === userName;
  }

  createGrpcClient(options?: Partial<Options>): GrpcClient {
    const ret = new GrpcClient(this, this._stub, this._callCredentials, options);

    ret.onSystemEventCallback = (systemEventRequest: SystemEventRequest) => {
      if (systemEventRequest.getPayloadCase() === SystemEventRequest.PayloadCase.KICKOUTEVENT) {
        this._reset();

        this.emit("kickout", {
          errorCode: systemEventRequest.getKickoutevent()!.getErrorcode(),
          errorMessage: systemEventRequest.getKickoutevent()!.getErrormessage(),
        });

        this._longLinkProxy.shutdown(true);
      } else if (systemEventRequest.getPayloadCase() === SystemEventRequest.PayloadCase.LONGLINKUPDATEEVENT) {
        const longLinkUpdateEvent = systemEventRequest.getLonglinkupdateevent()!;
        if (longLinkUpdateEvent.getLonglinkhost()) {
          const longLinkHost = longLinkUpdateEvent.getLonglinkhost()!;
          this._longLinkProxy.updateHostPort(longLinkHost.getHost(), longLinkHost.getPort());
        }

        // reconnect only while longlink is not idle or ordered by server
        if (!this._longLinkProxy.isIdle() || longLinkUpdateEvent.getReconnectimmediately()) {
          logDebug("reset long link");
          this.getLongLinkProxy(true).then();
        }
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
    if (reset) {
      await this._longLinkProxy.reconnect();
      return this._longLinkProxy;
    } else {
      await this._longLinkProxy.makeSureConnected();
      return this._longLinkProxy;
    }
  }

  getLongLinkProxyDirect() {
    return this._longLinkProxy;
  }

  public getLongLinkId(): string | undefined {
    return this._longLinkProxy.getId();
  }

  public shutdown() {
    this._reset();
  }

  private _reset(): void {
    this.selfContact = undefined;
    this._longLinkProxy.shutdown(true);
  }
}

export interface KickOutEvent {
  readonly errorCode: number;
  readonly errorMessage: string;
}
