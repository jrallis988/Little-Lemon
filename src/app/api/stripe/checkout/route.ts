import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getEnv, isStripeConfigured } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { logger } from "@/lib/logger";

/** Create a Stripe Checkout session for Trump RX Plus. */
export async function POST() {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Sign in to upgrade" }, { status: 401 });
  }

  if (!isStripeConfigured()) {
    logger.warn("stripe_checkout_unconfigured", { userId: session.user.id });
    return NextResponse.json(
      {
        error:
          "Membership checkout is temporarily unavailable. Billing is not configured — please try again later.",
      },
      { status: 503 }
    );
  }

  try {
    const stripe = getStripe()!;
    const env = getEnv();
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: session.user.id },
    });

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { userId: user.id },
      });
      customerId = customer.id;
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: env.STRIPE_PLUS_PRICE_ID!, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${env.NEXT_PUBLIC_APP_URL}/membership?upgraded=1`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/membership?canceled=1`,
      metadata: { userId: user.id },
      subscription_data: {
        metadata: { userId: user.id },
      },
    });

    if (!checkout.url) {
      logger.error("stripe_checkout_missing_url", { userId: user.id });
      return NextResponse.json(
        { error: "Could not start checkout. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: checkout.url });
  } catch (err) {
    logger.error("stripe_checkout_failed", {
      userId: session.user.id,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Could not start membership checkout. Please try again." },
      { status: 502 }
    );
  }
}
