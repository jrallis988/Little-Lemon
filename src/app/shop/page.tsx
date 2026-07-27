import { Suspense } from "react";
import type { Metadata } from "next";

import { ProductDiscoveryGrid } from "@/components/shop/product-discovery";

export const metadata: Metadata = {
  title: "Shop Health & Beauty",
  description:
    "Browse health and beauty with clear filters and myWalgreens rewards.",
};

function ShopFallback() {
  return (
    <div className="space-y-4" aria-hidden>
      <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />
      <div className="h-5 w-96 max-w-full animate-pulse rounded bg-muted" />
      <div className="h-24 animate-pulse rounded-2xl bg-muted" />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="aspect-square animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Suspense fallback={<ShopFallback />}>
        <ProductDiscoveryGrid />
      </Suspense>
    </div>
  );
}
