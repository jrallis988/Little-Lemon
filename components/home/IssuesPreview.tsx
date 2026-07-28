import Link from "next/link";
import { Clock } from "lucide-react";
import { issues } from "@/lib/issues";
import { SectionIntro } from "@/components/SectionIntro";

const supporting = issues.filter((i) =>
  ["economy-jobs", "healthcare", "veterans"].includes(i.slug)
);
const featured = issues.find((i) => i.slug === "term-limits")!;

export function IssuesPreview() {
  return (
    <section aria-labelledby="stands-heading" className="bg-warm-white">
      <div className="mx-auto max-w-content section-pad">
        <SectionIntro
          overline="Where Nick Stands"
          title="Practical answers. Written in plain English."
          lead="Nick isn’t running on slogans. Here’s exactly what he’ll fight for in Washington — starting with the one that matters most to fixing the rest."
          titleId="stands-heading"
        />

        <article className="mt-10 border border-slate-line bg-paper p-7 sm:p-10">
          <p className="font-display text-overline font-normal uppercase text-red">
            Signature Priority
          </p>
          <div className="mt-4 flex items-start gap-3">
            <Clock className="mt-1 h-6 w-6 shrink-0 text-red" aria-hidden />
            <div>
              <h3 className="font-display text-card-display font-normal text-ink">
                {featured.title}
              </h3>
              <p className="mt-3 text-body-lg text-slate-text">
                {featured.oneLiner}
              </p>
              <Link
                href={`/issues/${featured.slug}`}
                className="link-cta mt-5"
              >
                Read more about {featured.title} →
              </Link>
            </div>
          </div>
        </article>

        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {supporting.map((issue) => (
            <li key={issue.slug}>
              <Link
                href={`/issues/${issue.slug}`}
                className="block h-full border border-slate-line bg-white p-7 transition-colors hover:border-red"
              >
                <h3 className="font-display text-[1.05rem] font-normal tracking-[0.5px] text-ink">
                  {issue.title}
                </h3>
                <p className="mt-3 text-body-sm text-slate-muted">
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
