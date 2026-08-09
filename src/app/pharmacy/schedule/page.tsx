import { Suspense } from "react";

import { ScheduleForm } from "./schedule-form";

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
        <ScheduleForm />
      </Suspense>
    </div>
  );
}
