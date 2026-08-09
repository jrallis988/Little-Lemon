"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

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
    <div className="mx-auto flex min-h-[40vh] max-w-lg flex-col items-start justify-center gap-4 px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="text-muted-foreground">
        An unexpected error occurred. Try again, or head back to the home page.
      </p>
      <Button
        className="bg-brand text-brand-foreground hover:bg-brand/90"
        onClick={reset}
      >
        Try again
      </Button>
    </div>
  );
}
