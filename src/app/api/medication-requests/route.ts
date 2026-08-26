import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { makeReferenceCode } from "@/lib/reference-code";

const bodySchema = z.object({
  medicationName: z.string().trim().min(2).max(200),
  email: z.string().trim().email().optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional(),
});

export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a medication name (at least 2 characters)." },
      { status: 400 }
    );
  }

  const referenceCode = makeReferenceCode("MED");
  const row = await prisma.medicationRequest.create({
    data: {
      referenceCode,
      medicationName: parsed.data.medicationName,
      email: parsed.data.email || null,
      notes: parsed.data.notes?.trim() || null,
    },
  });

  return NextResponse.json({
    referenceCode: row.referenceCode,
    id: row.id,
  });
}
