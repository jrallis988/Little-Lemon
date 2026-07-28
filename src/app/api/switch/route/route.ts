import { NextResponse } from "next/server";
import { z } from "zod";
import { DEFAULT_LOCATION } from "@/lib/chains";
import { resolveZip } from "@/lib/geo";
import { getPriceQuotes, sortComparisonRows } from "@/lib/pricing-service";
import { routeBestPharmacies } from "@/lib/switch/router";

const schema = z.object({
  drugId: z.string(),
  strengthId: z.string(),
  quantity: z.number().int().positive(),
  supplyDays: z.union([z.literal(30), z.literal(90)]),
  zip: z.string().min(3).max(10),
  limit: z.number().int().min(1).max(20).optional(),
});

/**
 * Smart Switch universal router — ranks nearby pharmacies by network
 * acceptance + BIN/PCN/Group pre-test, then price and distance.
 */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid route request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { drugId, strengthId, quantity, supplyDays, zip, limit = 8 } =
    parsed.data;

  const location = (await resolveZip(zip)) ?? DEFAULT_LOCATION;
  const rows = sortComparisonRows(
    await getPriceQuotes({
      drugId,
      strengthId,
      quantity,
      supplyDays,
      location,
      plusMember: false,
    }),
    "price"
  );

  const options = rows.slice(0, limit).map((row) => ({
    pharmacy: row.pharmacy,
    offer: row.offer,
  }));

  if (options.length === 0) {
    return NextResponse.json({
      ranked: [],
      recommended: null,
      liveSwitch: false,
      routedAt: new Date().toISOString(),
    });
  }

  const routed = await routeBestPharmacies(options);

  return NextResponse.json({
    liveSwitch: routed.liveSwitch,
    routedAt: routed.routedAt,
    ranked: routed.ranked.map((r) => ({
      pharmacyId: r.pharmacy.id,
      pharmacyName: r.pharmacy.name,
      couponPrice: r.offer.couponPrice,
      distanceMiles: r.pharmacy.distanceMiles,
      status: r.precheck.status,
      confidence: r.precheck.confidence,
      pharmacistTip: r.precheck.pharmacistTip,
      score: r.score,
    })),
    recommended: routed.recommended
      ? {
          pharmacyId: routed.recommended.pharmacy.id,
          pharmacyName: routed.recommended.pharmacy.name,
          couponPrice: routed.recommended.offer.couponPrice,
          status: routed.recommended.precheck.status,
          confidence: routed.recommended.precheck.confidence,
          pharmacistTip: routed.recommended.precheck.pharmacistTip,
        }
      : null,
  });
}
