import { Link } from "react-router-dom";
import { AnniversaryBadge } from "../components/Logo";
import { PageMeta } from "../components/PageMeta";
import {
  ecosystemConcepts,
  flagshipProducts,
  futureVision,
  timelineToFuture,
} from "../data/futureProducts";
import {
  LifeAfterGlp1Mock,
  MyWwTeamMock,
  WwKitchenMock,
  WwLifeMock,
  WwMomentumMock,
  WwPathwaysMock,
} from "../components/future/ProductMocks";
import { GuidedWalkthrough } from "../components/future/GuidedWalkthrough";

export function WhatsNextPage() {
  return (
    <main id="main-content" className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <PageMeta
        title="Meet the Next Weight Watchers | Weight Watchers 63"
        description={futureVision.thesis}
        path="/whats-next"
        image="/images/campaign/future.jpg"
      />

      <div className="section-shell">
        <AnniversaryBadge />
        <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
          Weight Watchers 63 · What’s next
        </p>
        <h1
          className="mt-3 max-w-4xl font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl"
          style={{ fontWeight: 700 }}
        >
          {futureVision.headline} {futureVision.subhead}
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-ink/65">
          {futureVision.body}
        </p>
        <p className="mt-4 max-w-2xl font-sans text-base text-ink/60">
          Interactive product prototypes—not concept cards. Start with the guided journey, then click
          through WW Life, Pathways, Kitchen, Team, and Life After GLP-1 inside one shared app shell.
        </p>
        <a
          href="#guided-journey"
          className="mt-6 inline-flex rounded-2xl bg-cobalt-600 px-6 py-3.5 font-sans text-sm font-semibold text-white"
        >
          Start guided journey
        </a>
      </div>

      <div className="section-shell mt-14">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {timelineToFuture.map((step) => (
            <li key={step.era} className="rounded-2xl border border-ink/8 bg-white px-4 py-4">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cobalt-600">
                {step.era}
              </p>
              <p className="mt-2 font-display text-lg font-bold text-ink" style={{ fontWeight: 700 }}>
                {step.title}
              </p>
              <p className="mt-2 font-sans text-sm text-ink/60">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="section-shell mt-16">
        <GuidedWalkthrough />
      </div>

      <section className="section-shell mt-20" aria-labelledby="flagships-heading">
        <h2
          id="flagships-heading"
          className="font-display text-3xl font-bold text-ink sm:text-4xl"
          style={{ fontWeight: 700 }}
        >
          Five flagship products
        </h2>
        <p className="mt-3 max-w-2xl font-serif text-lg text-ink/65">
          The center of the next Weight Watchers—then extended by Momentum, Grocery, Table, Strength,
          Generations, Local, and Ask WW.
        </p>

        <div className="mt-12 space-y-20">
          {flagshipProducts.map((product, index) => (
            <article
              key={product.id}
              id={product.id}
              className="scroll-mt-28 grid items-start gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
                  0{index + 1} · {product.name}
                </p>
                <h3
                  className="mt-2 font-display text-3xl font-bold text-ink"
                  style={{ fontWeight: 700 }}
                >
                  {product.statement}
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-ink/65">
                  {product.explanation}
                </p>
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="campaign-photo mt-6 aspect-[16/10] w-full rounded-[1.5rem]"
                  loading="lazy"
                />
              </div>
              <div>
                {product.id === "ww-life" && <WwLifeMock />}
                {product.id === "ww-pathways" && <WwPathwaysMock />}
                {product.id === "my-ww-team" && <MyWwTeamMock />}
                {product.id === "ww-kitchen" && <WwKitchenMock />}
                {product.id === "life-after-glp1" && <LifeAfterGlp1Mock />}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell mt-20" aria-labelledby="ecosystem-heading">
        <h2
          id="ecosystem-heading"
          className="font-display text-3xl font-bold text-ink sm:text-4xl"
          style={{ fontWeight: 700 }}
        >
          One connected ecosystem
        </h2>
        <p className="mt-3 max-w-2xl font-serif text-lg text-ink/65">
          These are not twelve unrelated feature cards. They reinforce each other around the member.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.5rem] border border-ink/8 bg-white px-5 py-6">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-tide">
              How the system connects
            </p>
            <p className="mt-3 font-display text-2xl font-bold text-ink" style={{ fontWeight: 700 }}>
              Pathway → Today → Kitchen → Momentum + Team
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-ink/65">
              The guided journey above proves the spine. Momentum and Ask WW extend it—AI for
              busywork, people for care.
            </p>
            <a
              href="#guided-journey"
              className="mt-5 inline-flex font-sans text-sm font-semibold text-cobalt-700"
            >
              Replay the guided journey →
            </a>
          </div>
          <WwMomentumMock />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystemConcepts.map((concept) => (
            <article key={concept.id} className="rounded-[1.5rem] border border-ink/8 bg-white p-5">
              <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
                {concept.name}
              </h3>
              <p className="mt-2 font-serif text-base text-tide">{concept.statement}</p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-ink/65">{concept.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell mt-20">
        <div className="rounded-[2rem] bg-cobalt-700 px-6 py-14 text-center text-white sm:px-12">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-tide">
            Weight Watchers 63 · 63 Years of You
          </p>
          <p className="mx-auto mt-4 max-w-3xl font-serif text-2xl leading-snug sm:text-3xl">
            {futureVision.thesis}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/#ahead"
              className="rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink"
            >
              Back to 63 Years Ahead
            </Link>
            <Link
              to="/find-your-year"
              className="rounded-2xl border border-white/35 px-6 py-3.5 font-sans text-sm font-semibold text-white"
            >
              Find Your Year
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
