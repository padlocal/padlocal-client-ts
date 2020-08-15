import { Bytes, ByteUtils } from "../utils/ByteUtils";
import { AES } from "../utils/AES";
import VError from "verror";

export class CdnUnPacker {
  private readonly _aesKey: Bytes;
  private _header?: CdnUnPacker.CDNResponseHeader;
  private _headerData?: Bytes;
  private _buffer: Bytes = ByteUtils.newBytes();

  constructor(aesKey: Bytes) {
    this._aesKey = aesKey;

    this.reset();
  }

  /**
   * @param data:
   * @return true, finish unpack all data
   */
  update(data: Bytes): boolean {
    this._buffer = ByteUtils.joinBytes(this._buffer, data);

    if (!this._header) {
      if (this._buffer.length > 25) {
        this._header = this._unpackHeader();
      }
    }

    if (this._header && this._buffer.length >= this._header.bodyLen) {
      // acceptable max len: header.bodyLen
      if (this._buffer.length > this._header.bodyLen) {
        this._buffer = ByteUtils.subBytes(this._buffer, 0, this._header.bodyLen);
      }

      return true;
    }

    return false;
  }

  getDecryptedFileData(): Bytes | null {
    if (!this._header || this._buffer!.length < this._header.bodyLen) {
      return null;
    }

    const body = this._unpackResponseBody(this._buffer);
    if (body.retCode !== 0) {
      throw new CdnUnPacker.UnpackError(`retcode is not zero: ${body.retCode}`);
    }

    const encryptedFileData = body.fileData;
    return AES.ebcDecrypt(this._aesKey, encryptedFileData!);
  }

  getRawResponseData(): Bytes | null {
    if (!this._header || this._buffer!.length < this._header.bodyLen) {
      return null;
    }

    return ByteUtils.joinBytes(this._headerData!, this._buffer);
  }

  reset(): void {
    this._header = undefined;
    this._headerData = undefined;
    this._buffer = ByteUtils.newBytes();
  }

  private _unpackHeader(): CdnUnPacker.CDNResponseHeader {
    const reader = new ByteUtils.BytesReader(this._buffer, true);

    const protocolByte = reader.readUByte();
    if (protocolByte != 0xab) {
      throw new CdnUnPacker.UnpackError("response is not cdn protocol");
    }

    const totalLen = reader.readUInt();
    reader.skip(16);

    const bodyLen = reader.readUInt();
    const headerLen = totalLen - bodyLen;
    if (headerLen > reader.cursor) {
      reader.skip(headerLen - reader.cursor);
    }

    this._headerData = ByteUtils.subBytes(this._buffer, 0, reader.cursor);
    this._buffer = ByteUtils.subBytes(this._buffer, reader.cursor, this._buffer.length);

    return new CdnUnPacker.CDNResponseHeader(headerLen, bodyLen);
  }

  private _unpackResponseBody(buff: Bytes): CdnUnPacker.CDNResponseBody {
    const m: Map<string, Buffer | undefined> = this._unpackRawResponse(buff);

    const ret = new CdnUnPacker.CDNResponseBody();
    ret.ver = this._unpackInteger(m.get("ver"));
    ret.seq = this._unpackInteger(m.get("seq"));
    ret.videoFormat = this._unpackInteger(m.get("videoformat"));
    ret.rspPicFormat = this._unpackInteger(m.get("rsppicformat"));
    ret.rangeStart = this._unpackInteger(m.get("rangestart"));
    ret.rangeEnd = this._unpackInteger(m.get("rangeend"));
    ret.totalSize = this._unpackInteger(m.get("totalsize"));
    ret.srcSize = this._unpackInteger(m.get("srcsize"));
    ret.retCode = this._unpackInteger(m.get("retcode"));
    ret.substituteFType = this._unpackInteger(m.get("substituteftype"));
    ret.retrySec = this._unpackInteger(m.get("retrysec"));
    ret.isRetry = this._unpackInteger(m.get("isretry"));
    ret.isOverload = this._unpackInteger(m.get("isoverload"));
    ret.isGetCdn = this._unpackInteger(m.get("isgetcdn"));
    ret.xClientIp = this._unpackString(m.get("x-ClientIp"));
    ret.fileData = m.get("filedata");

    return ret;
  }

  private _unpackRawResponse(buff: Bytes): Map<string, Bytes | undefined> {
    const ret: Map<string, Bytes | undefined> = new Map<string, Bytes | undefined>();

    const reader = new ByteUtils.BytesReader(buff, true);
    while (reader.available() > 4) {
      const fieldNameLen = reader.readUInt();
      const fieldName = reader.readBytes(fieldNameLen).toString();

      const fieldValueLen = reader.readUInt();
      let fieldValue: Bytes | undefined = undefined;
      if (fieldValueLen > 0) {
        fieldValue = reader.readBytes(fieldValueLen);
      }

      ret.set(fieldName, fieldValue);
    }

    return ret;
  }

  private _unpackInteger(data?: Bytes): number | undefined {
    if (data) {
      return parseInt(data.toString());
    } else {
      return undefined;
    }
  }

  private _unpackString(data?: Bytes): string | undefined {
    if (data) {
      return data.toString();
    } else {
      return undefined;
    }
  }
}

export namespace CdnUnPacker {
  export class UnpackError extends VError {
    constructor(message: string);
    constructor(message: string, cause?: Error) {
      super(message, cause);
    }
  }

  export class CDNResponseHeader {
    readonly headerLen: number;
    readonly bodyLen: number;

    constructor(headerLen: number, bodyLen: number) {
      this.headerLen = headerLen;
      this.bodyLen = bodyLen;
    }
  }

  export class CDNResponseBody {
    ver?: number;
    seq?: number;
    videoFormat?: number;
    rspPicFormat?: number;
    rangeStart?: number;
    rangeEnd?: number;
    totalSize?: number;
    srcSize?: number;
    retCode?: number;
    substituteFType?: number;
    retrySec?: number;
    isRetry?: number;
    isOverload?: number;
    isGetCdn?: number;
    xClientIp?: string;
    fileData?: Bytes;
  }
}
