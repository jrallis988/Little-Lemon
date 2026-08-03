"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconClose } from "@/components/ui/Icons";
import {
  SITE_ANNOUNCEMENT_KEY,
  readLocalPreference,
  writeLocalPreference,
} from "@/lib/preferences";

/**
 * Slim full-width construction notice — matches the live site top alert bar.
 */
export function SiteAnnouncement() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = readLocalPreference(SITE_ANNOUNCEMENT_KEY) === "dismissed";
    setVisible(!dismissed);
    setReady(true);
  }, []);

  function dismiss() {
    writeLocalPreference(SITE_ANNOUNCEMENT_KEY, "dismissed");
    setVisible(false);
  }

  if (!ready || !visible) return null;

  return (
    <div
      className="relative bg-alert-banner text-black"
      role="region"
      aria-label="Important construction closures"
    >
      <div className="wrap flex items-start justify-center gap-s4 py-2 pr-12 text-center sm:items-center sm:py-2.5">
        <p className="m-0 text-sm leading-snug text-black sm:text-[15px]">
          <strong className="font-bold">Important construction closures.</strong>{" "}
          Work will affect Sky Bridge, parts of main lobby.{" "}
          <Link
            href="/patients-families/prepare-for-your-visit#construction"
            className="font-bold text-black underline decoration-black/40 underline-offset-2 hover:decoration-black"
          >
            Learn more &gt;&gt;
          </Link>
        </p>
        <button
          type="button"
          className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          aria-label="Dismiss construction alert"
          onClick={dismiss}
        >
          <IconClose className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
