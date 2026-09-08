"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Clock3, MapPin, Phone, Search } from "lucide-react";

import { useSelectedStore } from "@/lib/store/store-selection";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StorePicker({ redirectTo = "/pharmacy" }: { redirectTo?: string }) {
  const router = useRouter();
  const { store: activeStore, stores, setStoreById } = useSelectedStore();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return stores;
    return stores.filter((store) => {
      const haystack =
        `${store.name} ${store.address} ${store.city} ${store.state} ${store.zip}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query, stores]);

  return (
    <div className="mt-8 space-y-6">
      <div className="max-w-md space-y-2">
        <Label htmlFor="store-search">Search by ZIP, city, or store</Label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id="store-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="94102 or Mission"
            className="pl-10"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {stores.length} nearby stores.
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          No stores match “{query}”. Try another ZIP or clear the search.
        </p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((store) => {
            const selected = store.id === activeStore.id;
            return (
              <li
                key={store.id}
                className={cn(
                  "rounded-2xl border bg-surface-elevated/90 p-5",
                  selected
                    ? "border-brand ring-1 ring-brand/30"
                    : "border-border/80",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    {store.name}
                  </h2>
                  {selected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-brand">
                      <Check className="size-3.5" aria-hidden />
                      Selected
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden
                  />
                  {store.address}
                  <br />
                  {store.city}, {store.state} {store.zip}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-4 text-brand" aria-hidden />
                  {store.phone}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="size-4 text-brand" aria-hidden />
                  {store.hoursSummary}
                  {store.hasDriveThru ? " · Drive-thru" : ""}
                </p>
                <Button
                  className="mt-5 w-full bg-brand text-brand-foreground hover:bg-brand/90"
                  onClick={() => {
                    setStoreById(store.id);
                    router.push(redirectTo);
                  }}
                >
                  {selected ? "Continue with this store" : "Use this store"}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
