"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { IconSearch } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

export function FindDoctorBand() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/find-a-doctor?q=${encodeURIComponent(q)}` : "/find-a-doctor");
  }

  return (
    <section className="bg-blue py-s3 sm:py-s4" aria-labelledby="find-doctor-heading">
      <div className="wrap max-w-[900px]">
        <div className="flex flex-col items-stretch gap-s3 sm:flex-row sm:items-end sm:gap-s4">
          <div className="min-w-0 flex-1 text-left sm:max-w-[240px]">
            <h2
              id="find-doctor-heading"
              className="m-0 text-xl font-bold text-white sm:text-2xl"
            >
              Find a Doctor
            </h2>
            <p className="mt-1 hidden text-sm font-light leading-snug text-white/85 sm:block">
              Search 3,000+ specialists by name.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex min-w-0 flex-[1.6] flex-col gap-2 sm:flex-row sm:items-stretch"
            role="search"
            aria-label="Find a doctor"
          >
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search by Name</span>
              <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-meta" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter provider name"
                className="h-10 w-full rounded-md border-0 bg-white py-2 pl-10 pr-3 text-sm text-text outline-none placeholder:text-text-ghost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
              />
            </label>
            <Button
              type="submit"
              variant="pink"
              size="md"
              className="h-10 shrink-0 sm:min-w-[132px]"
            >
              Find a Doctor
            </Button>
          </form>

          <Link
            href="/find-a-doctor"
            className="shrink-0 self-start text-sm font-bold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white sm:self-center"
          >
            Not sure where to begin?
          </Link>
        </div>
      </div>
    </section>
  );
}
