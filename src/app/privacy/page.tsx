import type { Metadata } from "next";
import { ShieldCheck, EyeOff, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy & compliance",
  description:
    "How ClearDose handles health searches, discount disclosures, and privacy-first defaults.",
};

export default function PrivacyPage() {
  return (
    <div className="cd-atmosphere min-h-[70dvh]">
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <header className="space-y-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Privacy, transparency &amp; compliance
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            ClearDose is designed so patients and caregivers can compare
            prescription discounts without aggressive paywalls or opaque data
            practices.
          </p>
        </header>

        <section className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <div className="flex items-start gap-3">
            <Scale className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div>
              <h2 className="text-lg font-semibold">Discount provider — not insurance</h2>
              <p className="mt-1 leading-relaxed">
                ClearDose coupons are pharmacy discount offers. They are{" "}
                <strong>not insurance</strong>, not a Medicare/Medicaid benefit,
                and generally cannot be combined with insurance. Always compare
                the coupon price with your plan copay and choose the lower
                option. Pharmacists can help you decide at the counter.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-start gap-3">
            <EyeOff className="mt-1 size-5 text-primary" aria-hidden />
            <div>
              <h2 className="text-xl font-semibold">Privacy-first search defaults</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Medication searches and saved meds in this demo are stored in{" "}
                  <strong className="text-foreground">your browser only</strong>{" "}
                  (local storage) — not on ClearDose servers.
                </li>
                <li>
                  Personalized tips are <strong className="text-foreground">opt-in</strong> and
                  off by default.
                </li>
                <li>
                  We do not sell health query data, medication lists, or location
                  history to advertisers.
                </li>
                <li>
                  Geolocation is requested only when you tap “Near me,” and you
                  can use ZIP code entry instead.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 size-5 text-primary" aria-hidden />
            <div>
              <h2 className="text-xl font-semibold">Accessibility &amp; fairness</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Interfaces target WCAG 2.1 AA: skip links, keyboard-operable
                search, visible focus rings, large tap targets, and high-contrast
                pricing. Copy avoids jargon where possible and explains BIN/PCN
                fields for caregivers assisting at the pharmacy.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-2 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">Demo notice</h2>
          <p>
            Prices, BIN/PCN values, and pharmacy inventory in this project are
            simulated for product demonstration. A production deployment would
            connect to licensed pharmacy benefit / cash-pay pricing networks and
            publish a full privacy policy and terms of use.
          </p>
        </section>
      </article>
    </div>
  );
}
