"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ClinicalTrialDoc } from "@/content/types";
import { Badge } from "@/components/ui/Badge";
import { Input, Label, Select } from "@/components/ui/Input";

export function ClinicalTrialsExplorer({
  trials,
  highlight,
  initialQuery = "",
  initialStatus = "all",
}: {
  trials: ClinicalTrialDoc[];
  highlight?: string;
  initialQuery?: string;
  initialStatus?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [status, setStatus] = useState(initialStatus);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return trials.filter((trial) => {
      if (status !== "all" && trial.status !== status) return false;
      if (!q) return true;
      return [
        trial.title,
        trial.summary,
        trial.phase,
        trial.status,
        ...trial.conditionSlugs,
        ...trial.programSlugs,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, status, trials]);

  return (
    <>
      <div className="mb-s5 grid grid-cols-1 gap-s4 rounded-md bg-surface p-s5 md:grid-cols-[1fr_240px]">
        <div>
          <Label htmlFor="trial-search">Search trials</Label>
          <Input
            id="trial-search"
            name="q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Condition, treatment, or phase"
          />
        </div>
        <div>
          <Label htmlFor="trial-status">Status</Label>
          <Select
            id="trial-status"
            name="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="recruiting">Recruiting</option>
            <option value="active">Active, not recruiting</option>
            <option value="completed">Completed</option>
          </Select>
        </div>
      </div>

      <p className="mb-s4 text-sm text-text-meta" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? "trial" : "trials"} found
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-s4 md:grid-cols-2">
          {results.map((trial) => (
            <article
              key={trial.slug}
              id={trial.slug}
              className={`scroll-mt-[120px] rounded-md border p-s5 ${
                highlight === trial.slug
                  ? "border-ocean bg-ocean/[0.04]"
                  : "border-border bg-white"
              }`}
            >
              <div className="mb-s2 flex flex-wrap gap-1">
                <Badge
                  variant={
                    trial.status === "recruiting"
                      ? "green"
                      : trial.status === "active"
                        ? "ocean"
                        : "gray"
                  }
                >
                  {trial.status}
                </Badge>
                {trial.phase ? <Badge variant="gray">{trial.phase}</Badge> : null}
              </div>
              <h3 className="mb-s2 text-lg font-bold text-text">{trial.title}</h3>
              <p className="mb-s3 text-sm font-light text-text-body">{trial.summary}</p>
              <div className="flex flex-wrap gap-s3 text-sm">
                {trial.conditionSlugs.map((slug) => (
                  <Link key={slug} href={`/conditions/${slug}`} className="font-semibold text-ocean">
                    Related condition
                  </Link>
                ))}
                {trial.programSlugs.map((slug) => (
                  <Link key={slug} href={`/programs/${slug}`} className="font-semibold text-ocean">
                    Related program
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-border bg-white p-s6 text-center">
          <h3 className="mb-s2 text-lg font-bold text-text">No matching trials</h3>
          <p className="text-sm font-light text-text-body">
            Try a broader search or choose a different status.
          </p>
        </div>
      )}
    </>
  );
}
