import { prisma } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { milesBetween } from "@/lib/geo";
import type {
  CouponBinDetails,
  Drug,
  DrugSearchSuggestion,
  DosageForm,
  LocationContext,
  Pharmacy,
  PharmacyChain,
  PharmacyPriceOffer,
  PriceComparisonRow,
  SavingsTip,
  SearchFilters,
  SupplyDays,
} from "@/lib/types";
import type {
  Drug as DbDrug,
  DrugQuantity,
  DrugStrength,
  Pharmacy as DbPharmacy,
  PharmacyContract,
} from "@prisma/client";

type DrugWithRelations = DbDrug & {
  strengths: DrugStrength[];
  quantities: DrugQuantity[];
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function mapDrug(d: DrugWithRelations): Drug {
  return {
    id: d.id,
    brandName: d.brandName,
    genericName: d.genericName,
    therapeuticClass: d.therapeuticClass,
    isControlled: d.isControlled,
    retailCashPrice30: d.retailCashPrice30,
    retailCashPrice90: d.retailCashPrice90,
    searchAliases: JSON.parse(d.searchAliasesJson) as string[],
    strengths: d.strengths.map((s) => ({
      id: s.id,
      label: s.label,
      amountMg: s.amountMg,
      form: s.form as DosageForm,
    })),
    commonQuantities: d.quantities.map((q) => q.quantity).sort((a, b) => a - b),
  };
}

export function mapPharmacy(
  p: DbPharmacy,
  distanceMiles?: number
): Pharmacy {
  return {
    id: p.id,
    name: p.name,
    chain: p.chain as PharmacyChain,
    npi: p.npi ?? undefined,
    ncpdpId: p.ncpdpId ?? undefined,
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

export async function getDrugById(id: string): Promise<Drug | null> {
  const d = await prisma.drug.findUnique({
    where: { id },
    include: { strengths: true, quantities: true },
  });
  return d ? mapDrug(d) : null;
}

export async function getPharmacyById(id: string): Promise<Pharmacy | null> {
  const p = await prisma.pharmacy.findUnique({ where: { id } });
  return p ? mapPharmacy(p) : null;
}

export async function listPharmacies(params?: {
  zip?: string;
  lat?: number;
  lng?: number;
  radiusMiles?: number;
  q?: string;
}): Promise<Pharmacy[]> {
  const all = await prisma.pharmacy.findMany({ orderBy: { name: "asc" } });
  const lat = params?.lat;
  const lng = params?.lng;
  const radius = params?.radiusMiles ?? 50;
  const q = params?.q?.trim().toLowerCase();

  let rows = all.map((p) => {
    const distanceMiles =
      typeof lat === "number" && typeof lng === "number"
        ? milesBetween(lat, lng, p.latitude, p.longitude)
        : undefined;
    return mapPharmacy(p, distanceMiles);
  });

  if (typeof lat === "number" && typeof lng === "number") {
    rows = rows
      .filter((p) => (p.distanceMiles ?? 999) <= radius)
      .sort((a, b) => (a.distanceMiles ?? 0) - (b.distanceMiles ?? 0));
  }

  if (q) {
    rows = rows.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.zip.includes(q) ||
        p.chain.includes(q)
    );
  }

  return rows;
}

export async function searchDrugs(
  query: string,
  limit = 8
): Promise<DrugSearchSuggestion[]> {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];

  const drugs = await prisma.drug.findMany({
    include: { strengths: true, quantities: true },
  });
  const scored: Array<DrugSearchSuggestion & { score: number }> = [];

  for (const raw of drugs) {
    const drug = mapDrug(raw);
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
        score: 50,
      });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ drug, matchedLabel, matchType }) => ({
      drug,
      matchedLabel,
      matchType,
    }));
}

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildRoutingIds(pharmacyId: string, drugId: string, userSalt = "guest") {
  const env = getEnv();
  const seed = hashSeed(`${pharmacyId}-${drugId}-${userSalt}`);
  const member = String(100000000 + (seed % 899999999));
  const coupon: CouponBinDetails = {
    bin: env.TRUMPRX_BIN,
    pcn: env.TRUMPRX_PCN,
    group: env.TRUMPRX_GROUP,
    memberId: member,
    barcodeValue: `${env.TRUMPRX_BIN}${member}`,
  };
  return coupon;
}

