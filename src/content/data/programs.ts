import type { ProgramDoc } from "@/content/types";

export const programs: ProgramDoc[] = [
  {
    _type: "program",
    _id: "prog-epilepsy",
    slug: "epilepsy-program",
    name: "Epilepsy Program",
    shortName: "Epilepsy",
    specialty: "Neurology",
    departmentSlug: "neurology",
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
    relatedConditionSlugs: ["epilepsy-in-children", "pediatric-migraine"],
    relatedDoctorSlugs: ["sarah-chen", "marcus-williams", "james-park"],
    relatedTrialSlugs: [
      "pediatric-epilepsy-genetics-registry",
      "novel-anti-seizure-medication-phase-2",
    ],
    locationSlugs: ["longwood", "waltham"],
    phone: "(617) 355-6905",
  },
  {
    _type: "program",
    _id: "prog-heart",
    slug: "heart-center",
    name: "Heart Center",
    shortName: "Heart Center",
    specialty: "Cardiology",
    departmentSlug: "cardiology",
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
    relatedConditionSlugs: ["congenital-heart-disease"],
    relatedDoctorSlugs: ["elena-torres"],
    relatedTrialSlugs: ["congenital-heart-device-registry"],
    locationSlugs: ["longwood", "waltham", "lexington"],
    phone: "(617) 355-6000",
  },
  {
    _type: "program",
    _id: "prog-cancer",
    slug: "cancer-blood-disorders",
    name: "Cancer and Blood Disorders Center",
    shortName: "Cancer & Blood",
    specialty: "Oncology",
    departmentSlug: "oncology",
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
    relatedConditionSlugs: ["childhood-leukemia"],
    relatedDoctorSlugs: ["david-okonkwo", "priya-mehta"],
    relatedTrialSlugs: [],
    locationSlugs: ["longwood"],
    phone: "(617) 355-6000",
  },
  {
    _type: "program",
    _id: "prog-udp",
    slug: "undiagnosed-disease-program",
    name: "Undiagnosed Disease Program",
    shortName: "Undiagnosed Disease",
    specialty: "Genetics",
    departmentSlug: "genetics",
    description:
      "Advanced genomic evaluation for children with complex, unexplained symptoms.",
    lead: "When families have searched for answers without success, our Undiagnosed Disease Program brings genetics, neurology, and specialty partners together to re-examine the case.",
    photoClass: "photo-lab",
    highlights: [
      "Exome and genome sequencing",
      "Multidisciplinary case review",
      "Rare disease counseling",
      "Research collaboration pathways",
    ],
    relatedConditionSlugs: ["undiagnosed-genetic-disease"],
    relatedDoctorSlugs: ["priya-mehta"],
    relatedTrialSlugs: [],
    locationSlugs: ["longwood"],
    phone: "(617) 355-6000",
  },
];

export function getProgramDoc(slug: string) {
  return programs.find((p) => p.slug === slug);
}
