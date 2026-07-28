import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export const metadata: Metadata = {
  title: "Digital checkout",
  description:
    "Native Trump RX digital checkout — issue counter-price coupon passes without leaving the site.",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-[70dvh] bg-background">
      <CheckoutClient />
    </div>
  );
}
