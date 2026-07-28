import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const saveSchema = z.object({
  drugId: z.string(),
  strengthId: z.string(),
  quantity: z.number().int().positive(),
  supplyDays: z.union([z.literal(30), z.literal(90)]),
  preferredPharmacyId: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to save medications" }, { status: 401 });
  }
  const parsed = saveSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid medication" }, { status: 400 });
  }

  const { drugId, strengthId, quantity, supplyDays, preferredPharmacyId } =
    parsed.data;

  const med = await prisma.savedMedication.upsert({
    where: {
      userId_drugId_strengthId_quantity_supplyDays: {
        userId: session.user.id,
        drugId,
        strengthId,
        quantity,
        supplyDays,
      },
    },
    create: {
      userId: session.user.id,
      drugId,
      strengthId,
      quantity,
      supplyDays,
      preferredPharmacyId: preferredPharmacyId ?? null,
    },
    update: {
      preferredPharmacyId: preferredPharmacyId ?? null,
    },
  });

  return NextResponse.json({ medication: med }, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  await prisma.savedMedication.deleteMany({
    where: { id, userId: session.user.id },
  });
  return NextResponse.json({ ok: true });
}
