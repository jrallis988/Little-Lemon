"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, ShieldAlert, XCircle } from "lucide-react";
import type { SwitchPrecheckResult } from "@/lib/switch/adjudication";
import type { CouponBinDetails } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SmartSwitchBadgeProps {
  pharmacyId: string;
  pharmacyName: string;
  drugId: string;
  strengthId: string;
  quantity: number;
  supplyDays: 30 | 90;
  couponPrice: number;
  coupon?: Partial<CouponBinDetails>;
  className?: string;
}

export function SmartSwitchBadge({
  pharmacyId,
  pharmacyName,
  drugId,
  strengthId,
  quantity,
  supplyDays,
  couponPrice,
  coupon,
  className,
}: SmartSwitchBadgeProps) {
  const [result, setResult] = useState<SwitchPrecheckResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetch("/api/switch/precheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        pharmacyId,
        drugId,
        strengthId,
        quantity,
        supplyDays,
        couponPrice,
        coupon,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Precheck failed");
        return res.json() as Promise<{ precheck: SwitchPrecheckResult }>;
      })
      .then((data) => setResult(data.precheck))
      .catch(() => {
        if (!controller.signal.aborted) setError("Could not pre-test this claim path.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [
    pharmacyId,
    drugId,
    strengthId,
    quantity,
    supplyDays,
    couponPrice,
    coupon?.bin,
    coupon?.pcn,
    coupon?.group,
    coupon?.memberId,
  ]);

  if (loading) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm",
          className
        )}
      >
        <Loader2 className="size-4 animate-spin" aria-hidden />
        Smart Switch pre-testing {pharmacyName}…
      </div>
    );
  }

  if (error || !result) {
    return (
      <div
        className={cn(
          "rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground",
          className
        )}
      >
        {error ?? "Precheck unavailable"}
      </div>
    );
  }

  const tone =
    result.status === "likely_accept"
      ? "border-savings/35 bg-savings/10"
      : result.status === "network_gap"
        ? "border-destructive/30 bg-destructive/5"
        : "border-amber-300/60 bg-amber-50";

  const label =
    result.status === "likely_accept"
      ? "Likely first-pass accept"
      : result.status === "network_gap"
        ? "Network gap — call ahead"
        : "Verify with pharmacist";

  return (
    <div className={cn("space-y-2 rounded-xl border p-3", tone, className)}>
      <div className="flex items-start gap-2">
        {result.status === "likely_accept" ? (
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-savings" aria-hidden />
        ) : result.status === "network_gap" ? (
          <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
        ) : (
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-700" aria-hidden />
        )}
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs text-muted-foreground">
            Smart Switch · {Math.round(result.confidence * 100)}% checks passed
            {result.liveSwitch ? " · live switch" : " · network verification"}
          </p>
        </div>
      </div>
      <ul className="space-y-1 text-xs text-foreground/85">
        {result.checks.map((c) => (
          <li key={c.id} className="flex gap-2">
            <span aria-hidden>{c.passed ? "✓" : "✗"}</span>
            <span>
              <span className="font-medium">{c.label}:</span> {c.detail}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-sm leading-snug">{result.pharmacistTip}</p>
    </div>
  );
}
