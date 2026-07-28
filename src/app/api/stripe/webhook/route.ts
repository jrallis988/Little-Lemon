import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const stripe = getStripe();
  const env = getEnv();
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
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
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      metadata?: { userId?: string };
      subscription?: string;
      customer?: string;
    };
    if (session.metadata?.userId) {
      await prisma.user.update({
        where: { id: session.metadata.userId },
        data: {
          membershipTier: "plus",
          membershipStatus: "active",
          stripeSubscriptionId:
            typeof session.subscription === "string"
              ? session.subscription
              : undefined,
          stripeCustomerId:
            typeof session.customer === "string" ? session.customer : undefined,
        },
      });
    }
  }

  if (
    event.type === "customer.subscription.deleted" ||
    event.type === "customer.subscription.updated"
  ) {
    const sub = event.data.object as {
      id: string;
      status: string;
      current_period_end?: number;
    };
    const user = await prisma.user.findFirst({
      where: { stripeSubscriptionId: sub.id },
    });
    if (user) {
      const active = sub.status === "active" || sub.status === "trialing";
      await prisma.user.update({
        where: { id: user.id },
        data: {
          membershipTier: active ? "plus" : "free",
          membershipStatus: sub.status,
          membershipExpiresAt: sub.current_period_end
            ? new Date(sub.current_period_end * 1000)
            : null,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
