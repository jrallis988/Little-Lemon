import { Button } from "@/components/ui/button";
import { ALL_GRADES, bandLabelForGrade, type GradeLevel } from "@/types/mail";
import { useMailStore } from "@/store/mailStore";
import { useState } from "react";

const STEPS = [
  {
    title: "Mailbox is school correspondence",
    body: "You will read and write email the way it is used in class: a clear audience, a precise subject, and complete sentences.",
  },
  {
    title: "Approved contacts first",
    body: "Safe Contacts are the people your teacher has approved. Unknown senders are a chance to practice digital citizenship — not a reason to click.",
  },
  {
    title: "Teachers review when needed",
    body: "Some classes require teacher approval before a message is sent. That is part of learning responsible communication, not a restriction on writing.",
  },
];

export function OnboardingScreen() {
  const completeOnboarding = useMailStore((s) => s.completeOnboarding);
  const settings = useMailStore((s) => s.settings);
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState<GradeLevel>(settings.defaultGrade);

  const isLast = step === STEPS.length - 1;

  return (
    <div className="flex h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 shadow-panel animate-fade-up">
        <p className="font-serif text-3xl font-semibold text-primary">Mailbox</p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Step {step + 1} of {STEPS.length} · Digital citizenship
        </p>
        <h1 className="mt-4 font-serif text-2xl font-semibold text-foreground">
          {STEPS[step].title}
        </h1>
        <p className="mt-2 text-base font-medium leading-relaxed text-muted-foreground">
          {STEPS[step].body}
        </p>

        {isLast && (
          <div className="mt-6 space-y-2">
            <p className="text-sm font-semibold text-foreground">Grade level</p>
            <div className="grid grid-cols-6 gap-1 rounded-xl bg-muted/80 p-2">
              {ALL_GRADES.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setGrade(value)}
                  className={`rounded-lg py-2 text-xs font-semibold ${
                    grade === value
                      ? "bg-card text-foreground shadow-sm ring-1 ring-primary/25"
                      : "text-muted-foreground hover:bg-card/70"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              Grade {grade} · {bandLabelForGrade(grade)}
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          {isLast ? (
            <Button type="button" onClick={() => void completeOnboarding(grade)}>
              Enter classroom
            </Button>
          ) : (
            <Button type="button" onClick={() => setStep((s) => s + 1)}>
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
