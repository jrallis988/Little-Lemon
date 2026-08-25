import { StatCard } from "../components/StatCard";
import { athlete } from "../data/brand";

export function StatisticsSystem() {
  return (
    <section className="section section--dark" id="stats">
      <div className="wrap">
        <p className="section__eyebrow">13 · Statistics Graphics</p>
        <h2 className="section__title">Numbers as Design</h2>
        <p className="section__lede">
          Reusable sports statistics system — typography and figures do the heavy lifting.
        </p>

        <div className="grid-4" style={{ marginBottom: "1.25rem" }}>
          {athlete.stats.map((s) => (
            <StatCard
              key={s.label}
              variant="individual"
              stats={[{ label: s.label, value: s.value }]}
            />
          ))}
        </div>

        <div className="pkg-grid pkg-grid--3">
          <StatCard
            variant="card"
            title={athlete.nameUpper}
            subtitle="Player card"
            stats={athlete.stats.map((s) => ({ label: s.label, value: s.value }))}
          />
          <StatCard
            variant="compare"
            title="REED"
            subtitle="Comparison"
            stats={[
              { label: "PPG", value: "27.4" },
              { label: "RPG", value: "8.2" },
            ]}
            compareName="EAST AVG"
            compareStats={[
              { label: "PPG", value: "21.8" },
              { label: "RPG", value: "6.1" },
            ]}
          />
          <StatCard
            variant="season"
            title="SEASON"
            subtitle="2025–26"
            stats={[
              { label: "GP", value: "64" },
              { label: "MIN", value: "34.2" },
              { label: "TS%", value: "61.4" },
              { label: "+/-", value: "+6.8" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
