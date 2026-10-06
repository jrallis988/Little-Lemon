import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import {
  clearPastDue,
  getMembershipById,
  markMembershipPastDue,
  updateMembershipPayment,
} from "@/lib/memberships";
import { pushNotification } from "@/lib/notifications";
import { readStore } from "@/lib/db";

export const dynamic = "force-dynamic";

function verifyStripeSignature(payload: string, header: string | null) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !header) return !secret; // allow unsigned in local/dev without secret

  const parts = Object.fromEntries(
    header.split(",").map((piece) => {
      const [k, v] = piece.split("=");
      return [k.trim(), v];
    })
  ) as { t?: string; v1?: string };

  if (!parts.t || !parts.v1) return false;
  const signed = `${parts.t}.${payload}`;
  const expected = createHmac("sha256", secret).update(signed).digest("hex");
  try {
    const a = Buffer.from(parts.v1);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

async function notifyMembership(
  membershipId: string,
  title: string,
  body: string,
  href = "/app/billing"
) {
  const store = await readStore();
  const membership = store.memberships.find((item) => item.id === membershipId);
  const userId =
    membership?.userId ||
    store.users.find((user) => user.membershipId === membershipId)?.id;
  if (!userId) return;
  await pushNotification({
    userId,
    kind: "billing",
    title,
    body,
    href,
  });
}

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!verifyStripeSignature(payload, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event: {
    type?: string;
    data?: { object?: Record<string, unknown> };
  };
  try {
    event = JSON.parse(payload) as typeof event;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const object = event.data?.object ?? {};
  const metadata = (object.metadata ?? {}) as Record<string, string>;
  const membershipId =
    metadata.membershipId ||
    (typeof object.client_reference_id === "string"
      ? object.client_reference_id
      : "");

  switch (event.type) {
    case "checkout.session.completed": {
      if (!membershipId) break;
      const paymentIntent =
        typeof object.payment_intent === "string"
          ? object.payment_intent
          : null;
      await updateMembershipPayment(membershipId, {
        paymentStatus: "stripe_authorized",
        status: "active",
        processor: "stripe",
        processorReference: paymentIntent,
        stripeCustomerId:
          typeof object.customer === "string" ? object.customer : null,
      });
      await notifyMembership(
        membershipId,
        "Payment confirmed",
        "Your membership is active. Open the app to check in."
      );
      break;
    }
    case "invoice.payment_failed":
    case "charge.failed": {
      if (!membershipId) break;
      await markMembershipPastDue(membershipId, "Stripe recurring payment failed");
      await notifyMembership(
        membershipId,
        "Payment failed",
        "Update your card and retry to restore full access.",
        "/app/billing/retry"
      );
      break;
    }
    case "invoice.paid":
    case "invoice.payment_succeeded": {
      if (!membershipId) break;
      const membership = await getMembershipById(membershipId);
      if (membership?.status === "past_due") {
        await clearPastDue(
          membershipId,
          typeof object.id === "string" ? object.id : null
        );
      }
      await notifyMembership(
        membershipId,
        "Dues paid",
        "Thanks — your membership is in good standing."
      );
      break;
    }
    case "customer.subscription.deleted": {
      if (!membershipId) break;
      await updateMembershipPayment(membershipId, {
        status: "cancelled",
        paymentStatus: "failed",
      });
      await notifyMembership(
        membershipId,
        "Membership cancelled",
        "Your subscription was cancelled in Stripe."
      );
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
