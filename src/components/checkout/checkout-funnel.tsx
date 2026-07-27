"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, CreditCard, Lock, Minus, Plus, ShoppingBag, Zap } from "lucide-react";

import { ACTIVE_STORE, REWARDS } from "@/lib/data/catalog";
import { formatCurrency, formatPoints } from "@/lib/pharmacy";
import { useCart } from "@/lib/store/cart";
import type { CheckoutMode } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PlacedOrder {
  id: string;
  total: number;
  itemCount: number;
  email: string;
  mode: CheckoutMode;
  points: number;
}

export function CheckoutFunnel() {
  const { items, itemCount, setQuantity, removeItem, clearCart } = useCart();
  const [mode, setMode] = useState<CheckoutMode>("guest");
  const [email, setEmail] = useState("");
  const [applyRewards, setApplyRewards] = useState(true);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
    const estimatedTax = subtotal * 0.0875;
    const shipping = 0;
    const rewardsDiscount =
      applyRewards && subtotal > 0 ? Math.min(5, subtotal * 0.05) : 0;
    const total = Math.max(0, subtotal + estimatedTax + shipping - rewardsDiscount);
    const points = items.reduce(
      (sum, item) => sum + item.rewardsPointsEarned * item.quantity,
      0,
    );
    return { subtotal, estimatedTax, shipping, rewardsDiscount, total, points };
  }, [applyRewards, items]);

  function placeOrder() {
    if (items.length === 0) return;
    const order: PlacedOrder = {
      id: `WG-${Date.now().toString().slice(-8)}`,
      total: totals.total,
      itemCount,
      email: email || "jordan.lee@email.com",
      mode,
      points: totals.points,
    };
    clearCart();
    setPlacedOrder(order);
  }

  if (placedOrder) {
    return (
      <section
        aria-labelledby="order-confirmation-heading"
        className="mx-auto max-w-lg space-y-6 rounded-2xl border border-health/25 bg-surface-elevated/90 p-6 sm:p-8"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 size-7 text-health" aria-hidden />
          <div>
            <h1
              id="order-confirmation-heading"
              className="font-display text-3xl font-semibold tracking-tight"
            >
              Order placed
            </h1>
            <p className="mt-2 text-muted-foreground">
              Confirmation #{placedOrder.id} · pickup at {ACTIVE_STORE.name}
            </p>
          </div>
        </div>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Items</dt>
            <dd className="font-medium">{placedOrder.itemCount}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Total charged</dt>
            <dd className="font-medium">{formatCurrency(placedOrder.total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Receipt</dt>
            <dd className="font-medium">{placedOrder.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Points to earn</dt>
            <dd className="font-medium text-brand">{placedOrder.points} pts</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            className="bg-brand text-brand-foreground hover:bg-brand/90"
            nativeButton={false}
            render={<Link href="/shop" />}
          >
            Continue shopping
          </Button>
          <Button variant="outline" onClick={() => setPlacedOrder(null)}>
            View checkout
          </Button>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section
        aria-labelledby="checkout-empty-heading"
        className="mx-auto max-w-lg space-y-5 rounded-2xl border border-dashed border-border bg-surface/70 p-8 text-center"
      >
        <ShoppingBag className="mx-auto size-10 text-muted-foreground" aria-hidden />
        <div>
          <h1
            id="checkout-empty-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add health and beauty essentials from the shop, then check out here.
          </p>
        </div>
        <Button
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          nativeButton={false}
          render={<Link href="/shop" />}
        >
          Browse shop
        </Button>
      </section>
    );
  }

  return (
    <section aria-labelledby="checkout-heading" className="space-y-8">
      <div>
        <h1
          id="checkout-heading"
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Checkout
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Guest, member, or quick-pay — same clear funnel, fewer steps.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as CheckoutMode)}
          >
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1 bg-muted/70 p-1">
              <TabsTrigger value="guest" className="gap-1.5 py-2.5">
                Guest
              </TabsTrigger>
              <TabsTrigger value="member" className="gap-1.5 py-2.5">
                Member
              </TabsTrigger>
              <TabsTrigger value="quick_pay" className="gap-1.5 py-2.5">
                <Zap className="size-3.5" aria-hidden />
                Quick pay
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guest" className="mt-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guest-email">Email for receipt</Label>
                <Input
                  id="guest-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Continue without an account. You can still earn points if you
                add a myWalgreens number at payment.
              </p>
            </TabsContent>

            <TabsContent value="member" className="mt-5 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="member-email">myWalgreens email</Label>
                <Input
                  id="member-email"
                  type="email"
                  autoComplete="email"
                  defaultValue="jordan.lee@email.com"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-password">Password</Label>
                <Input
                  id="member-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
              </div>
              <p className="rounded-lg border border-brand/20 bg-brand/5 px-3 py-2 text-sm text-foreground">
                Signed-in balance: {formatPoints(REWARDS.pointsBalance)} points
              </p>
            </TabsContent>

            <TabsContent value="quick_pay" className="mt-5 space-y-4">
              <p className="text-sm text-muted-foreground">
                Use a saved card and store pickup defaults for a one-tap place
                order.
              </p>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                <CreditCard className="size-5 text-brand" aria-hidden />
                <div>
                  <p className="text-sm font-medium">Visa ending 4242</p>
                  <p className="text-xs text-muted-foreground">
                    Pickup at Market & 5th
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {mode !== "quick_pay" ? (
            <div className="space-y-3">
              <h2 className="font-display text-lg font-semibold">Payment</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="card-name">Name on card</Label>
                  <Input id="card-name" autoComplete="cc-name" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="card-number">Card number</Label>
                  <Input
                    id="card-number"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-exp">Expiration</Label>
                  <Input id="card-exp" autoComplete="cc-exp" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-cvc">CVC</Label>
                  <Input id="card-cvc" autoComplete="cc-csc" placeholder="123" />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="h-fit rounded-2xl border border-border/80 bg-surface-elevated/90 p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <div className="relative size-16 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon-xs"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="size-3" />
                    </Button>
                    <span className="min-w-6 text-center text-sm tabular-nums">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon-xs"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="size-3" />
                    </Button>
                    <button
                      type="button"
                      className="ml-auto text-xs text-muted-foreground underline-offset-2 hover:underline"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="mt-1 text-sm font-semibold">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Separator className="my-4" />

          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 size-4 accent-[var(--brand)]"
              checked={applyRewards}
              onChange={(event) => setApplyRewards(event.target.checked)}
            />
            <span>
              Apply myWalgreens rewards
              <span className="mt-0.5 block text-xs text-muted-foreground">
                Save about {formatCurrency(totals.rewardsDiscount)} on this order
              </span>
            </span>
          </label>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatCurrency(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Estimated tax</dt>
              <dd>{formatCurrency(totals.estimatedTax)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Pickup</dt>
              <dd>{formatCurrency(totals.shipping)}</dd>
            </div>
            <div
              className={cn(
                "flex justify-between",
                applyRewards ? "text-brand" : "text-muted-foreground",
              )}
            >
              <dt>Rewards</dt>
              <dd>-{formatCurrency(totals.rewardsDiscount)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatCurrency(totals.total)}</dd>
            </div>
          </dl>

          <p className="mt-3 text-xs text-muted-foreground">
            You&apos;ll earn {totals.points} points after pickup.
          </p>

          <Button
            className="mt-5 w-full bg-brand text-brand-foreground hover:bg-brand/90"
            onClick={placeOrder}
          >
            <Lock className="size-4" aria-hidden />
            {mode === "quick_pay" ? "Place order with Quick Pay" : "Place order"}
          </Button>
        </aside>
      </div>
    </section>
  );
}
