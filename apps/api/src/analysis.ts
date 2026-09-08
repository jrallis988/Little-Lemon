import { EVIDENCE, RULESET_VERSION } from './catalog.js';
import type {
  EvidenceSource,
  HealthProfile,
  RiskLevel,
  SafetyFinding,
  Supplement,
  SupplementCheck,
} from './types.js';

interface Rule {
  id: string;
  match: string[];
  severity: 'high' | 'caution';
  title: string;
  summary: string;
  whatWeFound: string;
  whyTemplate: string;
  profileCategories: Array<'medication' | 'condition' | 'allergy' | 'supplement'>;
  profileTriggers?: string[];
  evidenceIds: string[];
  category: SafetyFinding['category'];
  discussWithProvider: string;
}

const RULES: Rule[] = [
  {
    id: 'rule-yohimbe',
    match: ['yohimbe'],
    severity: 'high',
    title: 'Cardiovascular ingredient concern',
    summary: 'Yohimbe may raise heart rate and blood pressure.',
    whatWeFound: 'This product contains Yohimbe.',
    whyTemplate: 'Your profile includes {item}, which may be affected by stimulatory ingredients.',
    profileCategories: ['medication', 'condition'],
    profileTriggers: ['losartan', 'digoxin', 'heart', 'blood pressure'],
    evidenceIds: ['ev-1'],
    category: 'interaction',
    discussWithProvider: 'Avoid yohimbe with heart-related conditions or cardiovascular medications.',
  },
  {
    id: 'rule-synephrine',
    match: ['synephrine', 'bitter orange'],
    severity: 'high',
    title: 'Stimulant-like ingredient',
    summary: 'Bitter orange (synephrine) may affect blood pressure.',
    whatWeFound: 'Synephrine or bitter orange extract was detected.',
    whyTemplate: 'May be relevant given {item} in your confirmed profile.',
    profileCategories: ['condition', 'medication'],
    profileTriggers: ['heart', 'losartan', 'hypertension'],
    evidenceIds: ['ev-2'],
    category: 'ingredient',
    discussWithProvider: 'Discuss stimulant-like ingredients with your clinician.',
  },
  {
    id: 'rule-sjw',
    match: ["st. john", 'st john', "john's wort"],
    severity: 'high',
    title: 'Medication interaction risk',
    summary: "St. John's Wort can interact with many prescription medicines.",
    whatWeFound: "St. John's Wort affects drug metabolism.",
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
    whatWeFound: 'Ashwagandha appears in this formulation.',
    whyTemplate: 'Your confirmed profile includes {item}.',
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
    discussWithProvider: 'Discuss bleeding risk if you take antiplatelet drugs.',
  },
  {
    id: 'rule-kava',
    match: ['kava'],
    severity: 'high',
    title: 'Liver-related caution',
    summary: 'Kava has been associated with liver-related concerns.',
    whatWeFound: 'Kava appears in this formulation.',
    whyTemplate: 'Extra caution is advised when combining herbal products with {item}.',
    profileCategories: ['medication', 'condition'],
    evidenceIds: [],
    category: 'ingredient',
    discussWithProvider: 'Avoid kava if you have liver conditions.',
  },
];

const DISCLAIMER =
  'BioCross provides informational insights, not medical advice. Always talk to your healthcare provider with any concerns.';

