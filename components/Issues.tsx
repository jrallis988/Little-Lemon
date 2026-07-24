"use client";

import { useId, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Mountain,
  Store,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { issues, type Issue } from "@/lib/issues";

const iconMap: Record<Issue["icon"], LucideIcon> = {
  wallet: Wallet,
  store: Store,
  mountain: Mountain,
  book: BookOpen,
};

function IssueCard({ issue }: { issue: Issue }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const Icon = iconMap[issue.icon];

  return (
    <article className="border-b border-granite-200 last:border-b-0 md:border md:border-granite-200 md:last:border-b md:bg-white">
      <h3>
        <button
          type="button"
          className="flex w-full items-start gap-4 px-0 py-5 text-left transition-colors hover:bg-mist/60 md:px-6 md:hover:bg-mist/40"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-pine-50 text-pine-700"
            aria-hidden
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-serif text-xl font-bold text-granite-800">
              {issue.title}
            </span>
            <span className="mt-1.5 block text-base leading-relaxed text-granite-500">
              {issue.summary}
            </span>
          </span>
          <ChevronDown
            className={`mt-1 h-5 w-5 shrink-0 text-granite-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        hidden={!open}
        className="px-0 pb-5 md:px-6"
      >
        <ul className="ml-14 space-y-2.5 border-l-2 border-pine-200 pl-4">
          {issue.points.map((point) => (
            <li key={point} className="text-base leading-relaxed text-granite-600">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Issues() {
  return (
    <section
      id="issues"
      aria-labelledby="issues-heading"
      className="scroll-mt-28 bg-mist"
    >
      <div className="mx-auto max-w-content section-pad">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
          Priorities
        </p>
        <h2 id="issues-heading" className="mt-2 section-title">
          The Issues
        </h2>
        <p className="section-lead">
          Clear fights for Granite Staters—expand each priority for the practical
          steps, not slogans.
        </p>

        <div className="mt-10 grid gap-0 md:grid-cols-2 md:gap-5">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </section>
  );
}
