import { Bytes, ByteUtils } from "../utils/ByteUtils";
import { CdnRequest } from "../proto/padlocal_pb";
import { CdnUnPacker } from "./CdnUnpacker";
import { log } from "../utils/log";
import { SocketClient } from "../link/SocketClient";

async function _sendCdnRequest(cdnRequest: CdnRequest, traceId: string): Promise<CdnUnPacker> {
  const host = cdnRequest.getHost()!;

  const cdnUnPacker = new CdnUnPacker(ByteUtils.fromBytes(cdnRequest.getUnpackaeskey()));

  const startDate = new Date();
  log.debug(
    `[tid:${traceId}] send cdn request, host:\"${cdnRequest
      .getHost()!
      .getHost()}:${cdnRequest.getHost()!.getPort()}\" payload: ${ByteUtils.bytesToHexString(
      ByteUtils.fromBytes(cdnRequest.getPayload())
    )}`
  );

  const socketClient = new SocketClient(host.getHost(), host.getPort(), traceId, {
    onConnect: () => {
      cdnUnPacker.reset();
    },

    onReceive: (data: Bytes): boolean => {
      return cdnUnPacker.update(data);
    },
  });

  await socketClient.send(Buffer.from(cdnRequest.getPayload()));

  const responseEndDate = new Date();

  log.debug(
    `[tid:${traceId}] [${
      responseEndDate.getTime() - startDate.getTime()
    }ms] received cdn response: ${cdnUnPacker.toString()}`
  );

  return cdnUnPacker;
}

export namespace CdnUtils {
  export async function requestCdnAndUnpack(cdnRequest: CdnRequest, traceId: string): Promise<Bytes> {
    const cdnUnPacker = await _sendCdnRequest(cdnRequest, traceId);

    const startDate = new Date();

    const ret = cdnUnPacker.getDecryptedFileData()!;

    const endDate = new Date();

    log.debug(`[tid:${traceId}] decrypt out data len: ${ret.length}[${endDate.getTime() - startDate.getTime()}ms]`);

    return ret;
  }

  export async function requestCdn(cdnRequest: CdnRequest, traceId: string): Promise<Bytes> {
    const cdnUnPacker = await _sendCdnRequest(cdnRequest, traceId);
    return cdnUnPacker.getRawResponseData()!;
  }
}
