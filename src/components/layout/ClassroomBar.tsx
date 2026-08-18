import { copyForGrade } from "@/lib/stageCopy";
import { cn } from "@/lib/utils";
import { useMailStore } from "@/store/mailStore";
import { bandLabelForGrade } from "@/types/mail";
import { BookOpen } from "lucide-react";

export function ClassroomBar() {
  const grade = useMailStore((s) => s.grade);
  const learningStage = useMailStore((s) => s.learningStage);
  const copy = copyForGrade(grade);

  return (
    <div
      className={cn(
        "flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-card/80 px-5 py-2.5",
        learningStage === "high" && "bg-card",
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BookOpen className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {copy.course} · {copy.classLabel}
          </p>
          <p className="truncate text-xs font-medium text-muted-foreground">
            Grade {grade} · {bandLabelForGrade(grade)}
          </p>
        </div>
      </div>
      <p className="max-w-xl text-right text-xs font-medium leading-snug text-muted-foreground sm:text-sm">
        {copy.learningTarget}
      </p>
    </div>
  );
}
