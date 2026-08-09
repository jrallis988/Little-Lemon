import { NextResponse } from "next/server";
import { getClubById } from "@/lib/clubs";
import { createMembership } from "@/lib/memberships";
import {
  createCheckoutSession,
  createElementsPaymentIntent,
  paymentsConfigured,
  preferredStripeMode,
  stripePublishableKey,
} from "@/lib/payments";
import { dueToday, getLocalPricing, type MembershipTier } from "@/lib/pricing";

export const dynamic = "force-dynamic";

type CheckoutBody = {
  mode?: "checkout" | "elements";
  clubId?: string;
  plan?: MembershipTier;
  member?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  consents?: {
    membershipAgreement?: boolean;
    recurringBilling?: boolean;
    ageAttestation?: boolean;
  };
};

function siteOrigin(request: Request) {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  return new URL(request.url).origin;
}

export async function GET() {
  return NextResponse.json({
    configured: paymentsConfigured(),
    preferredMode: preferredStripeMode(),
    publishableKey: stripePublishableKey() ? true : false,
  });
}

export async function POST(request: Request) {
  if (!paymentsConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured. Use test card join instead." },
      { status: 400 }
    );
  }

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const clubId = body.clubId?.trim();
  const plan = body.plan;
  const member = body.member;
  const consents = body.consents;
  const mode = body.mode ?? preferredStripeMode();

  if (!clubId || (plan !== "classic" && plan !== "black-card")) {
    return NextResponse.json(
      { error: "Club and plan are required." },
      { status: 400 }
    );
  }

  const club = getClubById(clubId);
  if (!club) {
    return NextResponse.json({ error: "Club not found." }, { status: 404 });
  }

  const pricing = getLocalPricing(club, plan);
  if (!pricing.available) {
    return NextResponse.json(
      { error: "That plan is not offered at this club." },
      { status: 400 }
    );
  }

  if (
    !member?.firstName?.trim() ||
    !member?.lastName?.trim() ||
    !member?.email?.trim() ||
    !member?.phone?.trim() ||
    !member.email.includes("@")
  ) {
    return NextResponse.json(
      { error: "Complete member identity fields." },
      { status: 400 }
    );
  }

  if (
    !consents?.membershipAgreement ||
    !consents?.recurringBilling ||
    !consents?.ageAttestation
  ) {
    return NextResponse.json(
      {
        error:
          "Accept the membership agreement, billing authorization, and age attestation.",
      },
      { status: 400 }
    );
  }

  const amountDue = dueToday(pricing);
  const amountCents = Math.round(amountDue * 100) || 50;
  const fullName = `${member.firstName.trim()} ${member.lastName.trim()}`;
  const description = `${plan} membership · ${club.name}`;

  // Pending membership — activated after Checkout/Elements success.
  const pending = await createMembership({
    paymentStatus: "failed",
    clubId: club.id,
    clubName: club.name,
    plan,
    monthlyDues: pricing.monthlyDues,
    enrollmentFee: pricing.enrollmentFee,
    annualFee: pricing.annualFee,
    dueToday: amountDue,
    member: {
      firstName: member.firstName.trim(),
      lastName: member.lastName.trim(),
      email: member.email.trim().toLowerCase(),
      phone: member.phone.trim(),
    },
    consents: {
      membershipAgreement: true,
      recurringBilling: true,
      ageAttestation: true,
      acceptedAt: new Date().toISOString(),
      agreementVersion: "2026-08-01",
    },
    payment: {
      nameOnCard: fullName,
      last4: "0000",
      brand: "Card",
      expiryMonth: "",
      expiryYear: "",
      billingZip: "",
      processor: "stripe",
      processorReference: null,
    },
  });

  const origin = siteOrigin(request);
  const metadata = {
    membershipId: pending.id,
    clubId: club.id,
    plan,
    source: "pf-join",
  };

  if (mode === "elements") {
    const intent = await createElementsPaymentIntent({
      amountCents,
      customerEmail: member.email.trim(),
      description,
      metadata,
    });
    if (!intent.ok) {
      return NextResponse.json({ error: intent.message }, { status: 502 });
    }
    return NextResponse.json({
      mode: "elements",
      membershipId: pending.id,
      clientSecret: intent.clientSecret,
      paymentIntentId: intent.paymentIntentId,
      publishableKey: stripePublishableKey(),
      amountCents,
    });
  }

  const session = await createCheckoutSession({
    amountCents,
    customerEmail: member.email.trim(),
    customerName: fullName,
    description,
    successUrl: `${origin}/join/checkout/success?session_id={CHECKOUT_SESSION_ID}&membershipId=${pending.id}`,
    cancelUrl: `${origin}/join?club=${club.id}&plan=${plan}&checkout=cancelled`,
    metadata,
  });

  if (!session.ok) {
    return NextResponse.json({ error: session.message }, { status: 502 });
  }

  return NextResponse.json({
    mode: "checkout",
    membershipId: pending.id,
    sessionId: session.sessionId,
    url: session.url,
  });
}
