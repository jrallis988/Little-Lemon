import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getEnv, isStripeConfigured } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

/** Stripe Customer Portal — manage/cancel Plus subscription. */
export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Stripe billing portal requires STRIPE_SECRET_KEY and STRIPE_PLUS_PRICE_ID.",
      },
      { status: 503 }
    );
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
  });

  if (!user.stripeCustomerId) {
    return NextResponse.json(
      { error: "No Stripe customer on this account. Upgrade to Plus first." },
      { status: 400 }
    );
  }

  const stripe = getStripe()!;
  const env = getEnv();
  const portal = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${env.NEXT_PUBLIC_APP_URL}/membership`,
  });

  return NextResponse.json({ url: portal.url });
}
