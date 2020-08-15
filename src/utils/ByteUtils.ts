export type Bytes = Buffer;

export namespace ByteUtils {
  export function bytesToHexString(bytes: Bytes): string {
    return Buffer.from(bytes).toString("hex");
  }

  export function hexStringToBytes(hexString: string): Bytes {
    return Buffer.from(Buffer.from(hexString, "hex"));
  }

  export function newBytes(length?: number): Bytes {
    return Buffer.alloc(length || 0);
  }

  export function fromBytes(bytes: Uint8Array | string): Bytes {
    return Buffer.from(bytes);
  }

  export function joinBytes(...datas: Bytes[]): Bytes {
    const totalLen = datas.reduce((sum, data) => sum + data.length, 0);
    const ret = Buffer.alloc(totalLen);

    let offset = 0;
    for (const data of datas) {
      ret.set(data, offset);
      offset += data.length;
    }

    return ret;
  }

  export function subBytes(data: Bytes, start?: number, end?: number) {
    return data.slice(start, end);
  }

  export class BytesReader {
    private readonly _buffer: Bytes;
    private readonly _bigEndian: boolean;
    private _cursor: number;

    get cursor(): number {
      return this._cursor;
    }

    constructor(buffer: Bytes, bigEndian: boolean) {
      this._buffer = buffer;
      this._bigEndian = bigEndian;
      this._cursor = 0;
    }

    available(): number {
      return this._buffer.length - this._cursor;
    }

    readBoolean(): boolean {
      const ret: boolean = !!this._buffer.readUInt8(this._cursor);
      ++this._cursor;
      return ret;
    }

    readByte(): number {
      const ret = this._buffer.readInt8(this._cursor);
      ++this._cursor;
      return ret;
    }

    readUByte(): number {
      const ret = this._buffer.readUInt8(this._cursor);
      ++this._cursor;
      return ret;
    }

    readShort(): number {
      let ret;

      if (this._bigEndian) {
        ret = this._buffer.readInt16BE(this._cursor);
      } else {
        ret = this._buffer.readInt16LE(this._cursor);
      }

      this._cursor += 2;

      return ret;
    }

    readUShort(): number {
      let ret;

      if (this._bigEndian) {
        ret = this._buffer.readUInt16BE(this._cursor);
      } else {
        ret = this._buffer.readUInt16LE(this._cursor);
      }

      this._cursor += 2;

      return ret;
    }

    readInt(): number {
      let ret;

      if (this._bigEndian) {
        ret = this._buffer.readInt32BE(this._cursor);
      } else {
        ret = this._buffer.readInt32LE(this._cursor);
      }

      this._cursor += 4;

      return ret;
    }

    readUInt(): number {
      let ret;

      if (this._bigEndian) {
        ret = this._buffer.readUInt32BE(this._cursor);
      } else {
        ret = this._buffer.readUInt32LE(this._cursor);
      }

      this._cursor += 4;

      return ret;
    }

    readLong(): bigint {
      let ret;

      if (this._bigEndian) {
        ret = this._buffer.readBigInt64BE(this._cursor);
      } else {
        ret = this._buffer.readBigInt64LE(this._cursor);
      }

      this._cursor += 8;

      return ret;
    }

    readULong(): bigint {
      let ret;

      if (this._bigEndian) {
        ret = this._buffer.readBigUInt64BE(this._cursor);
      } else {
        ret = this._buffer.readBigUInt64LE(this._cursor);
      }

      this._cursor += 8;

      return ret;
    }

    readFloat(): number {
      let ret;

      if (this._bigEndian) {
        ret = this._buffer.readFloatBE(this._cursor);
      } else {
        ret = this._buffer.readFloatLE(this._cursor);
      }

      this._cursor += 4;

      return ret;
    }

    readDouble(): number {
      let ret;

      if (this._bigEndian) {
        ret = this._buffer.readDoubleBE(this._cursor);
      } else {
        ret = this._buffer.readDoubleLE(this._cursor);
      }

      this._cursor += 8;

      return ret;
    }

    readBytes(length: number): Bytes {
      const end = Math.min(this._buffer.length, this._cursor + length);
      const ret = ByteUtils.subBytes(this._buffer, this._cursor, end);
      this._cursor = end;
      return ret;
    }

    reset(): void {
      this._cursor = 0;
    }

    skip(length: number): void {
      this._cursor += Math.max(length, 0);
    }
  }
}
