import { Bytes, BytesReader, joinBytes, newBytes, subBytes } from "./ByteUtils";
import { ebcDecrypt } from "./AES";
import VError from "verror";

export class FileUnpacker {
  private static readonly HEADER_MIN_LEN = 25;
  private readonly _aesKey: Bytes;

  private _buffer: Bytes = newBytes();

  constructor(aesKey: Bytes) {
    this._aesKey = aesKey;

    this.reset();
  }

  /**
   * @param data:
   * @return true, finish unpack all data
   */
  update(data: Bytes): FileResponse | null {
    this._buffer = joinBytes(this._buffer, data);
    if (this._buffer.length < FileUnpacker.HEADER_MIN_LEN) {
      return null;
    }

    const header = this._unpackHeader();
    const responseLen = header.headerLen + header.bodyLen;
    if (this._buffer.length < responseLen) {
      return null;
    }

    const bodyData = subBytes(this._buffer, header.headerLen, responseLen);
    const body = this._unpackResponseBody(bodyData);

    this._buffer = subBytes(this._buffer, responseLen, this._buffer.length);

    return new FileResponse(header, body);
  }

  getDecryptedFileData(fileResponse: FileResponse): Bytes {
    const encryptedFileData = fileResponse.body.fileData;
    return ebcDecrypt(this._aesKey, encryptedFileData!);
  }

  reset(): void {
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

    return new FileResponseHeader(headerLen, bodyLen);
  }

  private _unpackResponseBody(buff: Bytes): FileResponseBody {
    const unpackRawResponseBody = (buff: Bytes): Map<string, Bytes | undefined> => {
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
    };

    const m: Map<string, Buffer | undefined> = unpackRawResponseBody(buff);

    const ret = new FileResponseBody();

    ret.retCode = FileUnpacker._unpackInteger(m.get("retcode"));
    ret.fileData = m.get("filedata");

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
  retCode?: number;
  fileData?: Bytes;
}

export class FileResponse {
  readonly header: FileResponseHeader;
  readonly body: FileResponseBody;

  constructor(header: FileResponseHeader, body: FileResponseBody) {
    this.header = header;
    this.body = body;
  }
}
