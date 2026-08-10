"use client";

import { Button } from "@/components/ui/button";

export function PrintGuideButton() {
  return (
    <Button
      type="button"
      size="lg"
      className="min-h-11"
      onClick={() => window.print()}
    >
      Print / save PDF
    </Button>
  );
}
