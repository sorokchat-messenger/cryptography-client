import type { IKeyGenerator } from "@sorokchat-messenger/cryptography-abstractions";
import { beforeAll, describe, expect, it } from "vitest";
import { BytesGenerator } from "./bytes.generator.js";

describe("Bytes generator tests", () => {
    let generator: IKeyGenerator;
    beforeAll(() => {
        generator = new BytesGenerator();
    });

    it("Bytes generator must be defined", () => {
        expect(generator).toBeDefined();
    });

    describe("generate", () => {
        it("should return a hex string of correct length", async () => {
            const bytesCount = 16;
            const result = await generator.generate(bytesCount);
            expect(result).toHaveLength(bytesCount * 2);
            expect(result).toMatch(/^[0-9a-f]+$/);
        });

        it("should generate uniqe values on subsequent calls", async () => {
            const bytesCount = 16;
            const first = await generator.generate(bytesCount);
            const second = await generator.generate(bytesCount);
            expect(first).not.toBe(second);
        });

        it("should throw an error if bytesCount is 0 or negative", async () => {
            await expect(generator.generate(0)).rejects.toThrow(
                "Кількість байтів має бути цілим додатнім числом"
            );
            await expect(generator.generate(-5)).rejects.toThrow(
                "Кількість байтів має бути цілим додатнім числом"
            );
        });
    });
});
