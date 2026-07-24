import type { Metadata } from "next";

import { ProductDiscoveryGrid } from "@/components/shop/product-discovery";

export const metadata: Metadata = {
  title: "Shop Health & Beauty",
  description:
    "Browse health and beauty with clear filters and myWalgreens rewards.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <ProductDiscoveryGrid />
    </div>
  );
}
