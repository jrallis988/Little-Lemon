import { createHash, randomBytes } from 'crypto';

export function hashPassword(password: string): string {
  const salt = randomBytes(8).toString('hex');
  return `${salt}:${createHash('sha256').update(salt + password).digest('hex')}`;
}

export function verifyPassword(password: string, hash: string): boolean {
  const [salt, digest] = hash.split(':');
  if (!salt || !digest) return false;
  return createHash('sha256').update(salt + password).digest('hex') === digest;
}
