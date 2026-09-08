"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { useWishlist } from "@/lib/store/wishlist";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-discovery";

export default function WishlistPage() {
  const { products, count } = useWishlist();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Wishlist
          </h1>
          <p className="mt-2 text-muted-foreground">
            {count === 0
              ? "Save drugstore finds for later — stored in this browser."
              : `${count} saved item${count === 1 ? "" : "s"}.`}
          </p>
        </div>
        <Button variant="outline" nativeButton={false} render={<Link href="/shop" />}>
          Continue shopping
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
          <Heart className="mx-auto size-8 text-muted-foreground" aria-hidden />
          <p className="mt-4 text-sm text-muted-foreground">
            Your wishlist is empty. Open a product and tap Save for later.
          </p>
          <Button
            className="mt-6 bg-brand text-brand-foreground hover:bg-brand/90"
            nativeButton={false}
            render={<Link href="/shop" />}
          >
            Browse shop
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
