import { type IHashing } from "@sorokchat-messenger/cryptography-abstractions";

export class Sha256Hashing implements IHashing {
  public async hash(plaintext: string): Promise<string> {
    const rawBuffer = new TextEncoder().encode(plaintext);
    const hashBuffer = await crypto.subtle.digest("SHA-256", rawBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray
      .map((buffer) => buffer.toString(16).padStart(2, "0"))
      .join("");
  }
}
