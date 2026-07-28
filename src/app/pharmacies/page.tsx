"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { LocationPicker } from "@/components/pharmacy/location-picker";
import { PharmacyCard } from "@/components/pharmacy/pharmacy-card";
import { CouponModal } from "@/components/coupon/coupon-modal";
import { formatCurrency } from "@/lib/pricing";
import { useLocationStore } from "@/lib/store/location-store";
import type {
  Drug,
  Pharmacy,
  PharmacyPriceOffer,
  PriceComparisonRow,
} from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SortMode = "distance" | "price";

interface PharmacyResult {
  pharmacy: Pharmacy;
  row?: PriceComparisonRow;
}

export default function PharmaciesPage() {
  const location = useLocationStore((s) => s.location);
  const [sort, setSort] = useState<SortMode>("distance");
  const [sampleDrug, setSampleDrug] = useState<Drug | null>(null);
  const [results, setResults] = useState<PharmacyResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [couponTarget, setCouponTarget] = useState<{
    pharmacy: Pharmacy;
    offer: PharmacyPriceOffer;
  } | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [drugResponse, pharmacyResponse] = await Promise.all([
          fetch("/api/drugs?id=atorvastatin", { signal: controller.signal }),
          fetch(`/api/pharmacies?zip=${encodeURIComponent(location.zip)}`, {
            signal: controller.signal,
          }),
        ]);
        if (!drugResponse.ok || !pharmacyResponse.ok) {
          throw new Error("Could not load nearby pharmacy data.");
        }

        const { drug } = (await drugResponse.json()) as { drug: Drug };
        const { pharmacies } = (await pharmacyResponse.json()) as {
          pharmacies: Pharmacy[];
        };
        const strength = drug.strengths[1] ?? drug.strengths[0];
        if (!strength) throw new Error("Sample medication has no strength data.");

        const priceParams = new URLSearchParams({
          drugId: drug.id,
          strengthId: strength.id,
          quantity: "30",
          supplyDays: "30",
          zip: location.zip,
          sortBy: "price",
        });
        const priceResponse = await fetch(`/api/prices?${priceParams}`, {
          signal: controller.signal,
        });
        if (!priceResponse.ok) {
          throw new Error("Could not load sample prices.");
        }
        const { rows } = (await priceResponse.json()) as {
          rows: PriceComparisonRow[];
        };
        const prices = new Map(rows.map((row) => [row.pharmacy.id, row]));

        setSampleDrug(drug);
        setResults(
          pharmacies.map((pharmacy) => ({
            pharmacy,
            row: prices.get(pharmacy.id),
          }))
        );
      } catch (caught) {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        setError(
          caught instanceof Error
            ? caught.message
            : "Could not load nearby pharmacies."
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, [location.zip]);

  const pharmacies = useMemo(
    () =>
      [...results].sort((a, b) => {
      if (sort === "price") {
        return (
          (a.row?.offer.couponPrice ?? 999) - (b.row?.offer.couponPrice ?? 999)
        );
      }
      return (a.pharmacy.distanceMiles ?? 99) - (b.pharmacy.distanceMiles ?? 99);
      }),
    [results, sort]
  );

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="relative isolate overflow-hidden border-b border-border">
        <Image
          src="/images/pharmacy-aisle.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-7">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Pharmacies near you
          </h1>
          <p className="mt-1.5 max-w-xl text-base text-muted-foreground">
            Sorted by distance or sample coupon price for atorvastatin 20 mg.
            Open a store for hours and discount acceptance.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-5 sm:px-6 sm:py-6">
        <div className="grid gap-4 lg:grid-cols-[18rem_1fr]">
          <aside className="space-y-3">
            <LocationPicker />
            <div className="space-y-1.5 rounded-xl border border-border bg-card p-3.5">
              <p className="text-sm font-semibold">Sort pharmacies</p>
              <Select
                value={sort}
                onValueChange={(v) => setSort((v as SortMode) ?? "distance")}
              >
                <SelectTrigger className="h-11 w-full text-base">
                  <SelectValue>
                    {(value: string | null) =>
                      value === "price"
                        ? "Lowest sample price"
                        : "Nearest first"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Nearest first</SelectItem>
                  <SelectItem value="price">Lowest sample price</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border">
              <Image
                src="/images/pharmacist-helping.webp"
                alt="Pharmacist assisting a patient at the counter"
                fill
                className="object-cover"
                sizes="288px"
              />
              <p className="absolute bottom-2 left-2 rounded-md bg-card/95 px-2 py-1 text-xs font-medium shadow-sm">
                {location.label}
              </p>
            </div>
          </aside>

          <div>
            {loading ? (
              <div className="flex min-h-48 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground">
                <Loader2 className="mr-2 size-5 animate-spin" />
                Loading nearby pharmacies…
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-destructive/30 bg-card p-5 text-destructive">
                {error}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {pharmacies.map(({ pharmacy, row }, index) => (
                  <PharmacyCard
                    key={pharmacy.id}
                    pharmacy={pharmacy}
                    highlighted={index === 0 && sort === "price"}
                    priceLabel={
                      row ? formatCurrency(row.offer.couponPrice) : undefined
                    }
                    onSelectCoupon={
                      row
                        ? () =>
                            setCouponTarget({
                              pharmacy,
                              offer: row.offer,
                            })
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center pt-1">
          <Link
            href="/search?drug=atorvastatin"
            className={cn(buttonVariants({ size: "lg" }), "min-h-11")}
          >
            Compare more medications
          </Link>
        </div>
      </div>

      {couponTarget && sampleDrug && (
        <CouponModal
          open={!!couponTarget}
          onOpenChange={(o) => !o && setCouponTarget(null)}
          drug={sampleDrug}
          pharmacy={couponTarget.pharmacy}
          offer={couponTarget.offer}
          strengthLabel={
            sampleDrug.strengths.find(
              (s) => s.id === couponTarget.offer.strengthId
            )?.label ?? "tablet"
          }
        />
      )}
    </div>
  );
}
