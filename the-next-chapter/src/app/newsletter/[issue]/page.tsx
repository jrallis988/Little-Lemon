import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getIssueBySlug,
  newsletterIssues,
} from "@/data/newsletters";
import { NewsletterIssueView } from "@/components/newsletter/NewsletterIssueView";

interface IssuePageProps {
  params: Promise<{ issue: string }>;
}

export async function generateStaticParams() {
  return newsletterIssues.map((issue) => ({ issue: issue.slug }));
}

export async function generateMetadata({
  params,
}: IssuePageProps): Promise<Metadata> {
  const { issue: slug } = await params;
  const issue = getIssueBySlug(slug);
  if (!issue) return { title: "Newsletter Not Found" };

  return {
    title: `${issue.month} — ${issue.theme}`,
    description: issue.preview,
  };
}

export default async function NewsletterIssuePage({ params }: IssuePageProps) {
  const { issue: slug } = await params;
  const issue = getIssueBySlug(slug);
  if (!issue) notFound();

  return (
    <>
      <div className="border-b border-line bg-cream-dark">
        <div className="mx-auto max-w-7xl px-5 py-4 md:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-ink-muted">
              <li>
                <Link href="/newsletter" className="hover:text-burgundy">
                  Newsletter
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">
                {issue.month} {issue.year}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="bg-cream-dark/50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <NewsletterIssueView issue={issue} />
        </div>
      </section>
    </>
  );
}
