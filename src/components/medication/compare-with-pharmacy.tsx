"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/pricing-service";

const PHARMACIES = [
  { id: "cvs", label: "CVS Pharmacy" },
  { id: "walgreens", label: "Walgreens" },
  { id: "walmart", label: "Walmart" },
  { id: "other", label: "Other pharmacy" },
  { id: "custom", label: "My current price" },
] as const;

interface CompareWithPharmacyProps {
  medicationLabel: string;
  trumpRxPrice: number;
  suggestedRetail?: number;
  livePharmacyPricing?: boolean;
}

export function CompareWithPharmacy({
  medicationLabel,
  trumpRxPrice,
  suggestedRetail,
  livePharmacyPricing = false,
}: CompareWithPharmacyProps) {
  const [pharmacyId, setPharmacyId] = useState<string>("cvs");
  const [currentPay, setCurrentPay] = useState("");

  const pharmacyLabel =
    PHARMACIES.find((p) => p.id === pharmacyId)?.label ?? "Your pharmacy";

  const current = Number.parseFloat(currentPay);
  const savings = useMemo(() => {
    if (!Number.isFinite(current) || current <= 0) return null;
    return current - trumpRxPrice;
  }, [current, trumpRxPrice]);

  return (
    <section
      aria-labelledby="compare-heading"
      className="rounded-lg border border-border bg-card p-4 sm:p-5"
    >
      <h2
        id="compare-heading"
        className="font-display text-xl font-semibold uppercase tracking-tight"
      >
        Compare your price
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Is TrumpRx cheaper than what you currently pay for {medicationLabel}?
        Enter what you paid recently (receipt, pharmacy quote, or insurance
        EOB)
        {livePharmacyPricing
          ? " if a live pharmacy quote is not shown."
          : " — live per-pharmacy quotes are not enabled in this launch."}
        {suggestedRetail != null ? (
          <>
            {" "}
            Estimated cash retail without a program is often around{" "}
            {formatCurrency(suggestedRetail)}; do not treat that as your price.
          </>
        ) : null}
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="compare-pharmacy" className="text-sm font-medium">
            Your pharmacy
          </label>
          <select
            id="compare-pharmacy"
            value={pharmacyId}
            onChange={(e) => setPharmacyId(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {PHARMACIES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="compare-current" className="text-sm font-medium">
            What do you currently pay?
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <input
              id="compare-current"
              type="number"
              min={0}
              step="0.01"
              inputMode="decimal"
              value={currentPay}
              onChange={(e) => setCurrentPay(e.target.value)}
              placeholder="What you paid"
              className="h-10 w-full rounded-md border border-input bg-background pl-7 pr-3 text-sm tabular-nums"
            />
          </div>
        </div>
      </div>

      <dl className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-md bg-surface px-3 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            TrumpRx price
          </dt>
          <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-primary">
            {formatCurrency(trumpRxPrice)}
          </dd>
        </div>
        <div className="rounded-md bg-surface px-3 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {pharmacyLabel}
          </dt>
          <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">
            {Number.isFinite(current) && current > 0
              ? formatCurrency(current)
              : "—"}
          </dd>
        </div>
        <div className="rounded-md bg-surface px-3 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Potential savings
          </dt>
          <dd
            className={`mt-1 font-display text-2xl font-semibold tabular-nums ${
              savings != null && savings > 0
                ? "text-savings"
                : "text-foreground"
            }`}
          >
            {savings == null
              ? "—"
              : savings > 0
                ? `${formatCurrency(savings)} / mo`
                : savings === 0
                  ? "About the same"
                  : `${formatCurrency(Math.abs(savings))} more`}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-muted-foreground">
        Comparison is informational. Final price is determined at fill time by
        the pharmacy — not by TrumpRx.
      </p>
    </section>
  );
}
