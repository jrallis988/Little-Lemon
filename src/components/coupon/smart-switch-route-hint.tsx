"use client";

import { useEffect, useState } from "react";
import { Loader2, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SupplyDays } from "@/lib/types";
import { formatCurrency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface RouteSummary {
  pharmacyId: string;
  pharmacyName: string;
  couponPrice: number;
  status: string;
  confidence: number;
  pharmacistTip: string;
}

interface SmartSwitchRouteHintProps {
  drugId: string;
  strengthId: string;
  quantity: number;
  supplyDays: SupplyDays;
  zip: string;
  className?: string;
  onSelectPharmacy?: (pharmacyId: string) => void;
}

/**
 * Universal routing layer UI — pre-tests BIN/PCN/Group against nearby
 * pharmacies and surfaces the first-pass-friendly pick.
 */
export function SmartSwitchRouteHint({
  drugId,
  strengthId,
  quantity,
  supplyDays,
  zip,
  className,
  onSelectPharmacy,
}: SmartSwitchRouteHintProps) {
  const [loading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState<RouteSummary | null>(null);
  const [liveSwitch, setLiveSwitch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/switch/route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            drugId,
            strengthId,
            quantity,
            supplyDays,
            zip,
            limit: 6,
          }),
          signal: controller.signal,
        });
        const data = (await res.json()) as {
          recommended?: RouteSummary | null;
          liveSwitch?: boolean;
          error?: string;
        };
        if (!res.ok) throw new Error(data.error ?? "Routing failed");
        setRecommended(data.recommended ?? null);
        setLiveSwitch(Boolean(data.liveSwitch));
      } catch (caught) {
        if (caught instanceof DOMException && caught.name === "AbortError")
          return;
        setError("Smart Switch routing unavailable right now.");
        setRecommended(null);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void run();
    return () => controller.abort();
  }, [drugId, strengthId, quantity, supplyDays, zip]);

  if (loading) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm text-muted-foreground",
          className
        )}
      >
        <Loader2 className="size-4 animate-spin" />
        Smart Switch routing local pharmacies…
      </div>
    );
  }

  if (error || !recommended) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex gap-2.5">
        <Route className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-foreground">
            Smart Switch pick: {recommended.pharmacyName}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(recommended.couponPrice)} ·{" "}
            {recommended.status.replaceAll("_", " ")} (
            {Math.round(recommended.confidence * 100)}% confidence)
            {liveSwitch ? " · live switch" : " · network verification"}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {recommended.pharmacistTip}
          </p>
        </div>
      </div>
      {onSelectPharmacy && (
        <Button
          type="button"
          size="sm"
          className="min-h-10 shrink-0"
          onClick={() => onSelectPharmacy(recommended.pharmacyId)}
        >
          Use this pharmacy
        </Button>
      )}
    </div>
  );
}
