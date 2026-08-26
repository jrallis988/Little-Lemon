import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TrustCallout } from "@/components/design/trust-callout";
import { UpgradeButton } from "@/components/upgrade-button";
import { getLaunchFeatures } from "@/lib/launch-mode";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Optional account tools",
  description:
    "Optional TrumpRx account tools for saved medications and reminders. Membership is not a pharmacy checkout and does not make medications free.",
};

const FREE = [
  "Check whether select medications are included",
  "Compare TrumpRx option with what you currently pay",
  "Review eligibility and access pathways",
  "Save included meds to your account",
  "No account required to check coverage",
];

const PLUS = [
  "Everything in Free",
  "Optional deeper cash options at some participating pharmacies",
  "Family profiles for organizing household meds (up to 5)",
  "Cross-device saved meds & refill reminders",
  "Priority tips for program information issues",
];

export default function MembershipPage() {
  const features = getLaunchFeatures();

  if (!features.membership) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
          Not available in limited launch
        </h1>
        <p className="mt-3 text-muted-foreground">
          Paid membership and Plus account tools are disabled during the v1
          launch. Coverage check, medication details, and pharmacy pickup
          pathways are free to use. TrumpRx still does not sell medications.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/search" className={cn(buttonVariants({ size: "lg" }))}>
            Check coverage
          </Link>
          <Link
            href="/medications"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Included medications
          </Link>
        </div>
      </div>
    );
  }

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
            Optional account tools
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
            Membership is for account convenience — not a shopping cart for
            medications. TrumpRx still does not sell or dispense drugs. “Free to
            use” does not mean medications are free.
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
              Check coverage
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
              Secure Stripe checkout. Cancel anytime from Manage billing.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
