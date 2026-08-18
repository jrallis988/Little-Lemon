import { evaluateWriting } from "@/lib/writingChecklist";
import { copyForGrade } from "@/lib/stageCopy";
import { cn } from "@/lib/utils";
import { useMailStore } from "@/store/mailStore";
import { CheckCircle2, Circle } from "lucide-react";

interface WritingCoachProps {
  to: string;
  subject: string;
  body: string;
}

export function WritingCoach({ to, subject, body }: WritingCoachProps) {
  const grade = useMailStore((s) => s.grade);
  const learningStage = useMailStore((s) => s.learningStage);
  const copy = copyForGrade(grade);
  const checks = evaluateWriting({ to, subject, body });
  const complete = checks.filter((c) => c.done).length;

  return (
    <aside
      className={cn(
        "w-full shrink-0 border-border/70 bg-card/90 lg:w-[280px] lg:border-l",
        learningStage === "high" ? "rounded-none" : "lg:rounded-none",
      )}
      aria-label="Writing checklist"
    >
      <div className="space-y-4 p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Learning target
          </p>
          <p className="mt-1 font-serif text-lg leading-snug text-foreground">
            {copy.learningTarget}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">
            Message structure
          </p>
          <p className="text-xs font-medium text-muted-foreground">
            {complete} of {checks.length} complete
          </p>
        </div>

        <ul className="space-y-2">
          {checks.map((check) => (
            <li
              key={check.id}
              className={cn(
                "flex gap-2.5 rounded-xl px-2 py-2",
                check.done ? "bg-safe-soft/70" : "bg-muted/50",
              )}
            >
              {check.done ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-safe" />
              ) : (
                <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              )}
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {check.label}
                </span>
                <span className="block text-xs font-medium text-muted-foreground">
                  {check.hint}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
