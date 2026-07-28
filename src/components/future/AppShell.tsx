import type { ReactNode } from "react";
import { appNavItems } from "./appNav";

type AppShellProps = {
  children: ReactNode;
  title?: string;
  activeNav?: (typeof appNavItems)[number]["id"];
  onNav?: (id: (typeof appNavItems)[number]["id"]) => void;
  footer?: ReactNode;
  className?: string;
};

export function AppShell({
  children,
  title = "WW",
  activeNav = "today",
  onNav,
  footer,
  className = "",
}: AppShellProps) {
  return (
    <div
      className={`mx-auto flex w-full max-w-[22rem] flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-[#f7f8fb] shadow-glow ${className}`}
    >
      <div className="flex items-center justify-between bg-ink px-5 pb-3 pt-3 text-white">
        <p className="font-sans text-[0.65rem] font-semibold tracking-wide">9:41</p>
        <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-tide">
          Concept
        </p>
        <p className="font-sans text-[0.65rem] font-semibold tracking-wide">100%</p>
      </div>
      <div className="border-b border-ink/5 bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-cobalt-600">
              Weight Watchers · Prototype
            </p>
            <p className="mt-0.5 font-display text-lg font-bold text-ink" style={{ fontWeight: 700 }}>
              {title}
            </p>
          </div>
          <span className="rounded-full bg-mist px-2.5 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink/55">
            Demo
          </span>
        </div>
      </div>
      <div className="min-h-[28rem] flex-1 overflow-y-auto px-4 py-4">{children}</div>
      {footer}
      <nav
        className="grid grid-cols-5 border-t border-ink/8 bg-white px-1 py-2"
        aria-label="Prototype app navigation"
      >
        {appNavItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNav?.(item.id)}
            className={`rounded-xl px-1 py-2 font-sans text-[0.62rem] font-semibold transition ${
              activeNav === item.id ? "bg-mist text-cobalt-700" : "text-ink/45 hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="h-11 w-full rounded-2xl bg-cobalt-600 font-sans text-sm font-semibold text-white transition hover:bg-cobalt-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 w-full rounded-2xl border border-ink/12 bg-white font-sans text-sm font-semibold text-ink transition hover:bg-mist"
    >
      {children}
    </button>
  );
}

export function TextButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-sans text-sm font-semibold text-cobalt-700 transition hover:text-cobalt-800"
    >
      {children}
    </button>
  );
}

export function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-4 flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 rounded-full transition-all ${
            index === step ? "w-5 bg-cobalt-600" : "w-1.5 bg-ink/15"
          }`}
        />
      ))}
    </div>
  );
}

export function SoftCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-ink/8 bg-white px-4 py-3 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
