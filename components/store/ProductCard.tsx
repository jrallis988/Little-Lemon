"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { ProductSize, StoreProduct } from "@/lib/store";
import { formatPrice } from "@/lib/store";
import { ProductArt } from "@/components/store/ProductArt";
import { useStore } from "@/components/store/StoreProvider";

export function ProductCard({ product }: { product: StoreProduct }) {
  return (
    <li className="flex flex-col border border-slate-line bg-white">
      <Link href={`/shop/${product.slug}`} className="block focus-visible:outline-none">
        <ProductArt product={product} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            {product.badge && (
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-red">
                {product.badge}
              </p>
            )}
            <h2 className="mt-1 font-display text-lg font-normal uppercase text-ink">
              <Link href={`/shop/${product.slug}`} className="hover:text-red">
                {product.name}
              </Link>
            </h2>
          </div>
          <p className="shrink-0 text-sm font-semibold text-navy">
            {formatPrice(product.priceCents)}
          </p>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-muted">
          {product.blurb}
        </p>
        <Link
          href={`/shop/${product.slug}`}
          className="btn-ghost mt-5 w-full text-center text-sm"
        >
          View details
        </Link>
      </div>
    </li>
  );
}

export function AddToCartPanel({ product }: { product: StoreProduct }) {
  const { addItem } = useStore();
  const needsSize = Boolean(product.sizes?.length);
  const [size, setSize] = useState<ProductSize | "">(needsSize ? "" : "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function onAdd() {
    if (needsSize && !size) return;
    addItem(product.slug, qty, size || undefined);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-5 border border-slate-line bg-white p-6">
      <p className="font-display text-2xl text-ink">{formatPrice(product.priceCents)}</p>

      {needsSize && (
        <fieldset>
          <legend className="label-field">Size</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes!.map((s) => {
              const selected = size === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-w-[3rem] rounded-cta border px-3 py-2 text-sm font-semibold ${
                    selected
                      ? "border-navy bg-navy text-white"
                      : "border-slate-line bg-warm-white text-slate-text hover:border-navy"
                  }`}
                  aria-pressed={selected}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {needsSize && !size && (
            <p className="mt-2 text-sm text-slate-muted">Select a size to add to cart.</p>
          )}
        </fieldset>
      )}

      <div>
        <label htmlFor="qty" className="label-field">
          Quantity
        </label>
        <input
          id="qty"
          type="number"
          min={1}
          max={99}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
          className="input-field mt-2 max-w-[8rem]"
        />
      </div>

      <button
        type="button"
        className="btn-primary w-full"
        onClick={onAdd}
        disabled={needsSize && !size}
      >
        <ShoppingBag className="h-4 w-4" aria-hidden />
        {added ? "Added to cart" : "Add to cart"}
      </button>

      <Link href="/shop/cart" className="link-cta text-sm">
        View cart →
      </Link>
    </div>
  );
}
