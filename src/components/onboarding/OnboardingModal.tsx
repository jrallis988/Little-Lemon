import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { pathwayOptions } from "../../data/futureProducts";
import { recommendPlan } from "../../data/plans";
import { Modal } from "../ui/Modal";

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

type Step = "welcome" | "goal" | "priorities" | "structure" | "result";

type OnboardingModalProps = {
  open: boolean;
  onClose: () => void;
};

export function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState<Step>("welcome");
  const [pathway, setPathway] = useState<(typeof pathwayOptions)[number]["id"]>("strength");
  const [matters, setMatters] = useState<string[]>(["Strength", "Consistency"]);
  const [structure, setStructure] =
    useState<(typeof structureOptions)[number]["id"]>("balanced");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setStep("welcome");
    setPathway("strength");
    setMatters(["Strength", "Consistency"]);
    setStructure("balanced");
    setError(null);
  }, [open]);

  const selectedPathway = pathwayOptions.find((item) => item.id === pathway)!;
  const plan = useMemo(() => recommendPlan(pathway), [pathway]);
  const structureLabel = structureOptions.find((item) => item.id === structure)?.label;

  const toggleMatter = (item: string) => {
    setError(null);
    setMatters((current) => {
      if (current.includes(item)) return current.filter((value) => value !== item);
      if (current.length >= 3) return current;
      return [...current, item];
    });
  };

  const stepIndex = ["welcome", "goal", "priorities", "structure", "result"].indexOf(step);

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={
        step === "welcome"
          ? "Start your journey"
          : step === "goal"
            ? "Choose your Pathway"
            : step === "priorities"
              ? "What matters most?"
              : step === "structure"
                ? "How much structure?"
                : "Your personalized match"
      }
      description={
        step === "result"
          ? "Concept demo — recommendations map to the plan matrix and interactive prototypes."
          : "Step-by-step onboarding wired to WW Pathways and the plan matrix."
      }
    >
      <div className="mb-5 flex items-center gap-1.5" aria-label={`Step ${stepIndex + 1} of 5`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === stepIndex ? "w-6 bg-cobalt-600" : index < stepIndex ? "w-3 bg-tide" : "w-1.5 bg-ink/15"
            }`}
          />
        ))}
      </div>

      {step === "welcome" && (
        <div className="space-y-4">
          <p className="font-serif text-lg leading-relaxed text-ink/75">
            63 years taught us something: there is no single way to get healthy. Answer a few
            questions and we’ll match you to a concept plan—and show you where it lives in WW Life.
          </p>
          <button
            type="button"
            onClick={() => setStep("goal")}
            className="h-11 w-full rounded-2xl bg-cobalt-600 font-sans text-sm font-semibold text-white hover:bg-cobalt-700"
          >
            Build my Pathway
          </button>
          <Link
            to="/find-your-year"
            onClick={onClose}
            className="block text-center font-sans text-sm font-semibold text-cobalt-700"
          >
            Or find your year in WW history →
          </Link>
        </div>
      )}

      {step === "goal" && (
        <div className="space-y-3">
          {pathwayOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setPathway(option.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                pathway === option.id
                  ? "border-cobalt-500 bg-cobalt-600 text-white"
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
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep("welcome")}
              className="h-11 flex-1 rounded-2xl border border-ink/10 font-sans text-sm font-semibold text-ink"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep("priorities")}
              className="h-11 flex-[2] rounded-2xl bg-cobalt-600 font-sans text-sm font-semibold text-white"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === "priorities" && (
        <div className="space-y-4">
          <p className="font-sans text-sm text-ink/60">Pick up to 3 priorities.</p>
          {error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 font-sans text-xs font-semibold text-red-800" role="alert">
              {error}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {priorities.map((item) => {
              const on = matters.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleMatter(item)}
                  className={`rounded-full px-3 py-2 font-sans text-xs font-semibold ${
                    on ? "bg-cobalt-600 text-white" : "border border-ink/10 bg-white text-ink/70"
                  }`}
                  aria-pressed={on}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep("goal")}
              className="h-11 flex-1 rounded-2xl border border-ink/10 font-sans text-sm font-semibold text-ink"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                if (matters.length === 0) {
                  setError("Choose at least one priority.");
                  return;
                }
                setStep("structure");
              }}
              className="h-11 flex-[2] rounded-2xl bg-cobalt-600 font-sans text-sm font-semibold text-white"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === "structure" && (
        <div className="space-y-3">
          {structureOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setStructure(option.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left ${
                structure === option.id ? "border-cobalt-500 bg-mist" : "border-ink/10 bg-white"
              }`}
              aria-pressed={structure === option.id}
            >
              <span className="block font-display text-base font-bold text-ink" style={{ fontWeight: 700 }}>
                {option.label}
              </span>
              <span className="mt-1 block font-sans text-xs text-ink/60">{option.copy}</span>
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep("priorities")}
              className="h-11 flex-1 rounded-2xl border border-ink/10 font-sans text-sm font-semibold text-ink"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep("result")}
              className="h-11 flex-[2] rounded-2xl bg-cobalt-600 font-sans text-sm font-semibold text-white"
            >
              See my match
            </button>
          </div>
        </div>
      )}

      {step === "result" && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-ink p-5 text-white">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-tide">
              Your Pathway
            </p>
            <p className="mt-2 font-display text-2xl font-bold" style={{ fontWeight: 700 }}>
              {selectedPathway.name}
            </p>
            <p className="mt-2 font-sans text-sm text-white/70">
              Structure: {structureLabel}. Priorities: {matters.join(", ")}.
            </p>
          </div>
          <div className="rounded-2xl border border-cobalt-200 bg-mist/60 p-5">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cobalt-600">
              Recommended concept plan
            </p>
            <p className="mt-2 font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
              {plan.name}
            </p>
            <p className="mt-1 font-sans text-sm font-semibold text-cobalt-700">{plan.price}</p>
            <p className="mt-2 font-sans text-sm text-ink/65">{plan.tagline}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              to="/whats-next#guided-journey"
              onClick={onClose}
              className="flex h-11 items-center justify-center rounded-2xl bg-cobalt-600 font-sans text-sm font-semibold text-white"
            >
              Try guided journey
            </Link>
            <Link
              to="/#plan-matrix"
              onClick={onClose}
              className="flex h-11 items-center justify-center rounded-2xl border border-ink/10 font-sans text-sm font-semibold text-ink"
            >
              Compare all plans
            </Link>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full font-sans text-sm font-semibold text-ink/50"
          >
            Close and keep exploring
          </button>
        </div>
      )}
    </Modal>
  );
}
