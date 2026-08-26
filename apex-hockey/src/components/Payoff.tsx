import { brand, payoff } from "../data/content";

export function Payoff() {
  return (
    <section className="section payoff" id="payoff" aria-labelledby="payoff-title">
      <div className="section__inner">
        <p className="section__eyebrow">03 — Campaign Payoff</p>
        <h2 id="payoff-title" className="section__title">
          {payoff.name}.
        </h2>
        <p className="section__lead">{payoff.summary}</p>

        <div className="payoff__ask-banner">
          <p className="payoff__ask">{brand.ask}</p>
          <p className="payoff__mono">1.8 SEC · APEX MARK · PERSONAL BEST</p>
        </div>

        <ol className="payoff__steps">
          {payoff.steps.map((step, i) => (
            <li key={step.title}>
              <span className="payoff__n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>

        <ul className="payoff__behaviors" aria-label="Campaign behaviors">
          {payoff.behaviors.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
