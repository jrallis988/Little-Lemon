import { NextResponse } from "next/server";
import { getClubById } from "@/lib/clubs";
import { createMembership, detectCardBrand } from "@/lib/memberships";
import { authorizePayment, paymentsConfigured } from "@/lib/payments";
import { dueToday, getLocalPricing, type MembershipTier } from "@/lib/pricing";
import {
  isMembershipTier,
  normalizeEmail,
  normalizePhone,
  parseClubId,
  requireNonEmpty,
} from "@/lib/validation";

export const dynamic = "force-dynamic";

type JoinBody = {
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
  payment?: {
    nameOnCard?: string;
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
    zip?: string;
  };
};

export async function POST(request: Request) {
  let body: JoinBody;
  try {
    body = (await request.json()) as JoinBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const clubId = parseClubId(body.clubId);
  const plan = isMembershipTier(body.plan) ? body.plan : null;
  const member = body.member;
  const consents = body.consents;
  const payment = body.payment;

  if (!clubId || !plan) {
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

  const firstName = requireNonEmpty(member?.firstName, 60);
  const lastName = requireNonEmpty(member?.lastName, 60);
  const email = normalizeEmail(member?.email);
  const phone = normalizePhone(member?.phone);

  if (!firstName || !lastName || !email || !phone) {
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
      { error: "Accept the membership agreement, billing authorization, and age attestation." },
      { status: 400 }
    );
  }

  const cardDigits = (payment?.cardNumber ?? "").replace(/\D/g, "");
  const [expiryMonth = "", expiryYear = ""] = (payment?.expiry ?? "")
    .split("/")
    .map((part) => part.trim());

  if (
    !payment?.nameOnCard?.trim() ||
    cardDigits.length < 13 ||
    expiryMonth.length < 1 ||
    expiryYear.length < 2 ||
    (payment.cvc ?? "").length < 3 ||
    (payment.zip ?? "").trim().length < 5
  ) {
    return NextResponse.json(
      { error: "Check card details and billing ZIP." },
      { status: 400 }
    );
  }

  const amountDue = dueToday(pricing);
  const auth = await authorizePayment({
    amountCents: Math.round(amountDue * 100) || 50,
    customerEmail: email,
    customerName: `${firstName} ${lastName}`,
    description: `${plan} membership · ${club.name}`,
    cardNumber: cardDigits,
    expiryMonth,
    expiryYear: expiryYear.length === 2 ? `20${expiryYear}` : expiryYear,
    cvc: payment.cvc!.trim(),
    billingZip: payment.zip!.trim(),
  });

  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.message ?? "Payment authorization failed." },
      { status: 402 }
    );
  }

  const record = await createMembership({
    paymentStatus: auth.paymentStatus,
    clubId: club.id,
    clubName: club.name,
    plan,
    monthlyDues: pricing.monthlyDues,
    enrollmentFee: pricing.enrollmentFee,
    annualFee: pricing.annualFee,
    dueToday: amountDue,
    member: {
      firstName,
      lastName,
      email,
      phone,
    },
    consents: {
      membershipAgreement: true,
      recurringBilling: true,
      ageAttestation: true,
      acceptedAt: new Date().toISOString(),
      agreementVersion: "2026-08-01",
    },
    payment: {
      nameOnCard: payment.nameOnCard.trim(),
      last4: auth.last4,
      brand: auth.brand || detectCardBrand(cardDigits),
      expiryMonth,
      expiryYear,
      billingZip: payment.zip!.trim(),
      processor: auth.processor,
      processorReference: auth.reference,
    },
  });

  // Provision member-app login with a one-time random password.
  // Callers should use forgot-password / reset flow to set a real credential.
  let appLoginEmail: string | null = null;
  try {
    const { randomBytes } = await import("crypto");
    const { createUser, getUserByEmail, updateUser } = await import("@/lib/users");
    const email = record.member.email;
    const existing = await getUserByEmail(email);
    if (existing) {
      await updateUser(existing.id, { membershipId: record.id });
      appLoginEmail = email;
    } else {
      const tempPassword = randomBytes(18).toString("base64url");
      await createUser({
        email,
        password: tempPassword,
        firstName: record.member.firstName,
        lastName: record.member.lastName,
        phone: record.member.phone,
        membershipId: record.id,
      });
      appLoginEmail = email;
    }
  } catch {
    /* non-fatal */
  }

  return NextResponse.json(
    {
      membership: {
        id: record.id,
        status: record.status,
        paymentStatus: record.paymentStatus,
        clubId: record.clubId,
        clubName: record.clubName,
        plan: record.plan,
        dueToday: record.dueToday,
        monthlyDues: record.monthlyDues,
        member: {
          firstName: record.member.firstName,
          lastName: record.member.lastName,
          email: record.member.email,
        },
        payment: {
          brand: record.payment.brand,
          last4: record.payment.last4,
          processor: record.payment.processor,
        },
        createdAt: record.createdAt,
      },
      paymentsMode: paymentsConfigured() ? "stripe" : "test",
      appLogin: appLoginEmail
        ? {
            email: appLoginEmail,
            nextStep: "Use Sign in → Forgot password to set your app password.",
          }
        : null,
    },
    { status: 201 }
  );
}
