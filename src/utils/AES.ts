import { Bytes, ByteUtils } from "./ByteUtils";
import crypto from "crypto";

export namespace AES {
  export function ebcDecrypt(key: Bytes, encryptedData: Bytes): Bytes {
    const cipher = crypto.createDecipheriv("aes-128-ecb", key, "");
    cipher.setAutoPadding(true);

    return ByteUtils.joinBytes(cipher.update(encryptedData), cipher.final());
  }
}
