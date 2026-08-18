import { evaluateWriting } from "@/lib/writingChecklist";
import { cn } from "@/lib/utils";
import { Check, Circle } from "lucide-react";

interface WritingCoachProps {
  to: string;
  subject: string;
  body: string;
}

export function WritingCoach({ to, subject, body }: WritingCoachProps) {
  const checks = evaluateWriting({ to, subject, body });

  return (
    <aside
      className="w-full shrink-0 border-border/70 bg-card lg:w-[220px] lg:border-l"
      aria-label="Checklist"
    >
      <div className="space-y-3 p-4">
        <p className="text-sm font-semibold text-foreground">Checklist</p>
        <ul className="space-y-1">
          {checks.map((check) => (
            <li key={check.id} className="flex items-center gap-2 px-0.5 py-1">
              {check.done ? (
                <Check className="size-4 shrink-0 text-safe" />
              ) : (
                <Circle className="size-3.5 shrink-0 text-muted-foreground" />
              )}
              <span
                className={cn(
                  "text-sm",
                  check.done
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {check.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
