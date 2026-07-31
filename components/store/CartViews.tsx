"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useStore } from "@/components/store/StoreProvider";
import { formatPrice } from "@/lib/store";
import { ProductArt } from "@/components/store/ProductArt";
import {
  RequiredLegend,
  RequiredMark,
  useAccessibleForm,
} from "@/components/a11y/FormFeedback";
import { candidate } from "@/lib/candidate";

export function CartView() {
  const { lines, ready, subtotalCents, setQty, removeItem, lineProduct, lineKey } = useStore();

  if (!ready) {
    return <p className="text-slate-muted">Loading cart…</p>;
  }

  if (!lines.length) {
    return (
      <div className="border border-slate-line bg-white p-8 text-center">
        <p className="font-display text-xl uppercase text-ink">Your cart is empty</p>
        <p className="mt-2 text-slate-muted">
          Grab a tee, yard sign, or sticker pack to support the campaign.
        </p>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">
          Browse the store
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
      <ul className="space-y-4">
        {lines.map((line) => {
          const product = lineProduct(line);
          if (!product) return null;
          return (
            <li
              key={lineKey(line)}
              className="grid gap-4 border border-slate-line bg-white p-4 sm:grid-cols-[9rem_1fr_auto]"
            >
              <Link href={`/shop/${product.slug}`} className="block overflow-hidden">
                <ProductArt product={product} className="!aspect-square" />
              </Link>
              <div>
                <Link
                  href={`/shop/${product.slug}`}
                  className="font-display text-lg uppercase text-ink hover:text-red"
                >
                  {product.name}
                </Link>
                {line.size && (
                  <p className="mt-1 text-sm text-slate-muted">Size: {line.size}</p>
                )}
                <p className="mt-1 text-sm font-semibold text-navy">
                  {formatPrice(product.priceCents)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <label className="sr-only" htmlFor={`qty-${lineKey(line)}`}>
                    Quantity for {product.name}
                  </label>
                  <input
                    id={`qty-${lineKey(line)}`}
                    type="number"
                    min={1}
                    max={99}
                    value={line.qty}
                    onChange={(e) =>
                      setQty(
                        line.productSlug,
                        Math.max(1, Math.min(99, Number(e.target.value) || 1)),
                        line.size
                      )
                    }
                    className="input-field w-20 !py-2"
                  />
                  <button
                    type="button"
                    className="text-sm font-semibold text-red underline-offset-2 hover:underline"
                    onClick={() => removeItem(line.productSlug, line.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-right text-sm font-semibold text-ink sm:pt-1">
                {formatPrice(product.priceCents * line.qty)}
              </p>
            </li>
          );
        })}
      </ul>

      <aside className="h-fit border border-slate-line bg-paper p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-xl uppercase text-ink">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-muted">Subtotal</dt>
            <dd className="font-semibold text-ink">{formatPrice(subtotalCents)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-muted">Shipping</dt>
            <dd className="text-slate-text">Calculated at checkout</dd>
          </div>
        </dl>
        <Link href="/shop/checkout" className="btn-primary mt-6 w-full text-center">
          Checkout →
        </Link>
        <Link href="/shop" className="mt-3 block text-center text-sm font-semibold text-navy underline-offset-2 hover:underline">
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const { lines, ready, subtotalCents, clearCart, lineProduct, lineKey } = useStore();
  const {
    StatusRegion,
    FieldError,
    fieldProps,
    reportErrors,
    reportSuccess,
    status,
  } = useAccessibleForm();

  if (!ready) return <p className="text-slate-muted">Loading…</p>;

  if (!lines.length && status !== "success") {
    return (
      <div className="border border-slate-line bg-white p-8 text-center">
        <p className="font-display text-xl uppercase text-ink">Nothing to check out</p>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">
          Browse the store
        </Link>
      </div>
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const address = String(data.get("address") || "").trim();
    const city = String(data.get("city") || "").trim();
    const state = String(data.get("state") || "").trim();
    const zip = String(data.get("zip") || "").trim();

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Enter your name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email.";
    }
    if (!address) errors.address = "Enter a street address.";
    if (!city) errors.city = "Enter a city.";
    if (!state) errors.state = "Enter a state.";
    if (!zip) errors.zip = "Enter a ZIP code.";

    if (Object.keys(errors).length) {
      reportErrors(errors);
      return;
    }

    // Demo checkout — payment processor not wired yet
    clearCart();
    reportSuccess(
      `Order request received. ${candidate.brandName} will follow up at ${email} to confirm payment and shipping.`
    );
    window.setTimeout(() => router.push("/shop"), 4000);
  }

  if (status === "success") {
    return (
      <div className="border border-slate-line bg-white p-8">
        <StatusRegion successMessage="Order request received." />
        <p className="mt-4 text-slate-text">
          Thanks for backing the campaign. We’ll email payment instructions and a shipping
          estimate shortly. No charge has been processed yet.
        </p>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">
          Back to store
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        noValidate
        onSubmit={onSubmit}
        className="space-y-5 border border-slate-line bg-white p-6 md:p-8"
      >
        <RequiredLegend />
        <StatusRegion successMessage="Order request received." />

        <div>
          <label htmlFor="name" className="label-field">
            Full name <RequiredMark />
          </label>
          <input id="name" name="name" className="input-field mt-2" {...fieldProps("name")} />
          <FieldError name="name" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="label-field">
              Email <RequiredMark />
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-field mt-2"
              {...fieldProps("email")}
            />
            <FieldError name="email" />
          </div>
          <div>
            <label htmlFor="phone" className="label-field">
              Phone
            </label>
            <input id="phone" name="phone" type="tel" className="input-field mt-2" />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="label-field">
            Street address <RequiredMark />
          </label>
          <input
            id="address"
            name="address"
            className="input-field mt-2"
            {...fieldProps("address")}
          />
          <FieldError name="address" />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label htmlFor="city" className="label-field">
              City <RequiredMark />
            </label>
            <input id="city" name="city" className="input-field mt-2" {...fieldProps("city")} />
            <FieldError name="city" />
          </div>
          <div>
            <label htmlFor="state" className="label-field">
              State <RequiredMark />
            </label>
            <input
              id="state"
              name="state"
              defaultValue="NH"
              className="input-field mt-2"
              {...fieldProps("state")}
            />
            <FieldError name="state" />
          </div>
          <div>
            <label htmlFor="zip" className="label-field">
              ZIP <RequiredMark />
            </label>
            <input id="zip" name="zip" className="input-field mt-2" {...fieldProps("zip")} />
            <FieldError name="zip" />
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-muted">
          Checkout submits an order request to the campaign. Card payment is not processed on
          this page yet — we’ll confirm totals (including shipping) before any charge. Paid for by{" "}
          {candidate.committee}.
        </p>

        <button type="submit" className="btn-primary w-full">
          Place order request →
        </button>
      </form>

      <aside className="h-fit border border-slate-line bg-paper p-6">
        <h2 className="font-display text-xl uppercase text-ink">Your items</h2>
        <ul className="mt-4 space-y-3">
          {lines.map((line) => {
            const product = lineProduct(line);
            if (!product) return null;
            return (
              <li key={lineKey(line)} className="flex justify-between gap-3 text-sm">
                <span className="text-slate-text">
                  {product.name}
                  {line.size ? ` (${line.size})` : ""} × {line.qty}
                </span>
                <span className="shrink-0 font-semibold text-ink">
                  {formatPrice(product.priceCents * line.qty)}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 flex justify-between border-t border-slate-line pt-4 text-sm">
          <span className="font-semibold text-ink">Subtotal</span>
          <span className="font-semibold text-ink">{formatPrice(subtotalCents)}</span>
        </div>
      </aside>
    </div>
  );
}
