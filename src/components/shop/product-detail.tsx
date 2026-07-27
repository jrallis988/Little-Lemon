"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, Star } from "lucide-react";

import { formatCurrency } from "@/lib/pharmacy";
import { useCart } from "@/lib/store/cart";
import type { Product } from "@/lib/types";
import { getProductDescription } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-discovery";

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addProduct } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addProduct(product, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="space-y-12">
      <div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to shop
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/50">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-4 fill-current text-brand" aria-hidden />
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <p className="text-2xl font-semibold">{formatCurrency(product.price)}</p>
            {product.compareAtPrice ? (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            ) : null}
            {product.rewardsPoints ? (
              <Badge
                variant="outline"
                className="border-brand/25 bg-brand/5 text-brand"
              >
                +{product.rewardsPoints} pts
              </Badge>
            ) : null}
          </div>

          <p className="mt-5 max-w-prose text-muted-foreground">
            {getProductDescription(product)}
          </p>

          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Availability</dt>
              <dd className="font-medium">
                {product.inStock ? "In stock" : "Out of stock"}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Fulfillment</dt>
              <dd className="font-medium capitalize">
                {product.fulfillment.join(" · ").replaceAll("_", " ")}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Qty</span>
              <select
                className="h-9 rounded-lg border border-border bg-background px-2"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                aria-label="Quantity"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <Button
              className="bg-brand text-brand-foreground hover:bg-brand/90"
              disabled={!product.inStock}
              onClick={handleAdd}
            >
              {justAdded ? (
                <>
                  <Check className="size-4" aria-hidden />
                  Added to cart
                </>
              ) : (
                "Add to cart"
              )}
            </Button>
          </div>

          {!product.inStock ? (
            <p className="mt-3 text-sm text-destructive" role="status">
              This item is currently unavailable. Try a related product below.
            </p>
          ) : null}
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            You may also like
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
