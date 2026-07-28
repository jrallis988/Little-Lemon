import { NextResponse } from "next/server";
import { z } from "zod";
import { issueCoupon } from "@/lib/coupons";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { runSwitchPrecheck } from "@/lib/switch/adjudication";
import { logSwitchEvent } from "@/lib/switch/events";
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
  /** When true and signed in, persist pass to the account. Default true. */
  saveToAccount: z.boolean().optional(),
});

/**
 * Native DTC digital checkout — issues a multi-drug digital pass
 * (BIN/PCN/Group + barcodes) without sending the user to manufacturer portals.
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
  const saveToAccount = parsed.data.saveToAccount !== false;
  const passItems: Array<{
    cartItemId: string;
    pharmacyId: string;
    pharmacyName: string;
    coupon: {
      id: string;
      bin: string;
      pcn: string;
      group: string;
      memberId: string;
      barcodeValue: string;
      expiresAt: string;
    };
    precheck: {
      status: string;
      confidence: number;
      pharmacistTip: string;
      liveSwitch: boolean;
    };
    counterPrice: number;
    retailPrice: number;
  }> = [];

  let earliestExpiry: Date | null = null;

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

    if (!earliestExpiry || issued.expiresAt < earliestExpiry) {
      earliestExpiry = issued.expiresAt;
    }

    const precheck = await runSwitchPrecheck({
      pharmacy,
      drugId: item.drugId,
      strengthId: item.strengthId,
      quantity: item.quantity,
      supplyDays: item.supplyDays,
      couponPrice: item.couponPrice,
      coupon,
    });

    await logSwitchEvent({
      userId: session?.user?.id,
      pharmacyId: pharmacy.id,
      drugId: item.drugId,
      status: precheck.status,
      confidence: precheck.confidence,
      liveSwitch: precheck.liveSwitch,
      detail: { source: "digital-pass", checks: precheck.checks },
    });

    passItems.push({
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

  const passCode = `pass_${Date.now().toString(36)}`;
  const totalCounterPrice = passItems.reduce((sum, p) => sum + p.counterPrice, 0);

  let savedPassId: string | null = null;
  if (saveToAccount && session?.user?.id) {
    const saved = await prisma.digitalPass.create({
      data: {
        userId: session.user.id,
        passCode,
        totalCounterPrice,
        status: "active",
        note: "Seen price = counter price. Not insurance.",
        expiresAt: earliestExpiry,
        items: {
          create: passItems.map((p) => ({
            couponId: p.coupon.id,
            cartItemId: p.cartItemId,
            pharmacyName: p.pharmacyName,
            counterPrice: p.counterPrice,
            retailPrice: p.retailPrice,
            switchStatus: p.precheck.status,
          })),
        },
      },
    });
    savedPassId = saved.id;
  }

  return NextResponse.json({
    passId: passCode,
    savedPassId,
    savedToAccount: Boolean(savedPassId),
    issuedAt: new Date().toISOString(),
    itemCount: passItems.length,
    totalCounterPrice,
    passes: passItems,
    note: "Show each barcode at the pharmacy counter. Seen price = counter price. Not insurance.",
  });
}
