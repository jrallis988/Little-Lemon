import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { issues } from "@/lib/issues";

const supporting = issues.filter((i) =>
  ["economy-jobs", "healthcare", "veterans"].includes(i.slug)
);
const featured = issues.find((i) => i.slug === "term-limits")!;

export function IssuesPreview() {
  return (
    <section
      aria-labelledby="stands-heading"
      className="bg-snow"
    >
      <div className="mx-auto max-w-content section-pad">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
          Where Nick Stands
        </p>
        <h2
          id="stands-heading"
          className="mt-2 font-serif text-3xl font-bold text-granite-800 sm:text-4xl"
        >
          Practical answers. Written in plain English.
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-granite-600">
          Nick isn’t running on slogans. Here’s exactly what he’ll fight for in
          Washington — starting with the one that matters most to fixing the rest.
        </p>

        <article className="mt-10 border border-amber-700/40 bg-amber-50 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
            Signature Priority
          </p>
          <div className="mt-3 flex items-start gap-3">
            <Clock className="mt-1 h-6 w-6 shrink-0 text-amber-800" aria-hidden />
            <div>
              <h3 className="font-serif text-2xl font-bold text-granite-800">
                {featured.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-granite-600">
                {featured.oneLiner}
              </p>
              <Link
                href={`/issues/${featured.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-900 underline-offset-2 hover:underline"
              >
                Read More
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </article>

        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {supporting.map((issue) => (
            <li key={issue.slug}>
              <Link
                href={`/issues/${issue.slug}`}
                className="block h-full border border-granite-200 bg-white p-6 transition-colors hover:border-pine-500"
              >
                <h3 className="font-serif text-xl font-bold text-granite-800">
                  {issue.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-granite-500">
                  {issue.oneLiner}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link href="/issues" className="btn-primary">
            View Full Platform →
          </Link>
        </div>
      </div>
    </section>
  );
}
