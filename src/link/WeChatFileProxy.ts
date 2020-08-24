import { FileRequest } from "../proto/padlocal_pb";
import { Bytes } from "../utils/ByteUtils";
import { requestFile } from "../utils/FileUtils";

export class WeChatFileProxy {
  readonly traceId: string;

  constructor(traceId: string) {
    this.traceId = traceId;
  }

  async send(fileRequest: FileRequest): Promise<Bytes> {
    return requestFile(fileRequest, this.traceId);
  }
}
