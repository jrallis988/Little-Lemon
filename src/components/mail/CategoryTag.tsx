import { cn } from "@/lib/utils";
import type { ContactCategory } from "@/types/mail";

const styles: Record<
  ContactCategory,
  { label: string; className: string }
> = {
  teacher: {
    label: "Teacher",
    className: "bg-[#DCE4FF] text-[#3F51D8]",
  },
  classmate: {
    label: "Classmate",
    className: "bg-[#D6F5E9] text-[#1B7A63]",
  },
  family: {
    label: "Family",
    className: "bg-[#FFE4C7] text-[#C45C12]",
  },
  school: {
    label: "School",
    className: "bg-[#EBDFFF] text-[#6A3BCF]",
  },
};

export function CategoryTag({
  category,
  className,
}: {
  category?: ContactCategory;
  className?: string;
}) {
  if (!category) return null;
  const meta = styles[category];
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-extrabold tracking-wide",
        meta.className,
        className,
      )}
    >
      {meta.label}
    </span>
  );
}
