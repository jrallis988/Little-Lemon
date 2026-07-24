import Image from "next/image";
import { Hero } from "@/components/Hero";
import { AudiencePathways } from "@/components/AudiencePathways";
import { CurriculumCard } from "@/components/CurriculumCard";

const spotlight = [
  {
    title: "Learning profile diagnostic",
    description:
      "Map strengths, friction points, and preferred modalities so instruction starts from evidence—not assumptions.",
    kind: "diagnostic" as const,
    items: [
      "Style preference inventory",
      "Barrier identification prompts",
      "Baseline comprehension check",
    ],
    href: "#start",
    imageSrc: "/images/card-diagnostic.jpg",
    imageAlt: "Learner reviewing notes at a desk",
  },
  {
    title: "Adaptive instruction modules",
    description:
      "Short, focused units that reframe the same concept through visual, auditory, kinesthetic, and verbal pathways.",
    kind: "module" as const,
    items: [
      "Concept introduction tracks",
      "Practice with feedback loops",
      "Transfer tasks for retention",
    ],
    href: "#curriculum",
    imageSrc: "/images/card-modules.jpg",
    imageAlt: "Students collaborating with tablets in class",
  },
  {
    title: "Structured progression path",
    description:
      "A clear sequence from diagnosis to mastery, with checkpoints that adjust pace without lowering expectations.",
    kind: "structure" as const,
    items: [
      "Weekly milestone markers",
      "Remediation side-paths",
      "Mastery criteria you can see",
    ],
    href: "#curriculum",
    imageSrc: "/images/card-path.jpg",
    imageAlt: "Educator guiding a small group discussion",
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
            Expand what’s possible for every learner.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">
            Morgan Bright treats learning differences as design inputs. We
            isolate the specific hurdle, match instruction to the styles that
            work, and rebuild confidence through measurable progress.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                term: "Diagnose",
                definition:
                  "Surface the precise barrier—attention, prior knowledge, modality mismatch, or pacing.",
              },
              {
                term: "Adapt",
                definition:
                  "Retarget the lesson through the pathways that fit this learner, not a one-size template.",
              },
              {
                term: "Advance",
                definition:
                  "Move forward with clear checkpoints, so progress is visible and sustainable.",
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
                Tools and modules built for real classrooms.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-mute">
                Diagnostics that clarify, modules that adapt, and a progression
                path that stays readable for instructors, learners, and families.
              </p>
            </div>
            <a href="#start" className="btn-outline shrink-0 self-start">
              Get started
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
              Our culture
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Unlock the full potential of each learner.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Working together, we help create a brighter path for learners who
              have been asked to fit a single mold. Clarity, accessibility, and
              respect for how people learn are at the center of everything we
              build.
            </p>
            <a href="#start" className="btn-primary mt-8">
              Learn more about us
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
            <p className="section-label">Get started</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl">
              Ready to see how you learn?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mute">
              Begin with a short diagnostic. You’ll leave with a clear profile
              of strengths, friction points, and a recommended first module.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:hello@morganbright.learn?subject=Begin%20assessment"
                className="btn-primary"
              >
                Request access
              </a>
              <a href="#curriculum" className="btn-outline">
                Browse curriculum
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
