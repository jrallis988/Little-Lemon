import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { makeReferenceCode } from "@/lib/reference-code";

const CATEGORIES = [
  "price_incorrect",
  "pharmacy_rejected",
  "medication_info_incorrect",
  "pharmacy_outdated",
  "eligibility_unclear",
  "delivery_problem",
  "broken_link",
  "other",
] as const;

const schema = z.object({
  category: z.enum(CATEGORIES),
  details: z.string().trim().min(8).max(2000),
  pagePath: z.string().max(300).optional(),
  drugId: z.string().max(80).optional(),
  pharmacyId: z.string().max(80).optional(),
  email: z.string().email().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Choose a category and describe the issue." },
      { status: 400 }
    );
  }

  const referenceCode = makeReferenceCode("ISS");
  const row = await prisma.issueReport.create({
    data: {
      referenceCode,
      category: parsed.data.category,
      details: parsed.data.details,
      pagePath: parsed.data.pagePath || null,
      drugId: parsed.data.drugId || null,
      pharmacyId: parsed.data.pharmacyId || null,
      email: parsed.data.email || null,
    },
  });

  return NextResponse.json({
    ok: true,
    referenceCode: row.referenceCode,
    id: row.id,
  });
}
