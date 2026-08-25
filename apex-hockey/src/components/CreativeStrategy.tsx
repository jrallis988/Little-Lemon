export function CreativeStrategy() {
  return (
    <section className="section strategy" id="strategy" aria-labelledby="strategy-title">
      <div className="section__inner">
        <p className="section__eyebrow">Creative Strategy</p>
        <div className="grid-2 strategy__grid">
          <div>
            <h2 id="strategy-title" className="section__title">
              Own the release window.
            </h2>
            <p className="section__lead">
              The challenge: introduce a new performance hockey stick into a crowded equipment
              market where brand loyalty runs deep and product claims sound interchangeable.
            </p>
          </div>
          <div className="strategy__idea">
            <p className="strategy__label">Central Creative Idea</p>
            <p className="display-lg strategy__concept">RELEASE FASTER.</p>
            <p>
              Communicate the split second between recognizing an opening and releasing the puck —
              the moment where games tilt and hesitation costs everything.
            </p>
          </div>
        </div>

        <div className="strategy__lang">
          <h3 className="headline">Visual Language</h3>
          <ul className="strategy__chips" role="list">
            {[
              "Strong condensed typography",
              "Oversized numbers",
              "Tightly cropped athlete imagery",
              "Dynamic compositions",
              "Directional graphics",
              "Speed-inspired treatments",
              "High contrast",
              "Purposeful negative space",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="strategy__avoid">
            Intentionally avoided: unnecessary gradients, excessive glow, and generic futuristic UI
            styling that drifts into esports territory.
          </p>
        </div>
      </div>
    </section>
  );
}
