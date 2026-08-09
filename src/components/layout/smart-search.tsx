"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CalendarClock,
  Pill,
  Search,
  ShoppingBag,
  Stethoscope,
} from "lucide-react";

import { PRODUCTS, SEARCH_SUGGESTIONS } from "@/lib/data/catalog";
import {
  SEARCH_INTENT_DESCRIPTION,
  SEARCH_INTENT_LABEL,
} from "@/lib/pharmacy";
import type { SearchIntent, SearchSuggestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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

function productSuggestions(query: string): SearchSuggestion[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return PRODUCTS.filter((product) => {
    const haystack =
      `${product.name} ${product.brand} ${product.tags.join(" ")}`.toLowerCase();
    return haystack.includes(normalized);
  })
    .slice(0, 4)
    .map((product) => ({
      id: `product-${product.id}`,
      query: product.name,
      label: `${product.brand} ${product.name}`,
      intent: "retail" as const,
      href: `/shop/${product.slug}`,
      meta: product.inStock ? "In stock · view product" : "Currently unavailable",
    }));
}

function filterSuggestions(query: string): SearchSuggestion[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return SEARCH_SUGGESTIONS.slice(0, 5);
  }

  const curated = SEARCH_SUGGESTIONS.filter(
    (item) =>
      item.label.toLowerCase().includes(normalized) ||
      item.query.toLowerCase().includes(normalized) ||
      item.meta?.toLowerCase().includes(normalized),
  );
  const products = productSuggestions(normalized);
  const merged = [...products, ...curated];
  const seen = new Set<string>();
  return merged
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .slice(0, 8);
}

export function SmartSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => filterSuggestions(query), [query]);

  const intentCounts = useMemo(() => {
    return results.reduce(
      (acc, item) => {
        acc[item.intent] = (acc[item.intent] ?? 0) + 1;
        return acc;
      },
      {} as Partial<Record<SearchIntent, number>>,
    );
  }, [results]);

  function navigateToResult(href: string) {
    setOpen(false);
    router.push(href);
  }

  function submitSearch() {
    const trimmed = query.trim();
    if (results[activeIndex]) {
      navigateToResult(results[activeIndex].href);
      return;
    }
    if (trimmed) {
      navigateToResult(`/shop?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor="site-search" className="sr-only">
        Search pharmacy, clinical services, and products
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          id="site-search"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          aria-activedescendant={
            open && results[activeIndex]
              ? `search-option-${results[activeIndex].id}`
              : undefined
          }
          placeholder="Search refills, vaccines, or products"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 150);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              if (!open || results.length === 0) return;
              event.preventDefault();
              setActiveIndex((index) => (index + 1) % results.length);
            }
            if (event.key === "ArrowUp") {
              if (!open || results.length === 0) return;
              event.preventDefault();
              setActiveIndex(
                (index) => (index - 1 + results.length) % results.length,
              );
            }
            if (event.key === "Escape") {
              setOpen(false);
            }
            if (event.key === "Enter") {
              event.preventDefault();
              submitSearch();
            }
          }}
          className="h-11 border-border/80 bg-surface-elevated/90 pr-4 pl-10 shadow-none"
        />
      </div>

      {open && (
        <div
          id="search-suggestions"
          role="listbox"
          aria-label="Search suggestions"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-lg animate-rise"
        >
          <div className="flex flex-wrap gap-2 border-b border-border/70 px-3 py-2">
            {(Object.keys(intentCounts) as SearchIntent[]).map((intent) => (
              <Badge
                key={intent}
                variant="outline"
                className={cn("font-medium", INTENT_STYLES[intent])}
              >
                {SEARCH_INTENT_LABEL[intent]} · {intentCounts[intent]}
              </Badge>
            ))}
          </div>
          <ul className="max-h-80 overflow-auto py-1">
            {results.length === 0 ? (
              <li className="px-4 py-6 text-sm text-muted-foreground">
                No matches. Try “flu shot”, “refill”, or a product name.
              </li>
            ) : (
              results.map((item, index) => {
                const Icon = INTENT_ICON[item.intent];
                const isActive = index === activeIndex;
                return (
                  <li key={item.id} role="option" aria-selected={isActive}>
                    <Link
                      id={`search-option-${item.id}`}
                      href={item.href}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 transition-colors",
                        isActive ? "bg-muted/80" : "hover:bg-muted/60",
                      )}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => setOpen(false)}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border",
                          INTENT_STYLES[item.intent],
                        )}
                      >
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-foreground">
                            {item.label}
                          </span>
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
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {item.meta ?? SEARCH_INTENT_DESCRIPTION[item.intent]}
                        </span>
                      </span>
                      {item.intent === "clinical" && (
                        <CalendarClock
                          className="mt-1 size-4 shrink-0 text-health"
                          aria-hidden
                        />
                      )}
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
