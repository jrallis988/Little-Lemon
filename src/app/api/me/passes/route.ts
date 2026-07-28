import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

/** List account-saved digital passes. */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const passes = await prisma.digitalPass.findMany({
    where: { userId: session.user.id },
    orderBy: { issuedAt: "desc" },
    take: 25,
    include: {
      items: {
        include: {
          coupon: {
            include: { drug: true, pharmacy: true },
          },
        },
      },
    },
  });

  return NextResponse.json({
    passes: passes.map((pass) => ({
      id: pass.id,
      passCode: pass.passCode,
      totalCounterPrice: pass.totalCounterPrice,
      status: pass.status,
      issuedAt: pass.issuedAt.toISOString(),
      expiresAt: pass.expiresAt?.toISOString() ?? null,
      items: pass.items.map((item) => ({
        id: item.id,
        pharmacyName: item.pharmacyName,
        counterPrice: item.counterPrice,
        retailPrice: item.retailPrice,
        switchStatus: item.switchStatus,
        coupon: {
          id: item.coupon.id,
          bin: item.coupon.bin,
          pcn: item.coupon.pcn,
          group: item.coupon.groupCode,
          memberId: item.coupon.memberId,
          barcodeValue: item.coupon.barcodeValue,
          expiresAt: item.coupon.expiresAt.toISOString(),
          drugName: item.coupon.drug.genericName,
          pharmacyName: item.coupon.pharmacy.name,
        },
      })),
    })),
  });
}

const voidSchema = z.object({
  passId: z.string(),
});

/** Void a saved pass (does not delete audit row). */
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = voidSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "passId required" }, { status: 400 });
  }

  const existing = await prisma.digitalPass.findFirst({
    where: { id: parsed.data.passId, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Pass not found" }, { status: 404 });
  }

  await prisma.digitalPass.update({
    where: { id: existing.id },
    data: { status: "void" },
  });

  return NextResponse.json({ ok: true });
}
