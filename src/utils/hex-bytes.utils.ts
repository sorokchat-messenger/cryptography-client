export function hexToBytes(hex: string): ArrayBuffer {
  const cleanHex = hex.trim();
  if (cleanHex.length % 2 !== 0) {
    throw new Error("HEX рядок повинен мати парну довжину");
  }

  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let index = 0; index < cleanHex.length; index += 2) {
    bytes[index / 2] = parseInt(cleanHex.substring(index, index + 2), 16);
  }
  return bytes.buffer;
}

export function padAesParameter(hex: string): ArrayBuffer {
  const paddedHex = hex.padEnd(32, "0").substring(0, 32);
  return hexToBytes(paddedHex);
}

export function bytesToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
