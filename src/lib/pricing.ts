import { DRUGS } from "@/lib/data/drugs";
import { DEFAULT_LOCATION, PHARMACIES } from "@/lib/data/pharmacies";
import type {
  CouponBinDetails,
  Drug,
  DrugSearchSuggestion,
  LocationContext,
  Pharmacy,
  PharmacyPriceOffer,
  PriceComparisonRow,
  SavingsTip,
  SearchFilters,
  SupplyDays,
} from "@/lib/types";

/** Deterministic pseudo-random from a string seed (stable demo prices). */
function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededUnit(seed: string): number {
  return (hashSeed(seed) % 10_000) / 10_000;
}

function milesBetween(
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const lat1 = toRad(aLat);
  const lat2 = toRad(bLat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function buildCoupon(pharmacyId: string, drugId: string): CouponBinDetails {
  const seed = hashSeed(`${pharmacyId}-${drugId}`);
  const member = String(100000000 + (seed % 899999999));
  return {
    bin: "610020",
    pcn: "TRUMPRX",
    group: "TRXSAVE",
    memberId: member,
    barcodeValue: `610020${member}`,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function searchDrugs(query: string, limit = 8): DrugSearchSuggestion[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];

  const scored: Array<DrugSearchSuggestion & { score: number }> = [];

  for (const drug of DRUGS) {
    const brand = drug.brandName.toLowerCase();
    const generic = drug.genericName.toLowerCase();
    if (brand.startsWith(q) || brand.includes(q)) {
      scored.push({
        drug,
        matchedLabel: `${drug.brandName} (${drug.genericName})`,
        matchType: "brand",
        score: brand.startsWith(q) ? 100 : 70,
      });
      continue;
    }
    if (generic.startsWith(q) || generic.includes(q)) {
      scored.push({
        drug,
        matchedLabel: `${drug.genericName} (generic for ${drug.brandName})`,
        matchType: "generic",
        score: generic.startsWith(q) ? 95 : 65,
      });
      continue;
    }
    const alias = drug.searchAliases.find((a) => a.toLowerCase().includes(q));
    if (alias) {
      scored.push({
        drug,
        matchedLabel: `${drug.genericName} — ${drug.therapeuticClass}`,
        matchType: "alias",
        score: 40,
      });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...rest }) => {
      void score;
      return rest;
    });
}

export function withDistances(
  pharmacies: Pharmacy[],
  location: LocationContext
): Pharmacy[] {
  return pharmacies.map((p) => ({
    ...p,
    distanceMiles: Number(
      milesBetween(
        location.latitude,
        location.longitude,
        p.latitude,
        p.longitude
      ).toFixed(1)
    ),
  }));
}

export function generateOffersForDrug(
  drug: Drug,
  filters: Pick<SearchFilters, "strengthId" | "quantity" | "supplyDays">,
  location: LocationContext = DEFAULT_LOCATION
): PriceComparisonRow[] {
  const strengthId = filters.strengthId ?? drug.strengths[0]?.id;
  if (!strengthId) return [];

  const pharmacies = withDistances(PHARMACIES, location);
  const supplyFactor = filters.supplyDays === 90 ? 2.55 : 1;
  const qtyFactor = filters.quantity / (drug.commonQuantities[0] || 30);

  const rows: PriceComparisonRow[] = pharmacies.map((pharmacy) => {
    const unit = seededUnit(`${pharmacy.id}-${drug.id}-${strengthId}`);
    const chainBias: Record<Pharmacy["chain"], number> = {
      walmart: 0.72,
      costco: 0.68,
      independent: 0.78,
      kroger: 0.82,
      rite_aid: 0.88,
      cvs: 0.92,
      walgreens: 0.9,
    };
    const retailBase =
      filters.supplyDays === 90 ? drug.retailCashPrice90 : drug.retailCashPrice30;
    const retailPrice = Number((retailBase * qtyFactor).toFixed(2));
    const couponPrice = Number(
      Math.max(
        3.99,
        retailPrice * chainBias[pharmacy.chain] * (0.08 + unit * 0.18) * supplyFactor * (filters.supplyDays === 90 ? 0.38 : 1)
      ).toFixed(2)
    );
    // Recalculate more cleanly for 90-day: use retail90 * factor
    const adjustedCoupon =
      filters.supplyDays === 90
        ? Number(
            Math.max(
              9.99,
              drug.retailCashPrice90 *
                qtyFactor *
                chainBias[pharmacy.chain] *
                (0.06 + unit * 0.14)
            ).toFixed(2)
          )
        : couponPrice;

    const offer: PharmacyPriceOffer = {
      id: `${pharmacy.id}-${drug.id}-${strengthId}-${filters.supplyDays}-${filters.quantity}`,
      pharmacyId: pharmacy.id,
      drugId: drug.id,
      strengthId,
      quantity: filters.quantity,
      supplyDays: filters.supplyDays,
      couponPrice: adjustedCoupon,
      retailPrice,
      coupon: buildCoupon(pharmacy.id, drug.id),
      lastUpdatedIso: new Date().toISOString(),
      inStock: unit > 0.08,
    };

    const savingsAmount = Number(
      Math.max(0, offer.retailPrice - offer.couponPrice).toFixed(2)
    );
    const savingsPercent =
      offer.retailPrice > 0
        ? Math.round((savingsAmount / offer.retailPrice) * 100)
        : 0;

    return { offer, pharmacy, savingsAmount, savingsPercent };
  });

  return rows;
}

export function sortComparisonRows(
  rows: PriceComparisonRow[],
  sortBy: SearchFilters["sortBy"]
): PriceComparisonRow[] {
  const copy = [...rows];
  switch (sortBy) {
    case "distance":
      return copy.sort(
        (a, b) => (a.pharmacy.distanceMiles ?? 99) - (b.pharmacy.distanceMiles ?? 99)
      );
    case "savings":
      return copy.sort((a, b) => b.savingsAmount - a.savingsAmount);
    case "price":
    default:
      return copy.sort((a, b) => a.offer.couponPrice - b.offer.couponPrice);
  }
}

export function buildSavingsTips(
  drug: Drug,
  rows: PriceComparisonRow[],
  supplyDays: SupplyDays
): SavingsTip[] {
  const tips: SavingsTip[] = [];
  const lowest = [...rows].sort(
    (a, b) => a.offer.couponPrice - b.offer.couponPrice
  )[0];
  const brandPremium = drug.retailCashPrice30 * 0.35;

  tips.push({
    id: "generic",
    title: `Ask for generic ${drug.genericName}`,
    body: `Most pharmacies fill ${drug.brandName} as ${drug.genericName}. Generic is usually the same active ingredient at a lower coupon price.`,
    potentialSavingsLabel: `Up to ${formatCurrency(brandPremium)} vs brand cash price`,
    kind: "generic",
  });

  if (supplyDays === 30 && drug.commonQuantities.includes(90)) {
    const thirty = lowest?.offer.couponPrice ?? 0;
    const ninetyEstimate = thirty * 2.4;
    tips.push({
      id: "supply",
      title: "Try a 90-day supply",
      body: "Many plans and coupon networks price a 90-day fill lower per tablet than three separate 30-day fills.",
      potentialSavingsLabel: `Often ~${formatCurrency(Math.max(0, thirty * 3 - ninetyEstimate))} less over 3 months`,
      kind: "supply",
    });
  }

  if (lowest) {
    tips.push({
      id: "pharmacy",
      title: `${lowest.pharmacy.name} currently has the lowest price nearby`,
      body: `${formatCurrency(lowest.offer.couponPrice)} with Trump RX coupon · ${lowest.pharmacy.distanceMiles?.toFixed(1) ?? "—"} mi away`,
      kind: "pharmacy",
    });
  }

  tips.push({
    id: "timing",
    title: "Compare before you fill",
    body: "Prices shift by pharmacy and quantity. Re-check Trump RX when your refill is due — you never pay Trump RX a fee at the counter.",
    kind: "timing",
  });

  return tips;
}

export function resolveLocationFromZip(zip: string): LocationContext | null {
  const cleaned = zip.replace(/\D/g, "").slice(0, 5);
  if (cleaned.length !== 5) return null;

  // Demo zip → NYC metro offsets for realistic distance sorting
  const known: Record<string, LocationContext> = {
    "10001": { ...DEFAULT_LOCATION },
    "10011": {
      zip: "10011",
      city: "New York",
      state: "NY",
      latitude: 40.742,
      longitude: -74.001,
      label: "New York, NY 10011",
    },
    "11201": {
      zip: "11201",
      city: "Brooklyn",
      state: "NY",
      latitude: 40.694,
      longitude: -73.99,
      label: "Brooklyn, NY 11201",
    },
    "10016": {
      zip: "10016",
      city: "New York",
      state: "NY",
      latitude: 40.745,
      longitude: -73.978,
      label: "New York, NY 10016",
    },
  };

  if (known[cleaned]) return known[cleaned];

  // Synthetic nearby point for any other zip so UI still works
  const n = hashSeed(cleaned);
  return {
    zip: cleaned,
    city: "Nearby",
    state: "NY",
    latitude: 40.75 + ((n % 200) - 100) / 1000,
    longitude: -74.0 + (((n >> 8) % 200) - 100) / 1000,
    label: `ZIP ${cleaned}`,
  };
}
