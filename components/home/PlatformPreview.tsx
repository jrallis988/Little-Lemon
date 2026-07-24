import Link from "next/link";
import { candidate } from "@/lib/candidate";
import { secondAmendmentHome } from "@/lib/issues";

export function PlatformPreview() {
  return (
    <section
      aria-labelledby="platform-heading"
      className="bg-mist"
    >
      <div className="mx-auto max-w-content section-pad">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
          Core Principles
        </p>
        <h2
          id="platform-heading"
          className="mt-2 font-serif text-3xl font-bold text-granite-800 sm:text-4xl"
        >
          The Platform.
        </h2>

        <article className="mt-10 border border-granite-200 bg-white p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
            {secondAmendmentHome.overline}
          </p>
          <h3 className="mt-3 font-serif text-2xl font-bold text-granite-800 sm:text-3xl">
            {secondAmendmentHome.heading}
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-granite-600">
            {secondAmendmentHome.body}
          </p>
          <p className="mt-4 text-base leading-relaxed text-granite-500">
            {secondAmendmentHome.detail}
          </p>
          <blockquote className="mt-8 border-l-4 border-granite-800 pl-5">
            <p className="font-serif text-lg italic leading-relaxed text-granite-700">
              “{candidate.secondAmendmentQuote}”
            </p>
            <footer className="mt-3 text-sm font-semibold text-granite-500">
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
