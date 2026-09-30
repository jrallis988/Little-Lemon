export type Symptom = "fever" | "ear" | "breathing" | "rash" | "well" | "other";

export interface SymptomRoute {
  symptom: Symptom;
  clinic: string;
  visitTitle: string;
  urgent: boolean;
}

export const SYMPTOMS: Symptom[] = ["fever", "ear", "breathing", "rash", "well", "other"];

export function routeSymptom(symptom: Symptom): SymptomRoute {
  switch (symptom) {
    case "breathing":
      return { symptom, clinic: "Pediatrics", visitTitle: "Same-day sick visit", urgent: true };
    case "fever":
    case "ear":
    case "rash":
      return { symptom, clinic: "Pediatrics", visitTitle: "Sick visit", urgent: false };
    case "well":
      return { symptom, clinic: "Pediatrics", visitTitle: "Well visit", urgent: false };
    case "other":
      return { symptom, clinic: "Pediatrics", visitTitle: "Clinic visit", urgent: false };
  }
}

export interface Opening {
  id: string;
  label: string;
  clinic: string;
}

export const OPENINGS: Opening[] = [
  { id: "slot-tue", label: "Tue, Oct 6 · 10:40 AM", clinic: "Harbor Pediatrics" },
  { id: "slot-wed", label: "Wed, Oct 7 · 2:15 PM", clinic: "Harbor Pediatrics" },
  { id: "slot-thu", label: "Thu, Oct 8 · 9:00 AM", clinic: "Harbor Pediatrics" },
];
