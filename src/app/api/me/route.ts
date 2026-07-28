import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      savedMedications: { include: { drug: { include: { strengths: true, quantities: true } } } },
      preferredPharmacies: { include: { pharmacy: true } },
      priceAlerts: { where: { active: true }, include: { drug: true } },
      familyMembers: true,
      coupons: {
        where: { status: "issued", expiresAt: { gt: new Date() } },
        orderBy: { issuedAt: "desc" },
        take: 10,
        include: { pharmacy: true, drug: true },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    profile: {
      id: user.id,
      email: user.email,
      name: user.name,
      allowPersonalizedTips: user.allowPersonalizedTips,
      membershipTier: user.membershipTier,
      membershipStatus: user.membershipStatus,
      membershipExpiresAt: user.membershipExpiresAt,
      savedMedications: user.savedMedications,
      preferredPharmacies: user.preferredPharmacies.map((p) => p.pharmacy),
      priceAlerts: user.priceAlerts,
      familyMembers: user.familyMembers,
      activeCoupons: user.coupons,
    },
  });
}

const patchSchema = z.object({
  name: z.string().min(1).max(80).optional(),
  allowPersonalizedTips: z.boolean().optional(),
});

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid profile update" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: parsed.data,
    select: {
      id: true,
      email: true,
      name: true,
      allowPersonalizedTips: true,
      membershipTier: true,
      membershipStatus: true,
    },
  });

  return NextResponse.json({ profile: user });
}
