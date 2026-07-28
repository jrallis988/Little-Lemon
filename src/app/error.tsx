"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Client-visible failures — digest ties to server logs when present.
    console.error(
      JSON.stringify({
        ts: new Date().toISOString(),
        level: "error",
        message: "app_error_boundary",
        digest: error.digest,
        name: error.name,
        detail: error.message,
      })
    );
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50dvh] max-w-lg flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="text-muted-foreground">
        We couldn&apos;t finish that request. Try again, or return home and
        continue comparing prices.
      </p>
      {error.digest && (
        <p className="font-mono text-xs text-muted-foreground">
          Ref {error.digest}
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={reset}
          className={cn(buttonVariants(), "min-h-11")}
        >
          Try again
        </button>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "min-h-11")}>
          Home
        </Link>
      </div>
    </div>
  );
}
