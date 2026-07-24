"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CreditCard, Lock, Zap } from "lucide-react";

import { PRODUCTS, REWARDS } from "@/lib/data/catalog";
import { formatCurrency, formatPoints } from "@/lib/pharmacy";
import type { CartItem, CheckoutMode } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DEMO_CART: CartItem[] = PRODUCTS.slice(0, 2).map((product, index) => ({
  id: `cart-${product.id}`,
  productId: product.id,
  name: product.name,
  brand: product.brand,
  quantity: index === 0 ? 1 : 2,
  unitPrice: product.price,
  imageUrl: product.imageUrl,
  fulfillment: "pickup",
  rewardsPointsEarned: product.rewardsPoints ?? 0,
}));

export function CheckoutFunnel() {
  const [mode, setMode] = useState<CheckoutMode>("guest");
  const [email, setEmail] = useState("");
  const [applyRewards, setApplyRewards] = useState(true);

  const totals = useMemo(() => {
    const subtotal = DEMO_CART.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
    const estimatedTax = subtotal * 0.0875;
    const shipping = 0;
    const rewardsDiscount = applyRewards ? Math.min(5, subtotal * 0.05) : 0;
    const total = subtotal + estimatedTax + shipping - rewardsDiscount;
    const points = DEMO_CART.reduce(
      (sum, item) => sum + item.rewardsPointsEarned * item.quantity,
      0,
    );
    return { subtotal, estimatedTax, shipping, rewardsDiscount, total, points };
  }, [applyRewards]);

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
        </div>

        <aside className="h-fit rounded-2xl border border-border/80 bg-surface-elevated/90 p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-4">
            {DEMO_CART.map((item) => (
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
                  <p className="text-xs text-muted-foreground">
                    {item.brand} · Qty {item.quantity}
                  </p>
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

          <Button className="mt-5 w-full bg-brand text-brand-foreground hover:bg-brand/90">
            <Lock className="size-4" aria-hidden />
            {mode === "quick_pay" ? "Place order with Quick Pay" : "Place order"}
          </Button>
        </aside>
      </div>
    </section>
  );
}
