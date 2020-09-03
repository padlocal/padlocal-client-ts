import { SocketClient } from "./SocketClient";
import { Bytes } from "../utils/ByteUtils";
import { GrpcClient, SubResponseWrap } from "../GrpcClient";
import { Host, WeChatResponse, WeChatSocketResponseAck } from "../proto/padlocal_pb";

export class WeChatSocketProxy {
  private readonly _grpcClient: GrpcClient;
  private readonly _socketClient: SocketClient;
  private _ack: number;

  constructor(grpcClient: GrpcClient, host: Host, ack: number) {
    this._ack = ack;
    this._grpcClient = grpcClient;
    this._socketClient = new SocketClient(host.getHost(), host.getPort(), grpcClient.traceId, {
      onConnect: () => {
        // do nothing
      },
      onReceive: async (data: Bytes): Promise<boolean> => {
        const wechatResponse = new WeChatResponse().setPayload(data);

        const response: SubResponseWrap<WeChatSocketResponseAck> = await this._grpcClient.subReplyAndRequest(
          this._ack,
          wechatResponse
        );

        const socketAck: WeChatSocketResponseAck = response.payload;
        if (!socketAck.getFinish()) {
          this._ack = response.ack!;
        }

        return socketAck.getFinish();
      },
    });
  }

  async send(data: Bytes): Promise<void> {
    await this._socketClient.send(data);
  }
}
