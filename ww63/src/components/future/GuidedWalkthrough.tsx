import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { WwKitchenFlow } from "./WwKitchenFlow";
import { WwLifeFlow } from "./WwLifeFlow";
import { WwPathwaysFlow, type PathwaySummary } from "./WwPathwaysFlow";

const phases = [
  {
    id: "pathways",
    label: "Pathways",
    title: "Choose your Pathway",
    copy: "Start with the goal that fits this season of life.",
  },
  {
    id: "life",
    label: "WW Life",
    title: "See Today adapt",
    copy: "Your dashboard prioritizes the focus areas that came from your Pathway.",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    title: "Connect food to the plan",
    copy: "Meals and shopping support those preferences without moralizing food.",
  },
] as const;

type PhaseId = (typeof phases)[number]["id"] | "done";

type GuidedWalkthroughProps = {
  compact?: boolean;
  id?: string;
};

export function GuidedWalkthrough({
  compact = false,
  id = "guided-journey",
}: GuidedWalkthroughProps) {
  const [phase, setPhase] = useState<PhaseId>("pathways");
  const [summary, setSummary] = useState<PathwaySummary | null>(null);

  const phaseIndex = useMemo(() => {
    if (phase === "done") return phases.length;
    return phases.findIndex((item) => item.id === phase);
  }, [phase]);

  const activeMeta = phase === "done" ? null : phases[phaseIndex];

  const restart = () => {
    setSummary(null);
    setPhase("pathways");
  };

  return (
    <section
      id={id}
      className="rounded-[2rem] border border-ink/8 bg-white p-5 sm:p-8"
      aria-labelledby={`${id}-heading`}
    >
      <div className={compact ? "" : "lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-10"}>
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
            Signature journey
          </p>
          <h3
            id={`${id}-heading`}
            className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            style={{ fontWeight: 700 }}
          >
            Try the full path
          </h3>
          <p className="mt-3 max-w-xl font-serif text-lg leading-relaxed text-ink/65">
            One continuous demo: Pathways → WW Life Today → Kitchen. Your choices carry forward.
          </p>

          <ol className="mt-8 space-y-3" aria-label="Guided journey steps">
            {phases.map((item, index) => {
              const done = phaseIndex > index || phase === "done";
              const current = phase === item.id;
              return (
                <li
                  key={item.id}
                  className={`rounded-2xl border px-4 py-3 transition ${
                    current
                      ? "border-cobalt-500 bg-mist"
                      : done
                        ? "border-tide/40 bg-tide/5"
                        : "border-ink/8 bg-cloud/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold ${
                        current
                          ? "bg-cobalt-600 text-white"
                          : done
                            ? "bg-tide text-ink"
                            : "bg-white text-ink/45"
                      }`}
                    >
                      {done && !current ? "✓" : index + 1}
                    </span>
                    <div>
                      <p className="font-display text-base font-bold text-ink" style={{ fontWeight: 700 }}>
                        {item.label}
                      </p>
                      <p className="mt-1 font-sans text-sm text-ink/60">{item.copy}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {summary ? (
            <p className="mt-6 font-sans text-sm text-ink/60">
              Carrying forward: <span className="font-semibold text-ink">{summary.pathway}</span>
              {summary.matters.length
                ? ` · ${summary.matters.slice(0, 2).join(", ")}`
                : null}
            </p>
          ) : null}

          {activeMeta ? (
            <p className="mt-4 font-sans text-sm font-semibold text-cobalt-700">
              Now: {activeMeta.title}
            </p>
          ) : (
            <div className="mt-6 space-y-3">
              <p className="font-serif text-xl text-ink/80">
                You’ve walked the connected product story—goal, daily life, and real kitchen.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={restart}
                  className="rounded-2xl bg-cobalt-600 px-5 py-3 font-sans text-sm font-semibold text-white"
                >
                  Replay journey
                </button>
                <Link
                  to="/whats-next"
                  className="rounded-2xl border border-ink/10 px-5 py-3 font-sans text-sm font-semibold text-ink"
                >
                  Explore all prototypes
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className={`${compact ? "mt-8" : "mt-8 lg:mt-0"} flex justify-center`}>
          {phase === "pathways" && (
            <WwPathwaysFlow
              completeLabel="Open WW Life Today"
              onComplete={(next) => {
                setSummary(next);
                setPhase("life");
              }}
            />
          )}
          {phase === "life" && (
            <WwLifeFlow
              initialStep={3}
              focusPreset={summary?.lifeFocus}
              pathwayLabel={summary?.pathway}
              continueLabel="Plan meals in Kitchen"
              onContinueJourney={() => setPhase("kitchen")}
            />
          )}
          {phase === "kitchen" && (
            <WwKitchenFlow
              initialStep="planner"
              pathwayLabel={summary?.pathway}
              completeLabel="Complete journey"
              onJourneyComplete={() => setPhase("done")}
            />
          )}
          {phase === "done" && (
            <div className="flex w-full max-w-[22rem] flex-col justify-center rounded-[2rem] border border-ink/10 bg-ink px-6 py-10 text-center text-white shadow-glow animate-rise">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-tide">
                Journey complete
              </p>
              <p className="mt-4 font-display text-3xl font-bold" style={{ fontWeight: 700 }}>
                Built around you
              </p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-white/75">
                {summary?.pathway ?? "Your Pathway"} shaped Today, and Kitchen followed the same
                priorities.
              </p>
              <button
                type="button"
                onClick={restart}
                className="mt-8 rounded-2xl bg-white px-5 py-3 font-sans text-sm font-semibold text-ink"
              >
                Start again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
