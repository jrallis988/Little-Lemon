import type { Metadata } from "next";
import Link from "next/link";
import { CurriculumCard } from "@/components/CurriculumCard";
import { PageHero } from "@/components/PageHero";
import { features } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Morgan Bright platform features: diagnostics, adaptive instruction modules, and progress monitoring dashboards.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform features"
        title="Everything schools look for in academic support software."
        description="Morgan Bright combines diagnostics, adaptive lessons, and progress monitoring so teachers can intervene with clarity instead of guesswork."
        actions={
          <>
            <Link href="/demo" className="btn-primary">
              Request a demo
            </Link>
            <Link href="/plans" className="btn-outline">
              Compare plans
            </Link>
          </>
        }
      />

      <section className="bg-white">
        <div className="mx-auto max-w-site px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <CurriculumCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                kind="feature"
                items={[...feature.items]}
                imageSrc={feature.imageSrc}
                imageAlt={feature.imageAlt}
                href="/demo"
                ctaLabel="Request a demo"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-warm">
        <div className="mx-auto max-w-site px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-navy">
            Built for the daily work of teaching and intervention.
          </h2>
          <dl className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                term: "Diagnose",
                definition:
                  "Screen for skill gaps and learning-style mismatches before assigning the next lesson.",
              },
              {
                term: "Adapt",
                definition:
                  "Launch multi-pathway modules that give students another route into the same concept.",
              },
              {
                term: "Monitor",
                definition:
                  "Use dashboards and reports to regroup, reteach, and communicate progress clearly.",
              },
            ].map((item) => (
              <div key={item.term} className="rounded bg-white p-6 shadow-card">
                <dt className="text-xl font-bold text-navy">{item.term}</dt>
                <dd className="mt-2 text-base leading-relaxed text-mute">
                  {item.definition}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
