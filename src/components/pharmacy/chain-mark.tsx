import { cn } from "@/lib/utils";
import type { PharmacyChain } from "@/lib/types";
import { CHAIN_LABELS } from "@/lib/data/pharmacies";

const MARK: Record<PharmacyChain, { letter: string; className: string }> = {
  cvs: { letter: "CVS", className: "bg-[#CC0000] text-white" },
  walgreens: { letter: "WAG", className: "bg-[#E31837] text-white" },
  walmart: { letter: "WMT", className: "bg-[#0071CE] text-white" },
  costco: { letter: "COS", className: "bg-[#005DAA] text-white" },
  rite_aid: { letter: "RAD", className: "bg-[#005EB8] text-white" },
  kroger: { letter: "KR", className: "bg-[#1A6B3C] text-white" },
  independent: { letter: "IND", className: "bg-primary text-primary-foreground" },
};

export function ChainMark({
  chain,
  className,
}: {
  chain: PharmacyChain;
  className?: string;
}) {
  const mark = MARK[chain];
  return (
    <span
      title={CHAIN_LABELS[chain]}
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-[0.65rem] font-bold tracking-wide",
        mark.className,
        className
      )}
      aria-hidden
    >
      {mark.letter}
    </span>
  );
}
