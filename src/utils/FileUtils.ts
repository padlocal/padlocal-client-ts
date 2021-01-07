import { Bytes, bytesToHexString, fromBytes } from "./ByteUtils";
import { FileRequest } from "../proto/padlocal_pb";
import { FileUnpacker } from "./FileUnpacker";
import { SocketClient } from "../link/SocketClient";
import { log } from "brolog";

async function _sendFileRequest(fileRequest: FileRequest, traceId: string): Promise<FileUnpacker> {
  const host = fileRequest.getHost()!;

  const fileUnpacker = new FileUnpacker(fromBytes(fileRequest.getUnpackaeskey()));

  const startDate = new Date();
  log.verbose(
    `[tid:${traceId}] send file request, host:\"${fileRequest
      .getHost()!
      .getHost()}:${fileRequest.getHost()!.getPort()}\" payload: ${bytesToHexString(
      fromBytes(fileRequest.getPayload())
    )}`
  );

  const socketClient = new SocketClient(host.getHost(), host.getPort(), traceId, {
    onConnect: async () => {
      fileUnpacker.reset();
    },

    onReceive: async (data: Bytes): Promise<boolean> => {
      return fileUnpacker.update(data);
    },
  });

  await socketClient.send(Buffer.from(fileRequest.getPayload()));

  const responseEndDate = new Date();

  log.verbose(
    `[tid:${traceId}] [${
      responseEndDate.getTime() - startDate.getTime()
    }ms] received file response: ${fileUnpacker.toString()}`
  );

  return fileUnpacker;
}

export async function requestFileAndUnpack(fileRequest: FileRequest, traceId: string): Promise<Bytes> {
  const fileUnpacker = await _sendFileRequest(fileRequest, traceId);

  const startDate = new Date();

  const ret = fileUnpacker.getDecryptedFileData()!;

  const endDate = new Date();

  log.verbose(`[tid:${traceId}] decrypt out data len: ${ret.length}[${endDate.getTime() - startDate.getTime()}ms]`);

  return ret;
}

export async function requestFile(fileRequest: FileRequest, traceId: string): Promise<Bytes> {
  const fileUnpacker = await _sendFileRequest(fileRequest, traceId);
  return fileUnpacker.getRawResponseData()!;
}
