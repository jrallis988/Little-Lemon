import { YouTubeThumbnail } from "../components/YouTubeThumbnail";
import { thumbnails } from "../data/brand";
import "./ABTestSection.css";

export function ABTestSection() {
  const a = thumbnails[0];
  const b = {
    ...thumbnails[9],
    title: "DRIVE",
    subtitle: "GAME DAY",
    category: "Action-focused",
  };

  return (
    <section className="section section--dark" id="abtest">
      <div className="wrap">
        <p className="section__eyebrow">19 · Thumbnail A/B Testing</p>
        <h2 className="section__title">Simulated Experiment</h2>
        <p className="section__lede">
          Athlete-focused vs action-focused. Metrics below are fictional and labeled
          for demonstration only.
        </p>

        <div className="ab-grid">
          <div>
            <span className="label-chip">Thumbnail A · Athlete-focused</span>
            <YouTubeThumbnail concept={a} />
          </div>
          <div>
            <span className="label-chip">Thumbnail B · Action-focused</span>
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
                <th scope="row">Watch time (hrs)</th>
                <td className="ab-win">412</td>
                <td>298</td>
              </tr>
            </tbody>
          </table>
          <p className="ab-sim__insight">
            Hypothetical read: athlete expression outperformed wide action on CTR.
            Creative decision — prioritize subject-led thumbnails for THE PLAYER while
            continuing to test action crops on GAME DAY.
          </p>
        </div>
      </div>
    </section>
  );
}
