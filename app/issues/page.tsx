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
      <div className="mx-auto max-w-content section-pad">
        <Link
          href={`/issues/${featured.slug}`}
          className="block border border-amber-700/40 bg-amber-50 p-6 transition-colors hover:border-amber-700 sm:p-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
            Signature Priority
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-granite-800">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-granite-600">
            {featured.oneLiner}
          </p>
          <p className="mt-4 text-sm font-semibold text-amber-900">Read more →</p>
        </Link>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((issue) => (
            <li key={issue.slug}>
              <Link
                href={`/issues/${issue.slug}`}
                className="flex h-full flex-col border border-granite-200 bg-white p-6 transition-colors hover:border-pine-500"
              >
                <h2 className="font-serif text-xl font-bold text-granite-800">
                  {issue.title}
                </h2>
                <p className="mt-3 flex-1 text-base leading-relaxed text-granite-500">
                  {issue.oneLiner}
                </p>
                <p className="mt-4 text-sm font-semibold text-pine-700">
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
