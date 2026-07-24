/**
 * Cryptographic parent gate — Web Crypto PBKDF2 PIN hashing.
 * Biometric hooks can be layered via Tauri plugins later.
 */

function bufferToHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function createSalt(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return bufferToHex(bytes.buffer);
}

export async function hashPin(
  pin: string,
  existingSalt?: string,
): Promise<{ hash: string; salt: string }> {
  const salt = existingSalt ?? createSalt();
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(pin),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derived = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations: 120_000,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );
  return { hash: bufferToHex(derived), salt };
}

export function isValidPinFormat(pin: string): boolean {
  return /^\d{4,8}$/.test(pin);
}
