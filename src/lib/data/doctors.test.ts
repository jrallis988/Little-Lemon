import { describe, expect, it } from "vitest";
import { filterDoctors, specialties } from "@/lib/data/doctors";
import { contentApi } from "@/lib/content";

describe("doctor directory filters", () => {
  it("filters by specialty", () => {
    const specialty = specialties.find((s) => s !== "All specialties");
    expect(specialty).toBeTruthy();
    const results = filterDoctors({
      specialty: specialty!,
      location: "All locations",
      language: "Any language",
      availability: "Any availability",
      query: "",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((d) => d.specialty === specialty)).toBe(true);
  });

  it("matches providers who practice at a secondary location", () => {
    const multi = contentApi.providers.find((p) => p.locationSlugs.length > 1);
    if (!multi) {
      expect(contentApi.providers.length).toBeGreaterThan(0);
      return;
    }
    const loc = contentApi.getLocation(multi.locationSlugs[1]);
    expect(loc).toBeTruthy();
    const results = filterDoctors({
      specialty: "All specialties",
      location: loc!.name,
      language: "Any language",
      availability: "Any availability",
      query: "",
    });
    expect(results.some((d) => d.slug === multi.slug)).toBe(true);
  });

  it("filters accepting new patients", () => {
    const results = filterDoctors({
      specialty: "All specialties",
      location: "All locations",
      language: "Any language",
      availability: "Accepting new patients",
      query: "",
    });
    expect(results.every((d) => d.acceptingNewPatients)).toBe(true);
  });
});
