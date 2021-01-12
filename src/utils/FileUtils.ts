import { Bytes, bytesToHexString, fromBytes, MAX_LOG_BYTES_LEN } from "./ByteUtils";
import {
  FileDownloadRequest,
  FileUploadDataMeta,
  FileUploadEncryptedDataMeta,
  FileUploadFileParams,
  FileUploadImageMeta,
  FileUploadImageParams,
  FileUploadVideoMeta,
  FileUploadVideoParams,
} from "../proto/padlocal_pb";
import { FileResponse, FileUnpacker } from "./FileUnpacker";
import { SocketClient } from "../link/SocketClient";
import { log } from "brolog";
import { stringifyPB } from "./Utils";
import { AesEcbEncrypt, AesGenKey } from "./crypto";
import { adler32, md5 } from "./crypto";
import { createImageThumb, createVideoThumb, getImageSize, getVideoDurationSeconds } from "./MediaUtils";

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
      MAX_LOG_BYTES_LEN
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

async function generateUploadVideoMeta(
  videoData: Bytes
): Promise<{
  videoMeta: FileUploadVideoMeta;
  encryptedVideoData: Bytes;
}> {
  const videoEncryptedRet = encryptUploadData(videoData);

  const videoMeta = new FileUploadVideoMeta();
  videoMeta.setPlaindatameta(videoEncryptedRet.plainDataMeta);
  videoMeta.setEncrypteddatameta(videoEncryptedRet.encryptedDataMeta);

  const videoDuration = await getVideoDurationSeconds(videoData);
  videoMeta.setDuration(videoDuration);

  return {
    videoMeta,
    encryptedVideoData: videoEncryptedRet.encryptedData,
  };
}

function generateUploadFileMeta(
  fileData: Bytes
): {
  plainDataMeta: FileUploadDataMeta;
  encryptedDataMeta: FileUploadEncryptedDataMeta;
  encryptedData: Bytes;
} {
  const fileEncryptedRet = encryptUploadData(fileData);
  fileEncryptedRet.encryptedDataMeta;

  return {
    plainDataMeta: fileEncryptedRet.plainDataMeta,
    encryptedDataMeta: fileEncryptedRet.encryptedDataMeta,
    encryptedData: fileEncryptedRet.encryptedData,
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

export async function prepareVideoUpload(
  videoData: Bytes
): Promise<{
  params: FileUploadVideoParams;
  aesKey: Bytes;
  dataBag: { [key: string]: Bytes };
}> {
  const uploadVideoMeta = await generateUploadVideoMeta(videoData);
  const aesKey = Buffer.from(uploadVideoMeta.videoMeta.getEncrypteddatameta()?.getAeskey()!);

  const thumbImageData = await createVideoThumb(videoData, 360);
  const uploadThumbImageData = await generateUploadImageMeta(thumbImageData, aesKey);

  return {
    params: new FileUploadVideoParams()
      .setVideometa(uploadVideoMeta.videoMeta)
      .setThumbimagemeta(uploadThumbImageData.imageMeta),
    aesKey,
    dataBag: {
      [uploadVideoMeta.videoMeta.getEncrypteddatameta()?.getMd5()!]: uploadVideoMeta.encryptedVideoData,
      [uploadThumbImageData.imageMeta.getEncrypteddatameta()?.getMd5()!]: uploadThumbImageData.encryptedImageData,
    },
  };
}

export function prepareFileUpload(
  fileData: Bytes
): {
  params: FileUploadFileParams;
  aesKey: Bytes;
  dataBag: { [key: string]: Bytes };
} {
  const uploadFileMeta = generateUploadFileMeta(fileData);
  const aesKey = Buffer.from(uploadFileMeta.encryptedDataMeta.getAeskey()!);

  return {
    params: new FileUploadFileParams()
      .setPlaindatameta(uploadFileMeta.plainDataMeta)
      .setEncrypteddatameta(uploadFileMeta.encryptedDataMeta),
    aesKey,
    dataBag: {
      [uploadFileMeta.encryptedDataMeta.getMd5()!]: uploadFileMeta.encryptedData,
    },
  };
}
