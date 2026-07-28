import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import type Stripe from "stripe";
import { prisma } from "@/lib/db";
import { getEnv, isStripeWebhookConfigured } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

async function applyCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  if (!userId) return;

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;
  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  await prisma.user.update({
    where: { id: userId },
    data: {
      membershipTier: "plus",
      membershipStatus: "active",
      ...(subscriptionId ? { stripeSubscriptionId: subscriptionId } : {}),
      ...(customerId ? { stripeCustomerId: customerId } : {}),
    },
  });
}

async function applySubscriptionChange(sub: Stripe.Subscription) {
  const user =
    (await prisma.user.findFirst({
      where: { stripeSubscriptionId: sub.id },
    })) ??
    (sub.metadata?.userId
      ? await prisma.user.findUnique({ where: { id: sub.metadata.userId } })
      : null);

  if (!user) return;

  const active = sub.status === "active" || sub.status === "trialing";
  const periodEnd =
    "current_period_end" in sub && typeof sub.current_period_end === "number"
      ? new Date(sub.current_period_end * 1000)
      : null;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      membershipTier: active ? "plus" : "free",
      membershipStatus: sub.status,
      stripeSubscriptionId: sub.id,
      membershipExpiresAt: periodEnd,
    },
  });
}

/**
 * Canonical Stripe webhook: /api/webhooks/stripe
 * Handles checkout.session.completed and subscription lifecycle events.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  const env = getEnv();

  if (!stripe || !isStripeWebhookConfigured() || !env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe webhook not configured" },
      { status: 503 }
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.error("stripe_webhook_signature_error", { error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await applyCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await applySubscriptionChange(
          event.data.object as Stripe.Subscription
        );
        break;
      default:
        break;
    }
  } catch (err) {
    logger.error("stripe_webhook_handler_error", { type: event.type, error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
