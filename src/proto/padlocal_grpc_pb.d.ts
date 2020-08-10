// package: padlocal
// file: src/proto/padlocal.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as src_proto_padlocal_pb from "../../src/proto/padlocal_pb";

interface IPadLocalService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    action: IPadLocalService_Iaction;
}

interface IPadLocalService_Iaction extends grpc.MethodDefinition<src_proto_padlocal_pb.ActionMessage, src_proto_padlocal_pb.ActionMessage> {
    path: string; // "/padlocal.PadLocal/action"
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<src_proto_padlocal_pb.ActionMessage>;
    requestDeserialize: grpc.deserialize<src_proto_padlocal_pb.ActionMessage>;
    responseSerialize: grpc.serialize<src_proto_padlocal_pb.ActionMessage>;
    responseDeserialize: grpc.deserialize<src_proto_padlocal_pb.ActionMessage>;
}

export const PadLocalService: IPadLocalService;

export interface IPadLocalServer {
    action: grpc.handleBidiStreamingCall<src_proto_padlocal_pb.ActionMessage, src_proto_padlocal_pb.ActionMessage>;
}

export interface IPadLocalClient {
    action(): grpc.ClientDuplexStream<src_proto_padlocal_pb.ActionMessage, src_proto_padlocal_pb.ActionMessage>;
    action(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_proto_padlocal_pb.ActionMessage, src_proto_padlocal_pb.ActionMessage>;
    action(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_proto_padlocal_pb.ActionMessage, src_proto_padlocal_pb.ActionMessage>;
}

export class PadLocalClient extends grpc.Client implements IPadLocalClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public action(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_proto_padlocal_pb.ActionMessage, src_proto_padlocal_pb.ActionMessage>;
    public action(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<src_proto_padlocal_pb.ActionMessage, src_proto_padlocal_pb.ActionMessage>;
}
