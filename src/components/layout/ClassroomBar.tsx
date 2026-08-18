import { copyForGrade } from "@/lib/stageCopy";
import { useMailStore } from "@/store/mailStore";

export function ClassroomBar() {
  const grade = useMailStore((s) => s.grade);
  const copy = copyForGrade(grade);

  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border/80 bg-card px-5 py-2">
      <p className="truncate text-sm font-medium text-foreground">
        {copy.course}
        <span className="text-muted-foreground"> · {copy.classLabel}</span>
      </p>
      <p className="text-sm font-medium text-muted-foreground">Grade {grade}</p>
    </div>
  );
}
