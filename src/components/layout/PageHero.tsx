import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  id,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
  id?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("bg-blue py-s8", className)} aria-labelledby={id}>
      <div className="wrap">
        <div className="max-w-[700px]">
          {eyebrow ? (
            <span className="eyebrow text-white/50">{eyebrow}</span>
          ) : null}
          <h1
            id={id}
            className="mb-s4 mt-s2 text-3xl font-medium leading-[1.15] text-white max-md:text-[28px]"
          >
            {title}
          </h1>
          {lead ? (
            <p className="lead text-white/[0.72]">{lead}</p>
          ) : null}
          {actions ? (
            <div className="mt-s5 flex flex-wrap gap-s3">{actions}</div>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
