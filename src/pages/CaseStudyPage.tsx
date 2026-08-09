import { Link } from "react-router-dom";
import { AnniversaryBadge } from "../components/Logo";
import { PageMeta } from "../components/PageMeta";
import { futureVision } from "../data/futureProducts";
import { WwLifeFlow } from "../components/future/WwLifeFlow";
import { WwPathwaysFlow } from "../components/future/WwPathwaysFlow";
import { WwKitchenFlow } from "../components/future/WwKitchenFlow";

const decisions = [
  {
    title: "Anniversary is not the product",
    detail:
      "The campaign answers customer needs first, then where Weight Watchers goes next. 63 is proof of learning, not a birthday badge.",
  },
  {
    title: "Pathways before Life on the guided path",
    detail:
      "Data lists Life first as the system hub, but the signature walkthrough starts with Pathways so personalization feels earned before Today appears.",
  },
  {
    title: "One phone shell, many products",
    detail:
      "Shared AppShell chrome keeps five flagships feeling like one app—not a collage of unrelated concept cards.",
  },
  {
    title: "Homepage carries the spine",
    detail:
      "Community, science, and innovation collapse into one Present bridge; full chapters live on dedicated routes. Ahead shows the guided journey plus flagship teasers.",
  },
];

const cuts = [
  "Twelve ecosystem feature cards as equal peers → five flagships + supporting Momentum/Ask WW.",
  "Five full interactive mocks on the homepage → one guided journey + teaser grid linking to What’s Next.",
  "Beach-silhouette and laptop-meeting stock → health-forward cooking, movement, grocery, and coaching imagery.",
  "Medication-change advice in Life After GLP-1 → educational maintenance framing only.",
  "Dense Science/Innovation homepage chapters → compact Present bridge with deeper pages.",
];

const annotated = [
  {
    title: "WW Pathways",
    note: "Goal → priorities → structure → personalized pathway. “Start” hands state into WW Life.",
    node: <WwPathwaysFlow />,
  },
  {
    title: "WW Life · Today",
    note: "Mid-journey destination. Pathway banner + focus chips prove the handoff is real.",
    node: (
      <WwLifeFlow
        initialStep={3}
        pathwayLabel="Build Strength"
        focusPreset={["Build strength", "Eat better", "Improve energy"]}
      />
    ),
  },
  {
    title: "WW Kitchen · Planner",
    note: "Food support without moralizing. Smart Swap and grocery empty states add prototype polish.",
    node: <WwKitchenFlow initialStep="planner" pathwayLabel="Build Strength" />,
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
            Key decisions
          </h2>
          <div className="mt-5 space-y-4">
            {decisions.map((item) => (
              <div key={item.title} className="rounded-[1.25rem] border border-ink/8 bg-white p-5">
                <p className="font-display text-lg font-bold text-ink" style={{ fontWeight: 700 }}>
                  {item.title}
                </p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink/65">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
            What we cut
          </h2>
          <ul className="mt-4 space-y-3">
            {cuts.map((item) => (
              <li key={item} className="flex gap-3 font-sans text-sm leading-relaxed text-ink/70">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tide" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="section-shell mt-16" aria-labelledby="annotated-heading">
        <div className="max-w-3xl">
          <h2
            id="annotated-heading"
            className="font-display text-3xl font-bold text-ink"
            style={{ fontWeight: 700 }}
          >
            Annotated product screens
          </h2>
          <p className="mt-3 font-serif text-lg text-ink/65">
            Live prototypes with design notes—the same interactive flows reviewers can click on What’s
            Next.
          </p>
        </div>
        <div className="mt-10 space-y-16">
          {annotated.map((item, index) => (
            <article
              key={item.title}
              className="grid items-start gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12"
            >
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-600">
                  Screen 0{index + 1}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-ink/65">{item.note}</p>
              </div>
              <div className="flex justify-center lg:justify-end">{item.node}</div>
            </article>
          ))}
        </div>
      </section>

      <div className="section-shell mt-16 max-w-3xl space-y-14">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
            Signature moments
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-ink/70">
            Find Your Year share/download card, and WW Life weekly reflection share card—portable
            proof that the concept is personal, not just browsable.
          </p>
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
          <p className="mt-3 font-serif text-lg text-tide">{futureVision.thesis}</p>
        </section>

        <div className="flex flex-wrap gap-3 pt-4">
          <Link
            to="/whats-next#guided-journey"
            className="rounded-2xl bg-cobalt-600 px-6 py-3.5 font-sans text-sm font-semibold text-white"
          >
            Try the guided journey
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
