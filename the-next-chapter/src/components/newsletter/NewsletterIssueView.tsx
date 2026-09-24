import type { NewsletterIssue } from "@/data/newsletters";
import { NewsletterModuleBlock } from "./NewsletterModule";
import { campaign } from "@/data/campaign";

export function NewsletterIssueView({ issue }: { issue: NewsletterIssue }) {
  return (
    <article className="mx-auto max-w-2xl overflow-hidden border border-line shadow-[0_8px_32px_rgba(26,22,18,0.08)]">
      <header className="bg-forest px-6 py-10 text-cream md:px-10 md:py-12">
        <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-amber">
          {campaign.name} Newsletter
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
          {issue.month} {issue.year}
        </h1>
        <p className="mt-2 font-accent text-lg uppercase tracking-wide text-amber">
          {issue.theme}
        </p>
        <p className="mt-4 text-sm text-cream/70">{issue.publishedAt}</p>
      </header>

      <p className="border-b border-line bg-paper px-6 py-5 text-sm leading-relaxed text-ink-muted md:px-10">
        {issue.preview}
      </p>

      {issue.modules.map((module) => (
        <NewsletterModuleBlock
          key={`${module.type}-${module.title}`}
          module={module}
        />
      ))}

      <footer className="bg-ink px-6 py-8 text-center text-cream/60 md:px-10">
        <p className="font-display text-xs font-bold uppercase tracking-wider text-amber">
          {campaign.name}
        </p>
        <p className="mt-2 text-xs">
          {campaign.tagline} · {campaign.publisher}
        </p>
        <p className="mt-4 text-[0.65rem] leading-relaxed">
          You&apos;re receiving this as a subscriber to The Next Chapter
          seasonal newsletter. This is a fictional campaign demonstration.
        </p>
      </footer>
    </article>
  );
}
