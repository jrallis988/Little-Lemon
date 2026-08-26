import { randomBytes } from "crypto";

export function makeReferenceCode(prefix: string): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = randomBytes(3).toString("hex").toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}
