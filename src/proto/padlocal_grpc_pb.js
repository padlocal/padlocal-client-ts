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
};

exports.PadLocalClient = grpc.makeGenericClientConstructor(PadLocalService);
