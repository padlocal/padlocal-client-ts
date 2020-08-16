import { SocketClient } from "./SocketClient";
import { Bytes, joinBytes, newBytes } from "../utils/ByteUtils";

export class WeChatSocketProxy {
  private readonly _socketClient: SocketClient;
  private _responseData: Bytes = newBytes();

  constructor(host: string, port: number, responseDataLen: number, traceId: string) {
    this._socketClient = new SocketClient(host, port, traceId, {
      onConnect: () => {
        // reset data
        this._responseData = newBytes();
      },
      onReceive: (data: Bytes): boolean => {
        this._responseData = joinBytes(this._responseData, data);

        return this._responseData.length >= responseDataLen;
      },
    });
  }

  async send(data: Bytes): Promise<Bytes> {
    await this._socketClient.send(data);
    return this._responseData;
  }
}
