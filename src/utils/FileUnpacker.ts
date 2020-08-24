import { Bytes, BytesReader, joinBytes, newBytes, subBytes } from "./ByteUtils";
import { ebcDecrypt } from "./AES";
import VError from "verror";

export class FileUnpacker {
  private readonly _aesKey: Bytes;
  private _header?: FileResponseHeader;
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

    const body = FileUnpacker._unpackResponseBody(this._buffer);
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

  private _unpackHeader(): FileResponseHeader {
    const reader = new BytesReader(this._buffer, true);

    const protocolByte = reader.readUByte();
    if (protocolByte !== 0xab) {
      throw new UnpackError("response is not file protocol");
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

    return new FileResponseHeader(headerLen, bodyLen);
  }

  private static _unpackResponseBody(buff: Bytes): FileResponseBody {
    const m: Map<string, Buffer | undefined> = FileUnpacker._unpackRawResponse(buff);

    const ret = new FileResponseBody();
    ret.ver = FileUnpacker._unpackInteger(m.get("ver"));
    ret.seq = FileUnpacker._unpackInteger(m.get("seq"));
    ret.videoFormat = FileUnpacker._unpackInteger(m.get("videoformat"));
    ret.rspPicFormat = FileUnpacker._unpackInteger(m.get("rsppicformat"));
    ret.rangeStart = FileUnpacker._unpackInteger(m.get("rangestart"));
    ret.rangeEnd = FileUnpacker._unpackInteger(m.get("rangeend"));
    ret.totalSize = FileUnpacker._unpackInteger(m.get("totalsize"));
    ret.srcSize = FileUnpacker._unpackInteger(m.get("srcsize"));
    ret.retCode = FileUnpacker._unpackInteger(m.get("retcode"));
    ret.substituteFType = FileUnpacker._unpackInteger(m.get("substituteftype"));
    ret.retrySec = FileUnpacker._unpackInteger(m.get("retrysec"));
    ret.isRetry = FileUnpacker._unpackInteger(m.get("isretry"));
    ret.isOverload = FileUnpacker._unpackInteger(m.get("isoverload"));
    ret.isGetCdn = FileUnpacker._unpackInteger(m.get("isgetcdn"));
    ret.xClientIp = FileUnpacker._unpackString(m.get("x-ClientIp"));
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

export class FileResponseHeader {
  readonly headerLen: number;
  readonly bodyLen: number;

  constructor(headerLen: number, bodyLen: number) {
    this.headerLen = headerLen;
    this.bodyLen = bodyLen;
  }
}

export class FileResponseBody {
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
