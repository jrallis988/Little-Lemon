import { Link } from "react-router-dom";

const beats = [
  {
    label: "Problem",
    body: "Little Lemon needed a booking flow that felt calm under pressure—guests choosing a date, time, and party size without fighting a cluttered restaurant UI.",
  },
  {
    label: "Role",
    body: "I owned the front-end UI and responsive layout—information hierarchy, clear booking flow, and ongoing work in React and component-based systems.",
  },
  {
    label: "Constraints",
    body: "Ship a polished SPA with accessible form patterns, predictable state, and a Mediterranean visual system that stayed readable on mobile.",
  },
  {
    label: "Decisions",
    body: "Formik + Yup kept validation declarative. Clear step hierarchy and focus states reduced dead ends. Components stayed small so the booking path could iterate without a rewrite.",
  },
  {
    label: "Outcome",
    body: "A complete reservation experience with a warm, scannable UI and fewer friction points between “I want a table” and “I’m booked.”",
  },
  {
    label: "Next",
    body: "I’d deepen live availability feedback, tighten empty/error states, and instrument the funnel so design choices stay tied to completion rate.",
  },
];

export default function CaseStudy() {
  return (
    <section id="case" className="relative overflow-hidden bg-ink-soft py-24 md:py-32">
      <div
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-foam/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container relative">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Case study
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            Little Lemon — booking without the clutter.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            A closer look at the restaurant reservation build: problem, role,
            constraints, and the front-end choices that kept the flow fast and clean.
          </p>
          <div className="reveal mt-6 flex flex-wrap gap-3">
            <Link to="/work/little-lemon" className="btn-primary">
              Full case study
            </Link>
            <a
              href="https://github.com/jrallis988/Little-Lemon"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              View repository
            </a>
            <a href="#contact" className="btn-ghost">
              Discuss this build
            </a>
          </div>
        </div>

        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 stagger">
          {beats.map((beat, index) => (
            <li key={beat.label} className="reveal border-t border-foam/35 pt-5">
              <p className="text-sm uppercase tracking-[0.16em] text-sand/60">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-foam-soft">{beat.label}</h3>
              <p className="mt-3 text-base leading-relaxed text-sand/85">{beat.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
