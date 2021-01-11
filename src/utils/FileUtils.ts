import { Bytes, bytesToHexString, fromBytes } from "./ByteUtils";
import {
  FileDownloadRequest,
  FileUploadDataMeta,
  FileUploadEncryptedDataMeta,
  FileUploadImageMeta,
  FileUploadImageParams,
} from "../proto/padlocal_pb";
import { FileResponse, FileUnpacker } from "./FileUnpacker";
import { SocketClient } from "../link/SocketClient";
import { log } from "brolog";
import { stringifyPB } from "./Utils";
import { AesEcbEncrypt, AesGenKey } from "./crypto";
import { adler32, md5 } from "./crypto";
import { createImageThumb, getImageSize } from "./MediaUtils";

const LOGPRE = "[FileUtils]";

export async function downloadFile(fileDownloadRequest: FileDownloadRequest, traceId: string): Promise<Bytes> {
  const host = fileDownloadRequest.getHost()!;
  const fileUnpacker = new FileUnpacker(fromBytes(fileDownloadRequest.getUnpackaeskey()));

  const socketStartDate = new Date();
  log.verbose(
    LOGPRE,
    `[tid:${traceId}] send file request, host:\"${fileDownloadRequest
      .getHost()!
      .getHost()}:${fileDownloadRequest.getHost()!.getPort()}\" payload: ${bytesToHexString(
      fromBytes(fileDownloadRequest.getPayload()),
      4096
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

  await socketClient.send(Buffer.from(fileDownloadRequest.getPayload()));

  const socketEndDate = new Date();
  const downloadCostTime = socketEndDate.getTime() - socketStartDate.getTime();

  if (!response) {
    throw new Error(
      `[tid:${traceId}] [${downloadCostTime}ms] download file failed:${stringifyPB(
        fileDownloadRequest
      )}, received null response`
    );
  }

  const retCode = FileResponse.unpackInteger(response!.body["retcode"]);
  if (retCode !== 0) {
    throw new Error(
      `[tid:${traceId}] [${downloadCostTime}ms] download file failed:${stringifyPB(
        fileDownloadRequest
      )}, retcode: ${retCode}`
    );
  }

  const fileData = response!.body["filedata"];
  log.verbose(
    LOGPRE,
    `[tid:${traceId}] [${downloadCostTime}ms] received response: ${retCode}, encrypted file len: ${
      fileData ? fileData.length : "null"
    }`
  );

  const ret = fileUnpacker.getDecryptedFileData(response);

  const decryptCostTime = new Date().getTime() - socketEndDate.getTime();

  log.verbose(LOGPRE, `[tid:${traceId}] [${decryptCostTime}ms] decrypted file data len: ${ret.length}`);

  return ret;
}

function encryptUploadData(
  plainData: Bytes,
  aesKey?: Bytes
): {
  plainDataMeta: FileUploadDataMeta;
  encryptedDataMeta: FileUploadEncryptedDataMeta;
  encryptedData: Bytes;
} {
  aesKey = aesKey || AesGenKey();
  const encryptedData = AesEcbEncrypt(aesKey, plainData);
  return {
    plainDataMeta: new FileUploadDataMeta()
      .setSize(plainData.length)
      .setChecksum(adler32(plainData, 0))
      .setMd5(md5(plainData)),

    encryptedDataMeta: new FileUploadEncryptedDataMeta()
      .setAeskey(aesKey)
      .setSize(encryptedData.length)
      .setChecksum(adler32(encryptedData, 0))
      .setMd5(md5(encryptedData)),

    encryptedData,
  };
}

async function generateUploadImageMeta(
  imageData: Bytes,
  aesKey?: Bytes
): Promise<{
  imageMeta: FileUploadImageMeta;
  encryptedImageData: Bytes;
}> {
  const imageEncryptedRet = encryptUploadData(imageData, aesKey);
  const imageMeta = new FileUploadImageMeta();
  imageMeta.setPlaindatameta(imageEncryptedRet.plainDataMeta);
  imageMeta.setEncrypteddatameta(imageEncryptedRet.encryptedDataMeta);

  const imageSize = await getImageSize(imageData);
  imageMeta.setWidth(imageSize.width);
  imageMeta.setHeight(imageSize.height);

  return {
    imageMeta,
    encryptedImageData: imageEncryptedRet.encryptedData,
  };
}

export async function prepareImageUpload(
  imageData: Bytes
): Promise<{
  params: FileUploadImageParams;
  aesKey: Bytes;
  dataBag: { [key: string]: Bytes };
}> {
  const uploadImageMeta = await generateUploadImageMeta(imageData);
  const aesKey = Buffer.from(uploadImageMeta.imageMeta.getEncrypteddatameta()?.getAeskey()!);

  const thumbImageData = await createImageThumb(imageData, 120);
  const uploadThumbImageMeta = await generateUploadImageMeta(thumbImageData, aesKey);

  return {
    params: new FileUploadImageParams()
      .setImagemeta(uploadImageMeta.imageMeta)
      .setThumbimagemeta(uploadThumbImageMeta.imageMeta),
    aesKey,
    dataBag: {
      [uploadImageMeta.imageMeta.getEncrypteddatameta()?.getMd5()!]: uploadImageMeta.encryptedImageData,
      [uploadThumbImageMeta.imageMeta.getEncrypteddatameta()?.getMd5()!]: uploadThumbImageMeta.encryptedImageData,
    },
  };
}
