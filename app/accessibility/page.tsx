import type { Metadata } from "next";
import Link from "next/link";
import { candidate } from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `Accessibility commitment for the ${candidate.fullName} for Senate campaign website.`,
};

export default function AccessibilityPage() {
  return (
    <article className="mx-auto max-w-3xl section-pad">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red">
        Commitment
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">
        Accessibility Statement
      </h1>
      <p className="mt-4 text-slate-muted">
        Last updated: July 24, 2026
      </p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-slate-text">
        <p>
          {candidate.committee} is committed to ensuring digital accessibility
          for people with disabilities. We continually improve the user
          experience for everyone and apply relevant accessibility standards.
        </p>
        <h2 className="font-display text-2xl font-bold text-ink">
          Conformance goal
        </h2>
        <p>
          We aim to conform to{" "}
          <strong className="font-semibold text-ink">
            WCAG 2.1 Level AA
          </strong>
          . That includes sufficient color contrast, visible keyboard focus,
          semantic headings, form labels, and alternatives for non-text content.
        </p>
        <h2 className="font-display text-2xl font-bold text-ink">
          Measures we take
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Skip-to-content link and landmark regions</li>
          <li>Keyboard-operable navigation, accordions, and forms</li>
          <li>Clear success and error messaging with ARIA live regions</li>
          <li>Respect for prefers-reduced-motion</li>
          <li>Responsive layouts usable on phones at events and diners</li>
        </ul>
        <h2 className="font-display text-2xl font-bold text-ink">
          Feedback
        </h2>
        <p>
          If you encounter a barrier, please tell us. Email{" "}
          <a
            href={`mailto:${candidate.email}`}
            className="font-semibold text-red underline-offset-2 hover:underline"
          >
            {candidate.email}
          </a>{" "}
          or call {candidate.phone}. We will work to provide the information in
          an accessible format.
        </p>
      </div>

      <p className="mt-12">
        <Link
          href="/"
          className="font-semibold text-red underline-offset-2 hover:underline"
        >
          ← Back to home
        </Link>
      </p>
    </article>
  );
}
