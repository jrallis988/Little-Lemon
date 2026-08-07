import { DEMO_MODE, demoFormNote } from "@/lib/demo";

/** Visible notice on mock forms so demo behavior is explicit */
export function DemoFormNote({ className = "" }: { className?: string }) {
  if (!DEMO_MODE) return null;
  return (
    <p
      className={`rounded-sm border border-slate-line bg-paper px-3 py-2 text-xs leading-relaxed text-slate-muted ${className}`}
      role="note"
    >
      {demoFormNote}
    </p>
  );
}
