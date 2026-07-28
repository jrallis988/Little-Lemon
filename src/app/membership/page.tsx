import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TrustCallout } from "@/components/design/trust-callout";
import { UpgradeButton } from "@/components/upgrade-button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free vs membership",
  description:
    "Compare free Trump RX coupons with an optional membership tier for deeper savings — GoodRx-style clarity without forced paywalls.",
};

const FREE = [
  "Search brand and generic medications",
  "Compare local pharmacy coupon prices",
  "Show-to-pharmacist digital coupon",
  "Save meds on this device",
  "No account required to compare",
];

const PLUS = [
  "Everything in Free",
  "Deeper membership prices at participating pharmacies",
  "Family profiles (up to 5)",
  "Cross-device saved meds & price alerts",
  "Priority coupon support tips",
];

export default function MembershipPage() {
  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="relative isolate overflow-hidden border-b border-border">
        <Image
          src="/images/senior-care.webp"
          alt=""
          fill
          className="object-cover object-center opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Free coupons. Optional membership.
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
            Compare first — no aggressive paywall. Membership is optional for
            people who refill often and want deeper prices.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        <TrustCallout variant="warning" title="Still not insurance">
          Neither free coupons nor membership replace health insurance. Always
          compare with your plan copay.
        </TrustCallout>

        <div className="grid gap-3 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Free
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold">
              Trump RX Free
            </h2>
            <p className="mt-1 text-3xl font-semibold tabular-nums">$0</p>
            <ul className="mt-4 space-y-2.5">
              {FREE.map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-savings" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/search"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-5 min-h-11 w-full"
              )}
            >
              Start comparing free
            </Link>
          </section>

          <section className="rounded-2xl border border-primary/30 bg-card p-5 ring-1 ring-primary/20">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Membership
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold">
              Trump RX Plus
            </h2>
            <p className="mt-1 text-3xl font-semibold tabular-nums">
              $9.99
              <span className="text-base font-medium text-muted-foreground">
                /mo
              </span>
            </p>
            <ul className="mt-4 space-y-2.5">
              {PLUS.map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-savings" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <UpgradeButton />
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Stripe checkout is used when configured. Otherwise, Plus is
              activated locally for development.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
