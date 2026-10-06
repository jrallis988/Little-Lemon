import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import {
  newId,
  readStore,
  updateStore,
  type PasswordResetRecord,
  type UserRecord,
} from "@/lib/db";

const SCRYPT_KEYLEN = 64;

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string) {
  const next = scryptSync(password, salt, SCRYPT_KEYLEN);
  const prev = Buffer.from(hash, "hex");
  if (prev.length !== next.length) return false;
  return timingSafeEqual(prev, next);
}

export async function getUserByEmail(email: string): Promise<UserRecord | null> {
  const store = await readStore();
  const normalized = email.trim().toLowerCase();
  return store.users.find((user) => user.email === normalized) ?? null;
}

export async function getUserById(id: string): Promise<UserRecord | null> {
  const store = await readStore();
  return store.users.find((user) => user.id === id) ?? null;
}

export async function createUser(input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  membershipId?: string | null;
}): Promise<UserRecord> {
  const email = input.email.trim().toLowerCase();
  const existing = await getUserByEmail(email);
  if (existing) {
    throw new Error("An account already exists for that email.");
  }

  const { hash, salt } = hashPassword(input.password);
  const now = new Date().toISOString();
  const user: UserRecord = {
    id: newId("usr"),
    email,
    passwordHash: hash,
    passwordSalt: salt,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    phone: input.phone?.trim() ?? "",
    membershipId: input.membershipId ?? null,
    createdAt: now,
    updatedAt: now,
    prefs: {
      language: "en",
      pushEnabled: true,
      emailMarketing: false,
      crowdAlerts: true,
      billingAlerts: true,
    },
  };

  await updateStore((store) => {
    store.users.unshift(user);
  });
  return user;
}

export async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) return null;
  if (!verifyPassword(password, user.passwordHash, user.passwordSalt)) {
    return null;
  }
  return user;
}

export async function updateUser(
  id: string,
  patch: Partial<
    Pick<UserRecord, "firstName" | "lastName" | "phone" | "membershipId" | "prefs">
  >
): Promise<UserRecord | null> {
  let updated: UserRecord | null = null;
  await updateStore((store) => {
    const index = store.users.findIndex((user) => user.id === id);
    if (index < 0) return;
    updated = {
      ...store.users[index],
      ...patch,
      prefs: patch.prefs
        ? { ...store.users[index].prefs, ...patch.prefs }
        : store.users[index].prefs,
      updatedAt: new Date().toISOString(),
    };
    store.users[index] = updated;
  });
  return updated;
}

export async function setUserPassword(userId: string, password: string) {
  const { hash, salt } = hashPassword(password);
  await updateStore((store) => {
    const user = store.users.find((item) => item.id === userId);
    if (!user) return;
    user.passwordHash = hash;
    user.passwordSalt = salt;
    user.updatedAt = new Date().toISOString();
  });
}

export async function createPasswordReset(email: string): Promise<string | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const token = randomBytes(24).toString("hex");
  const record: PasswordResetRecord = {
    token: createHash("sha256").update(token).digest("hex"),
    userId: user.id,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
    usedAt: null,
  };
  await updateStore((store) => {
    store.passwordResets = store.passwordResets.filter(
      (item) => item.userId !== user.id || item.usedAt
    );
    store.passwordResets.unshift(record);
  });
  return token;
}

export async function consumePasswordReset(token: string, password: string) {
  const hashed = createHash("sha256").update(token).digest("hex");
  const store = await readStore();
  const record = store.passwordResets.find(
    (item) => item.token === hashed && !item.usedAt
  );
  if (!record) return { ok: false as const, message: "Invalid or expired reset link." };
  if (new Date(record.expiresAt).getTime() < Date.now()) {
    return { ok: false as const, message: "Reset link expired." };
  }
  await setUserPassword(record.userId, password);
  await updateStore((db) => {
    const item = db.passwordResets.find((row) => row.token === hashed);
    if (item) item.usedAt = new Date().toISOString();
  });
  return { ok: true as const, userId: record.userId };
}
