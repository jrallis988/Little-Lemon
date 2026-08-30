"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { COUPONS } from "@/lib/data/coupons";
import { useCouponWallet } from "@/lib/store/coupon-wallet";
import { Button } from "@/components/ui/button";

export function CouponClipper() {
  const { clipped, clip, isClipped } = useCouponWallet();

  return (
    <section aria-labelledby="coupons-heading" className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="coupons-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            Coupon wallet
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Clip codes here — they show up at checkout ready to apply.{" "}
            {clipped.length > 0
              ? `${clipped.length} clipped in this browser.`
              : "Nothing clipped yet."}
          </p>
        </div>
        <Button
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          nativeButton={false}
          render={<Link href="/checkout" />}
        >
          Go to checkout
        </Button>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COUPONS.map((coupon) => {
          const clippedNow = isClipped(coupon.code);
          return (
            <li
              key={coupon.code}
              className="rounded-2xl border border-border/80 bg-surface-elevated/90 p-5"
            >
              <p className="font-display text-lg font-semibold tracking-tight">
                {coupon.code}
              </p>
              <p className="mt-1 text-sm font-medium">{coupon.label}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {coupon.description}
              </p>
              <Button
                className="mt-4 w-full"
                variant={clippedNow ? "outline" : "default"}
                onClick={() => clip(coupon.code)}
              >
                {clippedNow ? (
                  <>
                    <Check className="size-4" aria-hidden />
                    Clipped
                  </>
                ) : (
                  "Clip coupon"
                )}
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
