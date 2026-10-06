import { randomBytes } from "crypto";
import {
  newId,
  readStore,
  updateStore,
  type InvoiceRecord,
  type MembershipRecord,
} from "@/lib/db";

export type { MembershipRecord };

function membershipId() {
  return `PF-${randomBytes(4).toString("hex").toUpperCase()}`;
}

function nextBillDate(from = new Date()) {
  const d = new Date(from);
  d.setMonth(d.getMonth() + 1);
  return d.toISOString();
}

export async function createMembership(
  input: Omit<
    MembershipRecord,
    | "id"
    | "createdAt"
    | "status"
    | "userId"
    | "stripeCustomerId"
    | "stripeSubscriptionId"
    | "nextBillAt"
    | "dunningAttempts"
  > &
    Partial<
      Pick<
        MembershipRecord,
        | "userId"
        | "stripeCustomerId"
        | "stripeSubscriptionId"
        | "nextBillAt"
        | "dunningAttempts"
        | "status"
      >
    >
): Promise<MembershipRecord> {
  const record: MembershipRecord = {
    ...input,
    userId: input.userId ?? null,
    stripeCustomerId: input.stripeCustomerId ?? null,
    stripeSubscriptionId: input.stripeSubscriptionId ?? null,
    nextBillAt:
      input.nextBillAt ??
      (input.paymentStatus === "failed" ? null : nextBillDate()),
    dunningAttempts: input.dunningAttempts ?? 0,
    id: membershipId(),
    createdAt: new Date().toISOString(),
    status:
      input.status ??
      (input.paymentStatus === "failed" ? "pending_payment" : "active"),
    consents: {
      ...input.consents,
      agreementVersion: input.consents.agreementVersion ?? "2026-08-01",
    },
  };

  await updateStore((store) => {
    store.memberships.unshift(record);
    if (record.status === "active") {
      store.invoices.unshift({
        id: newId("inv"),
        membershipId: record.id,
        createdAt: record.createdAt,
        amountCents: Math.round(record.dueToday * 100) || 0,
        currency: "usd",
        description: `Enrollment + first dues · ${record.clubName}`,
        status: "paid",
        processorReference: record.payment.processorReference,
        paidAt: record.createdAt,
      });
    }
  });

  return record;
}

export async function getMembershipById(
  id: string
): Promise<MembershipRecord | null> {
  const store = await readStore();
  return store.memberships.find((item) => item.id === id) ?? null;
}

export async function getMembershipByEmail(
  email: string
): Promise<MembershipRecord | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;
  const store = await readStore();
  return (
    store.memberships.find(
      (item) => item.member.email.toLowerCase() === normalized
    ) ?? null
  );
}

export async function updateMembership(
  id: string,
  patch: Partial<MembershipRecord>
): Promise<MembershipRecord | null> {
  let updated: MembershipRecord | null = null;
  await updateStore((store) => {
    const index = store.memberships.findIndex((item) => item.id === id);
    if (index < 0) return;
    const current = store.memberships[index];
    updated = {
      ...current,
      ...patch,
      member: patch.member ? { ...current.member, ...patch.member } : current.member,
      consents: patch.consents
        ? { ...current.consents, ...patch.consents }
        : current.consents,
      payment: patch.payment
        ? { ...current.payment, ...patch.payment }
        : current.payment,
    };
    store.memberships[index] = updated;
  });
  return updated;
}

export async function updateMembershipPayment(
  id: string,
  payment: Partial<MembershipRecord["payment"]> & {
    paymentStatus?: MembershipRecord["paymentStatus"];
    status?: MembershipRecord["status"];
    stripeCustomerId?: string | null;
    stripeSubscriptionId?: string | null;
    nextBillAt?: string | null;
    dunningAttempts?: number;
  }
): Promise<MembershipRecord | null> {
  const {
    paymentStatus,
    status,
    stripeCustomerId,
    stripeSubscriptionId,
    nextBillAt,
    dunningAttempts,
    ...paymentFields
  } = payment;

  return updateMembership(id, {
    ...(paymentStatus ? { paymentStatus } : {}),
    ...(status ? { status } : {}),
    ...(stripeCustomerId !== undefined ? { stripeCustomerId } : {}),
    ...(stripeSubscriptionId !== undefined ? { stripeSubscriptionId } : {}),
    ...(nextBillAt !== undefined ? { nextBillAt } : {}),
    ...(dunningAttempts !== undefined ? { dunningAttempts } : {}),
    payment: paymentFields as MembershipRecord["payment"],
  });
}

export async function listInvoices(membershipId: string): Promise<InvoiceRecord[]> {
  const store = await readStore();
  return store.invoices.filter((item) => item.membershipId === membershipId);
}

export async function addInvoice(
  input: Omit<InvoiceRecord, "id" | "createdAt">
): Promise<InvoiceRecord> {
  const invoice: InvoiceRecord = {
    ...input,
    id: newId("inv"),
    createdAt: new Date().toISOString(),
  };
  await updateStore((store) => {
    store.invoices.unshift(invoice);
  });
  return invoice;
}

export async function updateInvoice(
  id: string,
  patch: Partial<InvoiceRecord>
): Promise<InvoiceRecord | null> {
  let updated: InvoiceRecord | null = null;
  await updateStore((store) => {
    const index = store.invoices.findIndex((item) => item.id === id);
    if (index < 0) return;
    updated = { ...store.invoices[index], ...patch };
    store.invoices[index] = updated;
  });
  return updated;
}

export function detectCardBrand(digits: string): string {
  if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  if (/^6/.test(digits)) return "Discover";
  return "Card";
}

/** Mark past-due and open a failed invoice (dunning step). */
export async function markMembershipPastDue(
  membershipId: string,
  reason = "Recurring dues failed"
) {
  const membership = await getMembershipById(membershipId);
  if (!membership) return null;

  const attempts = membership.dunningAttempts + 1;
  const invoice = await addInvoice({
    membershipId,
    amountCents: Math.round(membership.monthlyDues * 100),
    currency: "usd",
    description: reason,
    status: "failed",
    processorReference: null,
    paidAt: null,
  });

  const updated = await updateMembership(membershipId, {
    status: "past_due",
    paymentStatus: "past_due",
    dunningAttempts: attempts,
  });

  return { membership: updated, invoice, attempts };
}

export async function clearPastDue(
  membershipId: string,
  processorReference: string | null
) {
  const membership = await getMembershipById(membershipId);
  if (!membership) return null;

  await updateStore((store) => {
    for (const invoice of store.invoices) {
      if (
        invoice.membershipId === membershipId &&
        (invoice.status === "failed" || invoice.status === "open")
      ) {
        invoice.status = "paid";
        invoice.paidAt = new Date().toISOString();
        invoice.processorReference = processorReference;
      }
    }
  });

  return updateMembership(membershipId, {
    status: "active",
    paymentStatus:
      membership.payment.processor === "stripe"
        ? "stripe_authorized"
        : "test_authorized",
    dunningAttempts: 0,
    nextBillAt: nextBillDate(),
  });
}
