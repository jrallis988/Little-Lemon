import Image from "next/image";
import { Hero } from "@/components/Hero";
import { AudiencePathways } from "@/components/AudiencePathways";
import { CurriculumCard } from "@/components/CurriculumCard";

const features = [
  {
    title: "Learning profile diagnostics",
    description:
      "Identify skill gaps and learning-style mismatches so teachers know where each student is getting stuck.",
    kind: "feature" as const,
    items: [
      "Placement screener",
      "Learning-style inventory",
      "Baseline comprehension check",
    ],
    href: "#buy",
    imageSrc: "/images/card-diagnostic.jpg",
    imageAlt: "Educator reviewing diagnostic insights in academic software",
    ctaLabel: "Request a demo",
  },
  {
    title: "Adaptive instruction modules",
    description:
      "Assign digital lessons that reteach the same concept through multiple modalities without rebuilding the unit by hand.",
    kind: "feature" as const,
    items: [
      "Multi-pathway lesson tracks",
      "Practice with feedback",
      "Reteach and extension options",
    ],
    href: "#plans",
    imageSrc: "/images/card-modules.jpg",
    imageAlt: "Students engaging with digital learning modules",
    ctaLabel: "Compare plans",
  },
  {
    title: "Progress monitoring dashboards",
    description:
      "Track mastery, regroup students, and share clear summaries with families and support teams.",
    kind: "feature" as const,
    items: [
      "Weekly mastery checks",
      "Intervention regrouping cues",
      "Exportable reports",
    ],
    href: "#buy",
    imageSrc: "/images/card-path.jpg",
    imageAlt: "Teacher reviewing student progress dashboard",
    ctaLabel: "Talk to sales",
  },
];

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
              <div
                key={item.term}
                className="rounded bg-white p-6 shadow-card"
              >
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
            <a href="#plans" className="btn-outline shrink-0 self-start">
              Compare plans
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((card) => (
              <CurriculumCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-navy text-white">
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
            <a href="#buy" className="btn-primary mt-8">
              Request a demo
            </a>
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
              <a
                href="mailto:hello@morganbright.learn?subject=Request%20Morgan%20Bright%20pricing"
                className="btn-primary"
              >
                Get pricing
              </a>
              <a
                href="mailto:hello@morganbright.learn?subject=Request%20Morgan%20Bright%20demo"
                className="btn-outline"
              >
                Request a demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
