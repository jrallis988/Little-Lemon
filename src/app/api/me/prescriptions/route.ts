import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const patchSchema = z.object({
  id: z.string().min(1),
  rxStatus: z.enum(["active", "paused", "completed"]).optional(),
  lastFilledAt: z.string().datetime().nullable().optional(),
  nextRefillAt: z.string().datetime().nullable().optional(),
  refillsRemaining: z.number().int().min(0).max(99).nullable().optional(),
  notes: z.string().max(500).nullable().optional(),
  preferredPharmacyId: z.string().nullable().optional(),
  refillRemindersEnabled: z.boolean().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [medications, coupons, passes, user] = await Promise.all([
    prisma.savedMedication.findMany({
      where: { userId: session.user.id },
      include: {
        drug: { include: { strengths: true } },
      },
      orderBy: [{ rxStatus: "asc" }, { nextRefillAt: "asc" }, { updatedAt: "desc" }],
    }),
    prisma.coupon.findMany({
      where: { userId: session.user.id },
      orderBy: { issuedAt: "desc" },
      take: 25,
      include: {
        drug: { select: { id: true, genericName: true, brandName: true } },
        pharmacy: { select: { id: true, name: true, city: true, state: true } },
      },
    }),
    prisma.digitalPass.findMany({
      where: { userId: session.user.id },
      orderBy: { issuedAt: "desc" },
      take: 10,
      include: {
        items: {
          include: {
            coupon: {
              include: {
                drug: { select: { genericName: true } },
                pharmacy: { select: { name: true } },
              },
            },
          },
        },
      },
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { refillRemindersEnabled: true },
    }),
  ]);

  return NextResponse.json({
    medications,
    coupons,
    passes,
    refillRemindersEnabled: user?.refillRemindersEnabled ?? true,
  });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid prescription update" }, { status: 400 });
  }

  const existing = await prisma.savedMedication.findFirst({
    where: { id: parsed.data.id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const medication = await prisma.savedMedication.update({
    where: { id: existing.id },
    data: {
      rxStatus: parsed.data.rxStatus,
      lastFilledAt:
        parsed.data.lastFilledAt === undefined
          ? undefined
          : parsed.data.lastFilledAt
            ? new Date(parsed.data.lastFilledAt)
            : null,
      nextRefillAt:
        parsed.data.nextRefillAt === undefined
          ? undefined
          : parsed.data.nextRefillAt
            ? new Date(parsed.data.nextRefillAt)
            : null,
      refillsRemaining:
        parsed.data.refillsRemaining === undefined
          ? undefined
          : parsed.data.refillsRemaining,
      notes: parsed.data.notes === undefined ? undefined : parsed.data.notes,
      preferredPharmacyId:
        parsed.data.preferredPharmacyId === undefined
          ? undefined
          : parsed.data.preferredPharmacyId,
      refillRemindersEnabled: parsed.data.refillRemindersEnabled,
    },
    include: { drug: { include: { strengths: true } } },
  });

  return NextResponse.json({ medication });
}
