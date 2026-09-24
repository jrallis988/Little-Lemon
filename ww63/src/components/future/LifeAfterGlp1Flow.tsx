import { useMemo, useState } from "react";
import {
  AppShell,
  PrimaryButton,
  SecondaryButton,
  SoftCard,
  StepDots,
} from "./AppShell";

const stages = [
  {
    id: "using",
    label: "Currently using GLP-1 support",
    focus: ["Nutrition", "Protein", "Strength", "Habits", "Care team coordination"],
  },
  {
    id: "maintenance",
    label: "Planning long-term maintenance with my care team",
    focus: ["Nutrition", "Protein", "Strength", "Habits", "Weight stability", "Support"],
  },
  {
    id: "transitioning",
    label: "Transitioning under medical guidance",
    focus: ["Protein", "Strength", "Movement", "Coach check-ins", "Habit continuity"],
  },
  {
    id: "after",
    label: "No longer using medication",
    focus: ["Sustainable nutrition", "Strength", "Community", "Maintenance routines"],
  },
] as const;

type Step = 0 | 1 | 2;

export function LifeAfterGlp1Flow() {
  const [step, setStep] = useState<Step>(0);
  const [stage, setStage] = useState<(typeof stages)[number]["id"]>("maintenance");
  const selected = stages.find((item) => item.id === stage)!;

  const plan = useMemo(
    () => [
      { label: "Weekly movement", value: "5 active days" },
      { label: "Strength sessions", value: "3 / week" },
      { label: "Meal structure", value: "Protein-forward plates" },
      { label: "Coach check-in", value: "Thursday" },
      { label: "Clinical follow-up", value: "Reminder only · your clinician decides care" },
    ],
    []
  );

  return (
    <AppShell title="Life After GLP-1" activeNav="progress">
      <StepDots step={step} total={3} />

      {step === 0 && (
        <div className="space-y-4">
          <SoftCard className="bg-ink text-white">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-tide">
              Concept · Educational
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold" style={{ fontWeight: 700 }}>
              Your health journey doesn’t end with medication.
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-white/75">
              Medication can be one part of a longer journey. Weight Watchers can continue supporting
              nutrition, strength, habits, and long-term maintenance.
            </p>
          </SoftCard>
          <p className="font-sans text-xs leading-relaxed text-ink/50">
            This prototype never suggests changing dosage or stopping medication. Clinical decisions
            belong with your healthcare professional.
          </p>
          <PrimaryButton onClick={() => setStep(1)}>Choose Where You Are</PrimaryButton>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
            Choose where you are
          </h3>
          <div className="space-y-2">
            {stages.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setStage(item.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left font-sans text-sm font-semibold ${
                  stage === item.id
                    ? "border-cobalt-500 bg-cobalt-600 text-white"
                    : "border-ink/10 bg-white text-ink/75"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <SoftCard>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.14em] text-ink/40">
              Personalized focus
            </p>
            <ul className="mt-2 space-y-1">
              {selected.focus.map((item) => (
                <li key={item} className="font-sans text-sm text-ink/70">
                  · {item}
                </li>
              ))}
            </ul>
          </SoftCard>
          <PrimaryButton onClick={() => setStep(2)}>Build My Maintenance Plan</PrimaryButton>
          <SecondaryButton onClick={() => setStep(0)}>Back</SecondaryButton>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <SoftCard className="bg-ink text-white">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-tide">
              My Maintenance Plan
            </p>
            <p className="mt-2 font-display text-2xl font-bold" style={{ fontWeight: 700 }}>
              {selected.label}
            </p>
          </SoftCard>
          <div className="space-y-2">
            {plan.map((item) => (
              <SoftCard key={item.label}>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.12em] text-ink/40">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-base font-bold text-ink" style={{ fontWeight: 700 }}>
                  {item.value}
                </p>
              </SoftCard>
            ))}
          </div>
          <PrimaryButton onClick={() => setStep(0)}>Restart concept demo</PrimaryButton>
          <SecondaryButton onClick={() => setStep(1)}>Adjust stage</SecondaryButton>
        </div>
      )}
    </AppShell>
  );
}
