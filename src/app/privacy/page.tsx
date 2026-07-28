import type { Metadata } from "next";
import { ShieldCheck, EyeOff, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy & compliance",
  description:
    "How Trump RX handles health searches, discount disclosures, and privacy-first defaults.",
};

export default function PrivacyPage() {
  return (
    <div className="trx-atmosphere min-h-[70dvh]">
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <header className="space-y-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Privacy, transparency &amp; compliance
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Trump RX is designed so patients and caregivers can compare
            prescription discounts with clear information about how account,
            search, and location data are handled.
          </p>
        </header>

        <section className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <div className="flex items-start gap-3">
            <Scale className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div>
              <h2 className="text-lg font-semibold">Discount provider — not insurance</h2>
              <p className="mt-1 leading-relaxed">
                Trump RX coupons are pharmacy discount offers. They are{" "}
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
              <h2 className="text-xl font-semibold">How we handle your data</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Medication searches are sent to Trump RX API routes to return
                  catalog and network pricing results.
                </li>
                <li>
                  When you sign in, saved medications, preferred pharmacies,
                  coupons, and price alerts are stored server-side with your
                  account.
                </li>
                <li>
                  We do not sell health query data, medication lists, or location
                  data.
                </li>
                <li>
                  ZIP codes are resolved through our geocoding API so we can
                  calculate nearby pharmacy distances. Browser geolocation is
                  requested only when you choose “Near me.”
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
          <h2 className="text-base font-semibold text-foreground">Questions</h2>
          <p>
            Contact Trump RX support with privacy questions or requests relating
            to your account data. We retain data only as needed to provide the
            service, meet legal requirements, and protect the platform.
          </p>
        </section>
      </article>
    </div>
  );
}
