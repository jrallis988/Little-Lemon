export type StoreCategory = "apparel" | "collateral";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "2XL";

export type StoreProduct = {
  slug: string;
  name: string;
  category: StoreCategory;
  priceCents: number;
  blurb: string;
  description: string;
  accent: string;
  /** Optional apparel sizes; omit for one-size collateral */
  sizes?: ProductSize[];
  badge?: string;
};

export const STORE_CATEGORIES: { id: StoreCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "apparel", label: "Apparel" },
  { id: "collateral", label: "Marketing collateral" },
];

export const storeProducts: StoreProduct[] = [
  {
    slug: "people-over-politics-tee",
    name: "People Over Politics Tee",
    category: "apparel",
    priceCents: 2800,
    badge: "Best seller",
    blurb: "Soft cotton tee with the campaign lockup.",
    description:
      "Classic unisex fit in warm white. Front print: VARGA FOR SENATE mark with People Over Politics. Ships from New Hampshire.",
    accent: "#c62834",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    slug: "varga-navy-hoodie",
    name: "Campaign Navy Hoodie",
    category: "apparel",
    priceCents: 5200,
    blurb: "Heavyweight fleece for door-knocking weather.",
    description:
      "Navy pullover hoodie with embroidered brand mark on the chest. Midweight fleece — built for NH mornings.",
    accent: "#1a2a4e",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    slug: "write-in-cap",
    name: "Write-In Cap",
    category: "apparel",
    priceCents: 2400,
    blurb: "Structured cap with Write-In embroidery.",
    description:
      "Navy structured cap, adjustable strap, red Write-In / Varga mark. One size fits most.",
    accent: "#141f3a",
  },
  {
    slug: "violet-party-tee",
    name: "Violet Party Tee",
    category: "apparel",
    priceCents: 2800,
    blurb: "Not Red · Not Blue · Something New.",
    description:
      "Soft violet-tint tee with the Violet Party line. Unisex fit.",
    accent: "#6b4f9a",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    slug: "yard-sign",
    name: "Yard Sign",
    category: "collateral",
    priceCents: 1800,
    badge: "Neighborhood essential",
    blurb: "Corrugated double-sided sign with stake.",
    description:
      "18×24 corrugated plastic, double-sided print, includes H-stake. Weather-ready for Granite State seasons.",
    accent: "#c62834",
  },
  {
    slug: "bumper-sticker",
    name: "Bumper Sticker",
    category: "collateral",
    priceCents: 500,
    blurb: "Weatherproof vinyl for the commute.",
    description:
      "3×10 outdoor vinyl. People Over Politics with campaign brand. Ships in packs of one (order quantity for more).",
    accent: "#1a2a4e",
  },
  {
    slug: "window-cling",
    name: "Window Cling",
    category: "collateral",
    priceCents: 600,
    blurb: "Removable cling for cars and storefronts.",
    description:
      "Static cling — no adhesive residue. Reads clean from outside glass.",
    accent: "#c62834",
  },
  {
    slug: "lapel-buttons",
    name: "Lapel Button 5-Pack",
    category: "collateral",
    priceCents: 1200,
    blurb: "Pin-back buttons for events and canvass.",
    description:
      "Five 2.25″ pin-back buttons with mixed campaign art. Perfect for volunteer kits.",
    accent: "#1a2a4e",
  },
  {
    slug: "campaign-poster",
    name: "Campaign Poster",
    category: "collateral",
    priceCents: 1500,
    blurb: "11×17 poster for offices and walls.",
    description:
      "Heavyweight matte poster. Brand lockup + People Over Politics. Ships rolled.",
    accent: "#c62834",
  },
  {
    slug: "door-hangers",
    name: "Door Hanger 25-Pack",
    category: "collateral",
    priceCents: 2200,
    blurb: "Canvass-ready hangers with write-in tip.",
    description:
      "Twenty-five card-stock door hangers with QR to how-to-vote guidance. Sized for NH doors.",
    accent: "#1a2a4e",
  },
  {
    slug: "brochure-pack",
    name: "Brochure 50-Pack",
    category: "collateral",
    priceCents: 3500,
    blurb: "Tri-fold leave-behinds for events.",
    description:
      "Fifty tri-fold brochures: bio, priorities, write-in how-to. Print on recycled stock.",
    accent: "#6b4f9a",
  },
  {
    slug: "volunteer-tote",
    name: "Volunteer Tote",
    category: "apparel",
    priceCents: 2000,
    blurb: "Canvas tote for lit drops and markets.",
    description:
      "Natural canvas tote with navy/red brand print. Reinforced handles.",
    accent: "#ece7dd",
  },
];

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function getProduct(slug: string): StoreProduct | undefined {
  return storeProducts.find((p) => p.slug === slug);
}

export function productsByCategory(category: StoreCategory | "all"): StoreProduct[] {
  if (category === "all") return storeProducts;
  return storeProducts.filter((p) => p.category === category);
}

export function categoryLabel(category: StoreCategory): string {
  return category === "apparel" ? "Apparel" : "Marketing collateral";
}
