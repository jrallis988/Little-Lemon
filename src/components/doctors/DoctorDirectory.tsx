"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Select } from "@/components/ui/Input";
import {
  filterDoctors,
  languages,
  locations,
  specialties,
} from "@/lib/data/doctors";

export function DoctorDirectory() {
  const searchParams = useSearchParams();
  const initialSpecialty =
    searchParams.get("specialty") ?? "Neurology";
  const initialQuery = searchParams.get("q") ?? "";

  const [specialty, setSpecialty] = useState(
    specialties.includes(initialSpecialty as (typeof specialties)[number])
      ? initialSpecialty
      : "All specialties",
  );
  const [location, setLocation] = useState("All locations");
  const [language, setLanguage] = useState("Any language");
  const [availability, setAvailability] = useState("Any availability");
  const [query] = useState(initialQuery);

  const results = useMemo(
    () =>
      filterDoctors({
        specialty,
        location,
        language,
        availability,
        query,
      }),
    [specialty, location, language, availability, query],
  );

  const countLabel =
    specialty !== "All specialties"
      ? `${results.length} doctor${results.length === 1 ? "" : "s"} in ${specialty}`
      : `${results.length} doctor${results.length === 1 ? "" : "s"}`;

  return (
    <>
      <div
        className="sticky top-[108px] z-[200] border-b border-border bg-white py-s4"
        role="search"
        aria-label="Filter doctors"
      >
        <div className="wrap flex flex-wrap items-center gap-s3">
          <Select
            aria-label="Filter by specialty"
            className="min-w-[160px] max-w-[280px] flex-[1.5]"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            {specialties.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Select
            aria-label="Filter by location"
            className="min-w-[160px] max-w-[220px] flex-1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
          <Select
            aria-label="Filter by language"
            className="min-w-[160px] max-w-[220px] flex-1"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
          <Select
            aria-label="Filter by availability"
            className="min-w-[160px] max-w-[220px] flex-1"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option>Any availability</option>
            <option>Accepting new patients</option>
          </Select>
          <span
            className="ml-auto whitespace-nowrap text-sm font-light text-text-meta"
            aria-live="polite"
            aria-atomic="true"
          >
            {countLabel}
          </span>
        </div>
      </div>

      <div className="wrap">
        {results.length === 0 ? (
          <p className="py-s10 text-md text-text-meta">
            No doctors match these filters. Try broadening specialty or location.
          </p>
        ) : (
          <div
            className="grid grid-cols-1 gap-s4 py-s6 pb-s10 md:grid-cols-2"
            role="list"
            aria-label="Doctor search results"
          >
            {results.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
