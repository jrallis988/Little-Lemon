import Image from "next/image";
import { Hero } from "@/components/Hero";
import { AudiencePathways } from "@/components/AudiencePathways";
import { CurriculumCard } from "@/components/CurriculumCard";

const spotlight = [
  {
    title: "Placement & learning profile diagnostic",
    description:
      "A teacher-ready screener that identifies skill gaps and the learning-style patterns affecting classroom performance.",
    kind: "diagnostic" as const,
    items: [
      "Placement screener",
      "Learning-style inventory",
      "Baseline comprehension check",
    ],
    href: "#start",
    imageSrc: "/images/card-diagnostic.jpg",
    imageAlt: "Teacher reviewing intervention screening materials",
  },
  {
    title: "Teacher-led lesson modules",
    description:
      "Ready-to-use lessons that reteach core concepts through multiple modalities so teachers can intervene without building a new system from scratch.",
    kind: "module" as const,
    items: [
      "Print and digital lesson paths",
      "Small-group activities",
      "Practice and reinforcement sets",
    ],
    href: "#curriculum",
    imageSrc: "/images/card-modules.jpg",
    imageAlt: "Classroom lesson resources in use",
  },
  {
    title: "Progress monitoring system",
    description:
      "A clear intervention sequence with checkpoints, regrouping guidance, and family-ready reporting for ongoing classroom use.",
    kind: "structure" as const,
    items: [
      "Weekly mastery checks",
      "Regrouping guidance",
      "Family-facing summaries",
    ],
    href: "#curriculum",
    imageSrc: "/images/card-path.jpg",
    imageAlt: "Teacher leading structured intervention support",
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
            Built like a program teachers can adopt, not just a concept they can admire.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">
            Morgan Bright is positioned as a structured instructional solution
            for classrooms and intervention blocks. Schools can review the
            components, choose a rollout model, and order a package that helps
            teachers reach students who need a different instructional entry point.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                term: "Assess",
                definition:
                  "Screen for the exact academic hurdle and the learning-style mismatch that may be slowing progress.",
              },
              {
                term: "Teach",
                definition:
                  "Use ready-to-teach modules that present the same skill through multiple pathways instead of one fixed approach.",
              },
              {
                term: "Track",
                definition:
                  "Monitor mastery with clear checkpoints, regrouping guidance, and reporting that supports teachers and families.",
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

      <section id="curriculum" className="bg-white">
        <div className="mx-auto max-w-site px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="section-label">Curriculum</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl">
                Program components built for classroom ordering and adoption.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-mute">
                Review the core pieces schools would expect in a purchasable
                intervention program: placement, instructional materials, and
                progress tracking.
              </p>
            </div>
            <a href="#start" className="btn-outline shrink-0 self-start">
              Request ordering info
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {spotlight.map((card) => (
              <CurriculumCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-navy text-white">
        <div className="mx-auto grid max-w-site items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-white/70">
              Why schools adopt it
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Familiar program structure, modern intervention philosophy.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              The best classroom programs make it easy for teachers to know what
              to do next. Morgan Bright pairs that classic adoptable-program
              feel with stronger diagnostics and better support for different
              learning styles.
            </p>
            <a href="#start" className="btn-primary mt-8">
              Talk to sales
            </a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image
              src="/images/mission.jpg"
              alt="Students engaged in collaborative learning"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section id="start" className="bg-paper-warm">
        <div className="mx-auto max-w-site px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-2xl rounded bg-white p-8 shadow-card sm:p-10">
            <p className="section-label">Ordering</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl">
              Ready to bring Morgan Bright to your classroom or school?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mute">
              Request program information, school pricing, and rollout guidance.
              We’ll help you choose the right package for a single classroom, a
              grade-level team, or a broader intervention model.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:hello@morganbright.learn?subject=Request%20Morgan%20Bright%20quote"
                className="btn-primary"
              >
                Request a quote
              </a>
              <a href="#curriculum" className="btn-outline">
                Review program components
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
