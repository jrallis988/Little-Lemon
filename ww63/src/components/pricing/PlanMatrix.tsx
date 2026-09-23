import { useMemo, useState } from "react";
import { planFeatures, planTiers, type PlanTier } from "../../data/plans";
import { useOnboarding } from "../../hooks/useOnboarding";

function FeatureCell({ value }: { value: boolean | "partial" }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-tide/20 text-xs font-bold text-ink">
        ✓
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="font-sans text-xs font-semibold text-cobalt-600" title="Partial / add-on">
        ◐
      </span>
    );
  }
  return <span className="text-ink/25">—</span>;
}

export function PlanMatrix() {
  const { openOnboarding } = useOnboarding();
  const [highlight, setHighlight] = useState<string>(
    planTiers.find((tier) => tier.recommended)?.id ?? planTiers[0].id
  );

  const active: PlanTier = useMemo(
    () => planTiers.find((tier) => tier.id === highlight) ?? planTiers[0],
    [highlight]
  );

  return (
    <section
      id="plan-matrix"
      className="bg-mist/40 py-20 sm:py-28"
      aria-labelledby="plan-matrix-heading"
    >
      <div className="section-shell">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
          Concept plans
        </p>
        <h2
          id="plan-matrix-heading"
          className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          style={{ fontWeight: 700 }}
        >
          One ecosystem. Three ways in.
        </h2>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink/65">
          Portfolio plan matrix—not live pricing. Shows how Points, WW Life Complete, and Med+ map to
          the flagship product vision.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {planTiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setHighlight(tier.id)}
              className={`rounded-2xl px-4 py-2.5 font-sans text-sm font-semibold transition ${
                highlight === tier.id
                  ? "bg-cobalt-600 text-white"
                  : "bg-white text-ink/70 hover:border-cobalt-300 border border-ink/10"
              }`}
              aria-pressed={highlight === tier.id}
            >
              {tier.name}
              {tier.recommended ? " · Recommended" : ""}
            </button>
          ))}
        </div>

        <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-ink/8 bg-white">
          <table className="min-w-[44rem] w-full border-collapse text-left">
            <caption className="sr-only">Plan feature comparison matrix</caption>
            <thead>
              <tr className="border-b border-ink/8 bg-cloud/80">
                <th scope="col" className="px-5 py-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                  Feature
                </th>
                {planTiers.map((tier) => (
                  <th
                    key={tier.id}
                    scope="col"
                    className={`px-4 py-4 font-display text-sm font-bold ${
                      tier.id === highlight ? "bg-mist text-cobalt-700" : "text-ink"
                    }`}
                    style={{ fontWeight: 700 }}
                  >
                    {tier.name}
                    <span className="mt-1 block font-sans text-xs font-semibold text-ink/50">
                      {tier.price}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planFeatures.map((feature) => (
                <tr key={feature.key} className="border-b border-ink/5">
                  <th scope="row" className="px-5 py-3 font-sans text-sm font-medium text-ink/75">
                    {feature.label}
                  </th>
                  {planTiers.map((tier) => (
                    <td
                      key={tier.id}
                      className={`px-4 py-3 text-center ${
                        tier.id === highlight ? "bg-mist/50" : ""
                      }`}
                    >
                      <FeatureCell value={tier.features[feature.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="rounded-[1.5rem] border border-ink/8 bg-white p-6">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-600">
              {active.name}
            </p>
            <p className="mt-2 font-serif text-lg text-ink/75">{active.tagline}</p>
            <p className="mt-2 font-sans text-xs text-ink/45">{active.priceNote}</p>
          </div>
          <button
            type="button"
            onClick={openOnboarding}
            className="h-12 rounded-2xl bg-cobalt-600 px-8 font-sans text-sm font-semibold text-white hover:bg-cobalt-700"
          >
            Start with onboarding
          </button>
        </div>
      </div>
    </section>
  );
}
