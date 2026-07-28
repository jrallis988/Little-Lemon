"use client";

import { useEffect, useState } from "react";

export function LiveWaitTime() {
  const [minutes, setMinutes] = useState(19);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    setUpdatedAt(new Date());
    const interval = window.setInterval(() => {
      setMinutes((current) => Math.max(8, Math.min(45, current + (Math.random() > 0.5 ? 2 : -2))));
      setUpdatedAt(new Date());
    }, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mb-[5px] flex items-center gap-s2 text-xs font-extrabold uppercase tracking-[0.08em] text-text-meta">
        Current estimated wait
        <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green" aria-hidden="true" />
      </div>
      <div className="text-md font-bold text-success-text" role="status" aria-live="polite">
        About {minutes} minutes
        <span className="sr-only">
          . Mock wait estimate updated {updatedAt ? "just now" : "when this page loaded"}.
        </span>
      </div>
      <div className="mt-[3px] text-xs font-light text-text-meta">
        To initial clinical assessment · mock estimate
      </div>
    </div>
  );
}
