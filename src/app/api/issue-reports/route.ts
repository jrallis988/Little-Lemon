import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { makeReferenceCode } from "@/lib/reference-code";

const bodySchema = z.object({
  category: z.string().trim().min(1).max(80),
  details: z.string().trim().min(8).max(4000),
  email: z.string().trim().email().optional().or(z.literal("")),
  pagePath: z.string().trim().max(500).optional(),
  drugId: z.string().trim().max(80).optional(),
  pharmacyId: z.string().trim().max(80).optional(),
});

export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Describe the issue (at least 8 characters)." },
      { status: 400 }
    );
  }

  const referenceCode = makeReferenceCode("ISS");
  const row = await prisma.issueReport.create({
    data: {
      referenceCode,
      category: parsed.data.category,
      details: parsed.data.details,
      email: parsed.data.email || null,
      pagePath: parsed.data.pagePath || null,
      drugId: parsed.data.drugId || null,
      pharmacyId: parsed.data.pharmacyId || null,
    },
  });

  return NextResponse.json({
    referenceCode: row.referenceCode,
    id: row.id,
  });
}
