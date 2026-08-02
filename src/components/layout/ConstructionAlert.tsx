"use client";

import { useState } from "react";
import Link from "next/link";
import { IconClose } from "@/components/ui/Icons";

export function ConstructionAlert() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className="relative bg-alert-banner text-text"
      role="region"
      aria-label="Important construction closures"
    >
      <div className="wrap flex items-start justify-center gap-s4 py-s3 pr-12 text-center sm:items-center">
        <p className="m-0 text-sm leading-snug sm:text-base">
          <strong className="font-bold">Important construction closures.</strong>{" "}
          Work will affect Sky Bridge, parts of main lobby.{" "}
          <Link
            href="/locations/longwood"
            className="font-bold text-text underline decoration-text/40 underline-offset-2 hover:decoration-text"
          >
            Learn more &gt;&gt;
          </Link>
        </p>
        <button
          type="button"
          className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm text-text hover:bg-black/10"
          aria-label="Dismiss construction alert"
          onClick={() => setVisible(false)}
        >
          <IconClose className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
