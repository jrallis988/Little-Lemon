import { Logo } from "../components/Logo";
import { colorRules, designModes, photos } from "../data/brand";
import "./BrandSystem.css";

const motion = [
  "Stings under 3 seconds — no long logo holds",
  "Accent bar leads type; type never floats alone",
  "Lime numbers snap in; cyan diagrams draw on",
  "Transitions under 0.5s; end cards leave YouTube UI clear",
];

export function BrandSystem() {
  return (
    <section className="section section--dark" id="brand">
      <div className="wrap">
        <p className="section__eyebrow">Visual identity</p>
        <h2 className="section__title">One brand. Four modes.</h2>
        <p className="section__lede">
          Consistency is recognition — not identical composition. Design modes
          shift surface, pacing, and graphic density while COURTSIDE stays obvious.
        </p>

        <div className="mode-grid">
          {designModes.map((m) => (
            <article key={m.id} className={`mode-card mode-card--${m.id}`}>
              <h3>{m.name}</h3>
              <p>{m.description}</p>
            </article>
          ))}
        </div>

        <div className="brand-row" style={{ marginTop: "2rem" }}>
          <div className="brand-block">
            <h3 className="brand-block__h">Logo / Wordmark</h3>
            <div className="brand-logo-stack">
              <Logo inverted />
              <Logo variant="mark" inverted />
              <Logo variant="wordmark" inverted />
            </div>
          </div>
          <div className="brand-block">
            <h3 className="brand-block__h">Typography</h3>
            <p className="type-sample type-sample--display">BARLOW CONDENSED</p>
            <p className="type-sample type-sample--brand">Syne · Brand</p>
            <p className="type-sample type-sample--body">
              Manrope for body. Numbers and names carry the weight.
            </p>
          </div>
        </div>

        <div className="brand-block" style={{ marginTop: "1.5rem" }}>
          <h3 className="brand-block__h">Accent color rules</h3>
          <p className="type-note" style={{ marginBottom: "1rem" }}>
            Orange stays primary. Secondary colors are functional — never
            decorative filler.
          </p>
          <div className="color-rules">
            {colorRules.map((c) => (
              <article key={c.hex} className="color-rule">
                <span
                  className="color-rule__swatch"
                  style={{ background: c.hex }}
                  aria-hidden="true"
                />
                <div>
                  <strong>
                    {c.name} · {c.hex}
                  </strong>
                  <span className="color-rule__role">{c.role}</span>
                  <p>{c.use}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="brand-row" style={{ marginTop: "1.75rem" }}>
          <div className="brand-block">
            <h3 className="brand-block__h">Photography range</h3>
            <div className="photo-range">
              <img src={photos.athleteWoman} alt="Woman athlete" />
              <img src={photos.soccerAthlete} alt="Soccer athlete" />
              <img src={photos.coachWoman} alt="Coach" />
              <img src={photos.crowdFans} alt="Fans" />
            </div>
            <p className="type-note" style={{ marginTop: "0.75rem" }}>
              Multiple athletes, genders, ages, sports, coaches, and crowds —
              not a single-player campaign.
            </p>
          </div>
          <div className="brand-block">
            <h3 className="brand-block__h">Motion principles</h3>
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
