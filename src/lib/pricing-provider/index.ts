import { prisma } from "@/lib/db";
import { createExternalPricingClient } from "@/lib/pricing-provider/external-client";
import type {
  ExternalPricingQuoteResponse,
  QuoteParams,
} from "@/lib/pricing-provider/types";
import type {
  Pharmacy,
  PharmacyChain,
  PharmacyPriceOffer,
  PriceComparisonRow,
} from "@/lib/types";
import type { Pharmacy as DbPharmacy } from "@prisma/client";

function toPharmacy(p: DbPharmacy, distanceMiles?: number): Pharmacy {
  return {
    id: p.id,
    name: p.name,
    chain: p.chain as PharmacyChain,
    address: p.address,
    city: p.city,
    state: p.state,
    zip: p.zip,
    phone: p.phone,
    latitude: p.latitude,
    longitude: p.longitude,
    hours: {
      weekday: p.hoursWeekday,
      saturday: p.hoursSaturday,
      sunday: p.hoursSunday,
      pharmacyDeskNote: p.pharmacyDeskNote ?? undefined,
    },
    acceptsTrumpRxCoupon: p.acceptsTrumpRxCoupon,
    driveThru: p.driveThru,
    distanceMiles,
  };
}

export async function mapExternalQuotesToRows(
  response: ExternalPricingQuoteResponse,
  params: QuoteParams
): Promise<PriceComparisonRow[]> {
  const pharmacyIds = response.offers.map((o) => o.pharmacyId);
  const pharmacies = await prisma.pharmacy.findMany({
    where: { id: { in: pharmacyIds } },
  });
  const byId = new Map(pharmacies.map((p) => [p.id, p]));
  const rows: PriceComparisonRow[] = [];

  for (const offer of response.offers) {
    const pharmacy = byId.get(offer.pharmacyId);
    if (!pharmacy) continue;

    const couponPrice = offer.couponPrice;
    const retailPrice = offer.retailPrice;
    const mapped: PharmacyPriceOffer = {
      id: `${offer.pharmacyId}:${params.drugId}:${params.strengthId}:${params.quantity}:${params.supplyDays}`,
      pharmacyId: offer.pharmacyId,
      drugId: params.drugId,
      strengthId: params.strengthId,
      quantity: params.quantity,
      supplyDays: params.supplyDays,
      couponPrice,
      retailPrice,
      coupon: {
        bin: offer.bin ?? "610020",
        pcn: offer.pcn ?? "TRUMPRX",
        group: offer.group ?? "TRXSAVE",
        memberId: offer.memberId ?? "000000000",
        barcodeValue:
          offer.barcodeValue ??
          `${offer.bin ?? "610020"}${offer.memberId ?? "000000000"}`,
      },
      lastUpdatedIso: offer.quotedAt ?? response.quotedAt,
      inStock: offer.inStock ?? true,
    };

    const savingsAmount = Number((retailPrice - couponPrice).toFixed(2));
    const savingsPercent =
      retailPrice > 0 ? Math.round((savingsAmount / retailPrice) * 100) : 0;

    rows.push({
      offer: mapped,
      pharmacy: toPharmacy(pharmacy, offer.distanceMiles),
      savingsAmount,
      savingsPercent,
    });
  }

  return rows;
}

export async function fetchExternalQuotes(
  params: QuoteParams
): Promise<PriceComparisonRow[]> {
  const client = createExternalPricingClient();
  if (!client) {
    throw new Error("PRICING_API_URL is not configured");
  }

  const response = await client.getQuotes({
    drugId: params.drugId,
    strengthId: params.strengthId,
    ndc: params.ndc,
    quantity: params.quantity,
    supplyDays: params.supplyDays,
    zip: params.location.zip,
    latitude: params.location.latitude,
    longitude: params.location.longitude,
    radiusMiles: params.radiusMiles,
    plusMember: params.plusMember,
    requestId: crypto.randomUUID(),
  });

  return mapExternalQuotesToRows(response, params);
}

export type { ExternalPricingQuoteRequest, ExternalPricingQuoteResponse } from "@/lib/pricing-provider/types";
export { createExternalPricingClient, ExternalPricingClient } from "@/lib/pricing-provider/external-client";
