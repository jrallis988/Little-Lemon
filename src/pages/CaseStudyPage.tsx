import { Link } from "react-router-dom";
import { AnniversaryBadge } from "../components/Logo";
import { PageMeta } from "../components/PageMeta";
import { futureVision } from "../data/futureProducts";

const flows = [
  {
    title: "WW Life",
    steps: ["Onboarding", "Pathway focus", "Personalization", "Today", "Daily Check-In", "Weekly Reflection"],
  },
  {
    title: "WW Pathways",
    steps: ["Goal", "Priorities", "Structure", "Personalized Pathway", "Change anytime"],
  },
  {
    title: "WW Kitchen",
    steps: ["Kitchen Home", "Weekly Plan", "Smart Swap", "Grocery List", "Cook Mode"],
  },
  {
    title: "Find Your Year",
    steps: ["Choose Mode", "Select Year", "Personalized Era", "Explore Timeline", "Share Result"],
  },
];

export function CaseStudyPage() {
  return (
    <main id="main-content" className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <PageMeta
        title="Case Study | Weight Watchers 63 Concept"
        description="Independent conceptual redesign exploring Weight Watchers 63 — 63 Years of You, and a future product vision built around each person."
        path="/case-study"
        image="/images/campaign/hero-cook.jpg"
      />

      <div className="section-shell max-w-3xl">
        <AnniversaryBadge />
        <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
          Portfolio case study · Concept
        </p>
        <h1
          className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          style={{ fontWeight: 700 }}
        >
          Weight Watchers 63
        </h1>
        <p className="mt-4 font-serif text-xl leading-relaxed text-ink/65">
          An independent conceptual redesign. Not affiliated with or commissioned by WeightWatchers.
        </p>
      </div>

      <div className="section-shell mt-14 space-y-14 max-w-3xl">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
            The Problem
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-ink/70">
            Weight Watchers has evolved significantly, but its history, present services, and future
            potential do not always feel like one clear story. Anniversary marketing alone does not
            explain why the brand matters to customers now—or where it should go next.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
            The Insight
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-ink/70">
            63 years is not just an anniversary. It represents decades of learning from real people:
            there is no single way to get healthy. The next Weight Watchers should build around each
            person’s changing life.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
            The Campaign
          </h2>
          <p className="mt-3 font-serif text-lg text-ink/75">
            Weight Watchers 63 · 63 Years of You
          </p>
          <p className="mt-2 font-sans text-base leading-relaxed text-ink/70">
            Customer needs first. A clear look at where Weight Watchers goes next.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
            The Website
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-ink/70">
            History, community, science, innovation, stories, Find Your Year—and a purpose section
            that answers why the anniversary matters.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
            The Future
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-ink/70">
            Flagship product explorations: WW Life, WW Pathways, WW Kitchen, My WW Team, and Life
            After GLP-1—designed as one connected experience, not twelve disconnected feature cards.
          </p>
          <p className="mt-3 font-serif text-lg text-tide">{futureVision.thesis}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
            Product journeys
          </h2>
          <div className="mt-6 space-y-6">
            {flows.map((flow) => (
              <div key={flow.title} className="rounded-[1.25rem] border border-ink/8 bg-white p-5">
                <p className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
                  {flow.title}
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink/65">
                  {flow.steps.join(" → ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
            The Product Vision
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-ink/70">
            One connected Weight Watchers experience designed around each person’s changing life:
            personalization, food in real kitchens, human support, and long-term care beyond any
            single number or medication chapter.
          </p>
        </section>

        <div className="flex flex-wrap gap-3 pt-4">
          <Link
            to="/whats-next"
            className="rounded-2xl bg-cobalt-600 px-6 py-3.5 font-sans text-sm font-semibold text-white"
          >
            Explore What’s Next
          </Link>
          <Link
            to="/"
            className="rounded-2xl border border-ink/10 px-6 py-3.5 font-sans text-sm font-semibold text-ink"
          >
            Back to campaign
          </Link>
        </div>
      </div>
    </main>
  );
}
