export interface LandingDeal {
  id: string;
  title: string;
  detail: string;
  href: string;
}

export interface LandingHealthStory {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface LandingCategory {
  id: string;
  name: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
}

/** Content inspired by current walgreens.com homepage messaging. */
export const LANDING_DEALS: LandingDeal[] = [
  {
    id: "pickup",
    title: "15% off pickup orders",
    detail: "Use code FAST15 on qualifying pickup orders.",
    href: "/shop",
  },
  {
    id: "summer",
    title: "Up to 25% off summer essentials",
    detail: "Sunscreen, travel sizes, and seasonal must-haves.",
    href: "/shop?category=skincare",
  },
  {
    id: "vitamins",
    title: "Buy 1, get 1 free vitamins",
    detail: "Select same-brand vitamins & supplements.",
    href: "/shop?category=vitamins",
  },
  {
    id: "wellness",
    title: "BOGO 50% off Walgreens health",
    detail: "Select Walgreens branded health & wellness items.",
    href: "/shop",
  },
];

export const LANDING_HEALTH: LandingHealthStory[] = [
  {
    id: "flu",
    title: "Plan ahead for flu season",
    description: "Flu shot appointments are available at your neighborhood pharmacy.",
    href: "/pharmacy#services",
    cta: "Schedule a flu shot",
  },
  {
    id: "alerts",
    title: "Real-time prescription alerts",
    description: "Know when your Rx moves from filling to ready — without guessing.",
    href: "/pharmacy",
    cta: "Track a prescription",
  },
  {
    id: "testing",
    title: "Testing & clinical care",
    description: "Strep, flu testing, and pharmacist-led care when you need answers fast.",
    href: "/pharmacy#services",
    cta: "Explore services",
  },
];

export const LANDING_CATEGORIES: LandingCategory[] = [
  {
    id: "skincare",
    name: "Skincare",
    href: "/shop?category=skincare",
    imageUrl: "/images/beauty-shop.jpg",
    imageAlt: "Shopper browsing skincare bottles in a drugstore aisle",
  },
  {
    id: "vitamins",
    name: "Vitamins",
    href: "/shop?category=vitamins",
    imageUrl: "/images/vitamins-aisle.jpg",
    imageAlt: "Hand selecting vitamins from a drugstore shelf",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    href: "/pharmacy",
    imageUrl: "/images/hero-pharmacist.jpg",
    imageAlt: "Pharmacist helping a customer at the prescription counter",
  },
  {
    id: "care",
    name: "Family care",
    href: "/pharmacy",
    imageUrl: "/images/family-care.jpg",
    imageAlt: "Family walking together outdoors",
  },
];
