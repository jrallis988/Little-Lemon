"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  computeInsuranceVsCash,
  type CoverageSituation,
  type InsuranceVsCashResult,
} from "@/lib/insurance/decision-matrix";
import { formatCurrency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const SITUATIONS: Array<{ id: CoverageSituation; label: string }> = [
  { id: "no_insurance", label: "No insurance" },
  { id: "high_deductible", label: "High deductible" },
  { id: "met_deductible", label: "Deductible met" },
  { id: "medicare_part_d", label: "Medicare Part D" },
  { id: "unsure", label: "Not sure" },
];

interface InsuranceVsCashMatrixProps {
  cashPrice: number;
  retailPrice: number;
  className?: string;
}

export function InsuranceVsCashMatrix({
  cashPrice,
  retailPrice,
  className,
}: InsuranceVsCashMatrixProps) {
  const [situation, setSituation] = useState<CoverageSituation>("unsure");
  const [planPay, setPlanPay] = useState("");
  const [deductibleLeft, setDeductibleLeft] = useState("");
  const [preferToday, setPreferToday] = useState(true);
  const [importNote, setImportNote] = useState<string | null>(null);

  async function importPlanStub() {
    setImportNote(null);
    const planType =
      situation === "medicare_part_d"
        ? "medicare_part_d"
        : situation === "no_insurance"
          ? "other"
          : "commercial";
    try {
      const res = await fetch("/api/insurance/plan-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType,
          annualDeductible: deductibleLeft ? Number(deductibleLeft) + 200 : undefined,
          deductibleMet: deductibleLeft ? 200 : 0,
          typicalCopay: planPay ? Number(planPay) : undefined,
        }),
      });
      const data = (await res.json()) as {
        message?: string;
        plan?: { remainingDeductible: number; typicalCopay: number | null };
      };
      if (!res.ok) throw new Error("Import failed");
      if (data.plan) {
        setDeductibleLeft(String(data.plan.remainingDeductible));
        if (data.plan.typicalCopay != null) {
          setPlanPay(String(data.plan.typicalCopay));
        }
      }
      setImportNote(
        data.message ??
          "Plan details applied to the Insurance vs cash matrix."
      );
    } catch {
      setImportNote("Could not normalize plan fields.");
    }
  }

  const decision: InsuranceVsCashResult = useMemo(
    () =>
      computeInsuranceVsCash({
        cashPrice,
        retailPrice,
        situation,
        estimatedPlanPay: planPay ? Number(planPay) : undefined,
        deductibleRemaining: deductibleLeft ? Number(deductibleLeft) : undefined,
        preferTodaySavings: preferToday,
      }),
    [cashPrice, retailPrice, situation, planPay, deductibleLeft, preferToday]
  );

  const tone =
    decision.recommendation === "use_cash"
      ? "border-savings/30 bg-savings/10"
      : decision.recommendation === "use_insurance"
        ? "border-primary/25 bg-primary/5"
        : "border-border bg-card";

  return (
    <section
      className={cn("space-y-4 rounded-2xl border border-border bg-card p-4", className)}
      aria-labelledby="decision-matrix-heading"
    >
      <div>
        <h2
          id="decision-matrix-heading"
          className="font-display text-xl font-semibold tracking-tight"
        >
          Insurance vs cash
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          See whether today’s cash coupon beats your plan — and how deductible
          progress factors in. Not insurance advice.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="listbox" aria-label="Coverage situation">
        {SITUATIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="option"
            aria-selected={situation === s.id}
            onClick={() => setSituation(s.id)}
            className={cn(
              "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
              situation === s.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:bg-muted"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="plan-pay">Estimated plan pay (optional)</Label>
          <Input
            id="plan-pay"
            inputMode="decimal"
            placeholder="e.g. 45.00"
            value={planPay}
            onChange={(e) => setPlanPay(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="deductible-left">Deductible remaining (optional)</Label>
          <Input
            id="deductible-left"
            inputMode="decimal"
            placeholder="e.g. 1200"
            value={deductibleLeft}
            onChange={(e) => setDeductibleLeft(e.target.value)}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={preferToday}
          onChange={(e) => setPreferToday(e.target.checked)}
          className="size-4 rounded border-border"
        />
        Prefer minimizing what I pay today
      </label>

      <button
        type="button"
        onClick={() => void importPlanStub()}
        className="text-left text-sm font-medium text-primary underline-offset-2 hover:underline"
      >
        Normalize plan fields
      </button>
      {importNote && (
        <p className="text-xs text-muted-foreground" role="status">
          {importNote}
        </p>
      )}

      <div className={cn("rounded-xl border p-4", tone)}>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Recommendation
        </p>
        <p className="mt-1 font-display text-lg font-semibold">{decision.headline}</p>
        <p className="mt-1 text-sm leading-relaxed text-foreground/90">
          {decision.body}
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-muted-foreground">Cash coupon</dt>
            <dd className="font-semibold tabular-nums">
              {formatCurrency(decision.todayCash)}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Insurance estimate</dt>
            <dd className="font-semibold tabular-nums">
              {decision.todayInsuranceEstimate != null
                ? formatCurrency(decision.todayInsuranceEstimate)
                : "—"}
            </dd>
          </div>
        </dl>
        {decision.deductibleProgressNote && (
          <p className="mt-2 text-sm text-muted-foreground">
            {decision.deductibleProgressNote}
          </p>
        )}
      </div>

      <ul className="space-y-1 text-xs text-muted-foreground">
        {decision.caveats.map((c) => (
          <li key={c}>• {c}</li>
        ))}
      </ul>
    </section>
  );
}
