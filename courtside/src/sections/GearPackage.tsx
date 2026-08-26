import { EndScreenPreview } from "../components/EndScreenPreview";
import { VideoFrame } from "../components/VideoFrame";
import { YouTubeThumbnail } from "../components/YouTubeThumbnail";
import { photos, thumbnails } from "../data/brand";
import "./Packages.css";
import "./GearPackage.css";

export function GearPackage() {
  return (
    <section className="section" id="gear">
      <div className="wrap">
        <p className="section__eyebrow">Culture / Gear mode</p>
        <h2 className="section__title">Editorial Review Format</h2>
        <p className="section__lede">
          Reusable components for sneakers, apparel, and equipment — ratings,
          categories, pros/cons, athlete testing, and a final score.
        </p>

        <div className="pkg-grid">
          <YouTubeThumbnail concept={thumbnails[6]} showCategory />
          <VideoFrame photo={photos.gearSneaker} label="Product introduction">
            <div className="pkg-open">
              <span className="series-tag" style={{ color: "var(--series-gear)" }}>
                GEAR
              </span>
              <strong className="pkg-open__name">DOES IT ACTUALLY MAKE A DIFFERENCE?</strong>
            </div>
          </VideoFrame>
        </div>

        <div className="gear-cats">
          {[
            { k: "Traction", v: 9.1 },
            { k: "Cushion", v: 8.4 },
            { k: "Lockdown", v: 8.8 },
            { k: "Durability", v: 7.9 },
            { k: "Weight", v: 8.2 },
          ].map((c) => (
            <div key={c.k} className="gear-cat">
              <span>{c.k}</span>
              <strong className="num-display">{c.v.toFixed(1)}</strong>
              <div className="gear-cat__bar">
                <i style={{ width: `${c.v * 10}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="pkg-grid pkg-grid--3" style={{ marginTop: "1.25rem" }}>
          <VideoFrame photo={photos.gearSneaker} label="Feature callout">
            <div className="gear-feature">
              <strong>Cushion stack</strong>
              <span>Responsive on plant. Stable on cut.</span>
            </div>
          </VideoFrame>
          <VideoFrame photo={photos.athleteYouth} label="Athlete testing">
            <div className="lab-stack" style={{ position: "absolute", left: "6%", bottom: "12%" }}>
              <div className="lab-card" style={{ borderLeftColor: "var(--series-gear)" }}>
                <span>ON-COURT TEST</span>
                <strong>Cho · 3 sessions · full practices</strong>
              </div>
            </div>
          </VideoFrame>
          <VideoFrame label="Final score">
            <div className="gd-score">
              <span>COURTSIDE SCORE</span>
              <strong style={{ color: "var(--cs-signal)" }}>8.4</strong>
              <span>PERFORMANCE</span>
            </div>
          </VideoFrame>
        </div>

        <div className="gear-pros" style={{ marginTop: "1.25rem" }}>
          <article>
            <h4>Pros</h4>
            <ul>
              <li>Lockdown lateral support</li>
              <li>Court feel without harsh impact</li>
              <li>Durable outsole pattern</li>
            </ul>
          </article>
          <article>
            <h4 className="cons">Cons</h4>
            <ul>
              <li>Break-in needed on collar</li>
              <li>Wide feet may size up</li>
              <li>Premium price tier</li>
            </ul>
          </article>
        </div>

        <div className="pkg-grid" style={{ marginTop: "1.25rem" }}>
          <VideoFrame photo={photos.gearSneaker} label="Comparison result">
            <div className="gd-match">
              <span>MODEL A</span>
              <em>8.4</em>
              <span>MODEL B</span>
            </div>
          </VideoFrame>
          <EndScreenPreview layout="next" nextTitle="GEAR · Traction Test" />
        </div>
      </div>
    </section>
  );
}
