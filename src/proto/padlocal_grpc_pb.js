// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var src_proto_padlocal_pb = require('../../src/proto/padlocal_pb.js');

function serialize_padlocal_ActionMessage(arg) {
  if (!(arg instanceof src_proto_padlocal_pb.ActionMessage)) {
    throw new Error('Expected argument of type padlocal.ActionMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_padlocal_ActionMessage(buffer_arg) {
  return src_proto_padlocal_pb.ActionMessage.deserializeBinary(new Uint8Array(buffer_arg));
}


var PadLocalService = exports.PadLocalService = {
  action: {
    path: '/padlocal.PadLocal/action',
    requestStream: true,
    responseStream: true,
    requestType: src_proto_padlocal_pb.ActionMessage,
    responseType: src_proto_padlocal_pb.ActionMessage,
    requestSerialize: serialize_padlocal_ActionMessage,
    requestDeserialize: deserialize_padlocal_ActionMessage,
    responseSerialize: serialize_padlocal_ActionMessage,
    responseDeserialize: deserialize_padlocal_ActionMessage,
  },
};

exports.PadLocalClient = grpc.makeGenericClientConstructor(PadLocalService);
