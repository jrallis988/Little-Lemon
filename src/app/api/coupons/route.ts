import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { issueCoupon, getCoupon } from "@/lib/coupons";

const issueSchema = z.object({
  pharmacyId: z.string(),
  drugId: z.string(),
  strengthId: z.string(),
  quantity: z.number().int().positive(),
  supplyDays: z.union([z.literal(30), z.literal(90)]),
  couponPrice: z.number().positive(),
  retailPrice: z.number().positive(),
});

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  const coupon = await getCoupon(id);
  if (!coupon) {
    return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
  }
  if (coupon.expiresAt.getTime() < Date.now() && coupon.status === "issued") {
    return NextResponse.json({
      coupon: { ...coupon, status: "expired" },
    });
  }
  return NextResponse.json({ coupon });
}

export async function POST(req: Request) {
  const session = await auth();
  const body = await req.json().catch(() => null);
  const parsed = issueSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid coupon request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const coupon = await issueCoupon({
    ...parsed.data,
    userId: session?.user?.id,
  });

  return NextResponse.json(
    {
      coupon: {
        id: coupon.id,
        pharmacyId: coupon.pharmacyId,
        drugId: coupon.drugId,
        strengthId: coupon.strengthId,
        quantity: coupon.quantity,
        supplyDays: coupon.supplyDays,
        couponPrice: coupon.couponPrice,
        retailPrice: coupon.retailPrice,
        bin: coupon.bin,
        pcn: coupon.pcn,
        group: coupon.groupCode,
        memberId: coupon.memberId,
        barcodeValue: coupon.barcodeValue,
        status: coupon.status,
        issuedAt: coupon.issuedAt.toISOString(),
        expiresAt: coupon.expiresAt.toISOString(),
        pharmacy: coupon.pharmacy,
        drug: coupon.drug,
      },
    },
    { status: 201 }
  );
}
