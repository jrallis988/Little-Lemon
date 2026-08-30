import type { Coupon } from "@/lib/types";

export interface WeeklyAdItem {
  id: string;
  title: string;
  detail: string;
  href: string;
  badge?: string;
  endsLabel: string;
}

export interface PersonalizedOffer {
  id: string;
  title: string;
  detail: string;
  href: string;
  exclusive?: boolean;
}

export const WEEKLY_AD_PERIOD = {
  startLabel: "Aug 23",
  endLabel: "Aug 29",
  headline: "This week’s circular",
};

export const WEEKLY_AD: WeeklyAdItem[] = [
  {
    id: "ad-sitewide",
    title: "$10 off $50+ sitewide",
    detail: "Use code AUG10 on qualifying orders.",
    href: "/shop",
    badge: "Code AUG10",
    endsLabel: "Ends Aug 29",
  },
  {
    id: "ad-bts",
    title: "Up to 25% off back-to-school",
    detail: "Notebooks, travel sizes, and seasonal must-haves.",
    href: "/shop?category=personal-care",
    endsLabel: "Ends Aug 29",
  },
  {
    id: "ad-vitamins",
    title: "Buy 1, get 1 free vitamins",
    detail: "Select same-brand vitamins & supplements.",
    href: "/shop?category=vitamins",
    badge: "BOGO",
    endsLabel: "Ends Aug 29",
  },
  {
    id: "ad-household",
    title: "BOGO 50% off household",
    detail: "Paper, laundry, and cleaning essentials.",
    href: "/shop?category=household",
    badge: "BOGO",
    endsLabel: "Ends Aug 29",
  },
  {
    id: "ad-baby",
    title: "Pampers 2/$23 + $4 rewards",
    detail: "myWalgreens exclusive on select diapers.",
    href: "/shop?category=baby",
    badge: "myW",
    endsLabel: "Ends Aug 29",
  },
  {
    id: "ad-snacks",
    title: "2 for $5 candy & snacks",
    detail: "Checkout-aisle picks for the ride home.",
    href: "/shop?category=snacks",
    endsLabel: "Ends Aug 29",
  },
  {
    id: "ad-contacts",
    title: "20% off contacts",
    detail: "Stock up with code DEAL20.",
    href: "/shop?category=contacts",
    badge: "Code DEAL20",
    endsLabel: "Ends Aug 29",
  },
  {
    id: "ad-photo",
    title: "50% off prints & enlargements",
    detail: "Same-day pickup at your selected store.",
    href: "/photo",
    endsLabel: "Ends Aug 29",
  },
];

export const PERSONALIZED_OFFERS: PersonalizedOffer[] = [
  {
    id: "for-you-1",
    title: "Extra 10% off pickup",
    detail: "Because you usually grab orders at Market & 5th.",
    href: "/shop",
    exclusive: true,
  },
  {
    id: "for-you-2",
    title: "$4 Walgreens Cash on oral care",
    detail: "Clip and earn when you buy 2+ select toothpastes.",
    href: "/shop?category=personal-care",
    exclusive: true,
  },
  {
    id: "for-you-3",
    title: "Flu shot + $15 Cash",
    detail: "Schedule today, earn rewards on your next trip.",
    href: "/pharmacy/schedule?service=svc-flu",
  },
];

export const COUPONS: Coupon[] = [
  {
    code: "FAST15",
    label: "15% off",
    description: "15% off your order (max $15).",
    percentOff: 15,
    minSubtotal: 20,
  },
  {
    code: "STOCKUP25",
    label: "$5 off",
    description: "$5 off orders $25+.",
    amountOff: 5,
    minSubtotal: 25,
  },
  {
    code: "WELCOME10",
    label: "$10 off",
    description: "$10 off your first order of $40+.",
    amountOff: 10,
    minSubtotal: 40,
  },
  {
    code: "AUG10",
    label: "$10 off $50+",
    description: "$10 off orders $50+ this week.",
    amountOff: 10,
    minSubtotal: 50,
  },
  {
    code: "DEAL20",
    label: "20% off",
    description: "20% off contacts & eye care (max $20).",
    percentOff: 20,
    minSubtotal: 30,
  },
  {
    code: "PICKUP10",
    label: "10% off pickup",
    description: "10% off pickup orders (max $10).",
    percentOff: 10,
    minSubtotal: 15,
  },
  {
    code: "WAG10",
    label: "10% off sitewide",
    description: "10% off qualifying orders (max $10).",
    percentOff: 10,
    minSubtotal: 25,
  },
];

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return COUPONS.find((coupon) => coupon.code === normalized);
}

export function getCouponDiscount(coupon: Coupon, subtotal: number): number {
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0;
  if (coupon.percentOff) {
    const raw = (subtotal * coupon.percentOff) / 100;
    const cap = coupon.percentOff >= 20 ? 20 : 15;
    return Math.min(cap, Math.round(raw * 100) / 100);
  }
  if (coupon.amountOff) {
    return Math.min(coupon.amountOff, subtotal);
  }
  return 0;
}
