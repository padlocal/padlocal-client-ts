import { SocketClient } from "./SocketClient";
import { Bytes } from "../utils/ByteUtils";
import { GrpcClient, SubResponseWrap } from "../GrpcClient";
import { Host, WeChatResponse, WeChatSocketResponse, WeChatStreamAck } from "../proto/padlocal_pb";

export class WeChatSocketProxy {
  private readonly _grpcClient: GrpcClient;
  private readonly _socketClient: SocketClient;
  private _ack: number;

  constructor(grpcClient: GrpcClient, host: Host, ack: number) {
    this._ack = ack;
    this._grpcClient = grpcClient;
    this._socketClient = new SocketClient(host.getHost(), host.getPort(), grpcClient.traceId, {
      onConnect: async () => {
        await this._reply(new WeChatSocketResponse().setStreamreset(true));
      },
      onReceive: async (data: Bytes): Promise<boolean> => {
        return this._reply(new WeChatSocketResponse().setPayload(data));
      },
    });
  }

  async send(data: Bytes): Promise<void> {
    await this._socketClient.send(data);
  }

  private async _reply(socketResponse: WeChatSocketResponse) {
    const response: SubResponseWrap<WeChatStreamAck> = await this._grpcClient.subReplyAndRequest(
      this._ack,
      new WeChatResponse().setSocketresponse().setSocketresponse(socketResponse)
    );

    const socketAck: WeChatStreamAck = response.payload;
    if (!socketAck.getFinish()) {
      this._ack = response.ack!;
    }

    return socketAck.getFinish();
  }
}
