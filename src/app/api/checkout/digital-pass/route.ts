import { NextResponse } from "next/server";
import { z } from "zod";
import { issueCoupon } from "@/lib/coupons";
import { auth } from "@/lib/auth";
import { runSwitchPrecheck } from "@/lib/switch/adjudication";
import { getPharmacyById } from "@/lib/pricing-service";

const itemSchema = z.object({
  cartItemId: z.string(),
  pharmacyId: z.string(),
  drugId: z.string(),
  strengthId: z.string(),
  quantity: z.number().int().positive(),
  supplyDays: z.union([z.literal(30), z.literal(90)]),
  couponPrice: z.number().positive(),
  retailPrice: z.number().positive(),
});

const schema = z.object({
  items: z.array(itemSchema).min(1).max(12),
});

/**
 * Native DTC digital checkout — issues a multi-drug digital pass
 * (BIN/PCN/Group + barcodes) without sending the user to manufacturer portals.
 * Payment at the pharmacy counter remains cash-pay; this is the transaction layer
 * for coupon fulfillment, not an insurance claim.
 */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid checkout payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const session = await auth();
  const passes = [];
  for (const item of parsed.data.items) {
    const pharmacy = await getPharmacyById(item.pharmacyId);
    if (!pharmacy) {
      return NextResponse.json(
        { error: `Pharmacy not found: ${item.pharmacyId}` },
        { status: 404 }
      );
    }

    const issued = await issueCoupon({
      userId: session?.user?.id,
      pharmacyId: item.pharmacyId,
      drugId: item.drugId,
      strengthId: item.strengthId,
      quantity: item.quantity,
      supplyDays: item.supplyDays,
      couponPrice: item.couponPrice,
      retailPrice: item.retailPrice,
    });

    const coupon = {
      id: issued.id,
      bin: issued.bin,
      pcn: issued.pcn,
      group: issued.groupCode,
      memberId: issued.memberId,
      barcodeValue: issued.barcodeValue,
      expiresAt: issued.expiresAt.toISOString(),
    };

    const precheck = await runSwitchPrecheck({
      pharmacy,
      drugId: item.drugId,
      strengthId: item.strengthId,
      quantity: item.quantity,
      supplyDays: item.supplyDays,
      couponPrice: item.couponPrice,
      coupon,
    });

    passes.push({
      cartItemId: item.cartItemId,
      pharmacyId: item.pharmacyId,
      pharmacyName: pharmacy.name,
      coupon,
      precheck: {
        status: precheck.status,
        confidence: precheck.confidence,
        pharmacistTip: precheck.pharmacistTip,
        liveSwitch: precheck.liveSwitch,
      },
      counterPrice: item.couponPrice,
      retailPrice: item.retailPrice,
    });
  }

  return NextResponse.json({
    passId: `pass_${Date.now().toString(36)}`,
    issuedAt: new Date().toISOString(),
    itemCount: passes.length,
    totalCounterPrice: passes.reduce((sum, p) => sum + p.counterPrice, 0),
    passes,
    note: "Show each barcode at the pharmacy counter. Seen price = counter price. Not insurance.",
  });
}
