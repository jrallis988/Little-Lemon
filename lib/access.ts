import { createHmac, randomBytes } from "crypto";
import {
  newId,
  readStore,
  updateStore,
  type AccessTokenRecord,
  type CheckInRecord,
} from "@/lib/db";

function doorSecret() {
  return (
    process.env.ACCESS_CONTROL_SECRET ||
    process.env.AUTH_SECRET ||
    "pf-door-dev-secret"
  );
}

function signCode(payload: string) {
  return createHmac("sha256", doorSecret()).update(payload).digest("base64url");
}

/** Issue a short-lived door token for digital keytag / check-in. */
export async function issueAccessToken(input: {
  membershipId: string;
  clubId: string;
  ttlSeconds?: number;
}): Promise<AccessTokenRecord> {
  const ttl = input.ttlSeconds ?? 90;
  const nonce = randomBytes(6).toString("hex");
  const exp = Date.now() + ttl * 1000;
  const body = `${input.membershipId}.${input.clubId}.${exp}.${nonce}`;
  const code = `${body}.${signCode(body)}`;

  const token: AccessTokenRecord = {
    id: newId("tok"),
    membershipId: input.membershipId,
    clubId: input.clubId,
    code,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(exp).toISOString(),
    usedAt: null,
  };

  await updateStore((store) => {
    store.accessTokens = store.accessTokens
      .filter(
        (item) =>
          item.membershipId !== input.membershipId ||
          new Date(item.expiresAt).getTime() > Date.now()
      )
      .slice(0, 40);
    store.accessTokens.unshift(token);
  });

  return token;
}

export type ValidateResult =
  | { ok: true; token: AccessTokenRecord; result: "success" }
  | { ok: false; result: "denied" | "club_full" | "expired"; message: string };

/**
 * Club-reader style validation.
 * Demo capacity rule: ~12% of validations return club_full.
 */
export async function validateAccessToken(
  code: string,
  clubId?: string
): Promise<ValidateResult> {
  const store = await readStore();
  const token = store.accessTokens.find((item) => item.code === code);
  if (!token) {
    return { ok: false, result: "denied", message: "Unknown access token." };
  }
  if (token.usedAt) {
    return { ok: false, result: "denied", message: "Token already used." };
  }
  if (new Date(token.expiresAt).getTime() < Date.now()) {
    return { ok: false, result: "expired", message: "Token expired." };
  }
  if (clubId && token.clubId !== clubId) {
    return {
      ok: false,
      result: "denied",
      message: "Token is for a different club.",
    };
  }

  const parts = code.split(".");
  const sig = parts.pop();
  const body = parts.join(".");
  if (!sig || signCode(body) !== sig) {
    return { ok: false, result: "denied", message: "Invalid token signature." };
  }

  if (Math.random() < 0.12) {
    return {
      ok: false,
      result: "club_full",
      message: "Club is at capacity. Try again shortly.",
    };
  }

  await updateStore((db) => {
    const row = db.accessTokens.find((item) => item.id === token.id);
    if (row) row.usedAt = new Date().toISOString();
  });

  return { ok: true, token, result: "success" };
}

export async function recordCheckIn(input: {
  membershipId: string;
  clubId: string;
  clubName: string;
  result: CheckInRecord["result"];
  tokenId: string | null;
}) {
  const row: CheckInRecord = {
    id: newId("chk"),
    ...input,
    createdAt: new Date().toISOString(),
  };
  await updateStore((store) => {
    store.checkIns.unshift(row);
    store.checkIns = store.checkIns.slice(0, 200);
  });
  return row;
}

export async function listCheckIns(membershipId: string) {
  const store = await readStore();
  return store.checkIns.filter((item) => item.membershipId === membershipId);
}

/** Compact payload for offline keytag cache on device. */
export function offlineKeytagPayload(input: {
  membershipId: string;
  memberName: string;
  plan: string;
  clubName: string;
  code: string;
  expiresAt: string;
}) {
  return {
    v: 1,
    ...input,
    cachedAt: new Date().toISOString(),
  };
}
