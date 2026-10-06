import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const SECRET = process.env.JWT_SECRET ?? 'rme-dev-secret-change-me';

type TokenPayload = {
  sub: string;
  email: string;
  exp: number;
};

function b64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function fromB64url(input: string) {
  const padded = input + '='.repeat((4 - (input.length % 4)) % 4);
  return Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

export function signAccessToken(user: { id: string; email: string }, ttlSeconds = 60 * 60 * 24 * 7) {
  const payload: TokenPayload = {
    sub: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const body = b64url(JSON.stringify(payload));
  const sig = createHmac('sha256', SECRET).update(body).digest();
  return `${body}.${b64url(sig)}`;
}

export function verifyAccessToken(token: string): TokenPayload | null {
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = createHmac('sha256', SECRET).update(body).digest();
  const actual = fromB64url(sig);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  try {
    const payload = JSON.parse(fromB64url(body).toString('utf8')) as TokenPayload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function createResetToken() {
  return randomBytes(24).toString('hex');
}
