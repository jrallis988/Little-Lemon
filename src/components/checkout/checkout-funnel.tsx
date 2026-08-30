"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  CreditCard,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Zap,
} from "lucide-react";

import { REWARDS } from "@/lib/data/catalog";
import { findCoupon, getCouponDiscount } from "@/lib/data/coupons";
import { formatCurrency, formatPoints } from "@/lib/pharmacy";
import { useAuth, DEMO_ACCOUNT } from "@/lib/store/auth";
import { useCart } from "@/lib/store/cart";
import { useCouponWallet } from "@/lib/store/coupon-wallet";
import { useOrders } from "@/lib/store/orders";
import { useSelectedStore } from "@/lib/store/store-selection";
import type { CheckoutMode, FulfillmentMethod, PlacedOrder } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function CheckoutFunnel() {
  const { items, itemCount, setQuantity, removeItem, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { store } = useSelectedStore();
  const { user, signIn } = useAuth();
  const { clipped } = useCouponWallet();

  const [mode, setMode] = useState<CheckoutMode>(user ? "member" : "guest");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>("pickup");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [cardName, setCardName] = useState(user?.displayName ?? "Jordan Lee");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExp, setCardExp] = useState("12/30");
  const [cardCvc, setCardCvc] = useState("123");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [applyRewards, setApplyRewards] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const appliedCoupon = appliedCouponCode
    ? findCoupon(appliedCouponCode)
    : undefined;

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
    const estimatedTax = Math.round(subtotal * 0.0875 * 100) / 100;
    const shipping =
      fulfillment === "pickup"
        ? 0
        : fulfillment === "same_day"
          ? subtotal >= 35
            ? 0
            : 5.99
          : subtotal >= 35
            ? 0
            : 4.99;
    const rewardsDiscount =
      applyRewards && (user || mode === "member" || mode === "quick_pay") && subtotal > 0
        ? Math.min(5, Math.round(subtotal * 0.05 * 100) / 100)
        : 0;
    const couponDiscount = appliedCoupon
      ? getCouponDiscount(appliedCoupon, subtotal)
      : 0;
    const total = Math.max(
      0,
      Math.round(
        (subtotal + estimatedTax + shipping - rewardsDiscount - couponDiscount) *
          100,
      ) / 100,
    );
    const points = items.reduce(
      (sum, item) => sum + item.rewardsPointsEarned * item.quantity,
      0,
    );
    return {
      subtotal,
      estimatedTax,
      shipping,
      rewardsDiscount,
      couponDiscount,
      total,
      points,
    };
  }, [appliedCoupon, applyRewards, fulfillment, items, mode, user]);

  function applyCoupon() {
    const coupon = findCoupon(couponInput);
    if (!coupon) {
      setAppliedCouponCode(null);
      setCouponMessage("That code isn’t valid. Try AUG10, FAST15, or DEAL20.");
      return;
    }
    const discount = getCouponDiscount(coupon, totals.subtotal);
    if (discount <= 0) {
      setAppliedCouponCode(null);
      setCouponMessage(
        `Add more to your cart to use ${coupon.code} (min $${coupon.minSubtotal ?? 0}).`,
      );
      return;
    }
    setAppliedCouponCode(coupon.code);
    setCouponMessage(`Applied ${coupon.code}: ${coupon.description}`);
  }

  function placeOrder() {
    setError(null);
    if (items.length === 0) return;

    let receiptEmail = email.trim();

    if (mode === "member" && !user) {
      const result = signIn(email, password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      receiptEmail = email.trim().toLowerCase();
    }

    if (mode === "guest") {
      if (!receiptEmail) {
        receiptEmail = DEMO_ACCOUNT.email;
      } else if (!isValidEmail(receiptEmail)) {
        setError("Enter a valid email for your receipt.");
        return;
      }
    }

    if (mode === "quick_pay") {
      if (!user && !signIn(DEMO_ACCOUNT.email, DEMO_ACCOUNT.password).ok) {
        setError("Quick Pay needs a signed-in member.");
        return;
      }
      receiptEmail = user?.email ?? DEMO_ACCOUNT.email;
    }

    if (fulfillment !== "pickup" && deliveryAddress.trim().length < 8) {
      setError("Enter a delivery address (street, city, ZIP).");
      return;
    }

    let paymentLast4 = user?.savedCardLast4 ?? "4242";
    if (mode !== "quick_pay") {
      const digits = digitsOnly(cardNumber);
      if (digits.length < 12 || digits.length > 19) {
        setError("Enter a valid card number (demo: any 16 digits ending in 4242).");
        return;
      }
      if (!cardName.trim()) {
        setError("Enter the name on the card.");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExp.trim())) {
        setError("Use expiration format MM/YY.");
        return;
      }
      if (digitsOnly(cardCvc).length < 3) {
        setError("Enter a 3-digit CVC.");
        return;
      }
      paymentLast4 = digits.slice(-4);
    }

    const order: PlacedOrder = {
      id: `WG-${Date.now().toString().slice(-8)}`,
      placedAt: new Date().toISOString(),
      mode,
      email: receiptEmail,
      itemCount,
      subtotal: totals.subtotal,
      tax: totals.estimatedTax,
      shipping: totals.shipping,
      rewardsDiscount: totals.rewardsDiscount,
      couponDiscount: totals.couponDiscount,
      couponCode: appliedCouponCode ?? undefined,
      total: totals.total,
      points: totals.points,
      fulfillment,
      storeId: store.id,
      storeName: store.name,
      deliveryAddress:
        fulfillment === "pickup" ? undefined : deliveryAddress.trim(),
      paymentLast4,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        brand: item.brand,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        imageUrl: item.imageUrl,
      })),
      receiptNote: `A receipt was sent to ${receiptEmail} (demo — email is not actually delivered).`,
    };

    addOrder(order);
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
              Confirmation #{placedOrder.id} ·{" "}
              {placedOrder.fulfillment === "pickup"
                ? `pickup at ${placedOrder.storeName}`
                : `${placedOrder.fulfillment.replaceAll("_", " ")} to ${placedOrder.deliveryAddress}`}
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
            <dt className="text-muted-foreground">Card</dt>
            <dd className="font-medium">···· {placedOrder.paymentLast4}</dd>
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
        <p className="text-xs text-muted-foreground">{placedOrder.receiptNote}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            className="bg-brand text-brand-foreground hover:bg-brand/90"
            nativeButton={false}
            render={<Link href="/account/orders" />}
          >
            View order history
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/shop" />}
          >
            Continue shopping
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
          Guest, member, or quick-pay — choose pickup or delivery, apply a code,
          and place your order.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Tabs
            value={mode}
            onValueChange={(value) => {
              setMode(value as CheckoutMode);
              setError(null);
            }}
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
                Continue without an account. Leave blank to use the demo receipt
                address.
              </p>
            </TabsContent>

            <TabsContent value="member" className="mt-5 space-y-4">
              {user ? (
                <p className="rounded-lg border border-brand/20 bg-brand/5 px-3 py-2 text-sm">
                  Signed in as {user.displayName} ·{" "}
                  {formatPoints(REWARDS.pointsBalance)} points
                </p>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="member-email">myWalgreens email</Label>
                    <Input
                      id="member-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={DEMO_ACCOUNT.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-password">Password</Label>
                    <Input
                      id="member-password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Demo: {DEMO_ACCOUNT.email} / {DEMO_ACCOUNT.password}
                  </p>
                </>
              )}
            </TabsContent>

            <TabsContent value="quick_pay" className="mt-5 space-y-4">
              <p className="text-sm text-muted-foreground">
                Use a saved card and your selected store for a one-tap place
                order.
              </p>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                <CreditCard className="size-5 text-brand" aria-hidden />
                <div>
                  <p className="text-sm font-medium">
                    Visa ending {user?.savedCardLast4 ?? "4242"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pickup at {store.name.replace("Walgreens RX — ", "")}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold">Fulfillment</h2>
            <div className="grid gap-2 sm:grid-cols-3">
              {(
                [
                  ["pickup", "Store pickup", "Free · ready ~30 min"],
                  ["same_day", "Same-day", "From $0 over $35"],
                  ["delivery", "Ship to home", "From $0 over $35"],
                ] as const
              ).map(([value, label, hint]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFulfillment(value)}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left text-sm transition-colors",
                    fulfillment === value
                      ? "border-brand bg-brand/5"
                      : "border-border hover:border-brand/40",
                  )}
                >
                  <span className="font-medium">{label}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {hint}
                  </span>
                </button>
              ))}
            </div>
            {fulfillment === "pickup" ? (
              <p className="text-sm text-muted-foreground">
                Pickup at{" "}
                <Link href="/stores" className="font-medium text-brand underline-offset-2 hover:underline">
                  {store.name}
                </Link>
              </p>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="delivery-address">Delivery address</Label>
                <Input
                  id="delivery-address"
                  value={deliveryAddress}
                  onChange={(event) => setDeliveryAddress(event.target.value)}
                  placeholder="123 Main St, San Francisco, CA 94102"
                  autoComplete="street-address"
                />
              </div>
            )}
          </div>

          {mode !== "quick_pay" ? (
            <div className="space-y-3">
              <h2 className="font-display text-lg font-semibold">Payment</h2>
              <p className="text-xs text-muted-foreground">
                Demo checkout — card details stay in your browser and are not
                sent to a processor. Use any test number ending in 4242.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="card-name">Name on card</Label>
                  <Input
                    id="card-name"
                    autoComplete="cc-name"
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="card-number">Card number</Label>
                  <Input
                    id="card-number"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-exp">Expiration</Label>
                  <Input
                    id="card-exp"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    value={cardExp}
                    onChange={(event) => setCardExp(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-cvc">CVC</Label>
                  <Input
                    id="card-cvc"
                    autoComplete="cc-csc"
                    placeholder="123"
                    value={cardCvc}
                    onChange={(event) => setCardCvc(event.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive" role="alert">
              {error}
            </p>
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

          <div className="space-y-2">
            <Label htmlFor="coupon">Promo code</Label>
            <div className="flex gap-2">
              <Input
                id="coupon"
                value={couponInput}
                onChange={(event) => setCouponInput(event.target.value)}
                placeholder="AUG10"
                className="uppercase"
              />
              <Button type="button" variant="outline" onClick={applyCoupon}>
                Apply
              </Button>
            </div>
            {clipped.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {clipped.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                      appliedCouponCode === code
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground",
                    )}
                    onClick={() => {
                      setCouponInput(code);
                      const coupon = findCoupon(code);
                      if (!coupon) return;
                      const discount = getCouponDiscount(coupon, totals.subtotal);
                      if (discount <= 0) {
                        setAppliedCouponCode(null);
                        setCouponMessage(
                          `Add more to your cart to use ${coupon.code} (min $${coupon.minSubtotal ?? 0}).`,
                        );
                        return;
                      }
                      setAppliedCouponCode(coupon.code);
                      setCouponMessage(
                        `Applied ${coupon.code}: ${coupon.description}`,
                      );
                    }}
                  >
                    {code}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Clip codes on{" "}
                <Link href="/deals" className="text-brand underline-offset-2 hover:underline">
                  Weekly deals
                </Link>{" "}
                to fill your wallet.
              </p>
            )}
            {couponMessage ? (
              <p className="text-xs text-muted-foreground">{couponMessage}</p>
            ) : null}
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm">
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
              <dt className="text-muted-foreground">
                {fulfillment === "pickup" ? "Pickup" : "Shipping"}
              </dt>
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
            {totals.couponDiscount > 0 ? (
              <div className="flex justify-between text-brand">
                <dt>Promo ({appliedCouponCode})</dt>
                <dd>-{formatCurrency(totals.couponDiscount)}</dd>
              </div>
            ) : null}
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
