import { brand } from "../data/content";

/** Strategy section tying insight → system reasoning */
export function CreativeStrategy() {
  return (
    <section className="section strategy" id="strategy" aria-labelledby="strategy-title">
      <div className="section__inner">
        <p className="section__eyebrow">10 — Strategy Connected to Creative</p>
        <h2 id="strategy-title" className="section__title">
          Design decisions with reasons.
        </h2>
        <p className="section__lead">
          Every major choice traces back to the apex insight — not “it looks athletic.”
        </p>

        <ul className="strategy__reasons">
          <li>
            <h3>Typography</h3>
            <p>
              Type accelerates, cuts, stops, and resets because a shift is built from those
              physical beats — not because condensed fonts feel sporty.
            </p>
          </li>
          <li>
            <h3>Blue line color</h3>
            <p>
              Blue Line is the primary brand signal because it marks territory and direction on the
              rink — authority, not generic aggression.
            </p>
          </li>
          <li>
            <h3>Impact red</h3>
            <p>
              Impact appears only at stops and collisions — like the red line — so it means
              something when it shows up.
            </p>
          </li>
          <li>
            <h3>Rink geometry</h3>
            <p>
              Creases, faceoff circles, and trajectories control crops and grids. They are
              structural, not hockey stickers on a template.
            </p>
          </li>
          <li>
            <h3>Product line</h3>
            <p>
              {brand.line} is the stick promise inside the larger ask — {brand.ask} — so product
              and campaign behavior stay connected.
            </p>
          </li>
          <li>
            <h3>Volt accent</h3>
            <p>
              Volt marks speed and claim moments (CTAs, Apex Marks) — high visibility without
              drifting into esports glow.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
