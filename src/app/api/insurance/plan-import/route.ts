import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  planType: z.enum(["commercial", "medicare_part_d", "medicaid", "other"]),
  carrierName: z.string().max(120).optional(),
  memberId: z.string().max(64).optional(),
  annualDeductible: z.number().nonnegative().optional(),
  deductibleMet: z.number().nonnegative().optional(),
  typicalCopay: z.number().nonnegative().optional(),
});

/**
 * Stub for true insurance plan import (Part 2).
 * Accepts manual plan fields today; replace body with PBM/eligibility API
 * when a partner is contracted — response shape stays stable for the UI.
 */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid plan payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const deductible =
    parsed.data.annualDeductible ??
    (parsed.data.planType === "medicare_part_d" ? 590 : 1500);
  const met = Math.min(parsed.data.deductibleMet ?? 0, deductible);

  return NextResponse.json({
    imported: true,
    mode: "manual",
    message:
      "Plan details applied for the Insurance vs cash comparison. Always confirm with your pharmacist and plan.",
    plan: {
      planType: parsed.data.planType,
      carrierName: parsed.data.carrierName ?? null,
      memberIdMasked: parsed.data.memberId
        ? `••••${parsed.data.memberId.slice(-4)}`
        : null,
      annualDeductible: deductible,
      deductibleMet: met,
      remainingDeductible: Math.max(0, deductible - met),
      typicalCopay: parsed.data.typicalCopay ?? null,
    },
  });
}
