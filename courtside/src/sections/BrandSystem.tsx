import { Logo } from "../components/Logo";
import { photos } from "../data/brand";
import "./BrandSystem.css";

const colors = [
  { name: "Court Orange", hex: "#FF3B00", varName: "--cs-orange" },
  { name: "Ink", hex: "#0E0E10", varName: "--cs-ink" },
  { name: "Signal", hex: "#B8FF3C", varName: "--cs-signal" },
  { name: "Paper", hex: "#F7F7F5", varName: "--cs-paper" },
  { name: "Fog", hex: "#8A8A90", varName: "--cs-fog" },
];

const motion = [
  "Fast cuts over long logo stings",
  "Snap entrances, short holds",
  "Accent bar leads type",
  "Numbers reveal with weight, not bounce",
  "Transitions under 0.5s",
];

export function BrandSystem() {
  return (
    <section className="section section--dark" id="brand">
      <div className="wrap">
        <p className="section__eyebrow">01 · Visual Identity</p>
        <h2 className="section__title">Brand System</h2>
        <p className="section__lede">
          Athletic, editorial, energetic, premium, contemporary — built for
          basketball photography, not esports chrome or generic creator kits.
        </p>

        <div className="brand-row">
          <div className="brand-block">
            <h3 className="brand-block__h">Logo / Wordmark</h3>
            <div className="brand-logo-stack">
              <Logo inverted />
              <Logo variant="mark" inverted />
              <Logo variant="wordmark" inverted />
            </div>
            <p className="asset-note">Replaceable Illustrator export · /assets/brand/</p>
          </div>
          <div className="brand-block">
            <h3 className="brand-block__h">Typography</h3>
            <p className="type-sample type-sample--display">BARLOW CONDENSED</p>
            <p className="type-sample type-sample--brand">Syne · Brand</p>
            <p className="type-sample type-sample--body">
              Manrope for body, captions, and supporting editorial copy.
            </p>
            <p className="type-note">
              Numbers and athlete names carry the visual weight. Keep supporting
              copy short.
            </p>
          </div>
        </div>

        <div className="brand-row brand-row--colors">
          <div className="brand-block">
            <h3 className="brand-block__h">Color</h3>
            <div className="swatches">
              {colors.map((c) => (
                <div key={c.hex} className="swatch">
                  <span
                    className="swatch__chip"
                    style={{ background: c.hex }}
                    aria-hidden="true"
                  />
                  <strong>{c.name}</strong>
                  <span>{c.hex}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="brand-block">
            <h3 className="brand-block__h">Photography</h3>
            <div className="photo-treat">
              <img src={photos.athletePortrait} alt="Athlete portrait treatment" />
              <ul>
                <li>Subject-first cropping</li>
                <li>High contrast, controlled saturation</li>
                <li>Directional grade for video overlays</li>
                <li>Emotion over spectacle</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="brand-row">
          <div className="brand-block">
            <h3 className="brand-block__h">Graphic Elements</h3>
            <div className="gfx-demo">
              <span className="gfx-bar" />
              <span className="gfx-rule" />
              <span className="gfx-chip">CS</span>
              <span className="gfx-num num-display">27.4</span>
            </div>
            <p className="type-note">
              Accent bars, court-line rules, compressed marks, oversized stats.
            </p>
          </div>
          <div className="brand-block">
            <h3 className="brand-block__h">Motion Principles</h3>
            <ul className="motion-list">
              {motion.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
