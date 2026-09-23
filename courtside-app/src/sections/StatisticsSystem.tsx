import { StatCard } from "../components/StatCard";
import { athletes } from "../data/brand";
import "./StatisticsSystem.css";

const bigNums = [
  { value: "27.4", label: "PPG", note: "Season average" },
  { value: "41%", label: "3PT", note: "League rank #4" },
  { value: "+6.8", label: "+/-", note: "Net rating" },
  { value: "8.4", label: "GEAR", note: "Product score" },
];

export function StatisticsSystem() {
  return (
    <section className="section section--emphasis" id="stats">
      <div className="wrap">
        <p className="section__eyebrow">Priority board · Numbers as design</p>
        <h2 className="section__title">Data is a graphic.</h2>
        <p className="section__lede">
          Lime for performance numbers. Scale overboxes. Rules for type, color,
          and reveal — statistics are signature COURTSIDE identity, not filler UI.
        </p>

        <div className="num-hero">
          {bigNums.map((n) => (
            <div key={n.label} className="num-hero__item">
              <strong className="num-display">{n.value}</strong>
              <span>{n.label}</span>
              <em>{n.note}</em>
            </div>
          ))}
        </div>

        <div className="stat-rules">
          <article>
            <h3>Typography</h3>
            <p>Barlow Condensed Black. Tabular figures. Leading tight.</p>
          </article>
          <article>
            <h3>Scale</h3>
            <p>Hero stats dominate the frame. Labels stay secondary.</p>
          </article>
          <article>
            <h3>Color</h3>
            <p>Lime = live performance. Orange = brand action. Never both competing.</p>
          </article>
          <article>
            <h3>Motion</h3>
            <p>Snap in under 0.4s. Count-up optional. No bounce.</p>
          </article>
        </div>

        <div className="pkg-grid pkg-grid--3" style={{ marginTop: "1.5rem" }}>
          <StatCard
            variant="card"
            title={athletes[1].nameUpper}
            subtitle="Player card"
            stats={[
              { label: "PPG", value: "22.1" },
              { label: "RPG", value: "7.4" },
              { label: "APG", value: "3.2" },
              { label: "3PT", value: "39%" },
            ]}
          />
          <StatCard
            variant="compare"
            title="REED"
            subtitle="Head to head"
            stats={[
              { label: "PPG", value: "27.4" },
              { label: "AST%", value: "32" },
            ]}
            compareName="VALE"
            compareStats={[
              { label: "PPG", value: "22.1" },
              { label: "AST%", value: "18" },
            ]}
          />
          <StatCard
            variant="season"
            title="TREND"
            subtitle="Last 10"
            stats={[
              { label: "PTS", value: "29.1" },
              { label: "TS%", value: "63" },
              { label: "TOV", value: "2.1" },
              { label: "+/-", value: "+8.2" },
            ]}
          />
        </div>

        <div className="rank-row">
          <div className="rank-item">
            <span>01</span>
            <strong>Harbor FC</strong>
            <em className="num-display">18–4</em>
          </div>
          <div className="rank-item">
            <span>02</span>
            <strong>Metro United</strong>
            <em className="num-display">16–6</em>
          </div>
          <div className="rank-item">
            <span>03</span>
            <strong>Coast SC</strong>
            <em className="num-display">15–7</em>
          </div>
        </div>
      </div>
    </section>
  );
}
