import { Link } from "react-router-dom";
import {
  flagshipProducts,
  futureVision,
  timelineToFuture,
} from "../../data/futureProducts";
import {
  LifeAfterGlp1Mock,
  MyWwTeamMock,
  WwKitchenMock,
  WwLifeMock,
  WwPathwaysMock,
} from "../future/ProductMocks";

const mockById = {
  "ww-life": WwLifeMock,
  "ww-pathways": WwPathwaysMock,
  "my-ww-team": MyWwTeamMock,
  "ww-kitchen": WwKitchenMock,
  "life-after-glp1": LifeAfterGlp1Mock,
} as const;

export function ChapterAhead() {
  return (
    <section id="ahead" className="relative bg-paper py-20 sm:py-28" aria-labelledby="ahead-heading">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/campaign/future.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/80 to-cobalt-900/60" />
        </div>
        <div className="section-shell relative py-20 text-white sm:py-24">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-tide">
            63 Years Ahead
          </p>
          <h2
            id="ahead-heading"
            className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ fontWeight: 700 }}
          >
            {futureVision.headline}
          </h2>
          <p className="mt-3 max-w-2xl font-serif text-2xl text-tide sm:text-3xl">
            {futureVision.subhead}
          </p>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/75 sm:text-lg">
            {futureVision.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/whats-next"
              className="rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink"
            >
              {futureVision.cta}
            </Link>
            <a
              href="#next-ww-life"
              className="rounded-2xl border border-white/35 px-6 py-3.5 font-sans text-sm font-semibold text-white"
            >
              Preview flagship products
            </a>
          </div>
        </div>
      </div>

      <div className="section-shell mt-16">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {timelineToFuture.map((step) => (
            <li key={step.era} className="rounded-2xl border border-ink/8 bg-white px-4 py-4">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cobalt-600">
                {step.era}
              </p>
              <p className="mt-2 font-display text-lg font-bold text-ink" style={{ fontWeight: 700 }}>
                {step.title}
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-20 space-y-24">
        {flagshipProducts.map((product, index) => {
          const Mock = mockById[product.id as keyof typeof mockById];
          const reverse = index % 2 === 1;
          return (
            <article
              key={product.id}
              id={`next-${product.id}`}
              className="section-shell"
              aria-labelledby={`${product.id}-heading`}
            >
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
                    Flagship · 0{index + 1}
                  </p>
                  <h3
                    id={`${product.id}-heading`}
                    className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
                    style={{ fontWeight: 700 }}
                  >
                    {product.name}
                  </h3>
                  <p className="mt-3 font-serif text-2xl text-tide">{product.statement}</p>
                  <p className="mt-4 font-sans text-base leading-relaxed text-ink/65 sm:text-lg">
                    {product.explanation}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {product.highlights.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-mist px-3 py-1.5 font-sans text-xs font-semibold text-ink/70"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 overflow-hidden rounded-[1.5rem]">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="aspect-[16/10] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div>{Mock ? <Mock /> : null}</div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="section-shell mt-20">
        <div className="rounded-[2rem] bg-ink px-6 py-12 text-center text-white sm:px-12">
          <p className="mx-auto max-w-3xl font-serif text-2xl leading-snug sm:text-3xl">
            {futureVision.thesis}
          </p>
          <Link
            to="/whats-next"
            className="mt-8 inline-flex rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink"
          >
            Explore the full ecosystem
          </Link>
        </div>
      </div>
    </section>
  );
}
