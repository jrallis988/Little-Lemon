"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  WEEKLY_AD,
  WEEKLY_AD_PERIOD,
} from "@/lib/data/coupons";
import { useSelectedStore } from "@/lib/store/store-selection";
import { CouponClipper } from "@/components/deals/coupon-clipper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function WeeklyAdBoard() {
  const { store } = useSelectedStore();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-brand">
          {WEEKLY_AD_PERIOD.headline} · {WEEKLY_AD_PERIOD.startLabel}–
          {WEEKLY_AD_PERIOD.endLabel}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Weekly deals
        </h1>
        <p className="mt-3 text-muted-foreground">
          Circular-style savings for{" "}
          <span className="font-medium text-foreground">{store.name}</span>. Clip
          codes below, then apply them at checkout.
        </p>
      </div>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {WEEKLY_AD.map((deal) => (
          <li key={deal.id}>
            <Link
              href={deal.href}
              className="group flex items-start justify-between gap-4 py-5"
            >
              <span>
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-xl font-semibold tracking-tight">
                    {deal.title}
                  </span>
                  {deal.badge ? (
                    <Badge
                      variant="outline"
                      className="border-brand/30 bg-brand/5 text-brand"
                    >
                      {deal.badge}
                    </Badge>
                  ) : null}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {deal.detail}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {deal.endsLabel}
                </span>
              </span>
              <ArrowRight
                className="mt-1 size-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>

      <Button
        className="mt-8 bg-brand text-brand-foreground hover:bg-brand/90"
        nativeButton={false}
        render={<Link href="/shop" />}
      >
        Shop all deals
      </Button>

      <CouponClipper />
    </div>
  );
}
