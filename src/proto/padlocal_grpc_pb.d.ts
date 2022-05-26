// package: padlocal
// file: padlocal.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as padlocal_pb from "./padlocal_pb";

interface IPadLocalService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    action: IPadLocalService_Iaction;
    init: IPadLocalService_Iinit;
}

interface IPadLocalService_Iaction extends grpc.MethodDefinition<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage> {
    path: "/padlocal.PadLocal/action";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<padlocal_pb.ActionMessage>;
    requestDeserialize: grpc.deserialize<padlocal_pb.ActionMessage>;
    responseSerialize: grpc.serialize<padlocal_pb.ActionMessage>;
    responseDeserialize: grpc.deserialize<padlocal_pb.ActionMessage>;
}
interface IPadLocalService_Iinit extends grpc.MethodDefinition<padlocal_pb.InitRequest, padlocal_pb.InitResponse> {
    path: "/padlocal.PadLocal/init";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<padlocal_pb.InitRequest>;
    requestDeserialize: grpc.deserialize<padlocal_pb.InitRequest>;
    responseSerialize: grpc.serialize<padlocal_pb.InitResponse>;
    responseDeserialize: grpc.deserialize<padlocal_pb.InitResponse>;
}

export const PadLocalService: IPadLocalService;

export interface IPadLocalServer extends grpc.UntypedServiceImplementation {
    action: grpc.handleBidiStreamingCall<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
    init: grpc.handleUnaryCall<padlocal_pb.InitRequest, padlocal_pb.InitResponse>;
}

export interface IPadLocalClient {
    action(): grpc.ClientDuplexStream<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
    action(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
    action(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
    init(request: padlocal_pb.InitRequest, callback: (error: grpc.ServiceError | null, response: padlocal_pb.InitResponse) => void): grpc.ClientUnaryCall;
    init(request: padlocal_pb.InitRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: padlocal_pb.InitResponse) => void): grpc.ClientUnaryCall;
    init(request: padlocal_pb.InitRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: padlocal_pb.InitResponse) => void): grpc.ClientUnaryCall;
}

export class PadLocalClient extends grpc.Client implements IPadLocalClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public action(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
    public action(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<padlocal_pb.ActionMessage, padlocal_pb.ActionMessage>;
    public init(request: padlocal_pb.InitRequest, callback: (error: grpc.ServiceError | null, response: padlocal_pb.InitResponse) => void): grpc.ClientUnaryCall;
    public init(request: padlocal_pb.InitRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: padlocal_pb.InitResponse) => void): grpc.ClientUnaryCall;
    public init(request: padlocal_pb.InitRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: padlocal_pb.InitResponse) => void): grpc.ClientUnaryCall;
}
