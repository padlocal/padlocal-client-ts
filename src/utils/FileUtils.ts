import { Bytes, bytesToHexString, fromBytes } from "./ByteUtils";
import { FileRequest } from "../proto/padlocal_pb";
import { FileResponse, FileResponseBody, FileUnpacker, UnpackError } from "./FileUnpacker";
import { SocketClient } from "../link/SocketClient";
import { log } from "brolog";
import { stringifyPB } from "./Utils";

const LOGPRE = "[FileUtils]";

export async function downloadFile(fileRequest: FileRequest, traceId: string): Promise<Bytes> {
  const host = fileRequest.getHost()!;
  const fileUnpacker = new FileUnpacker(fromBytes(fileRequest.getUnpackaeskey()));

  const socketStartDate = new Date();
  log.verbose(
    LOGPRE,
    `[tid:${traceId}] send file request, host:\"${fileRequest
      .getHost()!
      .getHost()}:${fileRequest.getHost()!.getPort()}\" payload: ${bytesToHexString(
      fromBytes(fileRequest.getPayload()),
      1024
    )}`
  );

  let response: FileResponse | null = null;

  const socketClient = new SocketClient(host.getHost(), host.getPort(), traceId, {
    onConnect: async () => {
      fileUnpacker.reset();
    },

    onReceive: async (data: Bytes): Promise<boolean> => {
      response = fileUnpacker.update(data);
      return response !== null;
    },
  });

  await socketClient.send(Buffer.from(fileRequest.getPayload()));

  const socketEndDate = new Date();
  const downloadCostTime = socketEndDate.getTime() - socketStartDate.getTime();

  if (!response) {
    throw new Error(
      `[tid:${traceId}] [${downloadCostTime}ms] download file failed:${stringifyPB(
        fileRequest
      )}, received null response`
    );
  }

  if (response!.body.retCode !== 0) {
    throw new Error(
      `[tid:${traceId}] [${downloadCostTime}ms] download file failed:${stringifyPB(fileRequest)}, retcode: ${
        response!.body.retCode
      }`
    );
  }

  log.verbose(
    LOGPRE,
    `[tid:${traceId}] [${downloadCostTime}ms] received response: ${response!.body.retCode}, encrypted file len: ${
      (response!.body.fileData && response!.body.fileData.length) || "null"
    }`
  );

  const ret = fileUnpacker.getDecryptedFileData(response);

  const decryptCostTime = new Date().getTime() - socketEndDate.getTime();

  log.verbose(LOGPRE, `[tid:${traceId}] [${decryptCostTime}ms] decrypted file data len: ${ret.length}`);

  return ret;
}