export function analyzeSupplement(
  supplement: Supplement,
  profile: HealthProfile,
  userId: string,
): SupplementCheck {
  if (!supplement.ingredients.length) {
    return {
      id: `check-${Date.now()}`,
      userId,
      supplement,
      checkedAt: new Date().toISOString(),
      riskLevel: 'more_info',
      headline: 'More Information Needed',
      summary: 'Product formulation is incomplete. BioCross will not invent a safety result.',
      findings: [],
      evidence: [],
      tips: ['Photograph Supplement Facts or search by name.'],
      disclaimer: DISCLAIMER,
      profileSnapshotNote: 'Insufficient product detail for analysis.',
      rulesetVersion: RULESET_VERSION,
    };
  }

  const findings: SafetyFinding[] = [];
  const evidenceIds = new Set<string>();
  let max: RiskLevel = 'low';
  const rank: Record<string, number> = { high: 3, caution: 2, more_info: 1, low: 0 };

  for (const rule of RULES) {
    const ingredient = supplement.ingredients
      .filter((i) => i.isActive)
      .find((i) => rule.match.some((m) => i.name.toLowerCase().includes(m)));
    if (!ingredient) continue;

    const items = profile.items.filter(
      (i) => i.status === 'confirmed' && rule.profileCategories.includes(i.category as Rule['profileCategories'][number]),
    );
    let profileItem = items[0];
    if (rule.profileTriggers?.length) {
      const hit = items.find((i) =>
        rule.profileTriggers!.some((t) => i.name.toLowerCase().includes(t.toLowerCase())),
      );
      // Still surface high-severity ingredients even without a profile match
      if (hit) profileItem = hit;
      else if (rule.severity !== 'high') continue;
    }

    findings.push({
      id: `f-${rule.id}-${Date.now()}`,
      severity: rule.severity,
      title: rule.title,
      summary: rule.summary,
      whatWeFound: rule.whatWeFound,
      whyItMatters: profileItem
        ? rule.whyTemplate.replace('{item}', profileItem.name)
        : rule.whyTemplate.replace('{item}', 'your health profile (confirm medications and conditions for a sharper match)'),
      triggeredByProfileItemId: profileItem?.id,
      triggeredByProfileItemLabel: profileItem?.name,
      ingredientName: ingredient.name,
      evidenceIds: rule.evidenceIds,
      discussWithProvider: rule.discussWithProvider,
      category: rule.category,
    });
    rule.evidenceIds.forEach((id) => evidenceIds.add(id));
    if (rank[rule.severity] > rank[max]) max = rule.severity;
  }

  if (findings.length === 0) {
    const soft = supplement.name.toLowerCase();
    if (soft.includes('magnesium') || soft.includes('vitamin d') || soft.includes('omega')) {
      return lowResult(supplement, profile, userId, EVIDENCE.filter((e) => e.id === 'ev-3'));
    }
    return lowResult(supplement, profile, userId, []);
  }

  const evidence = EVIDENCE.filter((e) => evidenceIds.has(e.id));
  return {
    id: `check-${Date.now()}`,
    userId,
    supplement,
    checkedAt: new Date().toISOString(),
    riskLevel: max,
    headline: max === 'high' ? 'High Risk' : 'Use Caution',
    summary:
      max === 'high'
        ? 'BioCross found ingredient-level information that may make this supplement inappropriate for you.'
        : 'Something to review based on ingredients and your health profile.',
    findings,
    evidence,
    tips:
      max === 'high'
        ? ['Do not take this supplement without clinician guidance.']
        : ['Review findings with your healthcare provider.'],
    disclaimer: DISCLAIMER,
    profileSnapshotNote: `Analyzed with ${RULESET_VERSION} against your confirmed health profile.`,
    rulesetVersion: RULESET_VERSION,
  };
}

function lowResult(
  supplement: Supplement,
  _profile: HealthProfile,
  userId: string,
  evidence: EvidenceSource[],
): SupplementCheck {
  return {
    id: `check-${Date.now()}`,
    userId,
    supplement,
    checkedAt: new Date().toISOString(),
    riskLevel: 'low',
    headline: 'No Known Conflicts',
    summary:
      'No known conflicts were identified based on your current health profile and the information available to BioCross.',
    findings: [
      {
        id: `f-low-${Date.now()}`,
        severity: 'low',
        title: 'No known conflicts found',
        summary: 'No known conflicts were identified based on available information.',
        whatWeFound: `Reviewed ${supplement.ingredients.length} active ingredient(s).`,
        whyItMatters: 'This is not a guarantee of safety.',
        evidenceIds: evidence.map((e) => e.id),
        discussWithProvider: 'Share this product with your healthcare provider if you have questions.',
        category: 'general',
      },
    ],
    evidence,
    tips: ['Keep your health profile up to date.', 'Re-check if medications change.'],
    disclaimer: DISCLAIMER,
    profileSnapshotNote: `Analyzed with ${RULESET_VERSION}.`,
    rulesetVersion: RULESET_VERSION,
  };
}
