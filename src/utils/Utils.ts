import { Message } from "google-protobuf";
import { v4 as uuid } from "uuid";

export function stringifyPB(obj: any): string {
  if (obj instanceof Message) {
    return stringifyPB(obj.toObject());
  } else {
    return JSON.stringify(obj, (key, value) => {
      if (value instanceof Message) {
        return stringifyPB(value);
      }
      if (value instanceof Uint8Array) {
        return Buffer.from(value).toString("hex");
      }
      return value;
    });
  }
}

export function genIdempotentId(): string {
  return uuid().replace("-", "");
}
