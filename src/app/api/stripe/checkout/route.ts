import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getEnv, isStripeConfigured } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Sign in to upgrade" }, { status: 401 });
  }

  if (!isStripeConfigured()) {
    // Dev / pre-Stripe: activate Plus locally so product flows can be tested.
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        membershipTier: "plus",
        membershipStatus: "active",
        membershipExpiresAt: expires,
      },
    });
    return NextResponse.json({
      mode: "local",
      message:
        "Stripe is not configured. Plus activated locally for 30 days. Set STRIPE_SECRET_KEY and STRIPE_PLUS_PRICE_ID for live billing.",
    });
  }

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
    success_url: `${env.NEXT_PUBLIC_APP_URL}/membership?upgraded=1`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/membership?canceled=1`,
    metadata: { userId: user.id },
  });

  return NextResponse.json({ mode: "stripe", url: checkout.url });
}
