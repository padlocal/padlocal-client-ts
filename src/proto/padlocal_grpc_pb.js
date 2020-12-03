// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var padlocal_pb = require('./padlocal_pb.js');

function serialize_padlocal_ActionMessage(arg) {
  if (!(arg instanceof padlocal_pb.ActionMessage)) {
    throw new Error('Expected argument of type padlocal.ActionMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_padlocal_ActionMessage(buffer_arg) {
  return padlocal_pb.ActionMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_padlocal_InitRequest(arg) {
  if (!(arg instanceof padlocal_pb.InitRequest)) {
    throw new Error('Expected argument of type padlocal.InitRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_padlocal_InitRequest(buffer_arg) {
  return padlocal_pb.InitRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_padlocal_InitResponse(arg) {
  if (!(arg instanceof padlocal_pb.InitResponse)) {
    throw new Error('Expected argument of type padlocal.InitResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_padlocal_InitResponse(buffer_arg) {
  return padlocal_pb.InitResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PadLocalService = exports.PadLocalService = {
  action: {
    path: '/padlocal.PadLocal/action',
    requestStream: true,
    responseStream: true,
    requestType: padlocal_pb.ActionMessage,
    responseType: padlocal_pb.ActionMessage,
    requestSerialize: serialize_padlocal_ActionMessage,
    requestDeserialize: deserialize_padlocal_ActionMessage,
    responseSerialize: serialize_padlocal_ActionMessage,
    responseDeserialize: deserialize_padlocal_ActionMessage,
  },
  init: {
    path: '/padlocal.PadLocal/init',
    requestStream: false,
    responseStream: false,
    requestType: padlocal_pb.InitRequest,
    responseType: padlocal_pb.InitResponse,
    requestSerialize: serialize_padlocal_InitRequest,
    requestDeserialize: deserialize_padlocal_InitRequest,
    responseSerialize: serialize_padlocal_InitResponse,
    responseDeserialize: deserialize_padlocal_InitResponse,
  },
};

exports.PadLocalClient = grpc.makeGenericClientConstructor(PadLocalService);
