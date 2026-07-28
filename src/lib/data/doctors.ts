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
  phone: string;
  bio: string;
  education: string[];
  certifications: string[];
  clinicalInterests: string[];
  programSlug?: string;
  conditionSlugs?: string[];
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

export const availabilityOptions = [
  "Any availability",
  "Accepting new patients",
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
    phone: "(617) 355-6905",
    bio: "Dr. Chen directs the Epilepsy Program at Boston Children's Hospital. She specializes in complex pediatric epilepsy, including surgical evaluation, diet therapy, and rare genetic epilepsies. Families are often referred to her team after seizures have not responded to first-line treatment.",
    education: [
      "MD, Harvard Medical School",
      "Residency, Pediatrics — Boston Children's Hospital",
      "Fellowship, Pediatric Neurology — Boston Children's Hospital",
      "Fellowship, Epilepsy — Boston Children's Hospital",
    ],
    certifications: [
      "American Board of Psychiatry and Neurology — Neurology with Special Qualification in Child Neurology",
      "Epilepsy Certification, ABPN",
    ],
    clinicalInterests: [
      "Drug-resistant epilepsy",
      "Epilepsy surgery evaluation",
      "Genetic epilepsies",
      "Ketogenic diet therapy",
    ],
    programSlug: "epilepsy-program",
    conditionSlugs: ["epilepsy-in-children"],
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
    phone: "(617) 355-6388",
    bio: "Dr. Williams leads clinical research and care for children with migraine and chronic headache. His PhD work focused on sensory processing in pediatric migraine, and he partners closely with pain psychology and primary care teams.",
    education: [
      "MD/PhD, Johns Hopkins University",
      "Residency, Child Neurology — Boston Children's Hospital",
      "Fellowship, Headache Medicine — Cincinnati Children's",
    ],
    certifications: [
      "American Board of Psychiatry and Neurology — Child Neurology",
      "UCNS Headache Medicine",
    ],
    clinicalInterests: [
      "Pediatric migraine",
      "Chronic daily headache",
      "New daily persistent headache",
      "Headache and school function",
    ],
    programSlug: "epilepsy-program",
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
    phone: "(617) 632-2680",
    bio: "Dr. Mehta cares for children with primary brain and spinal cord tumors. She works within the Dana-Farber/Boston Children's Cancer and Blood Disorders Center and focuses on precision therapies and long-term survivorship.",
    education: [
      "MD, University of Pennsylvania",
      "Residency, Pediatrics — Children's Hospital of Philadelphia",
      "Fellowship, Pediatric Hematology/Oncology — Dana-Farber/Boston Children's",
    ],
    certifications: [
      "American Board of Pediatrics — Hematology-Oncology",
    ],
    clinicalInterests: [
      "Low- and high-grade gliomas",
      "Medulloblastoma",
      "Targeted therapy trials",
      "Neuro-oncology survivorship",
    ],
    programSlug: "cancer-blood-disorders",
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
    phone: "(781) 216-2600",
    bio: "Dr. Park evaluates and treats children with tics, Tourette syndrome, dystonia, and other movement disorders. He sees patients at the Waltham campus and collaborates with psychiatry and OT for comprehensive care plans.",
    education: [
      "MD, Yale School of Medicine",
      "Residency, Child Neurology — Boston Children's Hospital",
      "Fellowship, Movement Disorders — Boston Children's Hospital",
    ],
    certifications: [
      "American Board of Psychiatry and Neurology — Child Neurology",
    ],
    clinicalInterests: [
      "Tourette syndrome",
      "Tic disorders",
      "Pediatric dystonia",
      "Deep brain stimulation evaluation",
    ],
    programSlug: "epilepsy-program",
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
    phone: "(617) 355-4278",
    bio: "Dr. Torres specializes in congenital heart disease from fetal diagnosis through adolescence. She helps families understand complex cardiac anatomy and partners with cardiac surgery for staged repair pathways.",
    education: [
      "MD, University of California, San Francisco",
      "Residency, Pediatrics — UCSF Benioff Children's",
      "Fellowship, Pediatric Cardiology — Boston Children's Hospital",
    ],
    certifications: [
      "American Board of Pediatrics — Pediatric Cardiology",
    ],
    clinicalInterests: [
      "Fetal cardiology",
      "Single ventricle care",
      "Congenital heart disease",
      "Spanish-language family counseling",
    ],
    programSlug: "heart-center",
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
    phone: "(617) 632-3270",
    bio: "Dr. Okonkwo treats children and adolescents with leukemia and related blood cancers. His practice emphasizes clinical trial access, supportive care, and clear communication with families throughout treatment.",
    education: [
      "MD, Howard University College of Medicine",
      "Residency, Pediatrics — Children's National Hospital",
      "Fellowship, Pediatric Hematology/Oncology — Dana-Farber/Boston Children's",
    ],
    certifications: [
      "American Board of Pediatrics — Hematology-Oncology",
    ],
    clinicalInterests: [
      "Acute lymphoblastic leukemia",
      "Acute myeloid leukemia",
      "Relapsed leukemia trials",
      "Supportive care during chemotherapy",
    ],
    programSlug: "cancer-blood-disorders",
  },
];

export function getDoctor(slug: string) {
  return doctors.find((d) => d.slug === slug);
}

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
        ...doc.clinicalInterests,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/** Build a shareable directory query string; omits default values. */
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
  if (
    filters.availability &&
    filters.availability !== "Any availability"
  ) {
    params.set("availability", filters.availability);
  }
  if (filters.query?.trim()) {
    params.set("q", filters.query.trim());
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
