import { YouTubeThumbnail } from "../components/YouTubeThumbnail";
import { thumbnails } from "../data/brand";
import "./ABTestSection.css";

export function ABTestSection() {
  const a = thumbnails[0];
  const b = {
    ...thumbnails[9],
    title: "HUDDLE",
    subtitle: "GAME DAY",
    category: "Team / action crop",
  };

  return (
    <section className="section section--emphasis" id="abtest">
      <div className="wrap">
        <p className="section__eyebrow">Priority board · Simulated</p>
        <h2 className="section__title">What we actually tested</h2>
        <p className="section__lede">
          Athlete crop vs team energy — plus headline, accent, and expression
          variables. Metrics below are fictional and labeled for demonstration.
        </p>

        <div className="ab-vars">
          <span>Athlete crop</span>
          <span>Headline</span>
          <span>Accent color</span>
          <span>Composition</span>
          <span>Number placement</span>
          <span>Expression</span>
          <span>Product vs athlete</span>
        </div>

        <div className="ab-grid">
          <div>
            <span className="label-chip">A · Athlete-focused</span>
            <YouTubeThumbnail concept={a} />
          </div>
          <div>
            <span className="label-chip">B · Team / action</span>
            <YouTubeThumbnail concept={b} />
          </div>
        </div>

        <div className="ab-sim" role="region" aria-label="Simulated performance data">
          <p className="ab-sim__badge">SIMULATED PERFORMANCE DATA</p>
          <table>
            <thead>
              <tr>
                <th scope="col">Metric</th>
                <th scope="col">Version A</th>
                <th scope="col">Version B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Impressions</th>
                <td>128,400</td>
                <td>131,200</td>
              </tr>
              <tr>
                <th scope="row">CTR</th>
                <td className="ab-win">6.8%</td>
                <td>4.9%</td>
              </tr>
              <tr>
                <th scope="row">Views</th>
                <td className="ab-win">8,731</td>
                <td>6,429</td>
              </tr>
              <tr>
                <th scope="row">Avg. view duration</th>
                <td className="ab-win">4:12</td>
                <td>3:41</td>
              </tr>
              <tr>
                <th scope="row">Watch time (hrs)</th>
                <td className="ab-win">412</td>
                <td>298</td>
              </tr>
            </tbody>
          </table>
          <p className="ab-sim__insight">
            <strong>Winner: A — athlete expression.</strong> Close-up + name
            hierarchy outperformed wide team energy on CTR. Decision: THE PLAYER
            defaults to subject-led crops; GAME DAY keeps testing action/team
            frames as a separate hypothesis.
          </p>
        </div>
      </div>
    </section>
  );
}
