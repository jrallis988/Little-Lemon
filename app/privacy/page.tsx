import type { Metadata } from "next";
import Link from "next/link";
import { candidate } from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${candidate.committee} collects and uses information on this campaign website.`,
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl section-pad">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-pine-600">
        Legal
      </p>
      <h1 className="mt-2 font-serif text-4xl font-bold text-granite-800">
        Privacy Policy
      </h1>
      <p className="mt-4 text-granite-500">
        Last updated: July 24, 2026
      </p>

      <div className="prose-campaign mt-10 space-y-6 text-base leading-relaxed text-granite-600">
        <p>
          {candidate.committee} (&quot;we,&quot; &quot;us&quot;) respects your
          privacy. This policy explains what information we collect on this
          website and how we use it.
        </p>
        <h2 className="font-serif text-2xl font-bold text-granite-800">
          Information we collect
        </h2>
        <p>
          When you request a lawn sign, volunteer, subscribe, or contribute, we
          collect the information you provide—such as name, email, phone,
          address, and preferences. We may also collect standard analytics data
          (pages visited, device type) in aggregate form.
        </p>
        <h2 className="font-serif text-2xl font-bold text-granite-800">
          How we use information
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>To respond to your requests and coordinate volunteer activities</li>
          <li>To send campaign updates you opted into</li>
          <li>To comply with federal campaign finance reporting requirements</li>
          <li>To improve the accessibility and performance of this site</li>
        </ul>
        <h2 className="font-serif text-2xl font-bold text-granite-800">
          Sharing
        </h2>
        <p>
          We do not sell your personal information. We may share data with
          trusted vendors who help operate the campaign (email delivery, payment
          processing, compliance) under confidentiality agreements, or when
          required by law.
        </p>
        <h2 className="font-serif text-2xl font-bold text-granite-800">
          Contact
        </h2>
        <p>
          Questions? Email{" "}
          <a
            href={`mailto:${candidate.email}`}
            className="font-semibold text-pine-700 underline-offset-2 hover:underline"
          >
            {candidate.email}
          </a>
          .
        </p>
      </div>

      <p className="mt-12">
        <Link
          href="/"
          className="font-semibold text-pine-700 underline-offset-2 hover:underline"
        >
          ← Back to home
        </Link>
      </p>
    </article>
  );
}
