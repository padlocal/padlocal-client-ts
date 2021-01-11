import { Bytes, joinBytes } from "./ByteUtils";
import crypto from "crypto";
import { buf } from "adler-32";

export function AesGenKey(size?: number): Bytes {
  return crypto.randomBytes(size || 16);
}

export function AesEcbEncrypt(key: Bytes, plainData: Bytes): Bytes {
  const cipher = crypto.createCipheriv("aes-128-ecb", key, "");
  cipher.setAutoPadding(true);
  return joinBytes(cipher.update(plainData), cipher.final());
}

export function AesEcbDecrypt(key: Bytes, encryptedData: Bytes): Bytes {
  const cipher = crypto.createDecipheriv("aes-128-ecb", key, "");
  cipher.setAutoPadding(true);

  return joinBytes(cipher.update(encryptedData), cipher.final());
}

export function md5(data: Bytes): string {
  return crypto.createHash("md5").update(data).digest("hex");
}

export function adler32(data: Bytes, seed?: number): number {
  return buf(data, seed) >>> 0;
}
