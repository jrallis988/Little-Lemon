import { randomBytes, scryptSync, timingSafeEqual, createHash } from 'crypto';

const SCRYPT_PREFIX = 'scrypt';
const KEYLEN = 64;

/** Hash a password with scrypt. Format: scrypt:<salt>:<key> */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const key = scryptSync(password, salt, KEYLEN).toString('hex');
  return `${SCRYPT_PREFIX}:${salt}:${key}`;
}

/**
 * Verify password against scrypt or legacy sha256 (salt:digest) hashes.
 * Legacy hashes are accepted so existing SQLite demo DBs keep working until re-seeded.
 */
export function verifyPassword(password: string, hash: string): boolean {
  const parts = hash.split(':');
  if (parts[0] === SCRYPT_PREFIX && parts.length === 3) {
    const [, salt, expected] = parts;
    const actual = scryptSync(password, salt, KEYLEN);
    const expectedBuf = Buffer.from(expected, 'hex');
    if (actual.length !== expectedBuf.length) return false;
    return timingSafeEqual(actual, expectedBuf);
  }
  // Legacy: salt:sha256(salt+password)
  if (parts.length === 2) {
    const [salt, digest] = parts;
    const computed = createHash('sha256').update(salt + password).digest('hex');
    const a = Buffer.from(computed);
    const b = Buffer.from(digest);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  }
  return false;
}
