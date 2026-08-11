"use client";

import { useEffect } from "react";
import Link from "next/link";
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
    <div className="mx-auto grid max-w-lg place-items-center px-4 py-20 text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
        Error
      </p>
      <h1 className="mt-2 font-display text-4xl text-pf-ink">
        That page didn’t load
      </h1>
      <p className="mt-2 text-sm text-pf-ink/65">
        You can retry, or go back to Explore Clubs Near You.
      </p>
      <div className="mt-5 flex gap-2">
        <Button type="button" variant="purple" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/#clubs">Our Club</Link>
        </Button>
      </div>
    </div>
  );
}
