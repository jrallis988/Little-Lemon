import type { Metadata } from "next";
import { PageHero } from "@/components/PageChrome";
import { ShopCatalog } from "@/components/store/ShopCatalog";
import { candidate } from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Store",
  description: `Shop ${candidate.brandName} apparel and marketing collateral — tees, yard signs, stickers, and more.`,
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { label: "Store" },
        ]}
        overline="Campaign store"
        title="Apparel & marketing collateral"
        subtitle="Wear the message. Stock your block. Tees, hoodies, yard signs, stickers, and canvass kits — proceeds support neighbor-to-neighbor organizing."
      />
      <div className="mx-auto max-w-content section-pad">
        <ShopCatalog />
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-slate-muted">
          Paid for by {candidate.committee}. Contributions and merchandise purchases are not
          tax-deductible. Shipping calculated when we confirm your order request.
        </p>
      </div>
    </>
  );
}
