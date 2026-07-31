import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function Callout({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={cn(
        "rounded-r-sm border-l-[3px] border-ocean bg-surface px-s5 py-s4",
        className,
      )}
    >
      {title ? (
        <h5 className="mb-s2 text-sm font-extrabold uppercase tracking-[0.07em] text-blue">
          {title}
        </h5>
      ) : null}
      <div className="m-0 text-base text-text-body">{children}</div>
    </div>
  );
}

export function CalloutEmergency({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-s3 rounded-r-sm border-l-[3px] border-emergency bg-[#fff5f5] px-s5 py-s4",
        className,
      )}
    >
      <InfoIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emergency" />
      <div>
        <div className="mb-1 text-base font-bold text-emergency">{title}</div>
        <div className="m-0 text-base text-[#6b0000]">{children}</div>
      </div>
    </div>
  );
}

export function CalloutUrgent({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-s3 rounded-r-sm border-l-[3px] border-[#b85c00] bg-[#fff8f0] px-s5 py-s4",
        className,
      )}
    >
      <InfoIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#b85c00]" />
      <div>
        <div className="mb-1 text-base font-bold text-[#7a3800]">{title}</div>
        <div className="m-0 text-base text-[#5c2800]">{children}</div>
      </div>
    </div>
  );
}

export function Notice({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-s3 rounded-sm border border-ocean/18 bg-ocean/[0.06] px-s5 py-s4",
        className,
      )}
    >
      <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
      <div className="m-0 text-base text-blue">{children}</div>
    </div>
  );
}
