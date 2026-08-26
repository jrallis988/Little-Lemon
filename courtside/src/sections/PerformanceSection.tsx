import "./PerformanceSection.css";

const loops = [
  {
    metric: "CTR ↑ on athlete close-ups",
    next: "Prioritize expression crops for THE PLAYER; keep testing team frames on GAME DAY.",
  },
  {
    metric: "Retention dip at 0:45 on dense stats",
    next: "Move full stat walls to chapter beats; keep mid-narrative numbers singular and large.",
  },
  {
    metric: "Shorts completion higher with vertical quote lockups",
    next: "Rebuild graphics for 9:16 — never letterbox the master.",
  },
  {
    metric: "End-screen clicks rise when playlist packaging is clear",
    next: "Reserve UI hotspots; brand sits in safe zones only.",
  },
];

export function PerformanceSection() {
  return (
    <section className="section" id="performance">
      <div className="wrap">
        <p className="section__eyebrow">Learning system</p>
        <h2 className="section__title">Creative decisions from data</h2>
        <p className="section__lede">
          CTR, watch time, retention, completion, engagement, Shorts views,
          subscriber conversion — each result feeds the next packaging choice.
          COURTSIDE learns; it is not a static brand PDF.
        </p>

        <div className="perf-metrics">
          {[
            "CTR",
            "Watch time",
            "Retention",
            "Completion",
            "Engagement",
            "Shorts views",
            "Subs conversion",
          ].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        <div className="perf-grid">
          {loops.map((l) => (
            <article key={l.metric} className="perf-card">
              <h3>{l.metric}</h3>
              <p>
                <strong>Next decision → </strong>
                {l.next}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
