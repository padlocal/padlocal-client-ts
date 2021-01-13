import { StreamHandler } from "./StreamHandler";
import {
  FileUploadPayload,
  FileUploadPayloadFragment,
  WeChatFileUploadResponse,
  WeChatStreamRequest,
  WeChatStreamResponse,
} from "../proto/padlocal_pb";
import { SocketClient } from "./SocketClient";
import { Bytes, joinBytes } from "../utils/ByteUtils";
import { Request } from "../Request";
import { FileUnpacker } from "../utils/FileUnpacker";

export type FileUploadStreamHandlerParams = { aesKey: Bytes; dataBag: { [key: string]: Bytes } };

export class FileUploadStreamHandler extends StreamHandler {
  private _socketClient?: SocketClient;
  private readonly _params: FileUploadStreamHandlerParams;

  public constructor(request: Request, params: FileUploadStreamHandlerParams) {
    super(request);

    this._params = params;
  }

  onRequest(weChatStreamRequest: WeChatStreamRequest): void {
    const fileUploadRequest = weChatStreamRequest.getFileuploadrequest()!;
    const unpacker = new FileUnpacker(this._params.aesKey);

    this._socketClient = new SocketClient(
      fileUploadRequest.getHost()!.getHost(),
      fileUploadRequest.getHost()!.getPort(),
      this._request.traceId,
      {
        onConnect: async () => {
          unpacker.reset();
        },
        onReceive: async (data: Bytes): Promise<boolean> => {
          const response = unpacker.update(data);
          if (response) {
            const responseRequiredFieldList = fileUploadRequest.getRequireresponsefieldList();

            const notMatch = responseRequiredFieldList.some((f) => !response.body[f]);
            if (notMatch) {
              return false;
            }

            const fileUploadResponse = new WeChatFileUploadResponse();
            const responseMap = fileUploadResponse.getResponseMap();

            for (const key of Object.keys(response.body)) {
              const value = response.body[key];
              value && fileUploadResponse.getResponseMap().set(key, value);
            }

            const responseReply = await this.sendResponse(
              new WeChatStreamResponse().setFileuploadresponse(fileUploadResponse)
            );
            return responseReply.getEof();
          } else {
            return false;
          }
        },
      }
    );

    const data = this._assembleUploadPayload(fileUploadRequest.getPayload()!);
    this._socketClient.send(data).then();
  }

  private _assembleUploadPayload(fileUploadPayload: FileUploadPayload): Bytes {
    let ret: Bytes | null = null;

    for (const fragment of fileUploadPayload.getFragmentList()) {
      let fragmentData: Bytes | null = null;

      if (fragment.getPayloadCase() == FileUploadPayloadFragment.PayloadCase.BINARY) {
        fragmentData = Buffer.from(fragment.getBinary());
      } else if (fragment.getPayloadCase() == FileUploadPayloadFragment.PayloadCase.PLACEHOLDERBINARYMD5) {
        fragmentData = this._params.dataBag[fragment.getPlaceholderbinarymd5()];
      }

      if (!fragmentData) {
        throw new Error(`can not resolve fragment data: ${JSON.stringify(fragment.toObject())}`);
      }

      ret = ret ? joinBytes(ret, fragmentData!) : fragmentData;
    }

    return ret!;
  }
}
