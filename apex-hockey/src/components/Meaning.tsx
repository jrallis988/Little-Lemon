import { brand, meaning } from "../data/content";

export function Meaning() {
  return (
    <section className="section meaning" id="meaning" aria-labelledby="meaning-title">
      <div className="section__inner">
        <p className="section__eyebrow">01 — What APEX Means</p>
        <h2 id="meaning-title" className="section__title">
          {brand.thesis}
        </h2>
        <p className="section__lead">
          APEX is not a vibe. It is the peak moment in a shift — named so players can train it,
          measure it, and claim it.
        </p>

        <dl className="meaning__grid">
          <div>
            <dt>What is APEX?</dt>
            <dd>{meaning.what}</dd>
          </div>
          <div>
            <dt>Who is it for?</dt>
            <dd>{meaning.who}</dd>
          </div>
          <div>
            <dt>Problem / opportunity</dt>
            <dd>{meaning.problem}</dd>
          </div>
          <div>
            <dt>Why care?</dt>
            <dd>{meaning.care}</dd>
          </div>
          <div className="meaning__ask">
            <dt>What does APEX ask you to do?</dt>
            <dd>
              <strong className="meaning__ask-line">{brand.ask}</strong>
              <span>{meaning.ask}</span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
