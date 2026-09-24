import { useMemo, useState } from "react";
import { pathwayOptions } from "../../data/futureProducts";
import {
  AppShell,
  PrimaryButton,
  SecondaryButton,
  SoftCard,
  StepDots,
  TextButton,
} from "./AppShell";
import { EmptyState, ErrorBanner } from "./PrototypePolish";
import { useToast } from "./useToast";

const priorities = [
  "More energy",
  "Better food choices",
  "Consistency",
  "Strength",
  "Confidence",
  "Support",
  "Long-term maintenance",
];

const structureOptions = [
  { id: "light", label: "A little guidance", copy: "Flexible prompts when you need them." },
  { id: "balanced", label: "A balanced plan", copy: "Clear rhythm without feeling boxed in." },
  { id: "structured", label: "A lot of structure", copy: "Detailed plans and frequent check-ins." },
] as const;

const pathwayFocus: Record<string, string[]> = {
  lose: ["Nutrition consistency", "Movement", "Habits", "Support"],
  maintain: ["Weight stability", "Habits", "Movement", "Progress beyond the scale"],
  eat: ["Protein", "Fiber", "Meal planning", "Kitchen routines"],
  strength: ["Protein", "Strength training", "Recovery", "Movement", "Progress beyond the scale"],
  glp1: ["Protein", "Strength", "Nutrition", "Care team support", "Habits"],
  living: ["Energy", "Movement", "Sleep", "Community"],
};

const focusLabels: Record<string, string[]> = {
  lose: ["Lose weight", "Eat better", "Build healthier habits"],
  maintain: ["Maintain weight", "Build healthier habits", "Improve energy"],
  eat: ["Eat better", "Improve energy", "Build healthier habits"],
  strength: ["Build strength", "Eat better", "Improve energy"],
  glp1: ["GLP-1 support", "Build strength", "Eat better"],
  living: ["General wellness", "Improve energy", "Build healthier habits"],
};

type Step = 0 | 1 | 2 | 3;

export type PathwaySummary = {
  pathwayId: (typeof pathwayOptions)[number]["id"];
  pathway: string;
  matters: string[];
  structure: string | undefined;
  focus: string[];
  lifeFocus: string[];
};

type WwPathwaysFlowProps = {
  onComplete?: (summary: PathwaySummary) => void;
  completeLabel?: string;
};

