import type { Metadata } from "next";
import { PageHero } from "@/components/PageChrome";
import { CartView } from "@/components/store/CartViews";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your Varga for Senate store cart.",
};

export default function CartPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/shop", label: "Store" },
          { label: "Cart" },
        ]}
        overline="Store"
        title="Your cart"
        subtitle="Review apparel and collateral before checkout."
      />
      <div className="mx-auto max-w-content section-pad">
        <CartView />
      </div>
    </>
  );
}
