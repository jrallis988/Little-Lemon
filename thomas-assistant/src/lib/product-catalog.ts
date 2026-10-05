export interface Product {
  sku: string;
  name: string;
  unit: string;
  /** Usual on-hand count — used to prefill “should have”. */
  par?: number;
}

export const PRODUCT_UNITS = [
  "kegs",
  "cases",
  "bottles",
  "cans",
  "units",
] as const;

/** Starter brewery lineup — editable; not locked in. */
export const DEFAULT_CATALOG: Product[] = [
  { sku: "SKU-8842", name: "House Porter", unit: "kegs", par: 8 },
  { sku: "SKU-3310", name: "Session IPA", unit: "cases", par: 24 },
  { sku: "SKU-1104", name: "Golden Lager", unit: "cases", par: 20 },
  { sku: "SKU-2201", name: "Bright Pilsner", unit: "cases", par: 18 },
  { sku: "SKU-5500", name: "Cabernet Sauvignon", unit: "bottles", par: 36 },
];

/** @deprecated use getCatalog() — kept so older imports keep working */
export const PRODUCT_CATALOG = DEFAULT_CATALOG;

let liveCatalog: Product[] = DEFAULT_CATALOG.map((p) => ({ ...p }));

export function cloneDefaultCatalog(): Product[] {
  return DEFAULT_CATALOG.map((p) => ({ ...p }));
}

export function getCatalog(): Product[] {
  return liveCatalog;
}

export function setLiveCatalog(products: Product[]) {
  liveCatalog = products.map((p) => ({ ...p }));
}

export function lookupProduct(sku: string): Product | undefined {
  const key = sku.trim().toUpperCase();
  return liveCatalog.find((p) => p.sku.toUpperCase() === key);
}

export function lookupProductByName(name: string): Product | undefined {
  const key = name.trim().toLowerCase();
  return liveCatalog.find((p) => p.name.toLowerCase() === key);
}

export function productName(sku: string): string {
  return lookupProduct(sku)?.name ?? sku;
}

export function productUnit(sku: string): string {
  return lookupProduct(sku)?.unit ?? "units";
}

export function productPar(sku: string): number | undefined {
  return lookupProduct(sku)?.par;
}

export function nextHouseSku(existing: Product[] = liveCatalog): string {
  let max = 0;
  for (const p of existing) {
    const m = p.sku.match(/^HOUSE-(\d+)$/i);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return `HOUSE-${String(max + 1).padStart(3, "0")}`;
}

export function catalogNames(products: Product[] = liveCatalog): string {
  if (products.length === 0) return "(no products on the lineup yet)";
  return products.map((p) => p.name).join(", ");
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
