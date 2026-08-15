import { useState } from "react";
import { Link } from "react-router-dom";

const needs = [
  {
    id: "safe-space",
    title: "Find a safe space",
    copy: "Drop-in rooms and chill zones where you can land without explaining everything.",
    result:
      "Start with a Neighborhood Resource Hub drop-in. No appointment. No fees. You can leave whenever you want.",
    cta: { label: "Browse hubs", to: "/hubs" },
  },
  {
    id: "mentor",
    title: "Connect with a mentor",
    copy: "Talk with someone who listens first and helps you think through what’s next.",
    result:
      "Mentorship circles and peer leaders are ready when you are. Completely confidential and voluntary.",
    cta: { label: "See youth leadership", to: "/leadership" },
  },
  {
    id: "stability",
    title: "Navigate housing or stability",
    copy: "Get practical help mapping housing, school, work, or family resource options.",
    result:
      "Stability navigation walks you through real options—without trapping you in paperwork.",
    cta: { label: "Find a guidance hub", to: "/hubs" },
  },
];

const guarantees = [
  "Free",
  "Confidential",
  "Voluntary",
  "Zero institutional paperwork traps",
];

function GetSupportPage() {
  const [step, setStep] = useState(1);
  const [needId, setNeedId] = useState(null);
  const [ready, setReady] = useState(false);

  const selected = needs.find((need) => need.id === needId);

  return (
    <>
      <section className="border-b border-paper-line bg-paper pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="container">
          <p className="eyebrow-accent">Find your track</p>
          <h1 className="display mt-5 max-w-4xl text-4xl md:text-6xl">
            What do you need right now?
          </h1>
          <p className="lede mt-5 max-w-2xl">
            A low-friction 3-step guide. No judgment. No red tape. You stay in
            control the whole way.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {guarantees.map((item) => (
              <span
                key={item}
                className="border border-paper-line bg-paper-soft px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft"
              >
                {item}
              </span>
            ))}
          </div>

          <ol className="mt-10 flex gap-3 font-body text-sm uppercase tracking-[0.14em]">
            {[1, 2, 3].map((n) => (
              <li
                key={n}
                className={`border px-3 py-2 ${
                  step === n
                    ? "border-violet bg-violet/5 text-violet"
                    : step > n
                      ? "border-paper-line bg-paper-soft text-charcoal-deep"
                      : "border-paper-line text-charcoal-soft"
                }`}
              >
                Step {n}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-paper-soft">
        <div className="container max-w-4xl">
          {step === 1 && (
            <div>
              <h2 className="display text-3xl md:text-4xl">
                Choose what fits today
              </h2>
              <div className="mt-8 grid gap-4">
                {needs.map((need) => (
                  <button
                    key={need.id}
                    type="button"
                    onClick={() => setNeedId(need.id)}
                    className={`border p-6 text-left transition ${
                      needId === need.id
                        ? "border-violet bg-violet/5 shadow-card"
                        : "border-paper-line bg-paper-soft hover:border-violet/40"
                    }`}
                  >
                    <span className="font-display text-xl font-semibold text-charcoal-deep">
                      {need.title}
                    </span>
                    <p className="mt-2 font-body text-charcoal">{need.copy}</p>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="btn-primary mt-8"
                disabled={!needId}
                onClick={() => needId && setStep(2)}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="display text-3xl md:text-4xl">
                The no-judgment guarantee
              </h2>
              <p className="lede mt-5">
                Civic Bound support is free, confidential, and voluntary. You
                don’t have to prove anything. You don’t have to finish a stack of
                forms to be welcome.
              </p>
              <ul className="mt-8 space-y-3">
                {guarantees.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-chartreuse pl-4 font-body text-charcoal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <label className="mt-8 flex items-start gap-3 font-body text-charcoal">
                <input
                  type="checkbox"
                  checked={ready}
                  onChange={(e) => setReady(e.target.checked)}
                  className="mt-1 accent-violet"
                />
                <span>
                  I understand this is voluntary support—and I can stop anytime.
                </span>
              </label>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  disabled={!ready}
                  onClick={() => ready && setStep(3)}
                >
                  Show my next step
                </button>
              </div>
            </div>
          )}

          {step === 3 && selected && (
            <div>
              <h2 className="display text-3xl md:text-4xl">
                Your track: {selected.title}
              </h2>
              <p className="lede mt-5">{selected.result}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={selected.cta.to} className="btn-primary">
                  {selected.cta.label}
                </Link>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => {
                    setStep(1);
                    setReady(false);
                  }}
                >
                  Start over
                </button>
              </div>
              <p className="mt-10 border-t border-paper-line pt-6 font-body text-sm text-charcoal-soft">
                Prefer to talk with a person first? Visit a hub drop-in or browse{" "}
                <Link to="/stories" className="text-violet hover:underline">
                  community stories
                </Link>{" "}
                to see how others found their footing.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default GetSupportPage;
