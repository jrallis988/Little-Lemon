import type { Metadata } from "next";
import Link from "next/link";
import { isLimitedV1Launch } from "@/lib/launch-mode";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using TrumpRx — a select-medication savings, eligibility, comparison, and access guide. Not a pharmacy and not insurance.",
};

export default function TermsPage() {
  const limited = isLimitedV1Launch();

  return (
    <div className="trx-atmosphere min-h-[70dvh]">
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 sm:py-12">
        <header className="space-y-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: August 30, 2026
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            These Terms govern your use of TrumpRx websites and related services
            (the &quot;Service&quot;). By using the Service, you agree to these
            Terms and our{" "}
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
            Important: TrumpRx is{" "}
            <span className="underline">not health insurance</span> and{" "}
            <span className="underline">not a pharmacy</span>
          </h2>
          <p className="leading-relaxed">
            TrumpRx is a medication savings, eligibility, comparison, and access
            guide for <strong>select medications only</strong>. It does not
            sell, dispense, or ship medications. Final eligibility and price are
            set by the pharmacy (or other program partner when applicable) at
            fill time. Program cash options generally cannot be combined with
            insurance on the same fill — compare and choose the lower option.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            1. Independent private service
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            TrumpRx is an independent private product. It is{" "}
            <strong className="text-foreground">
              not a government website, agency program, or official federal
              service
            </strong>
            . Use of the name &quot;Trump RX&quot; / &quot;TrumpRx&quot; does not
            imply ownership, operation, sponsorship, or endorsement by any
            government entity. Third-party names and marks belong to their
            respective owners.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            2. Limited scope
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {limited
              ? "The current limited launch covers a small formulary of generic medications for pharmacy pickup only. Medications not listed are outside the program. Requesting a medication does not guarantee it will be added."
              : "Only listed medications have a program option. Coverage may change. Medications not listed are outside the program."}{" "}
            Displayed program prices are typical / informational and must be
            confirmed at the pharmacy before you fill.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            3. Accounts &amp; optional tools
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            You may use coverage search without an account. If you create an
            account, you are responsible for accurate information and for
            safeguarding credentials. Optional account tools (saved medications,
            preferred pharmacies, program information references, reminders) are
            conveniences only — they are not a pharmacy checkout and do not make
            medications free.
            {limited
              ? " Paid membership / Plus is not offered in the limited v1 launch."
              : " If a paid membership tier is offered later, pricing and benefits will be shown at the time of purchase."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            4. No medical advice
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            TrumpRx does not provide medical, pharmacy, or insurance advice. Talk
            with your clinician and pharmacist about whether a medication and
            access path are appropriate for you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            5. Acceptable use
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Do not use the Service unlawfully, to submit false information, to
            interfere with the platform or pharmacies, or to attempt unauthorized
            access. We may suspend access for abuse or security risk.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            6. Disclaimers
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            The Service is provided &quot;as is.&quot; Pharmacy participation,
            program acceptance, and prices can change without notice. We do not
            guarantee that any pharmacy will accept program information or that
            any displayed price will match the counter price.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            7. Contact
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Questions:{" "}
            <Link href="/help" className="font-medium text-primary hover:underline">
              Help
            </Link>{" "}
            or{" "}
            <Link href="/faq" className="font-medium text-primary hover:underline">
              FAQ
            </Link>
            . If you do not agree to these Terms, do not use the Service.
          </p>
        </section>
      </article>
    </div>
  );
}
