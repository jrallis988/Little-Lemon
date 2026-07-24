import Link from "next/link";
import { candidate } from "@/lib/candidate";
import { secondAmendmentHome } from "@/lib/issues";
import { SectionIntro } from "@/components/SectionIntro";

export function PlatformPreview() {
  return (
    <section aria-labelledby="platform-heading" className="bg-charcoal">
      <div className="mx-auto max-w-content section-pad">
        <SectionIntro
          overline="Core Principles"
          title="The Platform."
          tone="dark"
          titleId="platform-heading"
        />

        <article className="mt-10 border border-white/10 bg-ink/40 p-7 sm:p-11">
          <p className="font-display text-overline font-normal uppercase text-red">
            {secondAmendmentHome.overline}
          </p>
          <h3 className="mt-4 font-display text-card-display font-normal text-white">
            {secondAmendmentHome.heading}
          </h3>
          <p className="mt-4 text-body-lg text-white/85">
            {secondAmendmentHome.body}
          </p>
          <p className="mt-4 text-body-sm text-white/65">
            {secondAmendmentHome.detail}
          </p>
          <blockquote className="pull-quote-light mt-8">
            “{candidate.secondAmendmentQuote}”
            <footer className="mt-3 font-sans text-sm font-semibold not-italic text-white/55">
              — United States Constitution · Second Amendment · 1791
            </footer>
          </blockquote>
          <Link href="/issues" className="btn-primary mt-8">
            View Full Platform →
          </Link>
        </article>
      </div>
    </section>
  );
}
