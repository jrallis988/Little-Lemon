import { NextResponse } from "next/server";
import { z } from "zod";
import {
  computeInsuranceVsCash,
  type CoverageSituation,
} from "@/lib/insurance/decision-matrix";

const schema = z.object({
  cashPrice: z.number().positive(),
  retailPrice: z.number().positive(),
  situation: z.enum([
    "no_insurance",
    "high_deductible",
    "met_deductible",
    "medicare_part_d",
    "unsure",
  ]),
  estimatedPlanPay: z.number().min(0).optional(),
  deductibleRemaining: z.number().min(0).optional(),
  preferTodaySavings: z.boolean().optional(),
});

/** Insurance vs cash decision matrix. */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid decision input" }, { status: 400 });
  }

  const result = computeInsuranceVsCash({
    ...parsed.data,
    situation: parsed.data.situation as CoverageSituation,
  });

  return NextResponse.json({ decision: result });
}
