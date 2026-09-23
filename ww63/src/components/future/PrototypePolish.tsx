import { useEffect, type ReactNode } from "react";

export type ToastTone = "success" | "info" | "error";

type ToastProps = {
  message: string | null;
  tone?: ToastTone;
  onDismiss: () => void;
  durationMs?: number;
};

export function Toast({
  message,
  tone = "success",
  onDismiss,
  durationMs = 2400,
}: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const id = window.setTimeout(onDismiss, durationMs);
    return () => window.clearTimeout(id);
  }, [durationMs, message, onDismiss]);

  if (!message) return null;

  const toneClass =
    tone === "error"
      ? "bg-red-700 text-white"
      : tone === "info"
        ? "bg-ink text-white"
        : "bg-tide text-ink";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none absolute inset-x-3 bottom-20 z-20 rounded-2xl px-4 py-3 text-center font-sans text-xs font-semibold shadow-lg animate-rise ${toneClass}`}
    >
      {message}
    </div>
  );
}

export function EmptyState({
  title,
  copy,
  action,
}: {
  title: string;
  copy: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/15 bg-white/80 px-4 py-6 text-center">
      <p className="font-display text-base font-bold text-ink" style={{ fontWeight: 700 }}>
        {title}
      </p>
      <p className="mt-2 font-sans text-xs leading-relaxed text-ink/55">{copy}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-xs font-semibold text-red-800"
    >
      {message}
    </p>
  );
}
