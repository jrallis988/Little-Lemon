import { NextResponse } from "next/server";
import {
  getMembershipById,
  updateMembershipPayment,
} from "@/lib/memberships";
import { retrieveCheckoutSession } from "@/lib/payments";

export const dynamic = "force-dynamic";

type CompleteBody = {
  sessionId?: string;
  membershipId?: string;
  paymentIntentId?: string;
  last4?: string;
  brand?: string;
};

export async function POST(request: Request) {
  let body: CompleteBody;
  try {
    body = (await request.json()) as CompleteBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const membershipId = body.membershipId?.trim();
  if (!membershipId) {
    return NextResponse.json(
      { error: "membershipId is required." },
      { status: 400 }
    );
  }

  const membership = await getMembershipById(membershipId);
  if (!membership) {
    return NextResponse.json({ error: "Membership not found." }, { status: 404 });
  }

  if (body.sessionId) {
    const session = await retrieveCheckoutSession(body.sessionId);
    if (!session) {
      return NextResponse.json(
        { error: "Checkout session not found." },
        { status: 404 }
      );
    }
    if (session.payment_status !== "paid" && session.payment_status !== "unpaid") {
      // unpaid can mean authorize-only depending on mode; require paid for join
    }
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed yet." },
        { status: 402 }
      );
    }
    if (
      session.metadata?.membershipId &&
      session.metadata.membershipId !== membershipId
    ) {
      return NextResponse.json(
        { error: "Session does not match membership." },
        { status: 400 }
      );
    }

    const paymentIntent =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id ?? session.id;

    const updated = await updateMembershipPayment(membershipId, {
      paymentStatus: "stripe_authorized",
      status: "active",
      processor: "stripe",
      processorReference: paymentIntent,
      brand: "Card",
      last4: "****",
      nameOnCard:
        session.customer_details?.name ?? membership.payment.nameOnCard,
    });

    return NextResponse.json({
      membership: {
        id: updated?.id,
        status: updated?.status,
        paymentStatus: updated?.paymentStatus,
      },
    });
  }

  if (body.paymentIntentId) {
    const updated = await updateMembershipPayment(membershipId, {
      paymentStatus: "stripe_authorized",
      status: "active",
      processor: "stripe",
      processorReference: body.paymentIntentId,
      brand: body.brand?.trim() || "Card",
      last4: body.last4?.replace(/\D/g, "").slice(-4) || "****",
    });
    return NextResponse.json({
      membership: {
        id: updated?.id,
        status: updated?.status,
        paymentStatus: updated?.paymentStatus,
      },
    });
  }

  return NextResponse.json(
    { error: "Provide sessionId or paymentIntentId." },
    { status: 400 }
  );
}