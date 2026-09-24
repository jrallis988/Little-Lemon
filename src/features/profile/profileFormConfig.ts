import type { ProfileItemCategory } from '../../domain/models';

export interface ProfileFormField {
  key: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
}

export const PROFILE_FORM_FIELDS: Record<string, ProfileFormField[]> = {
  conditions: [
    { key: 'name', label: 'Condition name', placeholder: 'e.g. Type 2 diabetes', required: true },
    { key: 'details', label: 'Details (optional)', placeholder: 'Diagnosis year, severity, notes', multiline: true },
  ],
  medications: [
    { key: 'name', label: 'Medication name', placeholder: 'e.g. Metformin', required: true },
    { key: 'dosage', label: 'Dosage', placeholder: 'e.g. 500 mg', required: true },
    { key: 'frequency', label: 'Frequency', placeholder: 'e.g. Twice daily with meals' },
    { key: 'details', label: 'Notes (optional)', placeholder: 'Prescriber, start date', multiline: true },
  ],
  supplements: [
    { key: 'name', label: 'Supplement name', placeholder: 'e.g. Vitamin D3', required: true },
    { key: 'dosage', label: 'Amount / dose', placeholder: 'e.g. 2000 IU daily' },
    { key: 'details', label: 'Brand or notes', placeholder: 'Optional' },
  ],
  allergies: [
    { key: 'name', label: 'Allergen', placeholder: 'e.g. Penicillin', required: true },
    { key: 'reaction', label: 'Reaction', placeholder: 'e.g. Hives, anaphylaxis', required: true },
    { key: 'details', label: 'Additional notes', multiline: true },
  ],
  surgeries: [
    { key: 'name', label: 'Procedure name', placeholder: 'e.g. Appendectomy', required: true },
    { key: 'year', label: 'Year', placeholder: 'e.g. 2019' },
    { key: 'details', label: 'Notes', multiline: true },
  ],
  testResults: [
    { key: 'name', label: 'Test name', placeholder: 'e.g. Vitamin D, 25-Hydroxy', required: true },
    { key: 'details', label: 'Result & date', placeholder: 'e.g. 22 ng/mL — March 2026', required: true },
  ],
  recentChanges: [
    { key: 'name', label: 'What changed?', placeholder: 'e.g. Started new medication', required: true },
    { key: 'details', label: 'When & details', placeholder: 'Approximate date and context', multiline: true },
  ],
};

export const SECTION_TO_CATEGORY: Record<string, ProfileItemCategory> = {
  conditions: 'condition',
  medications: 'medication',
  supplements: 'supplement',
  allergies: 'allergy',
  surgeries: 'procedure',
  testResults: 'lab_result',
  recentChanges: 'recent_change',
};
