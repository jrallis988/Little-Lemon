import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import type { MembershipTier } from "@/lib/pricing";

export type MembershipRecord = {
  id: string;
  createdAt: string;
  status: "active" | "pending_payment";
  paymentStatus: "test_authorized" | "stripe_authorized" | "failed";
  clubId: string;
  clubName: string;
  plan: MembershipTier;
  monthlyDues: number;
  enrollmentFee: number;
  annualFee: number;
  dueToday: number;
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

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(DATA_DIR, "memberships.json");

function membershipId() {
  return `PF-${randomBytes(4).toString("hex").toUpperCase()}`;
}

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, "[]", "utf8");
  }
}

async function readAll(): Promise<MembershipRecord[]> {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw) as MembershipRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(records: MembershipRecord[]) {
  await ensureStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(records, null, 2), "utf8");
}

export async function createMembership(
  input: Omit<MembershipRecord, "id" | "createdAt" | "status">
): Promise<MembershipRecord> {
  const record: MembershipRecord = {
    ...input,
    id: membershipId(),
    createdAt: new Date().toISOString(),
    status:
      input.paymentStatus === "failed" ? "pending_payment" : "active",
  };
  const all = await readAll();
  all.unshift(record);
  await writeAll(all);
  return record;
}

export async function getMembershipById(
  id: string
): Promise<MembershipRecord | null> {
  const all = await readAll();
  return all.find((item) => item.id === id) ?? null;
}

export async function getMembershipByEmail(
  email: string
): Promise<MembershipRecord | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;
  const all = await readAll();
  return (
    all.find((item) => item.member.email.toLowerCase() === normalized) ?? null
  );
}

export async function updateMembershipPayment(
  id: string,
  payment: Partial<MembershipRecord["payment"]> & {
    paymentStatus?: MembershipRecord["paymentStatus"];
    status?: MembershipRecord["status"];
  }
): Promise<MembershipRecord | null> {
  const all = await readAll();
  const index = all.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const current = all[index];
  const { paymentStatus, status, ...paymentFields } = payment;
  const next: MembershipRecord = {
    ...current,
    paymentStatus: paymentStatus ?? current.paymentStatus,
    status: status ?? current.status,
    payment: { ...current.payment, ...paymentFields },
  };
  all[index] = next;
  await writeAll(all);
  return next;
}

export function detectCardBrand(digits: string): string {
  if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  if (/^6/.test(digits)) return "Discover";
  return "Card";
}
