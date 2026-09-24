"use client";

import { Button } from "@/components/ui/Button";

export function PrintActions({
  backHref,
  backLabel,
}: {
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button href={backHref} variant="ghost" size="sm">
        {backLabel}
      </Button>
      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={() => window.print()}
      >
        Print / Save PDF
      </Button>
    </div>
  );
}
