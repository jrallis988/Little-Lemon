"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import JsBarcode from "jsbarcode";
import {
  CheckCircle2,
  Loader2,
  Printer,
  Shield,
  Smartphone,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { TrustCallout } from "@/components/design/trust-callout";
import {
  PASS_STORAGE_KEY,
  type StoredIssuedPass,
} from "@/components/checkout/checkout-client";
import { formatCurrency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

function PassBarcode({ value }: { value: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!svgRef.current) return;
    try {
      JsBarcode(svgRef.current, value, {
        format: "CODE128",
        width: 2.2,
        height: 64,
        displayValue: false,
        margin: 0,
        background: "#ffffff",
        lineColor: "#0f1b3d",
      });
    } catch {
      /* ignore */
    }
  }, [value]);
  return (
    <div className="rounded-xl border border-border bg-white p-3">
      <svg ref={svgRef} className="mx-auto h-16 w-full max-w-xs" role="img" />
      <p className="mt-1 text-center font-mono text-xs tracking-widest">{value}</p>
    </div>
  );
}

function ConfirmationBody() {
  const params = useSearchParams();
  const passId = params.get("pass");
  const [pass, setPass] = useState<StoredIssuedPass | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(PASS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredIssuedPass;
        if (!passId || parsed.passId === passId) {
          setPass(parsed);
          setLoading(false);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, [passId]);

  if (loading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" />
        Loading confirmation…
      </div>
    );
  }

  if (!pass) {
    return (
      <div className="mx-auto max-w-lg space-y-4 px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-semibold">No pass to show</h1>
        <p className="text-muted-foreground">
          Issue a digital pass from checkout, or reopen a saved pass from your
          account.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/checkout" className={cn(buttonVariants())}>
            Go to checkout
          </Link>
          <Link
            href="/profile"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            My account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-savings/30 bg-savings/10 px-5 py-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-savings" />
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            Your digital pass is ready
          </h1>
          <p className="mt-2 text-muted-foreground">
            Pass <span className="font-mono font-medium">{pass.passId}</span> ·
            Total counter {formatCurrency(pass.totalCounterPrice)}
            {pass.savedToAccount ? " · saved to your account" : ""}
          </p>
        </div>

        <TrustCallout title="Next steps at the pharmacy">
          Open this screen (or print it), hand the pharmacist guide if needed,
          and compare with your insurance copay before processing.
        </TrustCallout>

        <ol className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Smartphone,
              title: "Show at counter",
              body: "Barcode or BIN / PCN / Group / Member ID",
            },
            {
              icon: Shield,
              title: "Compare insurance",
              body: "Ask which costs less — coupon or plan",
            },
            {
              icon: Printer,
              title: "Keep a copy",
              body: "Print or reopen from My meds anytime",
            },
          ].map((step) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-card p-4 text-sm"
            >
              <step.icon className="size-5 text-primary" />
              <p className="mt-2 font-semibold">{step.title}</p>
              <p className="mt-1 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="no-print flex flex-wrap gap-2">
          <Button type="button" onClick={() => window.print()}>
            <Printer />
            Print pass pack
          </Button>
          <Link
            href="/help/pharmacist"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Pharmacist guide
          </Link>
          <Link
            href="/tools/insurance-calculator"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Insurance vs cash
          </Link>
          <Link href="/search" className={cn(buttonVariants({ variant: "ghost" }))}>
            Compare more prices
          </Link>
        </div>

        <section className="trx-coupon-print space-y-4">
          {pass.passes.map((entry) => (
            <article
              key={entry.coupon.id}
              className="space-y-3 rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold capitalize">
                    {entry.genericName ?? "Medication"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {entry.pharmacyName}
                    {entry.strengthLabel
                      ? ` · ${entry.strengthLabel} · Qty ${entry.quantity ?? "—"}`
                      : ""}
                  </p>
                </div>
                <p className="font-display text-3xl font-semibold tabular-nums">
                  {formatCurrency(entry.counterPrice)}
                </p>
              </div>
              <PassBarcode value={entry.coupon.barcodeValue} />
              <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                {(
                  [
                    ["BIN", entry.coupon.bin],
                    ["PCN", entry.coupon.pcn],
                    ["Group", entry.coupon.group],
                    ["Member", entry.coupon.memberId],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-muted/70 px-3 py-2">
                    <p className="text-xs uppercase text-muted-foreground">{label}</p>
                    <p className="font-mono font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Smart Switch: {entry.precheck.pharmacistTip}
              </p>
            </article>
          ))}
        </section>

        <p className="text-center text-sm text-muted-foreground">{pass.note}</p>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50dvh] items-center justify-center text-muted-foreground">
          <Loader2 className="mr-2 size-5 animate-spin" />
          Loading…
        </div>
      }
    >
      <ConfirmationBody />
    </Suspense>
  );
}
