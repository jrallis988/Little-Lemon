"use client";

import { useMemo, useState } from "react";
import { LocationPicker } from "@/components/pharmacy/location-picker";
import { PharmacyCard } from "@/components/pharmacy/pharmacy-card";
import { CouponModal } from "@/components/coupon/coupon-modal";
import { PHARMACIES } from "@/lib/data/pharmacies";
import { getDrugById } from "@/lib/data/drugs";
import {
  formatCurrency,
  generateOffersForDrug,
  withDistances,
} from "@/lib/pricing";
import { useLocationStore } from "@/lib/store/location-store";
import type { Pharmacy, PharmacyPriceOffer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortMode = "distance" | "price";

export default function PharmaciesPage() {
  const location = useLocationStore((s) => s.location);
  const [sort, setSort] = useState<SortMode>("distance");
  const [couponTarget, setCouponTarget] = useState<{
    pharmacy: Pharmacy;
    offer: PharmacyPriceOffer;
  } | null>(null);

  const sampleDrug = getDrugById("atorvastatin")!;

  const pharmacies = useMemo(() => {
    const withDist = withDistances(PHARMACIES, location);
    const offers = generateOffersForDrug(
      sampleDrug,
      {
        strengthId: sampleDrug.strengths[1]?.id ?? sampleDrug.strengths[0].id,
        quantity: 30,
        supplyDays: 30,
      },
      location
    );
    const priceByPharmacy = new Map(
      offers.map((r) => [r.pharmacy.id, r] as const)
    );

    const enriched = withDist.map((p) => ({
      pharmacy: p,
      row: priceByPharmacy.get(p.id),
    }));

    return enriched.sort((a, b) => {
      if (sort === "price") {
        return (
          (a.row?.offer.couponPrice ?? 999) - (b.row?.offer.couponPrice ?? 999)
        );
      }
      return (a.pharmacy.distanceMiles ?? 99) - (b.pharmacy.distanceMiles ?? 99);
    });
  }, [location, sort, sampleDrug]);

  return (
    <div className="trx-atmosphere min-h-[70dvh]">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <header className="max-w-2xl space-y-2">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Pharmacies near you
          </h1>
          <p className="text-lg text-muted-foreground">
            Sorted by distance or sample coupon price for atorvastatin 20 mg
            (illustrative). Open a store card for hours and discount acceptance.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
          <div className="space-y-4">
            <LocationPicker />
            <div className="space-y-1.5 rounded-xl border border-border bg-card p-4">
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
            {/* Simple map placeholder — visual anchor without external map API */}
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-[linear-gradient(145deg,oklch(0.9_0.04_195),oklch(0.86_0.05_220))]"
              role="img"
              aria-label={`Map preview centered on ${location.label}`}
            >
              <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,oklch(0.35_0.05_210_/_0.35)_1px,transparent_0)] [background-size:18px_18px]" />
              {pharmacies.slice(0, 6).map((item, i) => (
                <span
                  key={item.pharmacy.id}
                  className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-white"
                  style={{
                    left: `${28 + ((i * 17) % 50)}%`,
                    top: `${24 + ((i * 23) % 48)}%`,
                  }}
                  title={item.pharmacy.name}
                />
              ))}
              <p className="absolute bottom-3 left-3 rounded-lg bg-card/90 px-2.5 py-1 text-xs font-medium shadow-sm">
                {location.label}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
        </div>

        <div className="flex justify-center">
          <Button render={<a href="/search?drug=atorvastatin" />} size="lg">
            Compare more medications
          </Button>
        </div>
      </div>

      {couponTarget && (
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
