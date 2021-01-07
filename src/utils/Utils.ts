import { Message } from "google-protobuf";
import { v4 as uuid } from "uuid";

export function _stringifyPB(obj: any): string {
  if (obj instanceof Message) {
    return _stringifyPB(obj.toObject());
  } else {
    return JSON.stringify(obj, (key, value) => {
      if (value instanceof Message) {
        return _stringifyPB(value);
      }
      if (value instanceof Uint8Array) {
        return Buffer.from(value).toString("hex");
      }
      return value;
    });
  }
}

export function stringifyPB(obj: any, maxLen?: number): string {
  let ret = _stringifyPB(obj);
  if (maxLen !== undefined && ret.length > maxLen) {
    return `${ret.substr(0, maxLen)}[TRUNCATED:${ret.length - maxLen}]`;
  } else {
    return ret;
  }
}

export function genIdempotentId(): string {
  return uuid().replace(/-/g, "");
}

export function genUUID(): string {
  return uuid().replace(/-/g, "");
}
