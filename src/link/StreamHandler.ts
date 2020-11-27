import { WeChatStreamRequest, WeChatStreamResponse, WeChatStreamResponseReply } from "../proto/padlocal_pb";
import { GrpcClient, SubResponse } from "../GrpcClient";

export abstract class StreamHandler {
  protected readonly _grpcClient: GrpcClient;
  private _ack?: number;

  protected constructor(grpcClient: GrpcClient) {
    this._grpcClient = grpcClient;
  }

  public async handleRequest(wechatStreamRequest: WeChatStreamRequest, ack: number): Promise<void> {
    this._ack = ack;

    while (true) {
      this.onRequest(wechatStreamRequest);

      if (wechatStreamRequest.getEof()) {
        break;
      }

      const response: SubResponse<WeChatStreamRequest> = await this._grpcClient.subReplyAndRequest(
        this._ack!,
        new WeChatStreamResponse()
      );

      wechatStreamRequest = response.payload;
      this._ack = response.ack;
    }
  }

  /**
   * return true: eof
   * @param wechatStreamResponse
   */
  public async sendResponse(wechatStreamResponse: WeChatStreamResponse): Promise<WeChatStreamResponseReply> {
    const response: SubResponse<WeChatStreamResponseReply> = await this._grpcClient.subReplyAndRequest(
      this._ack!,
      wechatStreamResponse
    );

    const wechatResponseReply = response.payload;
    if (!wechatResponseReply.getEof()) {
      this._ack = response.ack!;
    }

    return wechatResponseReply;
  }

  abstract onRequest(wechatRequest: WeChatStreamRequest): void;
}
