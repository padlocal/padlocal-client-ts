import { Bytes, joinBytes } from "./ByteUtils";
import crypto from "crypto";

export function ebcDecrypt(key: Bytes, encryptedData: Bytes): Bytes {
  const cipher = crypto.createDecipheriv("aes-128-ecb", key, "");
  cipher.setAutoPadding(true);

  return joinBytes(cipher.update(encryptedData), cipher.final());
}
