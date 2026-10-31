import type { IKeyGenerator } from "@sorokchat-messenger/cryptography-abstractions";

export class BytesGenerator implements IKeyGenerator {
    public async generate(bytesCount: number): Promise<string> {
        if (bytesCount <= 0) throw new Error("Кількість байтів має бути цілим додатнім числом");
        const bytes = new Uint8Array(bytesCount);
        crypto.getRandomValues(bytes);
        return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
    }
}