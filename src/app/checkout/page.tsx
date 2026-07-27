import type { Metadata } from "next";

import { CheckoutFunnel } from "@/components/checkout/checkout-funnel";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Guest, member, and quick-pay checkout with visible rewards.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <CheckoutFunnel />
    </div>
  );
}
