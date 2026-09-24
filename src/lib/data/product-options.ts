import { PRODUCTS } from "@/lib/data/catalog";
import type { Product } from "@/lib/types";

export interface ProductSizeOption {
  id: string;
  label: string;
  price: number;
  compareAtPrice?: number;
}

export interface ProductGalleryShot {
  id: string;
  label: string;
  filter: string;
}

const SIZE_PRESETS: Record<string, { label: string; multiplier: number }[]> = {
  skincare: [
    { label: "1.7 oz", multiplier: 0.72 },
    { label: "12 oz", multiplier: 1 },
    { label: "16 oz", multiplier: 1.28 },
  ],
  vitamins: [
    { label: "60 count", multiplier: 0.85 },
    { label: "100 count", multiplier: 1 },
    { label: "250 count", multiplier: 1.45 },
  ],
  "personal-care": [
    { label: "Travel", multiplier: 0.65 },
    { label: "Standard", multiplier: 1 },
    { label: "Value pack", multiplier: 1.35 },
  ],
  "first-aid": [
    { label: "24 ct", multiplier: 0.8 },
    { label: "50 ct", multiplier: 1 },
    { label: "100 ct", multiplier: 1.4 },
  ],
  household: [
    { label: "Small", multiplier: 0.75 },
    { label: "Regular", multiplier: 1 },
    { label: "Family", multiplier: 1.5 },
  ],
  baby: [
    { label: "Travel", multiplier: 0.7 },
    { label: "Standard", multiplier: 1 },
    { label: "Jumbo", multiplier: 1.4 },
  ],
  snacks: [
    { label: "Single", multiplier: 0.55 },
    { label: "Standard", multiplier: 1 },
    { label: "Share size", multiplier: 1.3 },
  ],
  contacts: [
    { label: "6 lenses", multiplier: 0.9 },
    { label: "12 lenses", multiplier: 1 },
    { label: "24 lenses", multiplier: 1.55 },
  ],
};

function money(value: number): number {
  return Math.round(value * 100) / 100;
}

export function getSizeOptions(product: Product): ProductSizeOption[] {
  const presets = SIZE_PRESETS[product.categoryId] ?? [
    { label: "Standard", multiplier: 1 },
  ];
  return presets.map((preset, index) => ({
    id: `${product.id}-size-${index}`,
    label: preset.label,
    price: money(product.price * preset.multiplier),
    compareAtPrice: product.compareAtPrice
      ? money(product.compareAtPrice * preset.multiplier)
      : undefined,
  }));
}

export function getGalleryShots(product: Product): ProductGalleryShot[] {
  return [
    { id: `${product.id}-front`, label: "Front", filter: "none" },
    {
      id: `${product.id}-detail`,
      label: "Detail",
      filter: "saturate(1.15) contrast(1.05)",
    },
    {
      id: `${product.id}-lifestyle`,
      label: "In use",
      filter: "brightness(1.06) hue-rotate(-8deg)",
    },
  ];
}

export function getFrequentlyBoughtWith(
  product: Product,
  limit = 2,
): Product[] {
  return PRODUCTS.filter(
    (item) =>
      item.id !== product.id &&
      item.inStock &&
      (item.categoryId === product.categoryId ||
        item.brand === product.brand),
  )
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export type ShopSort =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "name";

export function sortProducts(
  products: Product[],
  sort: ShopSort,
): Product[] {
  const next = [...products];
  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => a.price - b.price);
    case "price-desc":
      return next.sort((a, b) => b.price - a.price);
    case "rating":
      return next.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      );
    case "name":
      return next.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      return next;
  }
}
