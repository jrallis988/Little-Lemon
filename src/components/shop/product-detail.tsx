"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, Heart, MapPin, Star } from "lucide-react";

import {
  canShipProduct,
  getStoreInventory,
  storeAvailabilityDetail,
} from "@/lib/data/inventory";
import {
  getFrequentlyBoughtWith,
  getGalleryShots,
  getSizeOptions,
} from "@/lib/data/product-options";
import { getReviewsForProduct } from "@/lib/data/reviews";
import { formatCurrency } from "@/lib/pharmacy";
import { useCart } from "@/lib/store/cart";
import { useRecentlyViewed } from "@/lib/store/recently-viewed";
import { useSelectedStore } from "@/lib/store/store-selection";
import { useWishlist } from "@/lib/store/wishlist";
import type { Product } from "@/lib/types";
import { getProductDescription } from "@/lib/products";
import { cn } from "@/lib/utils";
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
  const { trackView } = useRecentlyViewed();
  const { store } = useSelectedStore();
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(product.id);
  const inventory = getStoreInventory(store.id, product);
  const availability = storeAvailabilityDetail(inventory, store, product);
  const availableHere = inventory.status !== "out";
  const canAdd = availableHere || canShipProduct(product);
  const sizes = useMemo(() => getSizeOptions(product), [product]);
  const gallery = useMemo(() => getGalleryShots(product), [product]);
  const frequentlyBought = useMemo(
    () => getFrequentlyBoughtWith(product),
    [product],
  );
  const defaultSizeId =
    sizes.find((size) => size.label === "Standard" || size.label === "12 oz" || size.label === "100 count" || size.label === "50 ct" || size.label === "Regular")
      ?.id ?? sizes[Math.min(1, sizes.length - 1)]?.id ?? sizes[0]?.id;

  const [selectedSizeId, setSelectedSizeId] = useState(defaultSizeId);
  const [activeShotId, setActiveShotId] = useState(gallery[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [bundleNote, setBundleNote] = useState<string | null>(null);
  const reviews = getReviewsForProduct(product.id);

  const selectedSize =
    sizes.find((size) => size.id === selectedSizeId) ?? sizes[0];
  const activeShot =
    gallery.find((shot) => shot.id === activeShotId) ?? gallery[0];

  useEffect(() => {
    trackView(product.id);
    setSelectedSizeId(defaultSizeId);
    setActiveShotId(gallery[0]?.id);
  }, [defaultSizeId, gallery, product.id, trackView]);

  function handleAdd() {
    if (!canAdd || !selectedSize) return;
    addProduct(
      {
        ...product,
        id: `${product.id}::${selectedSize.id}`,
        name: `${product.name} · ${selectedSize.label}`,
        price: selectedSize.price,
        compareAtPrice: selectedSize.compareAtPrice,
      },
      quantity,
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  function handleAddBundle(extra: Product) {
    handleAdd();
    addProduct(extra, 1);
    setBundleNote(`Added ${product.name} + ${extra.name} to cart`);
    window.setTimeout(() => setBundleNote(null), 2200);
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
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/50">
            <Image
              src={product.imageUrl}
              alt={product.imageAlt}
              fill
              priority
              className="object-cover transition-[filter] duration-500"
              style={{ filter: activeShot?.filter ?? "none" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex gap-2" role="tablist" aria-label="Product images">
            {gallery.map((shot) => (
              <button
                key={shot.id}
                type="button"
                role="tab"
                aria-selected={shot.id === activeShot?.id}
                onClick={() => setActiveShotId(shot.id)}
                className={cn(
                  "relative h-16 w-16 overflow-hidden rounded-lg border bg-muted/40",
                  shot.id === activeShot?.id
                    ? "border-brand ring-1 ring-brand/30"
                    : "border-border",
                )}
              >
                <Image
                  src={product.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ filter: shot.filter }}
                  sizes="64px"
                />
                <span className="sr-only">{shot.label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Viewing {activeShot?.label ?? "Front"} · {inventory.aisle}
          </p>
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
            <p className="text-2xl font-semibold">
              {formatCurrency(selectedSize?.price ?? product.price)}
            </p>
            {(selectedSize?.compareAtPrice ?? product.compareAtPrice) ? (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(
                  selectedSize?.compareAtPrice ?? product.compareAtPrice ?? 0,
                )}
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

          <fieldset className="mt-6 space-y-2">
            <legend className="text-sm font-medium text-foreground">Size</legend>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSelectedSizeId(size.id)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm transition-colors",
                    size.id === selectedSize?.id
                      ? "border-brand bg-brand/5 font-medium text-brand"
                      : "border-border text-foreground hover:border-brand/40",
                  )}
                  aria-pressed={size.id === selectedSize?.id}
                >
                  <span className="block">{size.label}</span>
                  <span className="block text-xs text-muted-foreground">
                    {formatCurrency(size.price)}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">At your store</dt>
              <dd
                className={cn(
                  "font-medium",
                  availability.tone === "ok" && "text-health",
                  availability.tone === "warn" && "text-brand",
                  availability.tone === "bad" && "text-destructive",
                )}
              >
                {availability.title}
              </dd>
              <dd className="mt-1 text-xs text-muted-foreground">
                {availability.detail}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Fulfillment</dt>
              <dd className="font-medium capitalize">
                {product.fulfillment.join(" · ").replaceAll("_", " ")}
              </dd>
              <dd className="mt-1 text-xs text-muted-foreground">
                {availableHere
                  ? `${inventory.aisle} · pickup or later delivery`
                  : canShipProduct(product)
                    ? "Pickup unavailable here · shipping still open"
                    : "Not available for pickup or ship"}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-border/80 bg-muted/40 px-4 py-3 text-sm">
            <MapPin className="size-4 shrink-0 text-brand" aria-hidden />
            <p className="min-w-0 flex-1 text-muted-foreground">
              Checking{" "}
              <span className="font-medium text-foreground">
                {store.name.replace(/^Walgreens RX —\s*/, "")}
              </span>
            </p>
            <Link
              href="/stores"
              className="shrink-0 font-medium text-brand underline-offset-2 hover:underline"
            >
              Change store
            </Link>
          </div>

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
              disabled={!canAdd}
              onClick={handleAdd}
            >
              {justAdded ? (
                <>
                  <Check className="size-4" aria-hidden />
                  Added to cart
                </>
              ) : !canAdd ? (
                "Unavailable"
              ) : availableHere ? (
                "Add to cart"
              ) : (
                "Add for shipping"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => toggle(product.id)}
              aria-pressed={saved}
            >
              <Heart
                className="size-4"
                fill={saved ? "currentColor" : "none"}
                aria-hidden
              />
              {saved ? "Saved" : "Save for later"}
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/pharmacy/chat" />}
            >
              Ask pharmacy
            </Button>
          </div>

          {bundleNote ? (
            <p className="mt-3 text-sm text-health" role="status">
              {bundleNote}
            </p>
          ) : null}

          {!canAdd ? (
            <p className="mt-3 text-sm text-destructive" role="status">
              This item is unavailable at your store and cannot ship. Try another
              store or a related product below.
            </p>
          ) : !availableHere ? (
            <p className="mt-3 text-sm text-muted-foreground" role="status">
              Out of stock for pickup here — you can still add it for shipping, or{" "}
              <Link
                href="/stores"
                className="font-medium text-brand underline-offset-2 hover:underline"
              >
                switch stores
              </Link>
              .
            </p>
          ) : null}
        </div>
      </div>

      {frequentlyBought.length > 0 ? (
        <section aria-labelledby="fbt-heading" className="space-y-4">
          <div>
            <h2
              id="fbt-heading"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              Frequently bought with
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pair your pick with aisle favorites members often add together.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {frequentlyBought.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-surface-elevated/90 p-4 sm:flex-row sm:items-center"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted/50">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {item.brand}
                  </p>
                  <Link
                    href={`/shop/${item.slug}`}
                    className="font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm font-semibold">
                    {formatCurrency(item.price)}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!canAdd}
                  onClick={() => handleAddBundle(item)}
                >
                  Add both
                </Button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="reviews-heading" className="space-y-4">
        <h2
          id="reviews-heading"
          className="font-display text-2xl font-semibold tracking-tight"
        >
          Customer reviews
        </h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No written reviews yet — be the first after pickup.
          </p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="border-t border-border pt-4 first:border-t-0 first:pt-0"
              >
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Star className="size-3.5 fill-current text-brand" aria-hidden />
                  {review.rating.toFixed(1)} · {review.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{review.body}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {review.author} · {review.postedAt}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

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
