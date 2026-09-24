import type { EvidenceSource, HealthProfile, SafetyFinding } from './models';
import { DEMO_EVIDENCE } from './fixtures';

export type IngredientRuleSeverity = 'high' | 'caution' | 'more_info';

export interface IngredientRule {
  id: string;
  /** Substring match against normalized ingredient name */
  match: string[];
  severity: IngredientRuleSeverity;
  title: string;
  summary: string;
  whatWeFound: string;
  whyTemplate: string;
  /** Profile categories to check for relevance */
  profileCategories: Array<'medication' | 'condition' | 'allergy' | 'supplement'>;
  /** If set, only triggers when profile item name contains one of these (case-insensitive) */
  profileTriggers?: string[];
  evidenceIds: string[];
  category: SafetyFinding['category'];
  discussWithProvider: string;
}

/** Demo ingredient-level interaction rules — fictional, for UX only. */
export const INGREDIENT_RULES: IngredientRule[] = [
  {
    id: 'rule-yohimbe',
    match: ['yohimbe'],
    severity: 'high',
    title: 'Cardiovascular ingredient concern',
    summary: 'Yohimbe may raise heart rate and blood pressure.',
    whatWeFound: 'This product contains Yohimbe, which has established cardiovascular concerns.',
    whyTemplate: 'Your profile includes {item}, which may be affected by stimulatory ingredients.',
    profileCategories: ['medication', 'condition'],
    profileTriggers: ['losartan', 'digoxin', 'heart', 'blood pressure'],
    evidenceIds: ['ev-1'],
    category: 'interaction',
    discussWithProvider: 'Avoid yohimbe if you have heart-related conditions or take cardiovascular medications.',
  },
  {
    id: 'rule-synephrine',
    match: ['synephrine', 'bitter orange'],
    severity: 'high',
    title: 'Stimulant-like ingredient',
    summary: 'Bitter orange (synephrine) may affect blood pressure.',
    whatWeFound: 'Synephrine or bitter orange extract was detected in the formulation.',
    whyTemplate: 'May be relevant given {item} in your confirmed profile.',
    profileCategories: ['condition', 'medication'],
    profileTriggers: ['heart', 'losartan', 'hypertension'],
    evidenceIds: ['ev-2'],
    category: 'ingredient',
    discussWithProvider: 'Discuss stimulant-like ingredients with your clinician before use.',
  },
  {
    id: 'rule-sjw',
    match: ["st. john", 'st john', "john's wort"],
    severity: 'high',
    title: 'Medication interaction risk',
    summary: "St. John's Wort can interact with many prescription medicines.",
    whatWeFound: "St. John's Wort affects how the body processes numerous medications.",
    whyTemplate: 'May interact with {item} in your profile.',
    profileCategories: ['medication'],
    evidenceIds: ['ev-4'],
    category: 'interaction',
    discussWithProvider: 'Do not combine with prescription medicines without clinician guidance.',
  },
  {
    id: 'rule-ashwagandha',
    match: ['ashwagandha'],
    severity: 'caution',
    title: 'Condition-related caution',
    summary: 'Ashwagandha may warrant review with certain conditions.',
    whatWeFound: 'Ashwagandha has been studied for stress support but may not suit all conditions.',
    whyTemplate: 'Your confirmed profile includes {item}, which may warrant extra review.',
    profileCategories: ['condition'],
    profileTriggers: ['heart', 'thyroid', 'autoimmune'],
    evidenceIds: [],
    category: 'condition',
    discussWithProvider: 'Ask your healthcare provider before starting ashwagandha.',
  },
  {
    id: 'rule-ginkgo',
    match: ['ginkgo'],
    severity: 'caution',
    title: 'Bleeding risk consideration',
    summary: 'Ginkgo may affect bleeding risk with antiplatelet medicines.',
    whatWeFound: 'Ginkgo biloba was found in the ingredient list.',
    whyTemplate: 'May be relevant with {item} in your profile.',
    profileCategories: ['medication'],
    profileTriggers: ['aspirin', 'warfarin', 'clopidogrel'],
    evidenceIds: [],
    category: 'interaction',
    discussWithProvider: 'Discuss bleeding risk with your provider if you take antiplatelet drugs.',
  },
  {
    id: 'rule-kava',
    match: ['kava'],
    severity: 'high',
    title: 'Liver-related caution',
    summary: 'Kava has been associated with liver-related concerns.',
    whatWeFound: 'Kava or kava extract appears in this formulation.',
    whyTemplate: 'Extra caution is advised when combining herbal products with {item}.',
    profileCategories: ['medication', 'condition'],
    evidenceIds: [],
    category: 'ingredient',
    discussWithProvider: 'Avoid kava if you have liver conditions or take medicines metabolized by the liver.',
  },
];

function normalizeIngredient(name: string): string {
  return name.toLowerCase().trim();
}

function matchesRule(ingredientName: string, rule: IngredientRule): boolean {
  const n = normalizeIngredient(ingredientName);
  return rule.match.some((m) => n.includes(m.toLowerCase()));
}

function findRelevantProfileItem(
  profile: HealthProfile,
  rule: IngredientRule,
): { id: string; name: string } | undefined {
  const items = profile.items.filter(
    (i) =>
      i.status === 'confirmed' &&
      rule.profileCategories.includes(i.category as IngredientRule['profileCategories'][number]),
  );
  if (rule.profileTriggers?.length) {
    const triggered = items.find((i) =>
      rule.profileTriggers!.some((t) => i.name.toLowerCase().includes(t.toLowerCase())),
    );
    if (triggered) return { id: triggered.id, name: triggered.name };
  }
  const first = items[0];
  return first ? { id: first.id, name: first.name } : undefined;
}

export function evaluateIngredientRules(
  ingredientNames: string[],
  profile: HealthProfile,
): { severity: IngredientRuleSeverity; findings: SafetyFinding[]; evidence: EvidenceSource[] } {
  const findings: SafetyFinding[] = [];
  const evidenceIds = new Set<string>();
  let maxSeverity: IngredientRuleSeverity | null = null;

  const rank = { high: 3, caution: 2, more_info: 1 };

  for (const rule of INGREDIENT_RULES) {
    const matchedIngredient = ingredientNames.find((n) => matchesRule(n, rule));
    if (!matchedIngredient) continue;

    const profileItem = findRelevantProfileItem(profile, rule);
    if (rule.profileTriggers?.length && !profileItem) continue;

    const whyItMatters = profileItem
      ? rule.whyTemplate.replace('{item}', profileItem.name)
      : rule.whyTemplate.replace('{item}', 'items in your health profile');

    findings.push({
      id: `f-${rule.id}-${Date.now()}`,
      severity: rule.severity === 'more_info' ? 'more_info' : rule.severity,
      title: rule.title,
      summary: rule.summary,
      whatWeFound: rule.whatWeFound,
      whyItMatters,
      triggeredByProfileItemId: profileItem?.id,
      triggeredByProfileItemLabel: profileItem?.name,
      ingredientName: matchedIngredient,
      evidenceIds: rule.evidenceIds,
      discussWithProvider: rule.discussWithProvider,
      category: rule.category,
    });

    rule.evidenceIds.forEach((id) => evidenceIds.add(id));
    if (!maxSeverity || rank[rule.severity] > rank[maxSeverity]) {
      maxSeverity = rule.severity;
    }
  }

  const evidence = DEMO_EVIDENCE.filter((e) => evidenceIds.has(e.id));
  return {
    severity: maxSeverity ?? 'more_info',
    findings,
    evidence,
  };
}
