export type Program = {
  slug: string;
  name: string;
  shortName: string;
  specialty: string;
  description: string;
  lead: string;
  photoClass: "photo-clinic" | "photo-lab" | "photo-family" | "photo-campus";
  highlights: string[];
  relatedConditionSlugs: string[];
  relatedDoctorSlugs: string[];
  phone: string;
};

export const programs: Program[] = [
  {
    slug: "epilepsy-program",
    name: "Epilepsy Program",
    shortName: "Epilepsy",
    specialty: "Neurology",
    description:
      "One of the busiest pediatric epilepsy programs in the country — diagnosis, medication, surgery, and diet therapy under one roof.",
    lead: "Our Epilepsy Program brings together neurologists, neurosurgeons, dietitians, and researchers who focus entirely on childhood seizures — including some of the rarest forms.",
    photoClass: "photo-clinic",
    highlights: [
      "Level 4 NAEC epilepsy center",
      "Advanced EEG and imaging",
      "Ketogenic diet therapy",
      "Epilepsy surgery program",
    ],
    relatedConditionSlugs: ["epilepsy-in-children"],
    relatedDoctorSlugs: ["sarah-chen", "marcus-williams", "james-park"],
    phone: "(617) 355-6905",
  },
  {
    slug: "heart-center",
    name: "Heart Center",
    shortName: "Heart Center",
    specialty: "Cardiology",
    description:
      "Comprehensive care for congenital and acquired heart disease — from fetal diagnosis through adulthood.",
    lead: "The Heart Center at Boston Children's is among the largest pediatric cardiology and cardiac surgery programs in the world.",
    photoClass: "photo-campus",
    highlights: [
      "Fetal cardiology",
      "Cardiac surgery",
      "Heart transplant",
      "Adult congenital care",
    ],
    relatedConditionSlugs: [],
    relatedDoctorSlugs: ["elena-torres"],
    phone: "(617) 355-6000",
  },
  {
    slug: "cancer-blood-disorders",
    name: "Cancer and Blood Disorders Center",
    shortName: "Cancer & Blood",
    specialty: "Oncology",
    description:
      "Pediatric oncology, hematology, and bone marrow transplant — one of the largest programs in New England.",
    lead: "In partnership with Dana-Farber Cancer Institute, we treat the full range of childhood cancers and blood disorders.",
    photoClass: "photo-lab",
    highlights: [
      "Leukemia and lymphoma",
      "Solid tumors",
      "Bone marrow transplant",
      "Survivorship clinic",
    ],
    relatedConditionSlugs: [],
    relatedDoctorSlugs: ["david-okonkwo", "priya-mehta"],
    phone: "(617) 355-6000",
  },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}
