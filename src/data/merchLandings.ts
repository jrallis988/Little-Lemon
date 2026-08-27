import { PRODUCTS } from "@/data/products"
import { discountPercent } from "@/lib/utils"
import type { Product } from "@/types"

export type MerchSlug = "designer" | "under-50" | "clearance"

export type MerchLanding = {
  slug: MerchSlug
  /** Blueprint top-level path */
  path: string
  title: string
  eyebrow: string
  description: string
  ctaLabel: string
  heroImage: string
  accent: "navy" | "deal" | "sky"
  filter: (product: Product) => boolean
}

export const MERCH_LANDINGS: Record<MerchSlug, MerchLanding> = {
  designer: {
    slug: "designer",
    path: "/designer-shop",
    title: "Designer Shop",
    eyebrow: "Elevated labels",
    description:
      "Coach, Theory, Michael Kors, and more — designer and contemporary brands at off-price.",
    ctaLabel: "Browse designer finds",
    heroImage:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=80",
    accent: "navy",
    filter: (p) => p.brandTier === "Designer" || p.price >= 90,
  },
  "under-50": {
    slug: "under-50",
    path: "/under-50",
    title: "Under $50",
    eyebrow: "Gift-ready finds",
    description: "Style under fifty — perfect for everyday and last-minute gifting.",
    ctaLabel: "Shop under $50",
    heroImage:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    accent: "sky",
    filter: (p) => p.price < 50,
  },
  clearance: {
    slug: "clearance",
    path: "/clearance",
    title: "Clearance",
    eyebrow: "Extra markdowns",
    description: "Deepest discounts on already wow prices — while supplies last.",
    ctaLabel: "Shop clearance",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    accent: "deal",
    filter: (p) => discountPercent(p.compareAt, p.price) >= 45,
  },
}

/** Map blueprint paths and legacy `/shop/:slug` aliases to a merch slug */
export function resolveMerchSlug(raw: string | undefined): MerchSlug | null {
  if (!raw) return null
  const key = raw.toLowerCase().replace(/^\//, "")
  if (key === "designer-shop" || key === "designer") return "designer"
  if (key === "under-50" || key === "under50") return "under-50"
  if (key === "clearance") return "clearance"
  return null
}

export function curatedMerchProducts(slug: MerchSlug): Product[] {
  const landing = MERCH_LANDINGS[slug]
  return PRODUCTS.filter(landing.filter).filter((p) => p.inventory !== "out_of_stock")
}
