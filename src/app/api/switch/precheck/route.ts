import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { mapPharmacy } from "@/lib/pricing-service";
import { runSwitchPrecheck } from "@/lib/switch/adjudication";
import { logSwitchEvent } from "@/lib/switch/events";

const schema = z.object({
  pharmacyId: z.string(),
  drugId: z.string(),
  strengthId: z.string(),
  quantity: z.number().int().positive(),
  supplyDays: z.union([z.literal(30), z.literal(90)]),
  couponPrice: z.number().positive(),
  coupon: z
    .object({
      bin: z.string().optional(),
      pcn: z.string().optional(),
      group: z.string().optional(),
      memberId: z.string().optional(),
      barcodeValue: z.string().optional(),
    })
    .optional(),
});

/** Smart Switch — pre-test BIN/PCN/Group before the counter. */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid precheck request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const pharmacyRow = await prisma.pharmacy.findUnique({
    where: { id: parsed.data.pharmacyId },
  });
  if (!pharmacyRow) {
    return NextResponse.json({ error: "Pharmacy not found" }, { status: 404 });
  }

  const session = await auth();
  const result = await runSwitchPrecheck({
    pharmacy: mapPharmacy(pharmacyRow),
    drugId: parsed.data.drugId,
    strengthId: parsed.data.strengthId,
    quantity: parsed.data.quantity,
    supplyDays: parsed.data.supplyDays,
    couponPrice: parsed.data.couponPrice,
    coupon: parsed.data.coupon,
  });

  await logSwitchEvent({
    userId: session?.user?.id,
    pharmacyId: pharmacyRow.id,
    drugId: parsed.data.drugId,
    status: result.status,
    confidence: result.confidence,
    liveSwitch: result.liveSwitch,
    detail: { source: "precheck", checks: result.checks },
  });

  return NextResponse.json({ precheck: result });
}
