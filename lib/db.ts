import { promises as fs } from "fs";
import path from "path";
import type { MembershipTier } from "@/lib/pricing";

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  firstName: string;
  lastName: string;
  phone: string;
  membershipId: string | null;
  createdAt: string;
  updatedAt: string;
  prefs: {
    language: string;
    pushEnabled: boolean;
    emailMarketing: boolean;
    crowdAlerts: boolean;
    billingAlerts: boolean;
  };
};

export type MembershipRecord = {
  id: string;
  userId: string | null;
  createdAt: string;
  status: "active" | "pending_payment" | "past_due" | "frozen" | "cancelled";
  paymentStatus:
    | "test_authorized"
    | "stripe_authorized"
    | "failed"
    | "past_due"
    | "refunded";
  clubId: string;
  clubName: string;
  plan: MembershipTier;
  monthlyDues: number;
  enrollmentFee: number;
  annualFee: number;
  dueToday: number;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  nextBillAt: string | null;
  dunningAttempts: number;
  member: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  consents: {
    membershipAgreement: boolean;
    recurringBilling: boolean;
    ageAttestation: boolean;
    acceptedAt: string;
    agreementVersion: string;
  };
  payment: {
    nameOnCard: string;
    last4: string;
    brand: string;
    expiryMonth: string;
    expiryYear: string;
    billingZip: string;
    processor: "test" | "stripe";
    processorReference: string | null;
  };
};

export type InvoiceRecord = {
  id: string;
  membershipId: string;
  createdAt: string;
  amountCents: number;
  currency: string;
  description: string;
  status: "paid" | "open" | "failed" | "void";
  processorReference: string | null;
  paidAt: string | null;
};

export type GuestPassRecord = {
  id: string;
  membershipId: string;
  guestName: string;
  clubId: string;
  clubName: string;
  createdAt: string;
  expiresAt: string;
  code: string;
  status: "active" | "used" | "expired";
};

export type CheckInRecord = {
  id: string;
  membershipId: string;
  clubId: string;
  clubName: string;
  createdAt: string;
  result: "success" | "club_full" | "denied" | "offline_cached";
  tokenId: string | null;
};

export type AccessTokenRecord = {
  id: string;
  membershipId: string;
  clubId: string;
  code: string;
  createdAt: string;
  expiresAt: string;
  usedAt: string | null;
};

export type NotificationRecord = {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
  readAt: string | null;
  kind: "billing" | "crowd" | "perk" | "system" | "workout";
  href?: string;
};

export type PasswordResetRecord = {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  usedAt: string | null;
};

export type OccupancySnapshot = {
  clubId: string;
  level: number;
  label: string;
  updatedAt: string;
  history: Array<{ hour: number; level: number }>;
};

export type StoreShape = {
  users: UserRecord[];
  memberships: MembershipRecord[];
  invoices: InvoiceRecord[];
  guestPasses: GuestPassRecord[];
  checkIns: CheckInRecord[];
  accessTokens: AccessTokenRecord[];
  notifications: NotificationRecord[];
  passwordResets: PasswordResetRecord[];
  occupancy: OccupancySnapshot[];
};

export type StoreBackend = "kv" | "memory" | "file";

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(DATA_DIR, "store.json");
const LEGACY_MEMBERSHIPS = path.join(DATA_DIR, "memberships.json");
const KV_KEY = "pf:store:v1";

const EMPTY: StoreShape = {
  users: [],
  memberships: [],
  invoices: [],
  guestPasses: [],
  checkIns: [],
  accessTokens: [],
  notifications: [],
  passwordResets: [],
  occupancy: [],
};

let writeChain: Promise<void> = Promise.resolve();
let memoryStore: StoreShape | null = null;
let resolvedBackend: StoreBackend | null = null;
let kvBinding: { get: (k: string) => Promise<string | null>; put: (k: string, v: string) => Promise<void> } | null | undefined;

function cloneEmpty(): StoreShape {
  return {
    users: [],
    memberships: [],
    invoices: [],
    guestPasses: [],
    checkIns: [],
    accessTokens: [],
    notifications: [],
    passwordResets: [],
    occupancy: [],
  };
}

function normalizeStore(parsed: Partial<StoreShape> | null | undefined): StoreShape {
  return {
    users: parsed?.users ?? [],
    memberships: parsed?.memberships ?? [],
    invoices: parsed?.invoices ?? [],
    guestPasses: parsed?.guestPasses ?? [],
    checkIns: parsed?.checkIns ?? [],
    accessTokens: parsed?.accessTokens ?? [],
    notifications: parsed?.notifications ?? [],
    passwordResets: parsed?.passwordResets ?? [],
    occupancy: parsed?.occupancy ?? [],
  };
}

