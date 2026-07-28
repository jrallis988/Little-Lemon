import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { contentApi } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Clinical trials, labs, and discovery at Boston Children's Hospital.",
};

export default function ResearchPage({
  searchParams,
}: {
  searchParams?: { trial?: string };
}) {
  const highlight = searchParams?.trial;

  return (
    <>
      <PageHero
        id="research-heading"
        eyebrow="Research & discovery"
        title="Research hub"
        lead="Explore active clinical trials and the programs advancing pediatric discovery."
      />
      <div className="wrap py-s7 pb-s10">
        <h2 className="mb-s5 text-2xl font-bold text-ocean">Clinical trials</h2>
        <div className="grid grid-cols-1 gap-s4 md:grid-cols-2">
          {contentApi.clinicalTrials.map((trial) => (
            <article
              key={trial.slug}
              id={trial.slug}
              className={`scroll-mt-[120px] rounded-md border p-s5 ${
                highlight === trial.slug
                  ? "border-ocean bg-ocean/[0.04]"
                  : "border-border bg-white"
              }`}
            >
              <div className="mb-s2 flex flex-wrap gap-1">
                <Badge
                  variant={
                    trial.status === "recruiting"
                      ? "green"
                      : trial.status === "active"
                        ? "ocean"
                        : "gray"
                  }
                >
                  {trial.status}
                </Badge>
                {trial.phase ? <Badge variant="gray">{trial.phase}</Badge> : null}
              </div>
              <h3 className="mb-s2 text-lg font-bold text-text">{trial.title}</h3>
              <p className="mb-s3 text-sm font-light text-text-body">
                {trial.summary}
              </p>
              <div className="flex flex-wrap gap-s3 text-sm">
                {trial.conditionSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/conditions/${slug}`}
                    className="font-semibold text-ocean no-underline hover:underline"
                  >
                    Related condition
                  </Link>
                ))}
                {trial.programSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/programs/${slug}`}
                    className="font-semibold text-ocean no-underline hover:underline"
                  >
                    Related program
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
