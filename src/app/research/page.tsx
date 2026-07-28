import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { ClinicalTrialsExplorer } from "@/components/research/ClinicalTrialsExplorer";
import { contentApi } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Clinical trials, labs, and discovery at Boston Children's Hospital.",
};

export default function ResearchPage({
  searchParams,
}: {
  searchParams?: { trial?: string; q?: string; status?: string };
}) {
  const highlight = searchParams?.trial;
  const initialStatus = ["recruiting", "active", "completed"].includes(
    searchParams?.status ?? "",
  )
    ? searchParams?.status
    : "all";

  return (
    <>
      <PageHero
        id="research-heading"
        eyebrow="Research & discovery"
        title="Research hub"
        lead="Explore clinical trials, laboratories, and publications advancing pediatric discovery."
        actions={
          <Button href="#clinical-trials" variant="ocean">
            Search clinical trials
          </Button>
        }
      />

      <section
        id="clinical-trials"
        className="wrap scroll-mt-[120px] py-s7"
        aria-labelledby="trials-heading"
      >
        <div className="section-header">
          <span className="eyebrow">Participate in research</span>
          <h2 id="trials-heading">Clinical trials</h2>
          <p>
            Search current studies by title, condition, treatment, phase, or
            recruitment status. Eligibility is determined by each study team.
          </p>
        </div>
        <ClinicalTrialsExplorer
          trials={contentApi.clinicalTrials}
          highlight={highlight}
          initialQuery={searchParams?.q}
          initialStatus={initialStatus}
        />
      </section>

      <section className="border-y border-border bg-surface py-s8" aria-labelledby="labs-heading">
        <div className="wrap">
          <div className="section-header">
            <span className="eyebrow">Discovery teams</span>
            <h2 id="labs-heading">Featured laboratories</h2>
            <p>Teams connect basic science, data, and clinical care around pediatric needs.</p>
          </div>
          <div className="grid grid-cols-1 gap-s4 md:grid-cols-3">
            {[
              ["Epilepsy Genetics Lab", "Studies genetic causes of childhood seizures and translates findings into more precise diagnosis.", "/programs/epilepsy-program"],
              ["Cardiac Innovation Lab", "Develops and evaluates technologies for congenital heart repair and lifelong outcomes.", "/programs/heart-center"],
              ["Rare Disease Genomics Lab", "Uses genomic and computational methods to investigate complex, unexplained disease.", "/programs/undiagnosed-disease-program"],
            ].map(([name, body, href]) => (
              <article key={name} className="rounded-md border border-border bg-white p-s5">
                <h3 className="mb-s2 text-lg font-bold text-blue">{name}</h3>
                <p className="mb-s3 text-sm font-light text-text-body">{body}</p>
                <Link href={href} className="text-sm font-bold text-ocean">Explore related program</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-s8 pb-s10" aria-labelledby="publications-heading">
        <div className="section-header">
          <span className="eyebrow">Recent work</span>
          <h2 id="publications-heading">Selected publications</h2>
          <p>Representative prototype citations from research areas featured on this site.</p>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {[
            ["Genomic pathways in developmental epileptic encephalopathy", "Neurology research team · 2026", "Genetics and seizure classification"],
            ["Long-term outcomes after pediatric cardiac device intervention", "Heart Center outcomes group · 2025", "Congenital heart disease"],
            ["A multidisciplinary diagnostic model for rare pediatric disease", "Undiagnosed Disease Program · 2025", "Clinical genomics"],
          ].map(([title, citation, topic]) => (
            <article key={title} className="grid gap-s2 py-s5 md:grid-cols-[1fr_220px]">
              <div>
                <h3 className="text-lg font-bold text-text">{title}</h3>
                <p className="mt-1 text-sm font-light text-text-meta">{citation}</p>
              </div>
              <span className="text-sm font-semibold text-ocean md:text-right">{topic}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
