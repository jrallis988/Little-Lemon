import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({
  planType: z.enum(["commercial", "medicare_part_d", "medicaid", "other"]),
  carrierName: z.string().max(120).optional().nullable(),
  memberId: z.string().max(64).optional().nullable(),
  annualDeductible: z.number().nonnegative().optional().nullable(),
  deductibleMet: z.number().nonnegative().optional().nullable(),
  typicalCopay: z.number().nonnegative().optional().nullable(),
});

function normalizePlan(input: z.infer<typeof schema>) {
  const deductible =
    input.annualDeductible ??
    (input.planType === "medicare_part_d" ? 590 : 1500);
  const met = Math.min(input.deductibleMet ?? 0, deductible);
  const memberIdLast4 = input.memberId
    ? input.memberId.replace(/\D/g, "").slice(-4) || input.memberId.slice(-4)
    : null;

  return {
    planType: input.planType,
    carrierName: input.carrierName ?? null,
    memberIdLast4,
    annualDeductible: deductible,
    deductibleMet: met,
    typicalCopay: input.typicalCopay ?? null,
    remainingDeductible: Math.max(0, deductible - met),
  };
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const plan = await prisma.insurancePlan.findUnique({
    where: { userId: session.user.id },
  });

  if (!plan) {
    return NextResponse.json({ plan: null });
  }

  return NextResponse.json({
    plan: {
      planType: plan.planType,
      carrierName: plan.carrierName,
      memberIdMasked: plan.memberIdLast4 ? `••••${plan.memberIdLast4}` : null,
      annualDeductible: plan.annualDeductible,
      deductibleMet: plan.deductibleMet,
      remainingDeductible: Math.max(
        0,
        (plan.annualDeductible ?? 0) - (plan.deductibleMet ?? 0)
      ),
      typicalCopay: plan.typicalCopay,
      source: plan.source,
      updatedAt: plan.updatedAt.toISOString(),
    },
  });
}

export async function POST(req: Request) {
  const session = await auth();
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid plan payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const normalized = normalizePlan(parsed.data);

  if (session?.user?.id) {
    await prisma.insurancePlan.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        planType: normalized.planType,
        carrierName: normalized.carrierName,
        memberIdLast4: normalized.memberIdLast4,
        annualDeductible: normalized.annualDeductible,
        deductibleMet: normalized.deductibleMet,
        typicalCopay: normalized.typicalCopay,
        source: "manual",
      },
      update: {
        planType: normalized.planType,
        carrierName: normalized.carrierName,
        memberIdLast4: normalized.memberIdLast4,
        annualDeductible: normalized.annualDeductible,
        deductibleMet: normalized.deductibleMet,
        typicalCopay: normalized.typicalCopay,
        source: "manual",
      },
    });
  }

  return NextResponse.json({
    imported: true,
    mode: session?.user?.id ? "saved" : "manual",
    message: session?.user?.id
      ? "Plan saved to your account for Insurance vs cash comparisons."
      : "Plan details applied for this session. Sign in to save them to your account.",
    plan: {
      planType: normalized.planType,
      carrierName: normalized.carrierName,
      memberIdMasked: normalized.memberIdLast4
        ? `••••${normalized.memberIdLast4}`
        : null,
      annualDeductible: normalized.annualDeductible,
      deductibleMet: normalized.deductibleMet,
      remainingDeductible: normalized.remainingDeductible,
      typicalCopay: normalized.typicalCopay,
    },
  });
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.insurancePlan.deleteMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ ok: true });
}
