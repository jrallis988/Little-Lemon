import { Button } from "@/components/ui/button";
import { ALL_GRADES, bandLabelForGrade, type GradeLevel } from "@/types/mail";
import { useMailStore } from "@/store/mailStore";
import { useState } from "react";

const STEPS = [
  {
    title: "This is your Mailbox",
    body: "Inbox, Drafts, Sent, and Safe Contacts work like a real email app — introduced at the right pace for your grade.",
  },
  {
    title: "Safe Contacts keep school mail clear",
    body: "Verified and approved contacts help you know who is okay to message. Unknown senders get an extra caution.",
  },
  {
    title: "Teachers can guide when needed",
    body: "Depending on your class settings, a teacher may approve sends first. That keeps communication safe while you learn.",
  },
];

export function OnboardingScreen() {
  const completeOnboarding = useMailStore((s) => s.completeOnboarding);
  const settings = useMailStore((s) => s.settings);
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState<GradeLevel>(settings.defaultGrade);

  const isLast = step === STEPS.length - 1;

  return (
    <div className="flex h-screen items-center justify-center bg-nest-sky p-6">
      <div className="w-full max-w-xl rounded-[2rem] bg-card p-8 shadow-panel animate-fade-up">
        <p className="font-display text-3xl font-extrabold text-primary">
          Mailbox
        </p>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">
          Step {step + 1} of {STEPS.length}
        </p>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-foreground">
          {STEPS[step].title}
        </h1>
        <p className="mt-2 text-base font-medium leading-relaxed text-muted-foreground">
          {STEPS[step].body}
        </p>

        {isLast && (
          <div className="mt-6 space-y-2">
            <p className="text-sm font-bold text-foreground">Your grade</p>
            <div className="grid grid-cols-6 gap-1 rounded-2xl bg-muted/80 p-2">
              {ALL_GRADES.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setGrade(value)}
                  className={`rounded-xl py-2 text-xs font-bold ${
                    grade === value
                      ? "bg-card text-foreground shadow-sm ring-1 ring-primary/25"
                      : "text-muted-foreground hover:bg-card/70"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold text-muted-foreground">
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
            <Button
              type="button"
              variant="coral"
              onClick={() => void completeOnboarding(grade)}
            >
              Open Mailbox
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