function isWorkerd() {
  const versions = process.versions as NodeJS.ProcessVersions & {
    workerd?: string;
  };
  return Boolean(versions.workerd);
}

async function resolveKv() {
  if (kvBinding !== undefined) return kvBinding;
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    const binding = (env as { PF_STORE?: typeof kvBinding }).PF_STORE ?? null;
    kvBinding = binding;
    return kvBinding;
  } catch {
    kvBinding = null;
    return null;
  }
}

/** Prefer KV on Workers, file on Node, memory as last resort / explicit flag. */
export async function getStoreBackend(): Promise<StoreBackend> {
  if (resolvedBackend) return resolvedBackend;
  if (process.env.USE_MEMORY_STORE === "true" && process.env.FORCE_FILE_STORE !== "true") {
    const kv = await resolveKv();
    if (kv) {
      resolvedBackend = "kv";
      return resolvedBackend;
    }
    resolvedBackend = "memory";
    return resolvedBackend;
  }
  const kv = await resolveKv();
  if (kv) {
    resolvedBackend = "kv";
    return resolvedBackend;
  }
  if (isWorkerd()) {
    resolvedBackend = "memory";
    return resolvedBackend;
  }
  resolvedBackend = "file";
  return resolvedBackend;
}

/** Sync hint for health checks — may be stale until first store access. */
export function isMemoryStore(): boolean {
  if (resolvedBackend) return resolvedBackend === "memory";
  if (process.env.USE_MEMORY_STORE === "true") return true;
  return isWorkerd();
}

export function getResolvedStoreBackend(): StoreBackend | null {
  return resolvedBackend;
}

async function ensureFileStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    let seed = { ...EMPTY };
    try {
      const legacyRaw = await fs.readFile(LEGACY_MEMBERSHIPS, "utf8");
      const legacy = JSON.parse(legacyRaw) as MembershipRecord[];
      if (Array.isArray(legacy) && legacy.length) {
        seed = {
          ...EMPTY,
          memberships: legacy.map((item) => ({
            ...item,
            userId: item.userId ?? null,
            stripeCustomerId: item.stripeCustomerId ?? null,
            stripeSubscriptionId: item.stripeSubscriptionId ?? null,
            nextBillAt: item.nextBillAt ?? null,
            dunningAttempts: item.dunningAttempts ?? 0,
            consents: {
              ...item.consents,
              agreementVersion: item.consents.agreementVersion ?? "2026-08-01",
            },
          })),
        };
      }
    } catch {
      /* no legacy */
    }
    await fs.writeFile(STORE_PATH, JSON.stringify(seed, null, 2), "utf8");
  }
}

export async function readStore(): Promise<StoreShape> {
  const backend = await getStoreBackend();
  if (backend === "memory") {
    if (!memoryStore) memoryStore = cloneEmpty();
    return memoryStore;
  }
  if (backend === "kv") {
    const kv = await resolveKv();
    if (!kv) {
      if (!memoryStore) memoryStore = cloneEmpty();
      return memoryStore;
    }
    const raw = await kv.get(KV_KEY);
    if (!raw) {
      const empty = cloneEmpty();
      await kv.put(KV_KEY, JSON.stringify(empty));
      return empty;
    }
    try {
      return normalizeStore(JSON.parse(raw) as Partial<StoreShape>);
    } catch {
      return cloneEmpty();
    }
  }

  await ensureFileStore();
  const raw = await fs.readFile(STORE_PATH, "utf8");
  try {
    return normalizeStore(JSON.parse(raw) as Partial<StoreShape>);
  } catch {
    return { ...EMPTY };
  }
}

export async function updateStore(
  mutator: (store: StoreShape) => void | Promise<void>
): Promise<StoreShape> {
  const run = writeChain.then(async () => {
    const backend = await getStoreBackend();
    const store = await readStore();
    await mutator(store);
    if (backend === "memory") {
      memoryStore = store;
      return store;
    }
    if (backend === "kv") {
      const kv = await resolveKv();
      if (kv) {
        await kv.put(KV_KEY, JSON.stringify(store));
      } else {
        memoryStore = store;
      }
      return store;
    }
    await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
    return store;
  });
  writeChain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

export function newId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}
