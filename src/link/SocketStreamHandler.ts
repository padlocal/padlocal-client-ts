import { StreamHandler } from "./StreamHandler";
import { Host, WeChatSocketResponse, WeChatStreamRequest, WeChatStreamResponse } from "../proto/padlocal_pb";
import { GrpcClient } from "../GrpcClient";
import { SocketClient } from "./SocketClient";
import { Bytes, joinBytes } from "../utils/ByteUtils";
import { SerialExecutor } from "../utils/SerialExecutor";

export class SocketStreamHandler extends StreamHandler {
  private _socketClient?: SocketClient;
  private _host?: Host;
  private _sendDataBuffer?: Bytes;
  private _callbackExecutor: SerialExecutor;

  public constructor(grpcClient: GrpcClient) {
    super(grpcClient);
    this._callbackExecutor = new SerialExecutor();
  }

  onRequest(wechatStreamRequest: WeChatStreamRequest): void {
    const socketRequest = wechatStreamRequest.getSocketrequest()!;

    if (socketRequest.getHost()) {
      this._host = socketRequest.getHost();
    }

    if (this._sendDataBuffer) {
      this._sendDataBuffer = joinBytes(this._sendDataBuffer, Buffer.from(socketRequest.getPayload()));
    } else {
      this._sendDataBuffer = Buffer.from(socketRequest.getPayload());
    }

    if (wechatStreamRequest.getEof()) {
      this._socketClient = new SocketClient(this._host!.getHost(), this._host!.getPort(), this._grpcClient.traceId, {
        onConnect: async () => {
          await this._callbackExecutor.execute(async () => {
            await this.sendResponse(
              new WeChatStreamResponse().setSocketresponse(new WeChatSocketResponse().setSocketreset(true))
            );
          });
        },
        onReceive: async (data: Bytes): Promise<boolean> => {
          return new Promise((resolve) => {
            this._callbackExecutor.execute(async () => {
              const responseReply = await this.sendResponse(
                new WeChatStreamResponse().setSocketresponse(new WeChatSocketResponse().setPayload(data))
              );

              resolve(responseReply.getEof());
            });
          });
        },
      });

      this._socketClient.send(this._sendDataBuffer).then();
    }
  }
}
