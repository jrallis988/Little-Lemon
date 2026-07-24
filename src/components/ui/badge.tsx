import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

function Badge({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border border-transparent px-2 py-0.5 text-2xs font-semibold uppercase tracking-[0.06em]",
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
