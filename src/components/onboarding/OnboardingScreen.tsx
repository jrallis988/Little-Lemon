import { Button } from "@/components/ui/button";
import { ALL_GRADES, type GradeLevel } from "@/types/mail";
import { useMailStore } from "@/store/mailStore";
import { useState } from "react";

export function OnboardingScreen() {
  const completeOnboarding = useMailStore((s) => s.completeOnboarding);
  const settings = useMailStore((s) => s.settings);
  const [grade, setGrade] = useState<GradeLevel>(settings.defaultGrade);

  return (
    <div className="flex h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-panel">
        <p className="font-serif text-3xl font-semibold text-primary">Mailbox</p>
        <p className="mt-4 text-base text-muted-foreground">
          School email. Grade:
        </p>
        <div className="mt-3 grid grid-cols-6 gap-1 rounded-xl bg-muted/80 p-2">
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
        <div className="mt-8 flex justify-end">
          <Button type="button" onClick={() => void completeOnboarding(grade)}>
            Open
          </Button>
        </div>
      </div>
    </div>
  );
}
