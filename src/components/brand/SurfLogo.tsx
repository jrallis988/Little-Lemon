import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  markOnly?: boolean;
};

export function SurfLogo({ className, markOnly = false }: Props) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        aria-hidden
        className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy shadow-soft"
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
          <path
            d="M5 20c5-6 10-8 11-8s6 2 11 8"
            stroke="#A8C4B0"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M7 23c4-4.5 8-6 9-6s5 1.5 9 6"
            stroke="#F4F0E8"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
          <circle cx="22" cy="10" r="2.5" fill="#7FA88A" />
        </svg>
      </div>
      {!markOnly && (
        <div className="leading-tight">
          <p className="font-display text-xl font-semibold text-navy">Surf</p>
          <p className="text-xs text-slate">Search · Learn · Stay safe</p>
        </div>
      )}
    </div>
  );
}
