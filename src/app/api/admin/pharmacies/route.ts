import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";

const patchSchema = z.object({
  id: z.string().min(1),
  partnerStatus: z.enum(["active", "pending", "suspended"]).optional(),
  discountTier: z.enum(["standard", "preferred", "select"]).optional(),
  acceptsTrumpRxCoupon: z.boolean().optional(),
  adminNotes: z.string().max(2000).nullable().optional(),
  pharmacyDeskNote: z.string().max(500).nullable().optional(),
});

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const q = new URL(req.url).searchParams.get("q")?.trim().toLowerCase() ?? "";
  const pharmacies = await prisma.pharmacy.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q } },
            { city: { contains: q } },
            { zip: { contains: q } },
            { chain: { contains: q } },
          ],
        }
      : undefined,
    orderBy: [{ partnerStatus: "asc" }, { name: "asc" }],
    take: 200,
    include: {
      _count: { select: { contracts: true, coupons: true } },
    },
  });

  const summary = await prisma.pharmacy.groupBy({
    by: ["partnerStatus"],
    _count: { partnerStatus: true },
  });

  return NextResponse.json({
    pharmacies,
    summary: summary.map((row) => ({
      status: row.partnerStatus,
      count: row._count.partnerStatus,
    })),
  });
}

export async function PATCH(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid pharmacy update" }, { status: 400 });
  }

  const pharmacy = await prisma.pharmacy.update({
    where: { id: parsed.data.id },
    data: {
      partnerStatus: parsed.data.partnerStatus,
      discountTier: parsed.data.discountTier,
      acceptsTrumpRxCoupon: parsed.data.acceptsTrumpRxCoupon,
      adminNotes:
        parsed.data.adminNotes === undefined ? undefined : parsed.data.adminNotes,
      pharmacyDeskNote:
        parsed.data.pharmacyDeskNote === undefined
          ? undefined
          : parsed.data.pharmacyDeskNote,
    },
    include: {
      _count: { select: { contracts: true, coupons: true } },
    },
  });

  return NextResponse.json({ pharmacy });
}
