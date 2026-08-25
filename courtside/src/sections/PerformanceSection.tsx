import "./PerformanceSection.css";

const levers = [
  {
    metric: "Impressions → CTR",
    lesson:
      "If athlete close-ups beat wide game photos on CTR, future THE PLAYER concepts lead with expression while GAME DAY keeps testing kinetic crops.",
  },
  {
    metric: "Views → Avg. view duration",
    lesson:
      "Strong opens with series identity and a clear promise help early retention — motion intros stay under three seconds.",
  },
  {
    metric: "Audience retention",
    lesson:
      "Chapter cards and lower thirds orient viewers without pausing story. Drop dense stat walls mid-narrative.",
  },
  {
    metric: "Watch time · Subscribers · Traffic",
    lesson:
      "End screens and playlist packaging turn one click into a session. Browse and Suggested traffic favor thumbnails that still read at recommended size.",
  },
];

export function PerformanceSection() {
  return (
    <section className="section" id="performance">
      <div className="wrap">
        <p className="section__eyebrow">20 · YouTube Performance</p>
        <h2 className="section__title">Creative Decisions from Data</h2>
        <p className="section__lede">
          Not an analytics dashboard — a designer’s read on how impressions, CTR,
          views, retention, watch time, subscribers, and traffic sources reshape
          packaging choices.
        </p>
        <div className="perf-grid">
          {levers.map((l) => (
            <article key={l.metric} className="perf-card">
              <h3>{l.metric}</h3>
              <p>{l.lesson}</p>
            </article>
          ))}
        </div>
        <blockquote className="perf-quote">
          If athlete-close-up thumbnails consistently produce stronger CTR than wide
          game photography, future thumbnail concepts could prioritize athlete
          expression while continuing to test variations.
        </blockquote>
      </div>
    </section>
  );
}
