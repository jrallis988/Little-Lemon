"use client";

import type { LoopFilter } from "@/lib/types";
import { loopFilters } from "@/lib/mock/vibe-social";
import { cn } from "@/lib/utils";

export function LoopFilters({
  active,
  onChange,
  className,
}: {
  active: LoopFilter;
  onChange: (filter: LoopFilter) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)} role="tablist">
      {loopFilters.map((filter) => {
        const selected = active === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-black transition",
              selected
                ? "border-[#FF6A1A] bg-[#FF5C00] text-white shadow-[0_10px_30px_rgba(255,92,0,0.35)]"
                : "border-white/10 bg-white/5 text-zinc-300 hover:border-[#FF6A1A]/60 hover:text-white"
            )}
            onClick={() => onChange(filter.id)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
