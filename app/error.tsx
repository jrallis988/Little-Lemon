"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-content section-pad text-center">
      <span className="accent-line mx-auto" aria-hidden />
      <p className="section-overline">Something went wrong</p>
      <h1 className="section-headline">We hit a snag.</h1>
      <p className="mx-auto mt-4 max-w-lg text-body-lg text-slate-muted">
        Try again, or head back to the home page.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button type="button" onClick={reset} className="btn-primary">
          Try again →
        </button>
        <Link href="/" className="btn-secondary">
          Home
        </Link>
      </div>
    </div>
  );
}