function computeOfferPrice(params: {
  drug: DrugWithRelations;
  contract: PharmacyContract;
  quantity: number;
  supplyDays: SupplyDays;
  plusMember: boolean;
}): { couponPrice: number; retailPrice: number } {
  const { drug, contract, quantity, supplyDays, plusMember } = params;
  const baseRetail =
    supplyDays === 90 ? drug.retailCashPrice90 : drug.retailCashPrice30;
  const baseQty = drug.quantities[0]?.quantity ?? quantity;
  const qtyFactor = quantity / Math.max(baseQty, 1);
  const retailPrice = Number((baseRetail * qtyFactor).toFixed(2));

  let factor = contract.discountFactor;
  if (plusMember) {
    factor = Math.max(0.5, factor - 0.04);
  }

  const floor =
    supplyDays === 90 ? contract.floorPrice90 : contract.floorPrice30;
  const raw = retailPrice * factor;
  const couponPrice = Number(Math.max(floor * qtyFactor, raw).toFixed(2));
  return { couponPrice, retailPrice };
}

async function networkQuotes(params: {
  drugId: string;
  strengthId: string;
  quantity: number;
  supplyDays: SupplyDays;
  location: LocationContext;
  plusMember?: boolean;
  radiusMiles?: number;
}): Promise<PriceComparisonRow[]> {
  const drug = await prisma.drug.findUnique({
    where: { id: params.drugId },
    include: { strengths: true, quantities: true, contracts: true },
  });
  if (!drug) return [];

  const strength =
    drug.strengths.find((s) => s.id === params.strengthId) ?? drug.strengths[0];
  if (!strength) return [];

  const pharmacies = await prisma.pharmacy.findMany();
  const now = new Date().toISOString();
  const rows: PriceComparisonRow[] = [];

  for (const pharmacy of pharmacies) {
    const distanceMiles = milesBetween(
      params.location.latitude,
      params.location.longitude,
      pharmacy.latitude,
      pharmacy.longitude
    );
    if (distanceMiles > (params.radiusMiles ?? 40)) continue;

    const contract = drug.contracts.find((c) => c.pharmacyId === pharmacy.id);
    if (!contract?.inNetwork) continue;

    const { couponPrice, retailPrice } = computeOfferPrice({
      drug,
      contract,
      quantity: params.quantity,
      supplyDays: params.supplyDays,
      plusMember: Boolean(params.plusMember),
    });

    const stockSeed = hashSeed(`${pharmacy.id}-${drug.id}-stock`);
    const inStock = stockSeed % 100 > 6;

    const coupon = buildRoutingIds(pharmacy.id, drug.id);
    const offer: PharmacyPriceOffer = {
      id: `${pharmacy.id}:${drug.id}:${strength.id}:${params.quantity}:${params.supplyDays}`,
      pharmacyId: pharmacy.id,
      drugId: drug.id,
      strengthId: strength.id,
      quantity: params.quantity,
      supplyDays: params.supplyDays,
      couponPrice,
      retailPrice,
      coupon,
      lastUpdatedIso: now,
      inStock,
    };

    const savingsAmount = Number((retailPrice - couponPrice).toFixed(2));
    const savingsPercent =
      retailPrice > 0 ? Math.round((savingsAmount / retailPrice) * 100) : 0;

    rows.push({
      offer,
      pharmacy: mapPharmacy(pharmacy, Number(distanceMiles.toFixed(1))),
      savingsAmount,
      savingsPercent,
    });
  }

  return rows;
}

