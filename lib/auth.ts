import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth-shared";
import type { MembershipTier } from "@/lib/pricing";

export { DEMO_MEMBER_PASSWORD, SESSION_COOKIE, verifyDemoPassword } from "@/lib/auth-shared";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14; // 14 days

export type SessionUser = {
  userId: string | null;
  email: string;
  firstName: string;
  lastName: string;
  membershipId: string | null;
  clubId: string | null;
  clubName: string | null;
  plan: MembershipTier | null;
};

export type SessionPayload = SessionUser & {
  exp: number;
};

function authSecret() {
  return (
    process.env.AUTH_SECRET ||
    process.env.STRIPE_SECRET_KEY ||
    "pf-dev-auth-secret-change-me"
  );
}

function encode(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", authSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function decode(token: string): SessionPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", authSecret())
    .update(body)
    .digest("base64url");
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8")
    ) as SessionPayload;
    if (!payload.email || !payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function createSessionToken(user: SessionUser): string {
  return encode({
    ...user,
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  });
}

export function readSessionToken(token: string | undefined | null): SessionUser | null {
  if (!token) return null;
  const payload = decode(token);
  if (!payload) return null;
  return {
    userId: payload.userId ?? null,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    membershipId: payload.membershipId,
    clubId: payload.clubId,
    clubName: payload.clubName,
    plan: payload.plan,
  };
}

export function sessionCookieOptions(maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  return readSessionToken(jar.get(SESSION_COOKIE)?.value);
}
