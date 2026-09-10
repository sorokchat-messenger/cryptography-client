import type { ISigning } from "@sorokchat-messenger/cryptography-abstractions";
import { bytesToHex, hexToBytes } from "../utils/index.js";

export class HmacSigning implements ISigning {
  private static readonly ALGORITHM: string = "HMAC";
  private static readonly HASH_NAME: string = "SHA-256";

  public async sign(plaintext: string, secret: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyBuffer = encoder.encode(secret);
    const plainBuffer = encoder.encode(plaintext);
    const key = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: HmacSigning.ALGORITHM, hash: { name: HmacSigning.HASH_NAME } },
      false,
      ["sign", "verify"],
    );
    const signatureBuffer = await crypto.subtle.sign(
      HmacSigning.ALGORITHM,
      key,
      plainBuffer,
    );
    return bytesToHex(signatureBuffer);
  }

  public async verify(
    plaintext: string,
    signing: string,
    secret: string,
  ): Promise<boolean> {
    const encoder = new TextEncoder();
    const keyBuffer = encoder.encode(secret);
    const plainBuffer = encoder.encode(plaintext);
    const signatureBuffer = hexToBytes(signing);
    const key = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: HmacSigning.ALGORITHM, hash: { name: HmacSigning.HASH_NAME } },
      false,
      ["sign", "verify"],
    );
    return await crypto.subtle.verify(
      HmacSigning.ALGORITHM,
      key,
      signatureBuffer,
      plainBuffer,
    );
  }
}
