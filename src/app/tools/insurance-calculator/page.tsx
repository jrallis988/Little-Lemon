"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { TrustCallout } from "@/components/design/trust-callout";
import { InsuranceVsCashMatrix } from "@/components/pricing/insurance-vs-cash-matrix";
import { formatCurrency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export default function InsuranceCalculatorPage() {
  const [cashPrice, setCashPrice] = useState("24.99");
  const [retailPrice, setRetailPrice] = useState("89.00");

  const cash = useMemo(() => {
    const n = Number(cashPrice);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [cashPrice]);

  const retail = useMemo(() => {
    const n = Number(retailPrice);
    return Number.isFinite(n) && n >= 0 ? Math.max(n, cash) : cash;
  }, [retailPrice, cash]);

  const savings = Math.max(0, retail - cash);

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
        <header className="space-y-2">
          <p className="text-sm font-medium text-primary">Decision tool</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Insurance vs cash calculator
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Compare an estimated insurance copay with a Trump RX cash coupon —
            including deductible trade-offs. Not insurance advice.
          </p>
        </header>

        <TrustCallout variant="warning" title="Coupons usually cannot combine with insurance">
          Ask the pharmacist which option costs less before processing. Cash-pay
          fills typically do not reduce deductibles.
        </TrustCallout>

        <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Calculator className="size-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">Price inputs</h2>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="cash">Trump RX cash coupon</Label>
              <Input
                id="cash"
                inputMode="decimal"
                value={cashPrice}
                onChange={(e) => setCashPrice(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="retail">Estimated pharmacy retail</Label>
              <Input
                id="retail"
                inputMode="decimal"
                value={retailPrice}
                onChange={(e) => setRetailPrice(e.target.value)}
                className="h-11"
              />
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Coupon savings vs retail:{" "}
            <span className="font-semibold text-foreground">
              {formatCurrency(savings)}
            </span>
            . Pull live prices from{" "}
            <Link href="/search" className="font-medium text-primary hover:underline">
              Compare prices
            </Link>
            , or load a saved plan from{" "}
            <Link
              href="/profile/insurance"
              className="font-medium text-primary hover:underline"
            >
              Insurance plan
            </Link>
            .
          </p>
        </section>

        <InsuranceVsCashMatrix cashPrice={cash} retailPrice={retail} />

        <div className="flex flex-wrap gap-2">
          <Link href="/search" className={cn(buttonVariants({ size: "lg" }), "min-h-11")}>
            Find live coupon prices
          </Link>
          <Link
            href="/help"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-11")}
          >
            How coupons work
          </Link>
        </div>
      </div>
    </div>
  );
}
