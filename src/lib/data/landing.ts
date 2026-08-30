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
    id: "household",
    title: "BOGO household favorites",
    detail: "Paper, laundry, and cleaning essentials for the week.",
    href: "/shop?category=household",
  },
  {
    id: "vitamins",
    title: "Buy 1, get 1 free vitamins",
    detail: "Select same-brand vitamins & supplements.",
    href: "/shop?category=vitamins",
  },
  {
    id: "snacks",
    title: "2 for $5 candy & snacks",
    detail: "Checkout-aisle picks for the ride home.",
    href: "/shop?category=snacks",
  },
];

export const LANDING_HEALTH: LandingHealthStory[] = [
  {
    id: "flu",
    title: "Plan ahead for flu season",
    description:
      "Flu shot appointments are available — walk in or schedule online.",
    href: "/pharmacy/schedule?service=svc-flu",
    cta: "Schedule a flu shot",
  },
  {
    id: "weight",
    title: "Weight-loss medication consults",
    description:
      "Explore GLP-1 options with a clinician visit in select states.",
    href: "/pharmacy/schedule?service=svc-weight",
    cta: "Learn about visits",
  },
  {
    id: "alerts",
    title: "Real-time prescription alerts",
    description: "Know when your Rx moves from filling to ready — without guessing.",
    href: "/pharmacy",
    cta: "Track a prescription",
  },
  {
    id: "chat",
    title: "Pharmacy Chat & screening kits",
    description:
      "Ask a pharmacy expert or request at-home screening information.",
    href: "/help",
    cta: "Get health help",
  },
];

export const LANDING_CATEGORIES: LandingCategory[] = [
  {
    id: "skincare",
    name: "Beauty & skincare",
    href: "/shop?category=skincare",
    imageUrl: "/images/beauty-shop.jpg",
    imageAlt: "Shopper browsing skincare bottles in a drugstore aisle",
  },
  {
    id: "vitamins",
    name: "Vitamins & OTC",
    href: "/shop?category=vitamins",
    imageUrl: "/images/vitamins-aisle.jpg",
    imageAlt: "Hand selecting vitamins from a drugstore shelf",
  },
  {
    id: "household",
    name: "Household",
    href: "/shop?category=household",
    imageUrl: "/images/pickup-order.jpg",
    imageAlt: "Customer picking up everyday drugstore essentials",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    href: "/pharmacy",
    imageUrl: "/images/hero-pharmacist.jpg",
    imageAlt: "Pharmacist helping a customer at the prescription counter",
  },
  {
    id: "baby",
    name: "Baby & family",
    href: "/shop?category=baby",
    imageUrl: "/images/family-care.jpg",
    imageAlt: "Family walking together outdoors",
  },
  {
    id: "photo",
    name: "Photo",
    href: "/photo",
    imageUrl: "/images/health-flu.jpg",
    imageAlt: "Neighborhood drugstore services including photo and care",
  },
  {
    id: "contacts",
    name: "Contacts & eye",
    href: "/shop?category=contacts",
    imageUrl: "/images/vitamins-aisle.jpg",
    imageAlt: "Eye care and contact lens essentials on a drugstore shelf",
  },
];
