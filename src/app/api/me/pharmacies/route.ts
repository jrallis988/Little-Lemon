import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const schema = z.object({ pharmacyId: z.string() });

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to save pharmacies" }, { status: 401 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid pharmacy" }, { status: 400 });
  }

  const row = await prisma.preferredPharmacy.upsert({
    where: {
      userId_pharmacyId: {
        userId: session.user.id,
        pharmacyId: parsed.data.pharmacyId,
      },
    },
    create: {
      userId: session.user.id,
      pharmacyId: parsed.data.pharmacyId,
    },
    update: {},
    include: { pharmacy: true },
  });

  return NextResponse.json({ pharmacy: row.pharmacy }, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const pharmacyId = new URL(req.url).searchParams.get("pharmacyId");
  if (!pharmacyId) {
    return NextResponse.json({ error: "pharmacyId required" }, { status: 400 });
  }
  await prisma.preferredPharmacy.deleteMany({
    where: { userId: session.user.id, pharmacyId },
  });
  return NextResponse.json({ ok: true });
}
