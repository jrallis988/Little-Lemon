import type { Coupon } from "@/lib/types";

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
];

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return COUPONS.find((coupon) => coupon.code === normalized);
}

export function getCouponDiscount(coupon: Coupon, subtotal: number): number {
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0;
  if (coupon.percentOff) {
    const raw = (subtotal * coupon.percentOff) / 100;
    return Math.min(15, Math.round(raw * 100) / 100);
  }
  if (coupon.amountOff) {
    return Math.min(coupon.amountOff, subtotal);
  }
  return 0;
}
