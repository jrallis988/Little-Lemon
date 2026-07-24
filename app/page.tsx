import { Hero } from "@/components/Hero";
import { CurriculumCard } from "@/components/CurriculumCard";

const curriculum = [
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
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section
        id="approach"
        className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Approach
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink text-balance sm:text-4xl">
          Every learner hits a wall. We find where—and why.
        </h2>
        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
          Morgan Bright treats learning differences as design inputs. We isolate
          the specific hurdle, match instruction to the styles that work, and
          rebuild confidence through measurable progress.
        </p>

        <dl className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-3 sm:gap-10">
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
            <div key={item.term}>
              <dt className="font-display text-xl font-semibold text-ink">
                {item.term}
              </dt>
              <dd className="mt-2 font-body text-base leading-relaxed text-ink-soft">
                {item.definition}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        id="curriculum"
        className="border-y border-line bg-white/40"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Curriculum
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink text-balance sm:text-4xl">
            Modules, tools, and structure—built to be used.
          </h2>
          <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
            A compact toolkit for educators and learners: diagnostics that
            clarify, modules that adapt, and a path that stays readable.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {curriculum.map((card) => (
              <CurriculumCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="start"
        className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Start
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink text-balance sm:text-4xl">
            Ready to see how you learn?
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
            Begin with a short diagnostic. You’ll leave with a clear profile of
            strengths, friction points, and a recommended first module.
          </p>
          <a
            href="mailto:hello@morganbright.learn?subject=Begin%20assessment"
            className="mt-8 inline-flex items-center justify-center bg-ink px-5 py-3 font-sans text-sm font-semibold text-paper transition-[background-color,transform] duration-200 hover:bg-ink-soft active:translate-y-px"
          >
            Request access
          </a>
        </div>
      </section>
    </>
  );
}
