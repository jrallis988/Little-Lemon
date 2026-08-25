"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Loader2,
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

export const PASS_STORAGE_KEY = "trumprx_last_digital_pass";

export type StoredIssuedPass = {
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
    genericName?: string;
    strengthLabel?: string;
    quantity?: number;
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
};

function CartLine({
  item,
  onRemove,
}: {
  item: CheckoutCartItem;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border py-4 last:border-0">
      <div>
        <p className="font-semibold capitalize">{item.genericName}</p>
        <p className="text-sm text-muted-foreground">
          {item.pharmacyName} · {item.strengthLabel} · Qty {item.quantity} ·{" "}
          {item.supplyDays}-day
        </p>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-display text-2xl font-semibold tabular-nums text-primary">
          {formatCurrency(item.couponPrice)}
        </p>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={onRemove}
          aria-label="Remove"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function CheckoutClient() {
  const router = useRouter();
  const items = useCheckoutCartStore((s) => s.items);
  const removeItem = useCheckoutCartStore((s) => s.removeItem);
  const clear = useCheckoutCartStore((s) => s.clear);
  const hydrate = useCheckoutCartStore((s) => s.hydrate);
  const hydrated = useCheckoutCartStore((s) => s.hydrated);
  const { toast } = useToast();
  const [issuing, setIssuing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const data = (await res.json()) as StoredIssuedPass & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not issue digital pass.");

      const enriched: StoredIssuedPass = {
        ...data,
        passes: data.passes.map((entry) => {
          const cartItem = items.find((i) => i.id === entry.cartItemId);
          return {
            ...entry,
            genericName: cartItem?.genericName,
            strengthLabel: cartItem?.strengthLabel,
            quantity: cartItem?.quantity,
          };
        }),
      };

      try {
        sessionStorage.setItem(PASS_STORAGE_KEY, JSON.stringify(enriched));
      } catch {
        /* ignore */
      }

      toast({
        title: "Digital pass issued",
        description: data.savedToAccount
          ? "Saved to your account."
          : "Sign in next time to keep passes on your account.",
        tone: "success",
      });

      await clear();
      router.push(
        `/checkout/confirmation?pass=${encodeURIComponent(data.passId)}`
      );
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : "Checkout failed. Try again.";
      setError(message);
      toast({ title: "Checkout failed", description: message, tone: "error" });
    } finally {
      setIssuing(false);
    }
  }

  if (items.length === 0) {
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