async function externalQuotes(params: {
  drugId: string;
  strengthId: string;
  quantity: number;
  supplyDays: SupplyDays;
  location: LocationContext;
  plusMember?: boolean;
  radiusMiles?: number;
}): Promise<PriceComparisonRow[]> {
  try {
    const { fetchExternalQuotes } = await import("@/lib/pricing-provider");
    return await fetchExternalQuotes(params);
  } catch (err) {
    console.error("[pricing] external provider failed; falling back to network", err);
    return networkQuotes(params);
  }
}

export async function getPriceQuotes(params: {
  drugId: string;
  strengthId: string;
  quantity: number;
  supplyDays: SupplyDays;
  location: LocationContext;
  plusMember?: boolean;
  radiusMiles?: number;
}): Promise<PriceComparisonRow[]> {
  const env = getEnv();
  if (env.PRICING_PROVIDER === "external") {
    return externalQuotes(params);
  }
  return networkQuotes(params);
}

export function sortComparisonRows(
  rows: PriceComparisonRow[],
  sortBy: SearchFilters["sortBy"]
): PriceComparisonRow[] {
  const copy = [...rows];
  switch (sortBy) {
    case "distance":
      return copy.sort(
        (a, b) => (a.pharmacy.distanceMiles ?? 0) - (b.pharmacy.distanceMiles ?? 0)
      );
    case "savings":
      return copy.sort((a, b) => b.savingsAmount - a.savingsAmount);
    case "price":
    default:
      return copy.sort((a, b) => a.offer.couponPrice - b.offer.couponPrice);
  }
}

export function buildSavingsTips(params: {
  drug: Drug;
  rows: PriceComparisonRow[];
  supplyDays: SupplyDays;
}): SavingsTip[] {
  const tips: SavingsTip[] = [];
  const lowest = params.rows[0];
  if (!lowest) return tips;

  if (params.drug.brandName.toLowerCase() !== params.drug.genericName.toLowerCase()) {
    tips.push({
      id: "generic",
      title: "Ask for the generic",
      body: `${params.drug.genericName} is usually priced lower than brand ${params.drug.brandName} when therapeutically equivalent.`,
      kind: "generic",
    });
  }

  if (params.supplyDays === 30 && params.drug.commonQuantities.some((q) => q >= 90)) {
    tips.push({
      id: "supply",
      title: "Compare a 90-day supply",
      body: "Many network pharmacies price 90-day fills lower per day than three 30-day fills.",
      kind: "supply",
      potentialSavingsLabel: "Often 10–25% lower per day",
    });
  }

  const byChain = [...params.rows].sort(
    (a, b) => a.offer.couponPrice - b.offer.couponPrice
  );
  if (byChain.length >= 2) {
    const gap = byChain[byChain.length - 1].offer.couponPrice - byChain[0].offer.couponPrice;
    if (gap >= 5) {
      tips.push({
        id: "pharmacy",
        title: "Pharmacy choice matters",
        body: `Nearby prices for this fill differ by about ${formatCurrency(gap)}.`,
        kind: "pharmacy",
        potentialSavingsLabel: formatCurrency(gap),
      });
    }
  }

  tips.push({
    id: "timing",
    title: "Compare with your insurance copay",
    body: "Ask the pharmacist which is lower: this cash coupon or your plan copay. Coupons generally cannot be combined with insurance.",
    kind: "timing",
  });

  return tips;
}

/** @deprecated Prefer resolveZip from geo.ts — kept for client location store fallback */
export function resolveLocationFromZip(zip: string): LocationContext {
  const clean = zip.trim().slice(0, 5);
  return {
    zip: clean || "10001",
    city: "Unknown",
    state: "US",
    latitude: 40.7506,
    longitude: -73.9971,
    label: clean ? `ZIP ${clean}` : "New York, NY 10001",
  };
}
