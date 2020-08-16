import { Bytes, BytesReader, joinBytes, newBytes, subBytes } from "../utils/ByteUtils";
import { ebcDecrypt } from "../utils/AES";
import VError from "verror";

export class CdnUnPacker {
  private readonly _aesKey: Bytes;
  private _header?: CDNResponseHeader;
  private _headerData?: Bytes;
  private _buffer: Bytes = newBytes();

  constructor(aesKey: Bytes) {
    this._aesKey = aesKey;

    this.reset();
  }

  /**
   * @param data:
   * @return true, finish unpack all data
   */
  update(data: Bytes): boolean {
    this._buffer = joinBytes(this._buffer, data);

    if (!this._header) {
      if (this._buffer.length > 25) {
        this._header = this._unpackHeader();
      }
    }

    if (this._header && this._buffer.length >= this._header.bodyLen) {
      // acceptable max len: header.bodyLen
      if (this._buffer.length > this._header.bodyLen) {
        this._buffer = subBytes(this._buffer, 0, this._header.bodyLen);
      }

      return true;
    }

    return false;
  }

  getDecryptedFileData(): Bytes | null {
    if (!this._header || this._buffer.length < this._header.bodyLen) {
      return null;
    }

    const body = CdnUnPacker._unpackResponseBody(this._buffer);
    if (body.retCode !== 0) {
      throw new UnpackError(`retcode is not zero: ${body.retCode}`);
    }

    const encryptedFileData = body.fileData;
    return ebcDecrypt(this._aesKey, encryptedFileData!);
  }

  getRawResponseData(): Bytes | null {
    if (!this._header || this._buffer.length < this._header.bodyLen) {
      return null;
    }

    return joinBytes(this._headerData!, this._buffer);
  }

  reset(): void {
    this._header = undefined;
    this._headerData = undefined;
    this._buffer = newBytes();
  }

  private _unpackHeader(): CDNResponseHeader {
    const reader = new BytesReader(this._buffer, true);

    const protocolByte = reader.readUByte();
    if (protocolByte !== 0xab) {
      throw new UnpackError("response is not cdn protocol");
    }

    const totalLen = reader.readUInt();
    reader.skip(16);

    const bodyLen = reader.readUInt();
    const headerLen = totalLen - bodyLen;
    if (headerLen > reader.cursor) {
      reader.skip(headerLen - reader.cursor);
    }

    this._headerData = subBytes(this._buffer, 0, reader.cursor);
    this._buffer = subBytes(this._buffer, reader.cursor, this._buffer.length);

    return new CDNResponseHeader(headerLen, bodyLen);
  }

  private static _unpackResponseBody(buff: Bytes): CDNResponseBody {
    const m: Map<string, Buffer | undefined> = CdnUnPacker._unpackRawResponse(buff);

    const ret = new CDNResponseBody();
    ret.ver = CdnUnPacker._unpackInteger(m.get("ver"));
    ret.seq = CdnUnPacker._unpackInteger(m.get("seq"));
    ret.videoFormat = CdnUnPacker._unpackInteger(m.get("videoformat"));
    ret.rspPicFormat = CdnUnPacker._unpackInteger(m.get("rsppicformat"));
    ret.rangeStart = CdnUnPacker._unpackInteger(m.get("rangestart"));
    ret.rangeEnd = CdnUnPacker._unpackInteger(m.get("rangeend"));
    ret.totalSize = CdnUnPacker._unpackInteger(m.get("totalsize"));
    ret.srcSize = CdnUnPacker._unpackInteger(m.get("srcsize"));
    ret.retCode = CdnUnPacker._unpackInteger(m.get("retcode"));
    ret.substituteFType = CdnUnPacker._unpackInteger(m.get("substituteftype"));
    ret.retrySec = CdnUnPacker._unpackInteger(m.get("retrysec"));
    ret.isRetry = CdnUnPacker._unpackInteger(m.get("isretry"));
    ret.isOverload = CdnUnPacker._unpackInteger(m.get("isoverload"));
    ret.isGetCdn = CdnUnPacker._unpackInteger(m.get("isgetcdn"));
    ret.xClientIp = CdnUnPacker._unpackString(m.get("x-ClientIp"));
    ret.fileData = m.get("filedata");

    return ret;
  }

  private static _unpackRawResponse(buff: Bytes): Map<string, Bytes | undefined> {
    const ret: Map<string, Bytes | undefined> = new Map<string, Bytes | undefined>();

    const reader = new BytesReader(buff, true);
    while (reader.available() > 4) {
      const fieldNameLen = reader.readUInt();
      const fieldName = reader.readBytes(fieldNameLen).toString();

      const fieldValueLen = reader.readUInt();
      let fieldValue: Bytes | undefined;
      if (fieldValueLen > 0) {
        fieldValue = reader.readBytes(fieldValueLen);
      }

      ret.set(fieldName, fieldValue);
    }

    return ret;
  }

  private static _unpackInteger(data?: Bytes): number | undefined {
    if (data) {
      return parseInt(data.toString(), 10);
    } else {
      return undefined;
    }
  }

  private static _unpackString(data?: Bytes): string | undefined {
    if (data) {
      return data.toString();
    } else {
      return undefined;
    }
  }
}

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
