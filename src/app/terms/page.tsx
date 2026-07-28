import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using Trump RX — a pharmacy discount savings card service. Not health insurance.",
};

export default function TermsPage() {
  return (
    <div className="trx-atmosphere min-h-[70dvh]">
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 sm:py-12">
        <header className="space-y-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: July 28, 2026
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            These Terms govern your use of Trump RX websites, apps, and related
            services (the &quot;Service&quot;). By accessing or using the Service,
            you agree to these Terms and our{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </header>

        <section className="space-y-3 rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 text-amber-950">
          <h2 className="font-display text-xl font-semibold">
            Important: Trump RX is{" "}
            <span className="underline">not health insurance</span>
          </h2>
          <p className="leading-relaxed">
            <strong>
              Trump RX is a prescription discount / savings card service — not
              insurance, not a Medicare or Medicaid benefit, and not a
              substitute for coverage under any health plan.
            </strong>{" "}
            Coupons generally <strong>cannot be combined</strong> with
            insurance. Always compare the coupon price with your plan copay and
            choose the lower option at the pharmacy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            1. Independent private service
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Trump RX is an independent private product. It is{" "}
            <strong className="text-foreground">
              not a government website, agency program, or official federal
              service
            </strong>
            . Use of the name &quot;Trump RX&quot; does not imply ownership,
            operation, sponsorship, or endorsement by any government entity.
            Third-party names and marks belong to their respective owners.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            2. Eligibility &amp; accounts
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            You must be able to form a binding contract in your jurisdiction to
            create an account. You are responsible for accurate account
            information, safeguarding credentials, and activity under your
            account. Do not use the Service unlawfully, to obtain controlled
            substances improperly, to submit false information, or to interfere
            with the platform or pharmacies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            3. Free tier vs. Trump RX Plus
          </h2>
          <div className="space-y-3 rounded-2xl border border-border bg-card p-5 text-muted-foreground">
            <p>
              <strong className="text-foreground">Free:</strong> Search
              medications, compare nearby cash-discount prices, and show digital
              coupons at participating pharmacies, subject to availability and
              these Terms.
            </p>
            <p>
              <strong className="text-foreground">Trump RX Plus:</strong> An
              optional paid membership that may include deeper network pricing,
              family profile slots, cross-device saved meds and alerts, and
              priority support, as described on the Membership page at the time of
              purchase.
            </p>
            <p>
              Plus is billed as a recurring subscription at the price and interval
              shown at checkout when Stripe billing is enabled. Subscriptions
              renew automatically until canceled. Canceling stops future renewals
              but does not ordinarily refund the current period except where
              required by law. Manage billing via the Stripe customer portal when
              available.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            4. Prices, coupons &amp; pharmacy acceptance
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Displayed prices are estimates and may change without notice. Your
            final price is determined by the pharmacy based on the prescription
            presented and network rules. Coupons may expire, be withdrawn, or
            apply only to specific drugs, strengths, quantities, or pharmacies.
            Participation varies; call the pharmacy if you need confirmation
            before traveling. BIN / PCN / Group / Member ID values are for
            discount-card processing only.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            5. No medical advice
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Trump RX does not diagnose, treat, prescribe, or provide medical
            advice. Questions about medications, generics, interactions, or
            insurance should be directed to a licensed clinician, pharmacist, or
            plan administrator.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            6. Privacy
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Our collection and use of information is described in the{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            . Compliance placeholders (e.g., CCPA / GDPR requests) may be updated
            as we expand jurisdictions — contact support for access or deletion
            requests related to your account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            7. Disclaimers &amp; limitation of liability
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
            AVAILABLE.&quot; TO THE FULLEST EXTENT PERMITTED BY LAW, TRUMP RX
            DISCLAIMS IMPLIED WARRANTIES AND IS NOT LIABLE FOR INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, LOST
            SAVINGS, UNAVAILABLE INVENTORY, PHARMACY REFUSAL, OR RELIANCE ON AN
            ESTIMATED PRICE. Aggregate liability will not exceed the greater of
            amounts you paid for Plus during the previous six months or one
            hundred U.S. dollars ($100).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            8. Changes &amp; termination
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            We may update these Terms, prices, networks, or features, and may
            suspend access to protect users, comply with law, or prevent misuse.
            Continued use after updates constitutes acceptance. If you do not
            agree, stop using the Service and cancel any membership.
          </p>
        </section>

        <p className="border-t border-border pt-6 text-sm text-muted-foreground">
          Questions? See{" "}
          <Link
            href="/help"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Help
          </Link>{" "}
          or review the{" "}
          <Link
            href="/privacy"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
