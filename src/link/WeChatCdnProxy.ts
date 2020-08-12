import { CdnRequest } from "../proto/padlocal_pb";
import { Bytes } from "../utils/ByteUtils";
import { CdnUtils } from "../wechat/CdnUtils";

export class WeChatCdnProxy {
    readonly traceId: string;

    constructor(traceId: string) {
        this.traceId = traceId;
    }

    async send(cdnRequest: CdnRequest): Promise<Bytes> {
        return CdnUtils.requestCdn(cdnRequest, this.traceId);
    }
}
