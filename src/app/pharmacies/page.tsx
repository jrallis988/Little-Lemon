"use client";

import Image from "next/image";
import Link from "next/link";
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
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/55" />
        <div className="relative mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-8">
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
