"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import {
  STORE_CATEGORIES,
  productsByCategory,
  type StoreCategory,
} from "@/lib/store";
import { ProductCard } from "@/components/store/ProductCard";
import { useStore } from "@/components/store/StoreProvider";

export function ShopCatalog() {
  const [category, setCategory] = useState<StoreCategory | "all">("all");
  const products = useMemo(() => productsByCategory(category), [category]);
  const { itemCount, ready } = useStore();
  const count = ready ? itemCount : 0;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

        <Link
          href="/shop/cart"
          className="inline-flex items-center justify-center gap-2 rounded-cta border border-slate-line bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-navy"
          aria-label={count ? `View cart, ${count} items` : "View cart"}
        >
          <ShoppingBag className="h-4 w-4" aria-hidden />
          Cart
          {count > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red px-1.5 text-[0.65rem] font-bold text-white">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </Link>
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </ul>
    </div>
  );
}
