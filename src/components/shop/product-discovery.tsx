"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, Star } from "lucide-react";

import { PRODUCT_FILTERS, PRODUCTS, REWARDS } from "@/lib/data/catalog";
import { formatCurrency, formatPoints } from "@/lib/pharmacy";
import { useCart } from "@/lib/store/cart";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function matchesPrice(product: Product, range: string): boolean {
  const [min, max] = range.split("-").map(Number);
  return product.price >= min && product.price <= max;
}

export function CategoryFilters({
  selectedCategories,
  selectedBrands,
  selectedPrices,
  selectedFulfillment,
  onToggleCategory,
  onToggleBrand,
  onTogglePrice,
  onToggleFulfillment,
}: {
  selectedCategories: string[];
  selectedBrands: string[];
  selectedPrices: string[];
  selectedFulfillment: string[];
  onToggleCategory: (value: string) => void;
  onToggleBrand: (value: string) => void;
  onTogglePrice: (value: string) => void;
  onToggleFulfillment: (value: string) => void;
}) {
  const groups = [
    {
      title: "Category",
      options: PRODUCT_FILTERS.categories,
      selected: selectedCategories,
      onToggle: onToggleCategory,
    },
    {
      title: "Brand",
      options: PRODUCT_FILTERS.brands,
      selected: selectedBrands,
      onToggle: onToggleBrand,
    },
    {
      title: "Price",
      options: PRODUCT_FILTERS.priceRanges,
      selected: selectedPrices,
      onToggle: onTogglePrice,
    },
    {
      title: "Fulfillment",
      options: PRODUCT_FILTERS.fulfillment,
      selected: selectedFulfillment,
      onToggle: onToggleFulfillment,
    },
  ] as const;

  return (
    <aside
      aria-label="Product filters"
      className="space-y-6 rounded-2xl border border-border/80 bg-surface-elevated/80 p-5"
    >
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">
          Filters
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Narrow health and beauty finds without clutter.
        </p>
      </div>
      {groups.map((group) => (
        <fieldset key={group.title} className="space-y-3">
          <legend className="text-sm font-semibold text-foreground">
            {group.title}
          </legend>
          <div className="space-y-2">
            {group.options.map((option) => {
              const id = `${group.title}-${option.id}`;
              const checked = group.selected.includes(option.value);
              return (
                <div key={option.id} className="flex items-center gap-2">
                  <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={() => group.onToggle(option.value)}
                  />
                  <Label
                    htmlFor={id}
                    className="flex flex-1 cursor-pointer items-center justify-between text-sm font-normal"
                  >
                    <span>{option.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {option.count}
                    </span>
                  </Label>
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}
    </aside>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    addProduct(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <article className="group flex flex-col">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted/50">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="mt-3">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {product.brand}
          </p>
          <h3 className="mt-1 text-sm font-semibold text-foreground group-hover:underline">
            {product.name}
          </h3>
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-current text-brand" aria-hidden />
            <span>
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </span>
          </p>
          <div className="mt-3 flex items-end justify-between gap-2">
            <div>
              <p className="text-base font-semibold text-foreground">
                {formatCurrency(product.price)}
              </p>
              {product.compareAtPrice ? (
                <p className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.compareAtPrice)}
                </p>
              ) : null}
            </div>
            {product.rewardsPoints ? (
              <Badge
                variant="outline"
                className="border-brand/25 bg-brand/5 text-[10px] text-brand"
              >
                +{product.rewardsPoints} pts
              </Badge>
            ) : null}
          </div>
        </div>
      </Link>
      <Button
        className="mt-4 w-full bg-brand text-brand-foreground hover:bg-brand/90"
        size="sm"
        onClick={handleAdd}
        aria-live="polite"
      >
        {justAdded ? (
          <>
            <Check className="size-4" aria-hidden />
            Added
          </>
        ) : (
          "Add to cart"
        )}
      </Button>
    </article>
  );
}

export function RewardsBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-brand/20 bg-brand/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div>
        <p className="font-display text-lg font-semibold text-brand">
          myWalgreens
        </p>
        <p className="text-sm text-muted-foreground">
          {formatPoints(REWARDS.pointsBalance)} points ·{" "}
          {REWARDS.pointsToNextReward} to your next reward
        </p>
      </div>
      <Badge className="w-fit bg-brand text-brand-foreground hover:bg-brand">
        {REWARDS.tier} member
      </Badge>
    </div>
  );
}

export function ProductDiscoveryGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const categoryParam = searchParams.get("category");

  const [categories, setCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : [],
  );
  const [brands, setBrands] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [fulfillment, setFulfillment] = useState<string[]>([]);

  useEffect(() => {
    if (categoryParam) {
      setCategories([categoryParam]);
    }
  }, [categoryParam]);

  function toggle(
    setter: typeof setCategories,
    value: string,
    syncCategory = false,
  ) {
    setter((current) => {
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      if (syncCategory) {
        const params = new URLSearchParams(searchParams.toString());
        if (next.length === 1) {
          params.set("category", next[0]);
        } else {
          params.delete("category");
        }
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      }

      return next;
    });
  }

  const products = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return PRODUCTS.filter((product) => {
      if (categories.length && !categories.includes(product.categoryId)) {
        return false;
      }
      if (brands.length && !brands.includes(product.brand)) {
        return false;
      }
      if (prices.length && !prices.some((range) => matchesPrice(product, range))) {
        return false;
      }
      if (
        fulfillment.length &&
        !fulfillment.some((method) =>
          product.fulfillment.includes(
            method as Product["fulfillment"][number],
          ),
        )
      ) {
        return false;
      }
      if (normalizedQuery) {
        const haystack = `${product.name} ${product.brand} ${product.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }
      return true;
    });
  }, [brands, categories, fulfillment, prices, query]);

  return (
    <section aria-labelledby="shop-heading" className="space-y-6">
      <div>
        <h1
          id="shop-heading"
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Shop the drugstore
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Beauty, OTC, household, baby, snacks — plus pickup-ready essentials.
          {query ? (
            <>
              {" "}
              Showing results for <span className="font-medium text-foreground">“{query}”</span>.
            </>
          ) : null}
        </p>
      </div>

      <RewardsBanner />

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <CategoryFilters
          selectedCategories={categories}
          selectedBrands={brands}
          selectedPrices={prices}
          selectedFulfillment={fulfillment}
          onToggleCategory={(value) => toggle(setCategories, value, true)}
          onToggleBrand={(value) => toggle(setBrands, value)}
          onTogglePrice={(value) => toggle(setPrices, value)}
          onToggleFulfillment={(value) => toggle(setFulfillment, value)}
        />

        <div>
          <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
            Showing {products.length} product{products.length === 1 ? "" : "s"}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {products.length === 0 ? (
            <div className="space-y-4 rounded-xl border border-dashed border-border p-8">
              <p className="text-sm text-muted-foreground">
                No products match these filters
                {query ? (
                  <>
                    {" "}
                    for <span className="font-medium text-foreground">“{query}”</span>
                  </>
                ) : null}
                . Clear filters or try a broader search.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCategories([]);
                    setBrands([]);
                    setPrices([]);
                    setFulfillment([]);
                    router.replace("/shop");
                  }}
                >
                  Clear all filters
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={<Link href="/shop?category=skincare" />}
                >
                  Browse skincare
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={<Link href="/deals" />}
                >
                  See weekly deals
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
