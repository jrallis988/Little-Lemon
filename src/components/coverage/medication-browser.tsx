"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Drug } from "@/lib/types";
import { cn } from "@/lib/utils";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface MedicationBrowserProps {
  medications: Drug[];
  initialLetter?: string;
}

export function MedicationBrowser({
  medications,
  initialLetter = "all",
}: MedicationBrowserProps) {
  const [letter, setLetter] = useState(
    initialLetter === "all" ? "all" : initialLetter.toUpperCase()
  );

  const filtered = useMemo(() => {
    if (letter === "all") return medications;
    return medications.filter((d) =>
      d.brandName.toUpperCase().startsWith(letter)
    );
  }, [medications, letter]);

  const byCategory = useMemo(() => {
    const map = new Map<string, Drug[]>();
    for (const d of filtered) {
      const key = d.therapeuticClass;
      const list = map.get(key) ?? [];
      list.push(d);
      map.set(key, list);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <section aria-labelledby="browse-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2
            id="browse-heading"
            className="font-display text-xl font-semibold uppercase tracking-tight"
          >
            Browse included medications
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A–Z list of medications currently in the TrumpRx program (
            {medications.length} total).
          </p>
        </div>
        <Link
          href="/medications"
          className="text-sm font-medium text-primary underline-offset-2 hover:underline"
        >
          Full directory
        </Link>
      </div>

      <div className="flex flex-wrap gap-1" role="tablist" aria-label="A to Z">
        <button
          type="button"
          onClick={() => setLetter("all")}
          className={cn(
            "min-h-8 min-w-10 px-2 text-xs font-semibold",
            letter === "all"
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card hover:bg-muted"
          )}
        >
          All
        </button>
        {LETTERS.map((L) => {
          const has = medications.some((d) =>
            d.brandName.toUpperCase().startsWith(L)
          );
          return (
            <button
              key={L}
              type="button"
              disabled={!has}
              onClick={() => setLetter(L)}
              className={cn(
                "min-h-8 min-w-8 text-xs font-semibold disabled:opacity-30",
                letter === L
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card hover:bg-muted"
              )}
            >
              {L}
            </button>
          );
        })}
      </div>

      <div className="space-y-5">
        {byCategory.map(([category, drugs]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-muted-foreground">
              {category}
            </h3>
            <ul className="mt-2 divide-y divide-border border border-border bg-card">
              {drugs.map((d) => (
                <li key={d.id}>
                  <Link
                    href={`/drugs/${d.id}`}
                    className="flex flex-wrap items-baseline justify-between gap-2 px-3 py-2.5 text-sm hover:bg-muted/60"
                  >
                    <span>
                      <span className="font-semibold">{d.brandName}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        ({d.genericName})
                      </span>
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wide text-primary">
                      {d.program?.productType ?? "included"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No included medications for that letter.
          </p>
        )}
      </div>
    </section>
  );
}
