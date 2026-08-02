"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { IconClose } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import {
  SITE_ANNOUNCEMENT_KEY,
  readLocalPreference,
  writeLocalPreference,
} from "@/lib/preferences";
import { cn } from "@/lib/cn";

/**
 * Lightweight, dismissible site notice — replaces the legacy sticky yellow
 * top banner so critical updates never crowd the primary header.
 */
export function SiteAnnouncement() {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const dismissed = readLocalPreference(SITE_ANNOUNCEMENT_KEY) === "dismissed";
    setOpen(!dismissed);
    setReady(true);
    if (!dismissed) {
      // Open the drawer shortly after first paint so it never blocks header load.
      const timer = window.setTimeout(() => setExpanded(true), 600);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    writeLocalPreference(SITE_ANNOUNCEMENT_KEY, "dismissed");
    setExpanded(false);
    setOpen(false);
  }

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        writeLocalPreference(SITE_ANNOUNCEMENT_KEY, "dismissed");
        setExpanded(false);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded]);

  if (!ready || !open) return null;

  return (
    <div
      className={cn(
        "fixed bottom-[9.5rem] left-3 right-3 z-[855] sm:bottom-s7 sm:left-s6 sm:right-auto sm:w-[min(100%,380px)] xl:bottom-s7",
        "transition-all duration-300 ease-out",
        expanded
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        className="overflow-hidden rounded-lg border border-border bg-white shadow-lg"
      >
        <div className="flex items-start gap-3 border-b border-border bg-surface px-s4 py-s3">
          <span
            className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-alert-banner"
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-meta">
              Site update
            </p>
            <h2 id={titleId} className="m-0 text-base font-bold text-blue">
              Construction closures
            </h2>
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-text-meta hover:bg-white hover:text-text"
            aria-label="Dismiss site update"
            onClick={dismiss}
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div className="px-s4 py-s4">
          <p className="m-0 text-sm font-light leading-relaxed text-text-body">
            Work will affect Sky Bridge and parts of the main lobby. Plan a few
            extra minutes for arrival and follow campus wayfinding signs.
          </p>
          <div className="mt-s4 flex flex-wrap gap-2">
            <Button
              href="/patients-families/prepare-for-your-visit#construction"
              variant="ocean"
              size="sm"
              onClick={dismiss}
            >
              Learn more
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={dismiss}>
              Dismiss
            </Button>
          </div>
          <p className="mt-s3 m-0 text-[11px] font-light text-text-meta">
            This notice stays out of the header so navigation stays clear.{" "}
            <Link
              href="/patients-families/prepare-for-your-visit#construction"
              className="font-semibold text-ocean no-underline hover:underline"
              onClick={dismiss}
            >
              Visit details
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
