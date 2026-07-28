import { contentApi } from "@/lib/content";
import { locations as locationDocs } from "@/content/data/locations";

export type Doctor = ReturnType<typeof contentApi.doctorsLegacy>[number];

export const specialties = [
  "All specialties",
  ...Array.from(new Set(contentApi.providers.map((provider) => provider.specialty))).sort(),
];

export const locations = [
  "All locations",
  ...locationDocs.map((l) => l.name),
] as const;

export const languages = [
  "Any language",
  ...Array.from(
    new Set(contentApi.providers.flatMap((provider) => provider.languages)),
  ).sort(),
];

export const availabilityOptions = [
  "Any availability",
  "Accepting new patients",
] as const;

export const doctors: Doctor[] = contentApi.doctorsLegacy();

export function getDoctor(slug: string) {
  return contentApi.getDoctorLegacy(slug);
}

export function filterDoctors(filters: {
  specialty?: string;
  location?: string;
  language?: string;
  availability?: string;
  query?: string;
}) {
  const selectedLocation = filters.location
    ? locationDocs.find(
        (location) =>
          location.name === filters.location || location.slug === filters.location,
      )
    : undefined;

  return doctors.filter((doc) => {
    if (
      filters.specialty &&
      filters.specialty !== "All specialties" &&
      doc.specialty !== filters.specialty &&
      !doc.tags.includes(filters.specialty)
    ) {
      return false;
    }
    if (
      filters.location &&
      filters.location !== "All locations" &&
      (!selectedLocation || !doc.locationSlugs.includes(selectedLocation.slug))
    ) {
      return false;
    }
    if (
      filters.language &&
      filters.language !== "Any language" &&
      !doc.languages.includes(filters.language)
    ) {
      return false;
    }
    if (
      filters.availability === "Accepting new patients" &&
      !doc.acceptingNewPatients
    ) {
      return false;
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const haystack = [
        doc.name,
        doc.title,
        doc.specialty,
        ...doc.tags,
        ...doc.languages,
        ...doc.locationNames,
        ...doc.clinicalInterests,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function buildDoctorDirectoryQuery(filters: {
  specialty?: string;
  location?: string;
  language?: string;
  availability?: string;
  query?: string;
}) {
  const params = new URLSearchParams();
  if (filters.specialty && filters.specialty !== "All specialties") {
    params.set("specialty", filters.specialty);
  }
  if (filters.location && filters.location !== "All locations") {
    params.set("location", filters.location);
  }
  if (filters.language && filters.language !== "Any language") {
    params.set("language", filters.language);
  }
  if (filters.availability && filters.availability !== "Any availability") {
    params.set("availability", filters.availability);
  }
  if (filters.query?.trim()) {
    params.set("q", filters.query.trim());
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
