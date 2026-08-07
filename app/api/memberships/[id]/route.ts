import { NextResponse } from "next/server";
import { getMembershipById } from "@/lib/memberships";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const record = await getMembershipById(id);
  if (!record) {
    return NextResponse.json({ error: "Membership not found." }, { status: 404 });
  }

  return NextResponse.json({
    membership: {
      id: record.id,
      status: record.status,
      paymentStatus: record.paymentStatus,
      clubId: record.clubId,
      clubName: record.clubName,
      plan: record.plan,
      monthlyDues: record.monthlyDues,
      enrollmentFee: record.enrollmentFee,
      annualFee: record.annualFee,
      dueToday: record.dueToday,
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
      consents: {
        acceptedAt: record.consents.acceptedAt,
      },
      createdAt: record.createdAt,
    },
  });
}
