"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import JsBarcode from "jsbarcode";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Printer,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { TrustCallout } from "@/components/design/trust-callout";
import { FulfillmentPanel } from "@/components/fulfillment/fulfillment-panel";
import {
  useCheckoutCartStore,
  type CheckoutCartItem,
} from "@/lib/store/checkout-cart-store";
import { useToast } from "@/components/providers/toast-provider";
import { formatCurrency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface IssuedPass {
  passId: string;
  savedToAccount?: boolean;
  issuedAt: string;
  totalCounterPrice: number;
  note: string;
  passes: Array<{
    cartItemId: string;
    pharmacyName: string;
    counterPrice: number;
    retailPrice: number;
    coupon: {
      id: string;
      bin: string;
      pcn: string;
      group: string;
      memberId: string;
      barcodeValue: string;
      expiresAt: string;
    };
    precheck: {
      status: string;
      confidence: number;
      pharmacistTip: string;
    };
  }>;
}

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
      <p className="mt-1 text-center font-mono text-xs tracking-widest">
        {value}
      </p>
    </div>
  );
}

function CartLine({
  item,
  onRemove,
}: {
  item: CheckoutCartItem;
  onRemove: () => void;
}) {
  return (
    <article className="flex flex-col gap-3 border-b border-border py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-semibold text-foreground">{item.genericName}</p>
        <p className="text-sm text-muted-foreground">
          {item.strengthLabel} · Qty {item.quantity} · {item.supplyDays}-day
        </p>
        <p className="mt-1 text-sm text-foreground/80">
          {item.pharmacyName}
          <span className="text-muted-foreground"> · {item.pharmacyAddress}</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-display text-2xl font-semibold tabular-nums">
            {formatCurrency(item.couponPrice)}
          </p>
          <p className="text-xs text-muted-foreground">counter price</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Remove from checkout"
          onClick={onRemove}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </article>
  );
}

export function CheckoutClient() {
  const items = useCheckoutCartStore((s) => s.items);
  const removeItem = useCheckoutCartStore((s) => s.removeItem);
  const clear = useCheckoutCartStore((s) => s.clear);
  const hydrate = useCheckoutCartStore((s) => s.hydrate);
  const hydrated = useCheckoutCartStore((s) => s.hydrated);
  const { toast } = useToast();
  const [issuing, setIssuing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pass, setPass] = useState<IssuedPass | null>(null);

  useEffect(() => {
    if (!hydrated) void hydrate();
  }, [hydrate, hydrated]);

  const total = items.reduce((sum, i) => sum + i.couponPrice, 0);
  const first = items[0];

  async function issueDigitalPass() {
    if (items.length === 0) return;
    setIssuing(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/digital-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            cartItemId: item.id,
            pharmacyId: item.pharmacyId,
            drugId: item.drugId,
            strengthId: item.strengthId,
            quantity: item.quantity,
            supplyDays: item.supplyDays,
            couponPrice: item.couponPrice,
            retailPrice: item.retailPrice,
          })),
        }),
      });
      const data = (await res.json()) as IssuedPass & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not issue digital pass.");
      setPass(data);
      toast({
        title: "Digital pass issued",
        description: data.savedToAccount
          ? "Saved to your account."
          : "Sign in next time to keep passes on your account.",
        tone: "success",
      });
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : "Checkout failed. Try again.";
      setError(message);
      toast({ title: "Checkout failed", description: message, tone: "error" });
    } finally {
      setIssuing(false);
    }
  }

  if (items.length === 0 && !pass) {
    return (
      <div className="mx-auto max-w-lg space-y-4 py-16 text-center">
        <ShoppingBag className="mx-auto size-10 text-muted-foreground" />
        <h1 className="font-display text-3xl font-semibold">Checkout is empty</h1>
        <p className="text-muted-foreground">
          Add a counter-price deal from Compare prices — no manufacturer portal,
          no paper-only dead ends.
        </p>
        <Link
          href="/search"
          className={cn(buttonVariants(), "min-h-11 gap-1.5 px-4")}
        >
          Compare prices
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Direct-to-consumer
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Digital checkout
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Build your pass in-app. The price you see is the cash price at the
          counter — pay the pharmacy, not a redirect.
        </p>
      </div>

      <TrustCallout variant="warning" title="Seen price = counter price">
        Trump RX does not charge your card for prescriptions here. Issuing a
        digital pass creates scannable discount-card claims. Not insurance.
      </TrustCallout>

      {!pass && (
        <section className="rounded-2xl border border-border bg-card px-4 sm:px-5">
          {items.map((item) => (
            <CartLine
              key={item.id}
              item={item}
              onRemove={() => {
                void removeItem(item.id).then((result) => {
                  if (!result.ok) {
                    toast({
                      title: "Could not remove item",
                      description: result.error,
                      tone: "error",
                    });
                  }
                });
              }}
            />
          ))}
          <div className="flex flex-col gap-3 border-t border-border py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {items.length} deal{items.length === 1 ? "" : "s"}
              </p>
              <p className="font-display text-3xl font-semibold tabular-nums">
                {formatCurrency(total)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  void clear().then((result) => {
                    if (!result.ok) {
                      toast({
                        title: "Could not clear cart",
                        description: result.error,
                        tone: "error",
                      });
                    }
                  });
                }}
              >
                Clear
              </Button>
              <Button
                type="button"
                className="min-h-11"
                disabled={issuing}
                onClick={() => void issueDigitalPass()}
              >
                {issuing ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Issuing pass…
                  </>
                ) : (
                  <>
                    Issue digital pass
                    <ArrowRight />
                  </>
                )}
              </Button>
            </div>
          </div>
          {error && (
            <p className="pb-4 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </section>
      )}

      {pass && (
        <section className="trx-coupon-print space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-savings/30 bg-savings/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-savings" />
              <div>
                <p className="font-semibold">Pass {pass.passId}</p>
                <p className="text-sm text-muted-foreground">
                  Total counter {formatCurrency(pass.totalCounterPrice)} ·{" "}
                  {new Date(pass.issuedAt).toLocaleString()}
                  {pass.savedToAccount
                    ? " · saved to your account"
                    : " · sign in next time to save passes"}
                </p>
              </div>
            </div>
            <div className="no-print flex gap-2">
              <Button type="button" variant="outline" onClick={() => window.print()}>
                <Printer />
                Print pack
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setPass(null);
                  void clear();
                }}
              >
                Start new checkout
              </Button>
            </div>
          </div>

          {pass.passes.map((entry) => {
            const cartItem = items.find((i) => i.id === entry.cartItemId);
            return (
              <article
                key={entry.coupon.id}
                className="space-y-3 rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">
                      {cartItem?.genericName ?? "Medication"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {entry.pharmacyName}
                      {cartItem
                        ? ` · ${cartItem.strengthLabel} · Qty ${cartItem.quantity}`
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
                      <p className="text-xs uppercase text-muted-foreground">
                        {label}
                      </p>
                      <p className="font-mono font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <p
                  className={cn(
                    "text-sm",
                    entry.precheck.status === "likely_accept"
                      ? "text-savings"
                      : "text-muted-foreground"
                  )}
                >
                  Smart Switch: {entry.precheck.pharmacistTip}
                </p>
              </article>
            );
          })}
        </section>
      )}

      {first && (
        <FulfillmentPanel
          drugId={first.drugId}
          strengthId={first.strengthId}
          quantity={first.quantity}
          supplyDays={first.supplyDays}
          pharmacyId={first.pharmacyId}
          zip={undefined}
        />
      )}
    </div>
  );
}
