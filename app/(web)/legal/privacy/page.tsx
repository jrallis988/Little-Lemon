import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-pf-ink">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
        Legal
      </p>
      <h1 className="mt-2 font-display text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-pf-ink/65">
        Last updated August 1, 2026 · Demo policy for this acquisition + member
        app project. Replace with franchise counsel copy before launch.
      </p>
      <div className="prose prose-sm mt-8 max-w-none space-y-4 text-pf-ink/80">
        <p>
          We collect account identity (name, email, phone), club preferences,
          membership billing metadata (brand/last4 only — never full PAN),
          check-in events, and optional analytics after cookie consent.
        </p>
        <p>
          Member utility data (Crowd Meter views, guest passes, workout history)
          stays in the app segment and is not used for public marketing pages.
        </p>
        <p>
          Payment processing may be handled by Stripe when configured. Webhook
          events update membership status and dunning state.
        </p>
        <p>
          Contact your home club or use in-app support for access/deletion
          requests in a production deployment.
        </p>
      </div>
      <p className="mt-8 text-sm">
        <Link href="/legal/terms" className="font-semibold text-pf-purple underline">
          Terms
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
