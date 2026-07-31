"use client";

import { useMemo, useState } from "react";
import {
  STORE_CATEGORIES,
  productsByCategory,
  type StoreCategory,
} from "@/lib/store";
import { ProductCard } from "@/components/store/ProductCard";

export function ShopCatalog() {
  const [category, setCategory] = useState<StoreCategory | "all">("all");
  const products = useMemo(() => productsByCategory(category), [category]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Product categories"
      >
        {STORE_CATEGORIES.map((cat) => {
          const selected = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setCategory(cat.id)}
              className={`rounded-cta border px-4 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "border-navy bg-navy text-white"
                  : "border-slate-line bg-white text-slate-text hover:border-navy"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </ul>
    </div>
  );
}
