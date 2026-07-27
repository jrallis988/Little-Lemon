import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { TrustCallout } from "@/components/design/trust-callout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How coupons work",
  description:
    "Learn how Trump RX discount coupons work at the pharmacy counter — and how to compare with insurance.",
};

const STEPS = [
  {
    title: "Search your medication",
    body: "Enter the brand or generic name, then pick dosage, quantity, and 30- or 90-day supply.",
  },
  {
    title: "Compare nearby pharmacies",
    body: "Sort by lowest price or nearest store. Open a row for hours, phone, and coupon acceptance.",
  },
  {
    title: "Show the coupon at the counter",
    body: "Use pharmacist mode for a large barcode, or have them enter BIN / PCN / Group / Member ID.",
  },
  {
    title: "Compare with your insurance",
    body: "Ask which costs less: the Trump RX coupon or your plan copay. Use the lower one.",
  },
] as const;

export default function HelpPage() {
  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="relative isolate overflow-hidden border-b border-border">
        <Image
          src="/images/step-coupon.webp"
          alt=""
          fill
          className="object-cover object-[center_30%] opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/75" />
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            How Trump RX coupons work
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
            A clear counter flow for patients and caregivers — built for phones
            first.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <TrustCallout variant="warning" title="Discount card — not insurance">
          Trump RX coupons generally cannot be combined with insurance. Always
          ask the pharmacist to compare prices before processing.
        </TrustCallout>

        <ol className="grid gap-3 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <p className="text-xs font-bold tracking-wide text-primary">
                STEP {i + 1}
              </p>
              <h2 className="mt-1 text-lg font-semibold">{step.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <section className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold">
              If something goes wrong at the pharmacy
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Coupon not accepted:</strong>{" "}
                Ask them to process as a discount card (not insurance), or try
                another nearby pharmacy.
              </li>
              <li>
                <strong className="text-foreground">Price looks different:</strong>{" "}
                Confirm dosage, quantity, and brand vs generic. Re-check Trump RX
                before you leave.
              </li>
              <li>
                <strong className="text-foreground">Stock issue:</strong> Call
                ahead using the pharmacy phone number on the store card.
              </li>
              <li>
                <strong className="text-foreground">Location denied:</strong> Enter
                a ZIP code instead of using “Near me.”
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href="/search"
                className={cn(buttonVariants({ size: "lg" }), "min-h-11")}
              >
                Compare prices
              </Link>
              <Link
                href="/membership"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "min-h-11"
                )}
              >
                Free vs membership
              </Link>
            </div>
          </div>
          <div className="trx-photo relative aspect-[4/3]">
            <Image
              src="/images/pharmacist-helping.webp"
              alt="Pharmacist assisting a patient with a prescription"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
