import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function MailboxLogo({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <img
      src="/mailbox-mascot.png"
      alt=""
      width={size}
      height={size}
      className={cn("select-none object-contain drop-shadow-sm", className)}
      draggable={false}
    />
  );
}

export function DoodleBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <svg
        className="absolute left-4 top-5 size-10 text-brand/40 animate-wiggle"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l1.9 5.8H20l-4.8 3.5 1.8 5.7L12 13.8 6.9 17l1.9-5.7L4 7.8h6.1L12 2z" />
      </svg>
      <svg
        className="absolute right-6 top-8 size-8 text-pending/55"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 3l1.4 4.2H18l-3.5 2.6 1.3 4.2L12 11.6 8.2 14l1.3-4.2L6 7.2h4.6L12 3z" />
      </svg>
      <svg
        className="absolute right-10 top-32 size-12 rotate-[18deg] text-rail/25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      >
        <path d="M14 3l7 7-10 10H4v-7L14 3z" />
        <path d="M12 5l7 7" />
      </svg>
      <svg
        className="absolute bottom-28 left-6 size-11 -rotate-[18deg] text-safe/40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      >
        <path d="M21 12.5V8a5 5 0 00-10 0v9a3 3 0 006 0V9" />
      </svg>
      <svg
        className="absolute bottom-12 right-8 size-14 rotate-6 text-rail/30"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M3 11.5L21 3l-5.5 18-4-7-7-2.5z" />
      </svg>
      <svg
        className="absolute left-[38%] bottom-6 size-8 text-warn/35"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21s-7-4.5-9.5-9A5.2 5.2 0 0112 6a5.2 5.2 0 019.5 6C19 16.5 12 21 12 21z" />
      </svg>
      <svg
        className="absolute left-[55%] top-10 size-9 text-safe/30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 16c2-6 6-9 8-9s6 3 8 9" />
        <circle cx="8" cy="10" r="1.2" fill="currentColor" />
        <circle cx="16" cy="10" r="1.2" fill="currentColor" />
      </svg>
    </div>
  );
}

export function TipCard({
  title = "Tip of the day",
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] border-[2.5px] border-pending/45 bg-pending-soft px-4 py-3 text-sm font-bold text-amber-900 shadow-card",
        className,
      )}
    >
      <p className="font-display text-base font-semibold text-amber-800">
        {title}
      </p>
      <div className="mt-1 font-semibold leading-relaxed text-amber-950/85">
        {children}
      </div>
    </div>
  );
}

export function EmptyStateArt({
  src,
  title,
  body,
  tip,
}: {
  src: string;
  title: string;
  body?: string;
  tip?: string;
}) {
  return (
    <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center px-6 py-10 text-center animate-fade-up">
      <img
        src={src}
        alt=""
        className="h-40 w-40 object-contain drop-shadow-sm animate-float"
        draggable={false}
      />
      <p className="mt-4 font-display text-3xl font-semibold text-rail">
        {title}
      </p>
      {body ? (
        <p className="mt-2 text-base font-bold text-muted-foreground">{body}</p>
      ) : null}
      {tip ? <TipCard className="mt-5 w-full text-left">{tip}</TipCard> : null}
    </div>
  );
}
