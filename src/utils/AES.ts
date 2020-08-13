import { Bytes, ByteUtils } from "./ByteUtils";
import crypto from "crypto";

export namespace AES {
  export function ebcDecrypt(key: Bytes, encryptedData: Bytes): Bytes {
    let ret: Bytes;

    const cipher = crypto.createCipheriv("aes-128-ecb", key, null);
    cipher.setAutoPadding(true);
    ret = cipher.update(encryptedData);
    ret = ByteUtils.joinBytes(ret, cipher.final());

    return ret;
  }
}
