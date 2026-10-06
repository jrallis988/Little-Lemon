import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership Agreement",
};

export default function MembershipAgreementPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-pf-ink">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
        Legal · Agreement version 2026-08-01
      </p>
      <h1 className="mt-2 font-display text-4xl">Membership Agreement</h1>
      <p className="mt-3 text-sm text-pf-ink/65">
        Join funnel consents reference agreement version 2026-08-01. Substitute
        franchise-approved language before commercial use.
      </p>
      <ol className="mt-8 list-decimal space-y-3 pl-5 text-sm text-pf-ink/80">
        <li>
          Membership dues are billed monthly to the payment method on file, plus
          any disclosed enrollment and annual fees.
        </li>
        <li>
          Failed payments may place the account past due and restrict app
          privileges until resolved (dunning).
        </li>
        <li>
          Black Card benefits (guest privileges, spa access at participating
          clubs) require an active Black Card plan.
        </li>
        <li>
          Freezes and cancellations follow club/franchise policy and may require
          additional in-club steps.
        </li>
        <li>
          Digital keytag and check-in tokens are personal; sharing may result in
          access denial.
        </li>
      </ol>
      <p className="mt-8 text-sm">
        <Link href="/join" className="font-semibold text-pf-purple underline">
          Back to join
        </Link>
      </p>
    </article>
  );
}
