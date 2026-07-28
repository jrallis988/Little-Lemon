"use client";

import { useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { buildBenchmarkDrawer } from "@/lib/benchmarking";
import { formatCurrency } from "@/lib/pricing";
import type { PriceComparisonRow } from "@/lib/types";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BenchmarkDrawerProps {
  drugId: string;
  genericName: string;
  brandName: string;
  quantity: number;
  supplyDays: number;
  rows: PriceComparisonRow[];
}

export function BenchmarkDrawer({
  drugId,
  genericName,
  brandName,
  quantity,
  supplyDays,
  rows,
}: BenchmarkDrawerProps) {
  const data = useMemo(
    () =>
      buildBenchmarkDrawer({
        drugId,
        genericName,
        brandName,
        quantity,
        supplyDays,
        rows,
      }),
    [drugId, genericName, brandName, quantity, supplyDays, rows]
  );

  if (!data) return null;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button type="button" variant="outline" className="min-h-11 gap-2" />
        }
      >
        <BarChart3 className="size-4" aria-hidden />
        Market benchmarks
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display text-left text-2xl">
            Transparent cash benchmarks
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-4 px-1 pb-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {genericName} ({brandName}) · Qty {quantity} · {supplyDays}-day
          </p>
          <p className="text-sm leading-relaxed text-foreground/90">
            {data.transparencyNote}
          </p>

          <ul className="space-y-2">
            {data.benchmarks.map((b) => (
              <li
                key={b.source}
                className={cn(
                  "rounded-xl border px-3.5 py-3",
                  b.source === "trump_rx_low"
                    ? "border-savings/35 bg-savings/10"
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-medium">{b.label}</p>
                  <p className="font-display text-xl font-semibold tabular-nums">
                    {formatCurrency(b.price)}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{b.note}</p>
              </li>
            ))}
          </ul>

          <dl className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-muted/30 p-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Vs estimated retail</dt>
              <dd className="font-semibold text-savings">
                Save {formatCurrency(data.spreadVsRetail)}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Vs median network</dt>
              <dd className="font-semibold">
                {data.spreadVsMedian >= 0
                  ? `${formatCurrency(data.spreadVsMedian)} lower`
                  : "At median"}
              </dd>
            </div>
          </dl>
        </div>
      </SheetContent>
    </Sheet>
  );
}
