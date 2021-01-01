import cryptoRandomString from "crypto-random-string";
import * as grpc from "@grpc/grpc-js";
import { CallCredentials, credentials, Metadata } from "@grpc/grpc-js";
import {
  AUTHORIZATION_METADATA_KEY,
  CLIENT_TYPE_METADATA_KEY,
  CLIENT_VERSION_METADATA_KEY,
  IDEMPOTENT_ID_KEY,
  TRACE_ID_METADATA_KEY,
} from "./utils/Constant";
import { IPadLocalClient } from "./proto/padlocal_grpc_pb";
import VError from "verror";
import * as padlocal from "./proto/padlocal_grpc_pb";
import { VERSION } from "./version";

export class GrpcClient {
  static readonly DEFAULT_REQUEST_TIMEOUT = 60 * 1000;
  static readonly MAX_REQ_RES_SIZE = 20 * 1024 * 1024;
  readonly stub: IPadLocalClient;

  private readonly _callCredentials: CallCredentials;

  constructor(serverAddr: string, token?: string, serverCA?: Buffer) {
    let creds: grpc.ChannelCredentials;
    if (serverCA) {
      creds = credentials.createSsl(serverCA);
    } else {
      creds = credentials.createInsecure();
    }

    // Oops, @grpc/grpc-js does not support retry yet
    this.stub = new padlocal.PadLocalClient(serverAddr, creds, {
      "grpc.ssl_target_name_override": "client.pad-local.com",
      "grpc.default_compression_algorithm": 2,
      "grpc.default_compression_level": 2,
      "grpc.max_send_message_length": GrpcClient.MAX_REQ_RES_SIZE,
      "grpc.max_receive_message_length": GrpcClient.MAX_REQ_RES_SIZE,
    });

    this._callCredentials = credentials.createFromMetadataGenerator((params, callback) => {
      const metaData = new Metadata();

      if (token) {
        metaData.set(AUTHORIZATION_METADATA_KEY, `Bearer ${token}`);
      }

      callback(null, metaData);
    });
  }

  public newRequestMeta(options?: Partial<GrpcOptions>): Metadata {
    const meta = new Metadata();

    meta.set(CLIENT_TYPE_METADATA_KEY, "ts");
    meta.set(CLIENT_VERSION_METADATA_KEY, VERSION);
    meta.set(TRACE_ID_METADATA_KEY, cryptoRandomString({ length: 8 }));

    if (options && options.idempotentId) {
      meta.set(IDEMPOTENT_ID_KEY, options.idempotentId);
    }

    return meta;
  }

  public newRequestOptions(options?: Partial<GrpcOptions>): Partial<grpc.CallOptions> {
    return {
      credentials: this._callCredentials,
      deadline: Date.now() + GrpcClient.getTimeout(options),
    };
  }

  static getTraceId(meta: Metadata): string {
    return meta.get(TRACE_ID_METADATA_KEY)[0] as string;
  }

  static getTimeout(options?: Partial<GrpcOptions>): number {
    return (options && options.requestTimeout) || GrpcClient.DEFAULT_REQUEST_TIMEOUT;
  }
}

export class IOError extends VError {}

export interface GrpcOptions {
  requestTimeout: number;
  idempotentId: string;
}
