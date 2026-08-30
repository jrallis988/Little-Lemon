import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How TrumpRx collects, uses, and protects information when you check coverage, save account tools, and report issues.",
};

export default function PrivacyPage() {
  return (
    <div className="trx-atmosphere min-h-[70dvh]">
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 sm:py-12">
        <header className="space-y-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: August 30, 2026
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            TrumpRx is a medication savings, eligibility, comparison, and access
            guide for select medications — not a pharmacy and not insurance.
            This Privacy Policy explains what we collect, how we use it, and
            your choices.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            1. Information we collect
          </h2>
          <div className="space-y-3 rounded-2xl border border-border bg-card p-5 text-muted-foreground">
            <p>
              <strong className="text-foreground">Account information.</strong>{" "}
              If you create an account, we store your email, name (if provided),
              password hash, and account preferences.
            </p>
            <p>
              <strong className="text-foreground">Medication tools.</strong> If
              you use signed-in tools, we may store saved medications, preferred
              pharmacies, program information / coupon references, refill
              reminder settings, and related notes you enter.
            </p>
            <p>
              <strong className="text-foreground">Support submissions.</strong>{" "}
              Medication requests, issue reports, help chat messages, and
              support tickets may include the details and optional contact email
              you submit, plus a reference number.
            </p>
            <p>
              <strong className="text-foreground">Location preference.</strong>{" "}
              ZIP code or approximate location you choose to find nearby
              pharmacies. Browser location is only used with your permission.
            </p>
            <p>
              <strong className="text-foreground">Technical logs.</strong>{" "}
              Standard server logs (IP address, user agent, pages requested) for
              security, reliability, and abuse prevention.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            2. Information we do not sell
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            We do not sell health query, medication, or account data. We do not
            collect Social Security numbers or government IDs for this service.
            Payment for medications happens at the pharmacy — TrumpRx does not
            charge you for prescriptions. Optional paid membership, when offered
            in a future launch mode, is processed by Stripe and covered in those
            checkout screens.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            3. How we use information
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Show coverage, eligibility, and pharmacy access information</li>
            <li>Save your account tools across devices when you are signed in</li>
            <li>Respond to medication requests, issue reports, and help chats</li>
            <li>Operate, secure, and improve the Service</li>
            <li>
              Send transactional messages you request (for example password reset
              or reminder emails) when email delivery is configured
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            4. Sharing
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            We share data only with service providers needed to run the product
            (hosting, database, email/SMS when configured, authentication) and
            when required by law. Pharmacies and manufacturers are independent —
            presenting TrumpRx program information at a pharmacy does not make
            that pharmacy our processor for your full medical record.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            5. Your choices
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            You can update or delete account information while signed in, stop
            using optional tools, and contact us to request deletion of support
            submissions tied to your email when feasible. Browser location can
            be denied or revoked in your device settings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            6. Contact
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Privacy questions: use{" "}
            <Link href="/help" className="font-medium text-primary hover:underline">
              Help
            </Link>{" "}
            or Report an issue on the site. Also see our{" "}
            <Link href="/terms" className="font-medium text-primary hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
