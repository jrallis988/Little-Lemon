export type Doctor = {
  id: string;
  name: string;
  title: string;
  specialty: string;
  tags: string[];
  location: string;
  languages: string[];
  acceptingNewPatients: boolean;
  featured?: boolean;
  slug: string;
};

export const specialties = [
  "All specialties",
  "Cardiology",
  "Neurology",
  "Oncology",
  "Orthopedics",
  "Neuro-oncology",
] as const;

export const locations = [
  "All locations",
  "Main Campus — Longwood",
  "Waltham",
  "Peabody",
] as const;

export const languages = [
  "Any language",
  "Spanish",
  "Mandarin",
  "Portuguese",
  "Hindi",
  "Korean",
  "English",
] as const;

export const doctors: Doctor[] = [
  {
    id: "1",
    slug: "sarah-chen",
    name: "Sarah Chen, MD",
    title:
      "Director, Epilepsy Program · Associate Professor of Neurology, Harvard Medical School",
    specialty: "Neurology",
    tags: ["Epilepsy", "EEG", "Neurology"],
    location: "Main Campus — Longwood",
    languages: ["English", "Mandarin"],
    acceptingNewPatients: true,
    featured: true,
  },
  {
    id: "2",
    slug: "marcus-williams",
    name: "Marcus Williams, MD, PhD",
    title: "Neurologist · Headache and Pain Program",
    specialty: "Neurology",
    tags: ["Headache", "Migraine", "Neurology"],
    location: "Main Campus — Longwood",
    languages: ["English"],
    acceptingNewPatients: false,
  },
  {
    id: "3",
    slug: "priya-mehta",
    name: "Priya Mehta, MD",
    title: "Neuro-oncologist · Brain Tumor Program",
    specialty: "Neuro-oncology",
    tags: ["Brain Tumors", "Neuro-oncology"],
    location: "Main Campus — Longwood",
    languages: ["Hindi", "English"],
    acceptingNewPatients: true,
  },
  {
    id: "4",
    slug: "james-park",
    name: "James Park, MD",
    title: "Neurologist · Movement Disorders Program",
    specialty: "Neurology",
    tags: ["Movement Disorders", "Tourette Syndrome"],
    location: "Waltham",
    languages: ["Korean", "English"],
    acceptingNewPatients: true,
  },
  {
    id: "5",
    slug: "elena-torres",
    name: "Elena Torres, MD",
    title: "Cardiologist · Heart Center",
    specialty: "Cardiology",
    tags: ["Cardiology", "Congenital Heart"],
    location: "Main Campus — Longwood",
    languages: ["Spanish", "English"],
    acceptingNewPatients: true,
  },
  {
    id: "6",
    slug: "david-okonkwo",
    name: "David Okonkwo, MD",
    title: "Oncologist · Dana-Farber/Boston Children's",
    specialty: "Oncology",
    tags: ["Oncology", "Leukemia"],
    location: "Main Campus — Longwood",
    languages: ["English"],
    acceptingNewPatients: true,
  },
];

export function filterDoctors(filters: {
  specialty?: string;
  location?: string;
  language?: string;
  availability?: string;
  query?: string;
}) {
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
      doc.location !== filters.location
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
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
