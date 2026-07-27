"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  BookmarkPlus,
  Lightbulb,
  MapPinOff,
  SearchX,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PharmacyRow } from "@/components/pharmacy/pharmacy-row";
import { CouponModal } from "@/components/coupon/coupon-modal";
import { EmptyState } from "@/components/design/empty-state";
import { TrustCallout } from "@/components/design/trust-callout";
import { PriceDisplay } from "@/components/design/price-display";
import {
  buildSavingsTips,
  generateOffersForDrug,
  sortComparisonRows,
} from "@/lib/pricing";
import { useLocationStore } from "@/lib/store/location-store";
import { useProfileStore } from "@/lib/store/profile-store";
import type {
  Drug,
  PriceComparisonRow,
  SearchFilters,
  SupplyDays,
} from "@/lib/types";

interface PricingMatrixProps {
  drug: Drug;
}

function FilterControls({
  drug,
  filters,
  setFilters,
}: {
  drug: Drug;
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <label className="space-y-1 text-sm">
        <span className="font-medium">Dosage</span>
        <Select
          value={filters.strengthId ?? undefined}
          onValueChange={(v) =>
            setFilters((f) => ({ ...f, strengthId: v ?? null }))
          }
        >
          <SelectTrigger className="h-11 w-full text-base">
            <SelectValue>
              {(value: string | null) =>
                drug.strengths.find((s) => s.id === value)?.label ??
                "Select dosage"
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {drug.strengths.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      <label className="space-y-1 text-sm">
        <span className="font-medium">Quantity</span>
        <Select
          value={String(filters.quantity)}
          onValueChange={(v) =>
            setFilters((f) => ({
              ...f,
              quantity: Number(v ?? f.quantity),
            }))
          }
        >
          <SelectTrigger className="h-11 w-full text-base">
            <SelectValue>
              {(value: string | null) =>
                value ? `${value} units` : "Select quantity"
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {[
              ...new Set([
                ...drug.commonQuantities,
                filters.quantity,
                filters.supplyDays === 90 ? 90 : 30,
              ]),
            ]
              .sort((a, b) => a - b)
              .map((q) => (
                <SelectItem key={q} value={String(q)}>
                  {q} units
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </label>

      <label className="space-y-1 text-sm">
        <span className="font-medium">Sort by</span>
        <Select
          value={filters.sortBy}
          onValueChange={(v) =>
            setFilters((f) => ({
              ...f,
              sortBy: (v ?? "price") as SearchFilters["sortBy"],
            }))
          }
        >
          <SelectTrigger className="h-11 w-full text-base">
            <SelectValue>
              {(value: string | null) => {
                const labels: Record<string, string> = {
                  price: "Lowest price",
                  distance: "Nearest pharmacy",
                  savings: "Biggest savings",
                };
                return labels[value ?? ""] ?? "Sort by";
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Lowest price</SelectItem>
            <SelectItem value="distance">Nearest pharmacy</SelectItem>
            <SelectItem value="savings">Biggest savings</SelectItem>
          </SelectContent>
        </Select>
      </label>
    </div>
  );
}

export function PricingMatrix({ drug }: PricingMatrixProps) {
  const location = useLocationStore((s) => s.location);
  const saveMedication = useProfileStore((s) => s.saveMedication);
  const setPriceAlert = useProfileStore((s) => s.setPriceAlert);
  const savedMedications = useProfileStore((s) => s.savedMedications);

  const [filters, setFilters] = useState<SearchFilters>({
    supplyDays: 30,
    strengthId: drug.strengths[0]?.id ?? null,
    quantity: drug.commonQuantities[0] ?? 30,
    sortBy: "price",
    showGenericOnly: false,
  });
  const [activeOffer, setActiveOffer] = useState<PriceComparisonRow | null>(
    null
  );
  const [showAll, setShowAll] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const strength =
    drug.strengths.find((s) => s.id === filters.strengthId) ??
    drug.strengths[0];

  const rows = useMemo(() => {
    const generated = generateOffersForDrug(
      drug,
      {
        strengthId: filters.strengthId,
        quantity: filters.quantity,
        supplyDays: filters.supplyDays,
      },
      location
    );
    return sortComparisonRows(generated, filters.sortBy);
  }, [drug, filters, location]);

  const tips = useMemo(
    () => buildSavingsTips(drug, rows, filters.supplyDays),
    [drug, rows, filters.supplyDays]
  );

  const lowest = rows[0];
  const visibleRows = showAll ? rows : rows.slice(0, 3);
  const isSaved = savedMedications.some(
    (m) => m.drugId === drug.id && m.strengthId === strength?.id
  );

  function onSaveMed(withAlert: boolean) {
    if (!strength || !lowest) return;
    saveMedication({
      drugId: drug.id,
      strengthId: strength.id,
      quantity: filters.quantity,
      supplyDays: filters.supplyDays,
      preferredPharmacyId: lowest.pharmacy.id,
      priceAlertEnabled: withAlert,
      alertBaselinePrice: withAlert ? lowest.offer.couponPrice : undefined,
    });
    if (withAlert) {
      setPriceAlert(drug.id, strength.id, true, lowest.offer.couponPrice);
    }
  }

  if (!strength) {
    return (
      <EmptyState
        icon={SearchX}
        title="Dosage unavailable"
        description="We couldn’t load strengths for this medication. Try another search."
        actionHref="/search"
        actionLabel="Search again"
      />
    );
  }

  if (rows.length === 0) {
    return (
      <EmptyState
        icon={MapPinOff}
        title="No pharmacies nearby"
        description="We couldn’t find coupon prices for this ZIP. Try another location or browse pharmacies."
        actionHref="/pharmacies"
        actionLabel="Find pharmacies"
        secondaryHref="/help"
        secondaryLabel="How coupons work"
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Dense drug summary strip */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3.5 sm:flex-row sm:items-end sm:justify-between sm:p-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {drug.therapeuticClass}
          </p>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {drug.genericName}
            </h1>
            <Link
              href={`/drugs/${drug.id}`}
              className="text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              Drug details
            </Link>
          </div>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Brand {drug.brandName} · {strength.label} · Qty {filters.quantity} ·{" "}
            {filters.supplyDays}-day · near{" "}
            <span className="font-medium text-foreground">{location.label}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            onClick={() => onSaveMed(false)}
          >
            <BookmarkPlus />
            {isSaved ? "Update saved" : "Save med"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="min-h-11"
            onClick={() => onSaveMed(true)}
            disabled={!lowest}
          >
            <Bell />
            Price alert
          </Button>
        </div>
      </div>

      <TrustCallout variant="warning" title="Check your insurance copay first">
        Trump RX coupons are cash discount prices — not insurance. If your plan
        copay is lower, use insurance at the pharmacy.
      </TrustCallout>

      {/* Sticky filters */}
      <div className="trx-sticky-filters rounded-b-xl">
        <div className="flex flex-col gap-3 px-1 py-3 sm:px-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold">Supply length</p>
              <p className="text-xs text-muted-foreground sm:text-sm">
                90-day often costs less per tablet
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Tabs
                value={String(filters.supplyDays)}
                onValueChange={(v) =>
                  setFilters((f) => ({
                    ...f,
                    supplyDays: Number(v) as SupplyDays,
                    quantity:
                      Number(v) === 90
                        ? drug.commonQuantities.find((q) => q >= 90) ??
                          f.quantity * 3
                        : drug.commonQuantities[0] ?? 30,
                  }))
                }
              >
                <TabsList className="h-11">
                  <TabsTrigger value="30" className="min-w-[4.75rem] px-3 text-base">
                    30-day
                  </TabsTrigger>
                  <TabsTrigger value="90" className="min-w-[4.75rem] px-3 text-base">
                    90-day
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger
                  render={
                    <Button
                      variant="outline"
                      className="min-h-11 md:hidden"
                      aria-label="Open filters"
                    />
                  }
                >
                  <SlidersHorizontal />
                  Filters
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[85dvh] rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle className="font-display text-left text-xl">
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="space-y-4 px-1 pb-6">
                    <FilterControls
                      drug={drug}
                      filters={filters}
                      setFilters={setFilters}
                    />
                    <Button
                      className="min-h-11 w-full"
                      onClick={() => setFiltersOpen(false)}
                    >
                      Show prices
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="hidden md:block">
            <FilterControls
              drug={drug}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
      </div>

      {/* Lowest price highlight */}
      {lowest && (
        <div className="flex flex-col gap-3 rounded-2xl border border-savings/25 bg-savings/10 p-3.5 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div className="flex gap-3">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-savings" aria-hidden />
            <div>
              <p className="font-semibold">
                Lowest nearby: {lowest.pharmacy.name}
              </p>
              <p className="text-sm text-foreground/80">
                Generic <strong>{drug.genericName}</strong> is typically filled
                instead of brand {drug.brandName}.{" "}
                <button
                  type="button"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                  onClick={() => {
                    const el = document.getElementById("why-this-price");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Why this price?
                </button>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PriceDisplay
              couponPrice={lowest.offer.couponPrice}
              savingsAmount={lowest.savingsAmount}
              savingsPercent={lowest.savingsPercent}
              size="md"
            />
            <Button className="min-h-11" onClick={() => setActiveOffer(lowest)}>
              Get coupon
            </Button>
          </div>
        </div>
      )}

      {/* Dense pharmacy list */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-2.5 sm:px-4">
          <p className="text-sm font-semibold">
            {showAll ? `All ${rows.length} pharmacies` : "Top 3 lowest prices"}
          </p>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Cash coupon prices · updated for demo
          </p>
        </div>
        <div>
          {visibleRows.map((row, index) => (
            <PharmacyRow
              key={row.offer.id}
              row={row}
              rank={filters.sortBy === "price" ? index + 1 : undefined}
              highlighted={index === 0 && filters.sortBy === "price"}
              onGetCoupon={() => setActiveOffer(row)}
            />
          ))}
        </div>
        {rows.length > 3 && (
          <div className="border-t border-border p-3">
            <Button
              type="button"
              variant="outline"
              className="min-h-11 w-full"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "Show top 3 only" : `See all ${rows.length} pharmacies`}
            </Button>
          </div>
        )}
      </div>

      {/* Trust / clarity modules */}
      <div className="grid gap-3 md:grid-cols-2">
        <TrustCallout title="Generic vs brand">
          Most pharmacies fill <strong>{drug.brandName}</strong> as{" "}
          <strong>{drug.genericName}</strong> — usually the same active
          ingredient at a lower coupon price.
        </TrustCallout>
        <TrustCallout title="Price types you’ll see">
          <strong>Coupon</strong> = discount card at the counter.{" "}
          <strong>Retail</strong> = estimated cash without discount. Membership
          tiers can be lower still.
        </TrustCallout>
      </div>

      <section id="why-this-price" className="space-y-2.5 scroll-mt-28">
        <h2 className="font-display text-xl font-semibold">Why this price?</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Prices vary by pharmacy contracts, quantity, and supply length. The
          coupon uses BIN / PCN / Group / Member ID so the pharmacy can process
          a discount card claim. Always re-check before you fill — prices shift.
        </p>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {tips.map((tip) => (
            <li
              key={tip.id}
              className="rounded-xl border border-border/80 bg-surface px-3.5 py-3"
            >
              <p className="font-semibold text-foreground">{tip.title}</p>
              <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
                {tip.body}
              </p>
              {tip.potentialSavingsLabel && (
                <p className="mt-1.5 text-sm font-medium text-savings">
                  {tip.potentialSavingsLabel}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <p className="text-center text-sm text-muted-foreground">
        Need help at the counter?{" "}
        <Link href="/help" className="font-medium text-primary underline-offset-2 hover:underline">
          How coupons work
        </Link>
        {" · "}
        <Link href="/membership" className="font-medium text-primary underline-offset-2 hover:underline">
          Free vs membership
        </Link>
      </p>

      {activeOffer && (
        <CouponModal
          open={!!activeOffer}
          onOpenChange={(o) => !o && setActiveOffer(null)}
          drug={drug}
          pharmacy={activeOffer.pharmacy}
          offer={activeOffer.offer}
          strengthLabel={strength.label}
        />
      )}
    </div>
  );
}
