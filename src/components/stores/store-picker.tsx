"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Clock3, MapPin, Phone, Search } from "lucide-react";

import {
  STORE_SERVICE_FILTERS,
  STORE_SERVICE_LABEL,
  storeMapPosition,
} from "@/lib/data/stores";
import { useSelectedStore } from "@/lib/store/store-selection";
import type { StoreService } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StorePicker({ redirectTo = "/pharmacy" }: { redirectTo?: string }) {
  const router = useRouter();
  const { store: activeStore, stores, setStoreById } = useSelectedStore();
  const [query, setQuery] = useState("");
  const [services, setServices] = useState<StoreService[]>([]);
  const [focusedId, setFocusedId] = useState(activeStore.id);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return stores
      .filter((store) => {
        if (
          services.length &&
          !services.every((service) => store.services.includes(service))
        ) {
          return false;
        }
        if (!normalized) return true;
        const haystack =
          `${store.name} ${store.address} ${store.city} ${store.state} ${store.zip} ${store.services.join(" ")}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .sort((a, b) => a.distanceMiles - b.distanceMiles);
  }, [query, services, stores]);

  function toggleService(service: StoreService) {
    setServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="space-y-5">
          <div className="space-y-2">
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
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Store services</legend>
            <div className="flex flex-wrap gap-2">
              {STORE_SERVICE_FILTERS.map((service) => {
                const active = services.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                      active
                        ? "border-brand bg-brand/5 text-brand"
                        : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground",
                    )}
                    aria-pressed={active}
                  >
                    {service.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {stores.length} nearby stores
            {services.length ? " matching selected services" : ""}.
          </p>

          {filtered.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
              No stores match these filters. Clear a service chip or try another
              ZIP.
            </p>
          ) : (
            <ul className="space-y-3">
              {filtered.map((store) => {
                const selected = store.id === activeStore.id;
                const focused = store.id === focusedId;
                return (
                  <li
                    key={store.id}
                    className={cn(
                      "rounded-2xl border p-5 transition-colors",
                      selected
                        ? "border-brand bg-surface-elevated/90 ring-1 ring-brand/30"
                        : focused
                          ? "border-brand/50 bg-surface-elevated/90"
                          : "border-border/80 bg-surface-elevated/70",
                    )}
                    onMouseEnter={() => setFocusedId(store.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="font-display text-lg font-semibold tracking-tight">
                          {store.name}
                        </h2>
                        <p className="mt-1 text-xs font-medium text-brand">
                          {store.distanceMiles.toFixed(1)} mi away
                        </p>
                      </div>
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
                      <span>
                        {store.address}
                        <br />
                        {store.city}, {store.state} {store.zip}
                      </span>
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="size-4 text-brand" aria-hidden />
                      {store.phone}
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock3 className="size-4 text-brand" aria-hidden />
                      {store.hoursSummary}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {store.services.map((service) => (
                        <li
                          key={service}
                          className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {STORE_SERVICE_LABEL[service]}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-4 w-full bg-brand text-brand-foreground hover:bg-brand/90"
                      onClick={() => {
                        setFocusedId(store.id);
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

        <div
          className="relative min-h-[360px] overflow-hidden rounded-2xl border border-border/80 bg-[linear-gradient(160deg,#dfe8f2_0%,#c9d7e6_45%,#b7c9db_100%)] shadow-inner lg:sticky lg:top-28"
          aria-label="Nearby stores map"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <p className="absolute top-4 left-4 rounded-lg bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
            San Francisco area
          </p>
          {filtered.map((store) => {
            const position = storeMapPosition(store);
            const selected = store.id === activeStore.id;
            const focused = store.id === focusedId;
            return (
              <button
                key={store.id}
                type="button"
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-full rounded-full border-2 px-2.5 py-1 text-[11px] font-semibold shadow-md transition-transform",
                  selected || focused
                    ? "z-10 scale-110 border-brand bg-brand text-brand-foreground"
                    : "border-white bg-background text-foreground",
                )}
                style={{ left: `${position.left}%`, top: `${position.top}%` }}
                onClick={() => setFocusedId(store.id)}
                aria-label={`${store.name}, ${store.distanceMiles.toFixed(1)} miles`}
              >
                {store.distanceMiles.toFixed(1)} mi
              </button>
            );
          })}
          <p className="absolute right-4 bottom-4 max-w-[14rem] rounded-lg bg-background/90 px-3 py-2 text-[11px] text-muted-foreground shadow-sm">
            Demo map pins — select a store card or pin to focus it.
          </p>
        </div>
      </div>
    </div>
  );
}
