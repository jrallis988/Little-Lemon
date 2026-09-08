export interface Product {
  sku: string;
  name: string;
  unit: string;
}

/** Local brewery product catalog — SKU maps to what staff actually say on the floor. */
export const PRODUCT_CATALOG: Product[] = [
  { sku: "SKU-8842", name: "House Porter", unit: "kegs" },
  { sku: "SKU-3310", name: "Session IPA", unit: "cases" },
  { sku: "SKU-1104", name: "Golden Lager", unit: "cases" },
  { sku: "SKU-2201", name: "Bright Pilsner", unit: "cases" },
  { sku: "SKU-5500", name: "Cabernet Sauvignon", unit: "bottles" },
];

const bySku = new Map(PRODUCT_CATALOG.map((p) => [p.sku.toUpperCase(), p]));

export function lookupProduct(sku: string): Product | undefined {
  return bySku.get(sku.trim().toUpperCase());
}

export function productName(sku: string): string {
  return lookupProduct(sku)?.name ?? sku;
}

export function productUnit(sku: string): string {
  return lookupProduct(sku)?.unit ?? "units";
}

/** Plain-language count gap for display — never "Δ" or "variance". */
export function countGapLabel(gap: number): string {
  if (gap === 0) return "All set";
  const n = Math.abs(gap);
  const unit = n === 1 ? "unit" : "units";
  return gap < 0 ? `${n} short` : `${n} over`;
}

export function statusBadgeLabel(
  level: "exact" | "minor" | "critical",
  count = 1,
): string {
  const n = count.toString();
  if (level === "exact") return `${n} all set`;
  if (level === "minor") return `${n} double-check`;
  return `${n} needs attention`;
}

export function tillLabel(registerId: string): string {
  return registerId.replace(/^REG-?/i, "Till ");
}

export function tillGapLabel(gap: number): string {
  const amount = Math.abs(gap).toFixed(2);
  if (gap === 0) return "Balanced";
  return gap < 0 ? `$${amount} short` : `$${amount} over`;
}
