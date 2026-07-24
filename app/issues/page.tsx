import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageChrome";
import { issues } from "@/lib/issues";

export const metadata: Metadata = {
  title: "Issues",
  description:
    "Where Nick Varga stands — term limits, economy, healthcare, veterans, education, environment, wildlife, immigration, and infrastructure.",
};

export default function IssuesPage() {
  const featured = issues.find((i) => i.featured)!;
  const rest = issues.filter((i) => !i.featured);

  return (
    <>
      <PageHero
        overline="Where Nick Stands"
        title="The Platform"
        subtitle="Practical answers. Written in plain English. Start with the signature priority — then dig into every issue."
      />
      <div className="mx-auto max-w-content section-pad bg-warm-white">
        <Link
          href={`/issues/${featured.slug}`}
          className="block border border-red/35 bg-paper p-7 transition-colors hover:border-red sm:p-10"
        >
          <p className="font-display text-overline font-normal uppercase text-red">
            Signature Priority
          </p>
          <h2 className="mt-3 font-display text-section-display font-normal text-ink">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-3xl text-body-lg text-slate-text">
            {featured.oneLiner}
          </p>
          <p className="link-cta mt-5">Read more →</p>
        </Link>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((issue) => (
            <li key={issue.slug}>
              <Link
                href={`/issues/${issue.slug}`}
                className="flex h-full flex-col border border-slate-line bg-white p-7 transition-colors hover:border-red"
              >
                <h2 className="font-display text-[1.05rem] font-normal tracking-[0.5px] text-ink">
                  {issue.title}
                </h2>
                <p className="mt-3 flex-1 text-body-sm text-slate-muted">
                  {issue.oneLiner}
                </p>
                <p className="mt-4 font-display text-cta font-normal uppercase text-red">
                  Read more →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
