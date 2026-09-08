import type { EvidenceSource, Supplement } from './types.js';

export const RULESET_VERSION = 'ruleset_v1';

export const SUPPLEMENT_CATALOG: Supplement[] = [
  {
    id: 'sup-catalog-vitd',
    name: 'Vitamin D3',
    brand: 'PureHealth Essentials',
    dosage: '4000 IU (Cholecalciferol)',
    form: 'Softgel',
    barcode: '012345678905',
    ingredients: [
      { id: 'ing-d3', name: 'Vitamin D3 (Cholecalciferol)', amount: '4000 IU', isActive: true },
      { id: 'ing-oil', name: 'Olive oil', isActive: false },
    ],
  },
  {
    id: 'sup-catalog-mag',
    name: 'Magnesium Glycinate',
    brand: 'PureHealth Essentials',
    dosage: '200 mg per serving',
    form: 'Capsule',
    barcode: '012345678912',
    ingredients: [
      { id: 'ing-mag', name: 'Magnesium (as Magnesium Glycinate)', amount: '200 mg', isActive: true },
    ],
  },
  {
    id: 'sup-catalog-ash',
    name: 'Ashwagandha',
    brand: 'CalmRoot Botanicals',
    dosage: '500 mg',
    form: 'Capsule',
    barcode: '012345678929',
    ingredients: [{ id: 'ing-ash', name: 'Ashwagandha root extract', amount: '500 mg', isActive: true }],
  },
  {
    id: 'sup-catalog-sjw',
    name: "St. John's Wort",
    brand: 'HerbField',
    dosage: '300 mg',
    form: 'Capsule',
    barcode: '012345678936',
    ingredients: [{ id: 'ing-sjw', name: "St. John's Wort extract", amount: '300 mg', isActive: true }],
  },
  {
    id: 'sup-catalog-testo',
    name: 'TestoMax 9000',
    brand: 'Prime Labs',
    dosage: '2 Capsules',
    form: 'Dietary Supplement',
    barcode: '012345678943',
    ingredients: [
      { id: 'ing-hge', name: 'Horny Goat Weed (Epimedium)', amount: '500 mg', isActive: true },
      { id: 'ing-yoh', name: 'Yohimbe Extract', amount: '50 mg', isActive: true },
      { id: 'ing-bit', name: 'Bitter Orange Extract (Synephrine)', amount: '30 mg', isActive: true },
      { id: 'ing-zinc', name: 'Zinc', amount: '15 mg', isActive: true },
    ],
  },
  {
    id: 'sup-catalog-omega',
    name: 'Omega-3 Fish Oil 1200mg',
    brand: 'OceanPure Supplements',
    dosage: '1200 mg',
    form: 'Softgel',
    barcode: '012345678950',
    ingredients: [
      { id: 'ing-epa', name: 'EPA', amount: '400 mg', isActive: true },
      { id: 'ing-dha', name: 'DHA', amount: '300 mg', isActive: true },
    ],
  },
  {
    id: 'sup-catalog-ginkgo',
    name: 'Ginkgo Biloba',
    brand: 'MindLeaf',
    dosage: '120 mg',
    form: 'Capsule',
    barcode: '012345678981',
    ingredients: [{ id: 'ing-gink', name: 'Ginkgo biloba extract', amount: '120 mg', isActive: true }],
  },
  {
    id: 'sup-catalog-kava',
    name: 'Kava Root Extract',
    brand: 'Pacific Calm',
    dosage: '250 mg',
    form: 'Capsule',
    barcode: '012345678998',
    ingredients: [{ id: 'ing-kava', name: 'Kava root extract', amount: '250 mg', isActive: true }],
  },
];

export const EVIDENCE: EvidenceSource[] = [
  {
    id: 'ev-1',
    source: 'NIH / MedlinePlus',
    publication: 'Yohimbe',
    publicationDate: '2024-11-12',
    studyType: 'Monograph',
    relevantFinding: 'Yohimbe may raise blood pressure and heart rate.',
    evidenceStrength: 'established',
    retrievedAt: '2026-05-01T00:00:00.000Z',
  },
  {
    id: 'ev-2',
    source: 'FDA',
    publication: 'Bitter orange advisory',
    publicationDate: '2023-06-01',
    studyType: 'Regulatory advisory',
    relevantFinding: 'Bitter orange (synephrine) associated with cardiovascular effects.',
    evidenceStrength: 'established',
    retrievedAt: '2026-05-01T00:00:00.000Z',
  },
  {
    id: 'ev-3',
    source: 'NIH ODS',
    publication: 'Magnesium Fact Sheet',
    publicationDate: '2025-03-01',
    studyType: 'Evidence review',
    relevantFinding: 'Magnesium glycinate generally well tolerated at typical doses.',
    evidenceStrength: 'moderate',
    retrievedAt: '2026-05-01T00:00:00.000Z',
  },
  {
    id: 'ev-4',
    source: 'Mayo Clinic',
    publication: "St. John's wort",
    publicationDate: '2025-01-15',
    studyType: 'Clinical overview',
    relevantFinding: "St. John's wort can interact with many medications.",
    evidenceStrength: 'established',
    retrievedAt: '2026-05-01T00:00:00.000Z',
  },
];

export function findByQuery(query: string): Supplement[] {
  const q = query.trim().toLowerCase();
  if (!q) return SUPPLEMENT_CATALOG;
  return SUPPLEMENT_CATALOG.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.brand?.toLowerCase().includes(q) ||
      s.barcode?.includes(q) ||
      s.ingredients.some((i) => i.name.toLowerCase().includes(q)),
  );
}

export function findByBarcode(code: string): Supplement | undefined {
  return SUPPLEMENT_CATALOG.find((s) => s.barcode === code);
}

export function findById(id: string): Supplement | undefined {
  return SUPPLEMENT_CATALOG.find((s) => s.id === id);
}
