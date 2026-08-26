import {
  DoodleBackdrop,
  MailboxLogo,
} from "@/components/brand/MailboxBrand";
import { Button } from "@/components/ui/button";
import { ALL_GRADES, type GradeLevel } from "@/types/mail";
import { useMailStore } from "@/store/mailStore";
import { useState } from "react";

export function OnboardingScreen() {
  const completeOnboarding = useMailStore((s) => s.completeOnboarding);
  const settings = useMailStore((s) => s.settings);
  const [grade, setGrade] = useState<GradeLevel>(settings.defaultGrade);

  return (
    <div className="doodle-bg relative flex h-screen items-center justify-center overflow-hidden p-6">
      <DoodleBackdrop />
      <div className="relative z-10 w-full max-w-lg rounded-[2rem] border-[3px] border-primary/15 bg-card p-8 shadow-panel animate-fade-up">
        <div className="flex flex-col items-center text-center">
          <MailboxLogo size={110} className="animate-float" />
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand">
            Welcome to Mailbox!
          </h1>
          <p className="mt-2 max-w-sm text-base font-bold text-muted-foreground">
            A safe place to learn, connect, and communicate.
          </p>
        </div>

        <p className="mt-8 text-center font-display text-lg font-semibold text-foreground">
          What grade are you in?
        </p>
        <div className="mt-4 grid grid-cols-6 gap-2.5">
          {ALL_GRADES.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setGrade(value)}
              className={`rounded-2xl py-3.5 text-base font-extrabold transition-all ${
                grade === value
                  ? "bg-primary text-primary-foreground shadow-pop"
                  : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            size="lg"
            className="min-w-48 rounded-3xl text-lg shadow-pop"
            onClick={() => void completeOnboarding(grade)}
          >
            Open Mailbox
          </Button>
        </div>
      </div>
    </div>
  );
}
