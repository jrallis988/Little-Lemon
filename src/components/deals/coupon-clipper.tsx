"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { COUPONS } from "@/lib/data/coupons";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "walgreens-clipped-coupons-v1";

export function CouponClipper() {
  const [clipped, setClipped] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setClipped(JSON.parse(raw) as string[]);
    } catch {
      // ignore
    }
  }, []);

  function clip(code: string) {
    setClipped((current) => {
      const next = current.includes(code) ? current : [...current, code];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <section aria-labelledby="coupons-heading" className="mt-12">
      <h2
        id="coupons-heading"
        className="font-display text-2xl font-semibold tracking-tight"
      >
        Clip a code
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Codes apply at checkout. Clipped codes are remembered in this browser.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {COUPONS.map((coupon) => {
          const isClipped = clipped.includes(coupon.code);
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
                variant={isClipped ? "outline" : "default"}
                onClick={() => clip(coupon.code)}
              >
                {isClipped ? (
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
      <Button
        className="mt-6 bg-brand text-brand-foreground hover:bg-brand/90"
        nativeButton={false}
        render={<Link href="/checkout" />}
      >
        Go to checkout
      </Button>
    </section>
  );
}
