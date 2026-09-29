"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  CalendarClock,
  Pill,
  Search,
  ShoppingBag,
  Stethoscope,
} from "lucide-react";

import {
  formatPickupEta,
  getStoreInventory,
} from "@/lib/data/inventory";
import {
  SEARCH_INTENT_LABEL,
} from "@/lib/pharmacy";
import { buildSearchResults, intentSectionTitle } from "@/lib/search";
import { useSelectedStore } from "@/lib/store/store-selection";
import type { SearchIntent, SearchSuggestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-discovery";

const INTENT_ICON: Record<SearchIntent, typeof Search> = {
  clinical: Stethoscope,
  pharmacy: Pill,
  retail: ShoppingBag,
  general: Search,
};

const INTENT_STYLES: Record<SearchIntent, string> = {
  clinical: "bg-health/15 text-health border-health/20",
  pharmacy: "bg-brand/10 text-brand border-brand/20",
  retail: "bg-secondary text-secondary-foreground border-border",
  general: "bg-muted text-muted-foreground border-border",
};

function SuggestionList({ items }: { items: SearchSuggestion[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const Icon = INTENT_ICON[item.intent];
        return (
          <li key={item.id}>
            <Link
              href={item.href}
              className="flex items-start gap-3 rounded-xl border border-border/80 bg-surface-elevated/90 px-4 py-3 transition-colors hover:border-brand/30"
            >
              <span
                className={cn(
                  "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border",
                  INTENT_STYLES[item.intent],
                )}
              >
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-foreground">{item.label}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] uppercase tracking-wide",
                      INTENT_STYLES[item.intent],
                    )}
                  >
                    {SEARCH_INTENT_LABEL[item.intent]}
                  </Badge>
                </span>
                {item.meta ? (
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {item.meta}
                  </span>
                ) : null}
              </span>
              {item.intent === "clinical" ? (
                <CalendarClock
                  className="mt-1 size-4 shrink-0 text-health"
                  aria-hidden
                />
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SearchResults() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("q")?.trim() ?? "";
  const { store } = useSelectedStore();
  const results = useMemo(() => buildSearchResults(rawQuery), [rawQuery]);

  const total =
    results.retail.length + results.clinical.length + results.pharmacy.length;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {rawQuery ? "Search results" : "Search Walgreens RX"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {rawQuery ? (
            <>
              {total} result{total === 1 ? "" : "s"} for{" "}
              <span className="font-medium text-foreground">“{rawQuery}”</span>
              {" · "}
              availability at {store.name.replace(/^Walgreens RX —\s*/, "")}
            </>
          ) : (
            "Try flu shot, refill, moisturizer, or a brand name."
          )}
        </p>
        {results.didYouMean && results.didYouMean !== rawQuery.toLowerCase() ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Showing results for{" "}
            <Link
              href={`/search?q=${encodeURIComponent(results.didYouMean)}`}
              className="font-medium text-brand underline-offset-2 hover:underline"
            >
              {results.didYouMean}
            </Link>
            . Search instead for “{rawQuery}”?
          </p>
        ) : null}
      </div>

      {!rawQuery ? (
        <section className="space-y-4">
          <h2 className="font-display text-xl font-semibold">Popular searches</h2>
          <SuggestionList items={results.curated} />
        </section>
      ) : null}

      {rawQuery && total === 0 ? (
        <div className="space-y-4 rounded-2xl border border-dashed border-border p-8">
          <p className="text-sm text-muted-foreground">
            No exact matches for “{rawQuery}”. Try a broader term or browse an
            aisle.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/shop?category=skincare" />}
            >
              Beauty & skincare
            </Button>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/pharmacy" />}
            >
              Pharmacy
            </Button>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/pharmacy/schedule" />}
            >
              Schedule a visit
            </Button>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/deals" />}
            >
              Weekly deals
            </Button>
          </div>
        </div>
      ) : null}

      {results.clinical.length > 0 ? (
        <section aria-labelledby="search-clinical-heading" className="space-y-4">
          <h2
            id="search-clinical-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            {intentSectionTitle("clinical")}
          </h2>
          <SuggestionList items={results.clinical} />
        </section>
      ) : null}

      {results.pharmacy.length > 0 ? (
        <section aria-labelledby="search-pharmacy-heading" className="space-y-4">
          <h2
            id="search-pharmacy-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            {intentSectionTitle("pharmacy")}
          </h2>
          <SuggestionList items={results.pharmacy} />
        </section>
      ) : null}

      {results.retail.length > 0 ? (
        <section aria-labelledby="search-retail-heading" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2
                id="search-retail-heading"
                className="font-display text-2xl font-semibold tracking-tight"
              >
                {intentSectionTitle("retail")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pickup ETAs reflect{" "}
                {store.name.replace(/^Walgreens RX —\s*/, "")} ·{" "}
                {formatPickupEta(
                  getStoreInventory(store.id, results.retail[0]).pickupMinutes,
                )}{" "}
                typical
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={
                <Link href={`/shop?q=${encodeURIComponent(results.query)}`} />
              }
            >
              Open in shop filters
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.retail.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