export function WwPathwaysFlow({
  onComplete,
  completeLabel = "Start My Pathway",
}: WwPathwaysFlowProps = {}) {
  const [step, setStep] = useState<Step>(0);
  const [pathway, setPathway] = useState<(typeof pathwayOptions)[number]["id"]>("strength");
  const [matters, setMatters] = useState<string[]>(["Strength", "Consistency"]);
  const [structure, setStructure] =
    useState<(typeof structureOptions)[number]["id"]>("balanced");
  const [priorityError, setPriorityError] = useState<string | null>(null);
  const { showToast, toastNode } = useToast();

  const selected = pathwayOptions.find((item) => item.id === pathway)!;
  const focus = pathwayFocus[pathway] ?? pathwayFocus.living;

  const summary = useMemo<PathwaySummary>(
    () => ({
      pathwayId: pathway,
      pathway: selected.name,
      matters,
      structure: structureOptions.find((item) => item.id === structure)?.label,
      focus,
      lifeFocus: focusLabels[pathway] ?? focusLabels.living,
    }),
    [focus, matters, pathway, selected.name, structure]
  );

  const toggleMatter = (item: string) => {
    setPriorityError(null);
    setMatters((current) => {
      if (current.includes(item)) return current.filter((value) => value !== item);
      if (current.length >= 3) {
        showToast("Pick up to 3 priorities", "info");
        return current;
      }
      return [...current, item];
    });
  };

  const continueFromPriorities = () => {
    if (matters.length === 0) {
      setPriorityError("Choose at least one priority to continue.");
      return;
    }
    setStep(2);
  };

  return (
    <AppShell title="WW Pathways" activeNav="profile" overlay={toastNode}>
      <StepDots step={step} total={4} />

      {step === 0 && (
        <div className="space-y-4 animate-rise">
          <div>
            <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
              What are you working toward?
            </h3>
            <p className="mt-1 font-sans text-sm text-ink/60">Your journey can change later.</p>
          </div>
          <div className="space-y-2">
            {pathwayOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setPathway(option.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  pathway === option.id
                    ? "border-cobalt-500 bg-cobalt-600 text-white scale-[1.01]"
                    : "border-ink/10 bg-white hover:border-cobalt-300"
                }`}
                aria-pressed={pathway === option.id}
              >
                <span className="block font-display text-base font-bold" style={{ fontWeight: 700 }}>
                  {option.name}
                </span>
                <span
                  className={`mt-1 block font-sans text-xs ${
                    pathway === option.id ? "text-white/80" : "text-ink/60"
                  }`}
                >
                  {option.copy}
                </span>
              </button>
            ))}
          </div>
          <PrimaryButton onClick={() => setStep(1)}>Continue</PrimaryButton>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4 animate-rise">
          <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
            What matters most right now?
          </h3>
          {matters.length === 0 ? (
            <EmptyState
              title="No priorities selected"
              copy="Tap up to three priorities so your pathway can personalize around you."
            />
          ) : null}
          {priorityError ? <ErrorBanner message={priorityError} /> : null}
          <div className="flex flex-wrap gap-2">
            {priorities.map((item) => {
              const on = matters.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleMatter(item)}
                  className={`rounded-full px-3 py-2 font-sans text-xs font-semibold transition ${
                    on ? "bg-cobalt-600 text-white" : "border border-ink/10 bg-white text-ink/70"
                  }`}
                  aria-pressed={on}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <PrimaryButton disabled={matters.length === 0} onClick={continueFromPriorities}>
            Continue
          </PrimaryButton>
          <SecondaryButton onClick={() => setStep(0)}>Back</SecondaryButton>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-rise">
          <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
            How much structure do you want?
          </h3>
          <div className="space-y-2">
            {structureOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setStructure(option.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  structure === option.id
                    ? "border-cobalt-500 bg-mist"
                    : "border-ink/10 bg-white hover:border-cobalt-300"
                }`}
                aria-pressed={structure === option.id}
              >
                <span className="block font-display text-base font-bold text-ink" style={{ fontWeight: 700 }}>
                  {option.label}
                </span>
                <span className="mt-1 block font-sans text-xs text-ink/60">{option.copy}</span>
              </button>
            ))}
          </div>
          <PrimaryButton onClick={() => setStep(3)}>See My Pathway</PrimaryButton>
          <SecondaryButton onClick={() => setStep(1)}>Back</SecondaryButton>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 animate-rise">
          <SoftCard className="bg-ink text-white">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-tide">
              Your Pathway
            </p>
            <p className="mt-2 font-display text-3xl font-bold" style={{ fontWeight: 700 }}>
              {summary.pathway}
            </p>
            <p className="mt-2 font-sans text-sm text-white/70">
              Structure: {summary.structure}. Priorities: {summary.matters.join(", ")}.
            </p>
          </SoftCard>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
              Recommended focus
            </p>
            <ul className="mt-2 space-y-2">
              {summary.focus.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-ink/8 bg-white px-4 py-3 font-sans text-sm text-ink/75"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <PrimaryButton
            onClick={() => {
              if (onComplete) {
                onComplete(summary);
                return;
              }
              showToast("Pathway saved for this demo");
              setStep(0);
            }}
          >
            {completeLabel}
          </PrimaryButton>
          <TextButton onClick={() => setStep(0)}>Change Pathway</TextButton>
        </div>
      )}
    </AppShell>
  );
}
