"use client";

import { useMemo, useState } from "react";
import { Bell, BookmarkPlus, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PharmacyCard } from "@/components/pharmacy/pharmacy-card";
import { CouponModal } from "@/components/coupon/coupon-modal";
import {
  buildSavingsTips,
  formatCurrency,
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
import { cn } from "@/lib/utils";

interface PricingMatrixProps {
  drug: Drug;
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            {drug.therapeuticClass}
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {drug.genericName}
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Brand: {drug.brandName} · Showing coupon prices near{" "}
            <span className="font-medium text-foreground">{location.label}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            onClick={() => onSaveMed(false)}
            disabled={!strength}
          >
            <BookmarkPlus />
            {isSaved ? "Update saved med" : "Save medication"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="min-h-11"
            onClick={() => onSaveMed(true)}
            disabled={!strength || !lowest}
          >
            <Bell />
            Price drop alert
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold">Supply length</p>
            <p className="text-sm text-muted-foreground">
              90-day fills often cost less per tablet
            </p>
          </div>
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
            <TabsList className="h-11 w-full sm:w-auto">
              <TabsTrigger value="30" className="min-w-[5.5rem] px-4 text-base">
                30-day
              </TabsTrigger>
              <TabsTrigger value="90" className="min-w-[5.5rem] px-4 text-base">
                90-day
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="space-y-1.5 text-sm">
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

          <label className="space-y-1.5 text-sm">
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

          <label className="space-y-1.5 text-sm">
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
      </div>

      {lowest && (
        <Alert className="border-savings/30 bg-savings/10 text-foreground">
          <Lightbulb className="text-savings" />
          <AlertTitle className="text-base">
            Lowest price: {formatCurrency(lowest.offer.couponPrice)} at{" "}
            {lowest.pharmacy.name}
          </AlertTitle>
          <AlertDescription className="text-sm text-foreground/80">
            Save {formatCurrency(lowest.savingsAmount)} (
            {lowest.savingsPercent}% off est. retail). Generic{" "}
            <strong>{drug.genericName}</strong> is typically filled instead of
            brand {drug.brandName}.
          </AlertDescription>
        </Alert>
      )}

      {/* Desktop matrix */}
      <div className="hidden overflow-hidden rounded-2xl border border-border md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-base font-semibold">Pharmacy</TableHead>
              <TableHead className="text-base font-semibold">Distance</TableHead>
              <TableHead className="text-base font-semibold">Retail</TableHead>
              <TableHead className="text-base font-semibold">Coupon</TableHead>
              <TableHead className="text-base font-semibold">You save</TableHead>
              <TableHead className="text-right text-base font-semibold">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.offer.id}
                className={cn(
                  index === 0 && "bg-accent/40",
                  !row.offer.inStock && "opacity-60"
                )}
              >
                <TableCell>
                  <div className="font-semibold">{row.pharmacy.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {row.pharmacy.address}
                    {!row.offer.inStock && " · Call to confirm stock"}
                  </div>
                </TableCell>
                <TableCell className="tabular-nums">
                  {row.pharmacy.distanceMiles?.toFixed(1)} mi
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground line-through">
                  {formatCurrency(row.offer.retailPrice)}
                </TableCell>
                <TableCell>
                  <span className="font-display text-xl font-semibold tabular-nums text-primary">
                    {formatCurrency(row.offer.couponPrice)}
                  </span>
                  {index === 0 && (
                    <Badge className="ml-2 bg-savings text-savings-foreground">
                      Best
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="tabular-nums text-savings">
                  {formatCurrency(row.savingsAmount)} ({row.savingsPercent}%)
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="lg"
                    className="min-h-10"
                    onClick={() => setActiveOffer(row)}
                  >
                    Get coupon
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 md:hidden">
        {rows.map((row, index) => (
          <PharmacyCard
            key={row.offer.id}
            pharmacy={row.pharmacy}
            priceLabel={formatCurrency(row.offer.couponPrice)}
            highlighted={index === 0}
            onSelectCoupon={() => setActiveOffer(row)}
          />
        ))}
      </div>

      <section aria-labelledby="savings-tips-heading" className="space-y-3">
        <h2
          id="savings-tips-heading"
          className="font-display text-2xl font-semibold"
        >
          Savings tips
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {tips.map((tip) => (
            <li
              key={tip.id}
              className="rounded-2xl border border-border/80 bg-surface p-4"
            >
              <p className="font-semibold text-foreground">{tip.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {tip.body}
              </p>
              {tip.potentialSavingsLabel && (
                <p className="mt-2 text-sm font-medium text-savings">
                  {tip.potentialSavingsLabel}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {activeOffer && strength && (
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
