import type { IEncryption } from "@sorokchat-messenger/cryptography-abstractions";
import { bytesToHex, hexToBytes, padAesParameter } from "../utils/index.js";

export type AesOptions = {
  iv: string;
};

export class AesEncryption implements IEncryption<AesOptions> {
  private static readonly ALGORITHM: string = "AES-CBC";

  public async encrypt(
    plaintext: string,
    key: string,
    options: AesOptions,
  ): Promise<string> {
    const keyBytes = padAesParameter(key);
    const ivBytes = padAesParameter(options.iv);
    const encoder = new TextEncoder();
    const plainBytes = encoder.encode(plaintext);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: AesEncryption.ALGORITHM },
      false,
      ["encrypt"],
    );
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: AesEncryption.ALGORITHM, iv: ivBytes },
      cryptoKey,
      plainBytes,
    );
    return bytesToHex(encryptedBuffer);
  }

  public async decrypt(
    ciphertext: string,
    key: string,
    options: AesOptions,
  ): Promise<string> {
    const keyBytes = padAesParameter(key);
    const ivBytes = padAesParameter(options.iv);
    const cipherBytes = hexToBytes(ciphertext);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: AesEncryption.ALGORITHM },
      false,
      ["decrypt"],
    );
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: AesEncryption.ALGORITHM, iv: ivBytes },
      cryptoKey,
      cipherBytes,
    );
    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  }
}
