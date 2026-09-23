import type { Metadata } from "next";
import Link from "next/link";
import { newsletterIssues } from "@/data/newsletters";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { campaign } from "@/data/campaign";

export const metadata: Metadata = {
  title: "Newsletter",
  description: `The Next Chapter Newsletter — seasonal editions for ${campaign.season}.`,
};

export default function NewsletterArchivePage() {
  return (
    <>
      <section className="border-b border-line bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow={campaign.name}
            title="The Next Chapter Newsletter"
            description="Three seasonal editions — September, October, and November — with featured releases, author spotlights, reading activities, and Fall Reading Week updates."
          />
          <div className="mt-8 max-w-lg">
            <NewsletterForm source="newsletter archive" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ul className="grid gap-8 md:grid-cols-3">
            {newsletterIssues.map((issue) => (
              <li key={issue.slug}>
                <Link
                  href={`/newsletter/${issue.slug}`}
                  className="group flex h-full flex-col border border-line bg-paper transition-colors hover:border-burgundy"
                >
                  <div className="bg-forest px-6 py-8 text-cream">
                    <Tag variant="amber">{issue.month}</Tag>
                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight group-hover:text-amber">
                      {issue.theme}
                    </h2>
                    <p className="mt-2 text-xs text-cream/60">
                      {issue.publishedAt}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-6">
                    <p className="flex-1 text-sm leading-relaxed text-ink-muted">
                      {issue.preview}
                    </p>
                    <p className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-burgundy">
                      Read Edition →
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
