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
    <section className="bg-blue py-s8" aria-labelledby="find-doctor-heading">
      <div className="wrap max-w-[840px] text-center">
        <h2
          id="find-doctor-heading"
          className="mb-s3 text-[clamp(28px,3.5vw,40px)] font-bold text-white"
        >
          Find a Doctor
        </h2>
        <p className="mb-s6 text-md font-light leading-relaxed text-white/90">
          Over 3,000 award-winning researchers and staff stand at the ready to
          help you navigate your most difficult challenges.
        </p>
        <form
          onSubmit={onSubmit}
          className="mx-auto flex max-w-[720px] flex-col gap-s3 sm:flex-row sm:items-stretch"
          role="search"
          aria-label="Find a doctor"
        >
          <label className="relative min-w-0 flex-1 text-left">
            <span className="mb-1 block text-sm font-bold text-white/90 sm:sr-only">
              Search by Name
            </span>
            <IconSearch className="pointer-events-none absolute bottom-3.5 left-4 h-[18px] w-[18px] text-text-meta sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter provider name"
              className="h-12 w-full rounded-md border-0 bg-white py-3 pl-12 pr-4 text-base text-text outline-none ring-0 placeholder:text-text-ghost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
            />
          </label>
          <Button type="submit" variant="pink" size="lg" className="sm:min-w-[160px] sm:self-end">
            Find a Doctor
          </Button>
        </form>
        <p className="mt-s5">
          <Link
            href="/find-a-doctor"
            className="text-sm font-bold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            Not Sure Where to Begin?
          </Link>
        </p>
      </div>
    </section>
  );
}
