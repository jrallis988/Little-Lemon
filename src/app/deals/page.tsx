import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LANDING_DEALS } from "@/lib/data/landing";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Weekly deals",
  description: "Coupons, BOGOs, and seasonal savings at Walgreens RX.",
};

const EXTRA_DEALS = [
  {
    id: "clearance",
    title: "Up to 60% off clearance",
    detail: "While supplies last — in store and online pickup.",
    href: "/shop",
  },
  {
    id: "contacts",
    title: "25% off contacts",
    detail: "Stock up with code STOCKUP25 on qualifying orders.",
    href: "/shop",
  },
  {
    id: "myw",
    title: "myWalgreens exclusive clip deals",
    detail: "Members unlock sale prices and bonus Walgreens Cash.",
    href: "/#rewards",
  },
];

export default function DealsPage() {
  const deals = [...LANDING_DEALS, ...EXTRA_DEALS];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Weekly deals
        </h1>
        <p className="mt-3 text-muted-foreground">
          Savings inspired by what&apos;s live on Walgreens.com — pickup codes,
          BOGOs, and member exclusives.
        </p>
      </div>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {deals.map((deal) => (
          <li key={deal.id}>
            <Link
              href={deal.href}
              className="group flex items-start justify-between gap-4 py-5"
            >
              <span>
                <span className="block font-display text-xl font-semibold tracking-tight">
                  {deal.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {deal.detail}
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
    </div>
  );
}
