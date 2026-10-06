import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  clearPastDue,
  getMembershipById,
  listInvoices,
  updateMembershipPayment,
} from "@/lib/memberships";
import { authorizePayment } from "@/lib/payments";
import { pushNotification } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session?.membershipId) {
    return NextResponse.json({
      membership: null,
      invoices: [],
    });
  }
  const membership = await getMembershipById(session.membershipId);
  const invoices = await listInvoices(session.membershipId);
  return NextResponse.json({ membership, invoices });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.membershipId) {
    return NextResponse.json({ error: "No membership on session." }, { status: 400 });
  }

  let body: {
    action?: "retry" | "update_payment_method" | "simulate_failure";
    payment?: {
      nameOnCard?: string;
      cardNumber?: string;
      expiry?: string;
      cvc?: string;
      zip?: string;
    };
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const membership = await getMembershipById(session.membershipId);
  if (!membership) {
    return NextResponse.json({ error: "Membership not found." }, { status: 404 });
  }

  if (body.action === "simulate_failure") {
    const { markMembershipPastDue } = await import("@/lib/memberships");
    await markMembershipPastDue(membership.id);
    if (session.userId) {
      await pushNotification({
        userId: session.userId,
        kind: "billing",
        title: "Payment failed",
        body: "Your latest dues attempt failed. Retry in Billing.",
        href: "/app/billing/retry",
      });
    }
    return NextResponse.json({ ok: true, status: "past_due" });
  }

  const payment = body.payment;
  const digits = (payment?.cardNumber ?? "").replace(/\D/g, "");
  const [expiryMonth = "", expiryYear = ""] = (payment?.expiry ?? "")
    .split("/")
    .map((part) => part.trim());

  if (
    !payment?.nameOnCard?.trim() ||
    digits.length < 13 ||
    expiryMonth.length < 1 ||
    (payment.cvc ?? "").length < 3 ||
    (payment.zip ?? "").trim().length < 5
  ) {
    return NextResponse.json(
      { error: "Check card details and billing ZIP." },
      { status: 400 }
    );
  }

  const auth = await authorizePayment({
    amountCents: Math.round(membership.monthlyDues * 100) || 50,
    customerEmail: membership.member.email,
    customerName: payment.nameOnCard.trim(),
    description: `PF dues retry · ${membership.id}`,
    cardNumber: digits,
    expiryMonth,
    expiryYear: expiryYear.length === 2 ? `20${expiryYear}` : expiryYear,
    cvc: payment.cvc!.trim(),
    billingZip: payment.zip!.trim(),
  });

  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.message ?? "Payment failed." },
      { status: 402 }
    );
  }

  await updateMembershipPayment(membership.id, {
    nameOnCard: payment.nameOnCard.trim(),
    last4: auth.last4,
    brand: auth.brand,
    expiryMonth,
    expiryYear,
    billingZip: payment.zip!.trim(),
    processor: auth.processor,
    processorReference: auth.reference,
    paymentStatus: auth.paymentStatus,
  });

  if (body.action === "retry" || membership.status === "past_due") {
    await clearPastDue(membership.id, auth.reference);
  }

  if (session.userId) {
    await pushNotification({
      userId: session.userId,
      kind: "billing",
      title: "Payment method updated",
      body: `${auth.brand} •••• ${auth.last4} is on file.`,
      href: "/app/billing",
    });
  }

  const invoices = await listInvoices(membership.id);
  const next = await getMembershipById(membership.id);
  return NextResponse.json({ membership: next, invoices, payment: auth });
}
