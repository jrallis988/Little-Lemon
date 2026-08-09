"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { PRESCRIPTIONS } from "@/lib/data/catalog";
import { Button } from "@/components/ui/button";

export default function AutoRefillPage() {
  const initial = useMemo(
    () =>
      Object.fromEntries(
        PRESCRIPTIONS.map((rx) => [rx.id, rx.isAutoRefill]),
      ) as Record<string, boolean>,
    [],
  );
  const [settings, setSettings] = useState(initial);
  const [saved, setSaved] = useState(false);

  function toggle(id: string) {
    setSettings((current) => ({ ...current, [id]: !current[id] }));
    setSaved(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Manage auto-refill
      </h1>
      <p className="mt-2 text-muted-foreground">
        Choose which prescriptions refill automatically when you have refills
        remaining. Changes stay in this browser for the demo.
      </p>

      <ul className="mt-8 space-y-3">
        {PRESCRIPTIONS.map((rx) => (
          <li
            key={rx.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border/80 bg-surface-elevated/90 px-4 py-4"
          >
            <div>
              <p className="font-medium">
                {rx.medicationName}{" "}
                <span className="text-muted-foreground">{rx.dosage}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Rx #{rx.rxNumber} · {rx.refillsRemaining} refills left
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="size-4 accent-[var(--brand)]"
                checked={settings[rx.id]}
                onChange={() => toggle(rx.id)}
              />
              Auto-refill
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          onClick={() => {
            window.localStorage.setItem(
              "walgreens-auto-refill-v1",
              JSON.stringify(settings),
            );
            setSaved(true);
          }}
        >
          Save preferences
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/pharmacy" />}>
          Back to pharmacy
        </Button>
      </div>
      {saved ? (
        <p className="mt-3 text-sm text-health" role="status">
          Auto-refill preferences saved.
        </p>
      ) : null}
    </div>
  );
}
