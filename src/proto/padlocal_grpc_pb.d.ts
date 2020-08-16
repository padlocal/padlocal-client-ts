// package: padlocal
// file: padlocal.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as padlocal_pb from "./padlocal_pb";

interface IPadLocalService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    action: IPadLocalService_Iaction;
}

interface IPadLocalService_Iaction extends grpc.MethodDefinition<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage> {
    path: string; // "/padlocal.PadLocal/action"
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<padlocal_pb.ActionMessage>;
    requestDeserialize: grpc.deserialize<padlocal_pb.ActionMessage>;
    responseSerialize: grpc.serialize<padlocal_pb.ActionMessage>;
    responseDeserialize: grpc.deserialize<padlocal_pb.ActionMessage>;
}

export const PadLocalService: IPadLocalService;

export interface IPadLocalServer {
    action: grpc.handleBidiStreamingCall<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
}

export interface IPadLocalClient {
    action(): grpc.ClientDuplexStream<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
    action(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
    action(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
}

export class PadLocalClient extends grpc.Client implements IPadLocalClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public action(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
    public action(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
}
