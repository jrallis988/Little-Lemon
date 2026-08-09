import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-pf-ink">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
        Legal
      </p>
      <h1 className="mt-2 font-display text-4xl">Terms of Use</h1>
      <p className="mt-3 text-sm text-pf-ink/65">
        Demo terms for this website and member utility. Not official Planet
        Fitness franchise terms.
      </p>
      <div className="mt-8 space-y-4 text-sm text-pf-ink/80">
        <p>
          The public website is for club discovery, pricing transparency, and
          joining. Check-in, digital keytag, and Crowd Meter are provided only
          in the member app.
        </p>
        <p>
          Accounts require accurate information. Demo environments may use the
          shared QA password; production must enforce unique credentials and MFA
          where required.
        </p>
        <p>
          Club hours, amenities, and local dues can vary by franchise location.
          Always confirm on the club page before joining.
        </p>
      </div>
      <p className="mt-8 text-sm">
        <Link href="/legal/privacy" className="font-semibold text-pf-purple underline">
          Privacy
        </Link>{" "}
        ·{" "}
        <Link
          href="/legal/membership"
          className="font-semibold text-pf-purple underline"
        >
          Membership agreement
        </Link>
      </p>
    </article>
  );
}
