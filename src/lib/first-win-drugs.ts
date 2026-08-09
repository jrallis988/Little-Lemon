/**
 * Curated “first win” medications — common fills users expect to price fast.
 * IDs must match prisma seed drug ids.
 */
export const FIRST_WIN_DRUGS = [
  {
    id: "atorvastatin",
    label: "Atorvastatin",
    hint: "Cholesterol",
  },
  {
    id: "metformin",
    label: "Metformin",
    hint: "Diabetes",
  },
  {
    id: "lisinopril",
    label: "Lisinopril",
    hint: "Blood pressure",
  },
  {
    id: "amoxicillin",
    label: "Amoxicillin",
    hint: "Antibiotic",
  },
  {
    id: "sertraline",
    label: "Sertraline",
    hint: "Mental health",
  },
  {
    id: "omeprazole",
    label: "Omeprazole",
    hint: "Acid reflux",
  },
] as const;
