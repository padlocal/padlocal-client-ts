import { StreamHandler } from "./StreamHandler";
import { Request } from "../Request";
import { WeChatLongLinkStreamResponse, WeChatStreamRequest, WeChatStreamResponse } from "../proto/padlocal_pb";
import { WeChatLongLinkProxy } from "./WeChatLongLinkProxy";
import { Bytes } from "../utils/ByteUtils";

export class LongLinkStreamHandler extends StreamHandler {
  private readonly _longLinkProxy: WeChatLongLinkProxy;

  constructor(request: Request, longLinkProxy: WeChatLongLinkProxy) {
    super(request);
    this._longLinkProxy = longLinkProxy;
  }

  onRequest(wechatStreamRequest: WeChatStreamRequest): void {
    const longLinkId = wechatStreamRequest.getLonglinkrequest()!.getLonglinkid();
    if (longLinkId && longLinkId !== this._longLinkProxy.getId()) {
      throw new Error(
        `stream request must be sent by longlink with id:${longLinkId}, but current id is: ${this._longLinkProxy.getId()}`
      );
    }

    const longLinkRequest = wechatStreamRequest.getLonglinkrequest()!;
    const payload = Buffer.from(longLinkRequest.getPayload());

    this._longLinkProxy.sendStreamData(payload, {
      onStreamData: async (streamData: Bytes): Promise<boolean> => {
        const responseReply = await this.sendResponse(
          new WeChatStreamResponse().setLonglinkresponse(new WeChatLongLinkStreamResponse().setPayload(streamData))
        );

        if (responseReply.getEof()) {
          const longLinkResponseReply = responseReply.getLonglinkresponsereply()!;
          const dataToSend = Buffer.from(longLinkResponseReply.getPayload());
          this._longLinkProxy.sendStreamData(dataToSend);
        } else {
          // do nothing, continue wait for onStreamData, and send the payload to backend
        }

        return responseReply.getEof();
      },
    });
  }
}
