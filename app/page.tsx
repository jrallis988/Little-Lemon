import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { AudiencePathways } from "@/components/AudiencePathways";
import { CurriculumCard } from "@/components/CurriculumCard";
import { features as siteFeatures } from "@/lib/site";

const buyingSteps = [
  {
    step: "1",
    title: "See the platform",
    body: "Review the core features teachers use every day: diagnose, assign, adapt, and track.",
  },
  {
    step: "2",
    title: "Choose a plan",
    body: "Compare Classroom, School, and District licenses based on seats, reporting, and rollout needs.",
  },
  {
    step: "3",
    title: "Buy with confidence",
    body: "Request a demo or pricing conversation so sales can match the right software package to your setting.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <AudiencePathways />

      <section id="approach" className="bg-paper-warm">
        <div className="mx-auto max-w-site px-5 py-16 sm:px-8 sm:py-24">
          <p className="section-label">Approach</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl">
            Academic software built around how students actually learn.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">
            Morgan Bright is a sales-ready learning platform for teachers,
            schools, and districts. It turns learning differences into actionable
            instructional decisions instead of leaving educators to invent a new
            system from scratch.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                term: "Diagnose",
                definition:
                  "Pinpoint the academic barrier and the learning-style mismatch slowing a student down.",
              },
              {
                term: "Adapt",
                definition:
                  "Assign software-guided lessons that reach the same skill through more than one instructional pathway.",
              },
              {
                term: "Monitor",
                definition:
                  "Use clear dashboards and reports to decide who needs reteaching, regrouping, or advancement.",
              },
            ].map((item) => (
              <div key={item.term} className="rounded bg-white p-6 shadow-card">
                <div className="mb-4 h-1 w-10 bg-accent" />
                <h3 className="text-xl font-bold text-navy">{item.term}</h3>
                <p className="mt-2 text-base leading-relaxed text-mute">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-white">
        <div className="mx-auto max-w-site px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="section-label">Platform features</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl">
                Everything schools look for in academic support software.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-mute">
                Clear diagnostics, adaptive instruction, and progress monitoring
                in one platform teachers can buy, launch, and use.
              </p>
            </div>
            <Link href="/plans" className="btn-outline shrink-0 self-start">
              Compare plans
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteFeatures.map((card) => (
              <CurriculumCard
                key={card.title}
                title={card.title}
                description={card.description}
                kind="feature"
                items={[...card.items]}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                href="/demo"
                ctaLabel="Request a demo"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-site items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-white/70">
              Why schools buy it
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              A focused software purchase with a clear classroom job.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Morgan Bright is not another broad content library. It is academic
              software designed to help educators identify learning hurdles,
              personalize instruction, and prove progress — then buy the plan
              that fits their setting.
            </p>
            <Link href="/about" className="btn-primary mt-8">
              About Morgan Bright
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image
              src="/images/mission.jpg"
              alt="Students engaged in collaborative classroom learning"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section id="buy" className="bg-paper-warm">
        <div className="mx-auto max-w-site px-5 py-16 sm:px-8 sm:py-24">
          <p className="section-label">How to buy</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl">
            A simple path from interest to purchase.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">
            Explore the platform, compare license plans, then request pricing or
            a demo. Sales will help you choose Classroom, School, or District.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {buyingSteps.map((item) => (
              <div key={item.step} className="rounded bg-white p-6 shadow-card">
                <p className="text-sm font-bold text-accent">Step {item.step}</p>
                <h3 className="mt-2 text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-mute">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-2xl rounded bg-white p-8 shadow-card sm:p-10">
            <h3 className="text-2xl font-bold tracking-tight text-navy text-balance">
              Ready to buy Morgan Bright for your classroom, school, or district?
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-mute">
              Tell us your setting and we’ll send plan recommendations, pricing
              guidance, and demo options.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demo?type=pricing" className="btn-primary">
                Get pricing
              </Link>
              <Link href="/demo" className="btn-outline">
                Request a demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
