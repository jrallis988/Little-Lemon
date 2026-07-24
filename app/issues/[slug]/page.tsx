import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  Clock,
  Globe2,
  HeartPulse,
  Leaf,
  PawPrint,
  Shield,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { getIssue, issues, type Issue } from "@/lib/issues";
import { CtaRow } from "@/components/PageChrome";

const iconMap: Record<Issue["icon"], LucideIcon> = {
  clock: Clock,
  briefcase: Briefcase,
  heartPulse: HeartPulse,
  shield: Shield,
  book: BookOpen,
  leaf: Leaf,
  paw: PawPrint,
  globe: Globe2,
  bridge: Waypoints,
};

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return issues.map((issue) => ({ slug: issue.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = getIssue(params.slug);
  if (!issue) return { title: "Issue" };
  return {
    title: issue.title,
    description: issue.oneLiner,
  };
}

export default function IssueDetailPage({ params }: Props) {
  const issue = getIssue(params.slug);
  if (!issue) notFound();
  const Icon = iconMap[issue.icon];

  return (
    <>
      <header className="border-b border-granite-200 bg-mist">
        <div className="mx-auto max-w-content px-5 py-12 sm:px-8 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
            Issues
          </p>
          <div className="mt-4 flex items-start gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-pine-100 text-pine-700"
              aria-hidden
            >
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div>
              <h1 className="font-serif text-4xl font-bold text-granite-800 sm:text-5xl">
                {issue.title}
              </h1>
              <p className="mt-3 max-w-3xl text-lg text-granite-600">
                {issue.subtitle}
              </p>
            </div>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-content section-pad">
        <h2 className="font-serif text-2xl font-bold text-granite-800">
          Key Priorities
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {issue.priorities.map((priority) => (
            <li
              key={priority.title}
              className="border border-granite-200 bg-white p-5"
            >
              <h3 className="font-serif text-lg font-bold text-granite-800">
                {priority.title}
              </h3>
              <p className="mt-2 text-base text-granite-600">{priority.body}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-serif text-2xl font-bold text-granite-800">
          {issue.sectionHeading}
        </h2>
        <div className="mt-5 space-y-5 text-lg leading-relaxed text-granite-600">
          {issue.body.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>

        {issue.pullQuote && (
          <blockquote className="mt-10 border-l-4 border-pine-600 pl-5">
            <p className="font-serif text-xl italic text-granite-700">
              “{issue.pullQuote}”
            </p>
          </blockquote>
        )}

        <CtaRow
          primary={{ href: "/volunteer", label: "Volunteer with Team Varga" }}
          secondary={{ href: "/issues", label: "Back to all issues" }}
        />
        <p className="mt-6">
          <Link href="/how-to-vote" className="font-semibold text-pine-700 underline-offset-2 hover:underline">
            Learn how to write in Nick Varga →
          </Link>
        </p>
      </article>
    </>
  );
}
