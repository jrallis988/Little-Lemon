import type { Metadata } from "next";
import { PageHero } from "@/components/PageChrome";
import { CheckoutForm } from "@/components/store/CartViews";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout for Varga for Senate store orders.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/shop", label: "Store" },
          { href: "/shop/cart", label: "Cart" },
          { label: "Checkout" },
        ]}
        overline="Store"
        title="Checkout"
        subtitle="Tell us where to ship — we’ll confirm payment and totals before charging."
      />
      <div className="mx-auto max-w-content section-pad">
        <CheckoutForm />
      </div>
    </>
  );
}
