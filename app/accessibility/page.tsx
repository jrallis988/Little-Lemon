import type { Metadata } from "next";
import Link from "next/link";
import { candidate } from "@/lib/candidate";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `Accessibility commitment for the ${candidate.brandName} campaign website.`,
};

export default function AccessibilityPage() {
  return (
    <article className="mx-auto max-w-3xl section-pad">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: "Accessibility" },
        ]}
      />
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red">
        Commitment
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">
        Accessibility Statement
      </h1>
      <p className="mt-4 text-slate-muted">Last updated: July 28, 2026</p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-slate-text">
        <p>
          {candidate.committee} is committed to ensuring digital accessibility
          for people with disabilities. Accessibility is a first-class feature of
          this website, not an afterthought. We aim to meet{" "}
          <strong className="font-semibold text-ink">WCAG 2.2 Level AA</strong>{" "}
          wherever practical.
        </p>

        <h2 className="font-display text-2xl font-bold text-ink">
          How to customize this site
        </h2>
        <p>
          Use the <strong className="font-semibold text-ink">Accessibility</strong>{" "}
          button in the top bar to open settings. You can change:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Light, dark, or system color theme</li>
          <li>High contrast mode</li>
          <li>Larger text (up to 150%)</li>
          <li>Reduced motion</li>
          <li>Dyslexia-friendly font (Lexend)</li>
          <li>Line spacing and letter spacing</li>
          <li>Always-underlined links</li>
          <li>Bigger click and tap targets</li>
        </ul>
        <p>Preferences are saved in your browser on this device.</p>

        <h2 className="font-display text-2xl font-bold text-ink">
          Measures we take
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Skip-to-content link and landmark regions (header, nav, main, footer)</li>
          <li>One H1 per page and ordered heading hierarchy</li>
          <li>Visible keyboard focus and Escape to close menus and dialogs</li>
          <li>Labeled forms with field-level errors and live status messages</li>
          <li>Meaningful link text and current-page indication in navigation</li>
          <li>Respect for prefers-reduced-motion and user motion preferences</li>
          <li>Color contrast tuned for WCAG AA on primary text and buttons</li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-ink">
          Known limitations
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Some campaign photos are still placeholders; decorative graphics use
            empty alt text until final assets land.
          </li>
          <li>
            Site search is not offered yet, so search-specific accessibility
            patterns do not apply.
          </li>
          <li>
            Embedded video will ship with captions and transcripts when media is
            published.
          </li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-ink">Feedback</h2>
        <p>
          If you encounter a barrier, please tell us. Email{" "}
          <a
            href={`mailto:${candidate.email}`}
            className="font-semibold text-red underline-offset-2 hover:underline"
          >
            {candidate.email}
          </a>{" "}
          or call {candidate.phone}. We will work to provide the information in an
          accessible format.
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
