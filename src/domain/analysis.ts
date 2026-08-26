import type {
  EvidenceSource,
  HealthProfile,
  RiskLevel,
  SafetyFinding,
  Supplement,
  SupplementCheck,
} from './models';
import {
  DEMO_EVIDENCE,
  DEMO_HIGH_RISK_CHECK,
  DEMO_LOW_RISK_CHECK,
  DEMO_MORE_INFO_CHECK,
  SUPPLEMENT_CATALOG,
} from './fixtures';
import { evaluateIngredientRules } from './ingredientRules';

/**
 * Safety analysis retains structured reasoning:
 * supplement → ingredient → potential issue → health-profile item → evidence → severity → explanation
 */
export function analyzeSupplement(
  supplement: Supplement,
  profile: HealthProfile,
  userId: string,
): SupplementCheck {
  if (!supplement.ingredients.length && (!supplement.name || supplement.name === 'Unknown Product')) {
    return { ...DEMO_MORE_INFO_CHECK, id: `check-${Date.now()}`, userId, checkedAt: new Date().toISOString() };
  }

  const ingredientNames = supplement.ingredients.filter((i) => i.isActive).map((i) => i.name);
  const ruleResult = evaluateIngredientRules(ingredientNames, profile);

  if (ruleResult.findings.length > 0) {
    const riskLevel: RiskLevel =
      ruleResult.severity === 'high'
        ? 'high'
        : ruleResult.severity === 'caution'
          ? 'caution'
          : 'more_info';

    const headline =
      riskLevel === 'high' ? 'High Risk' : riskLevel === 'caution' ? 'Use Caution' : 'More Information Needed';

    const summary =
      riskLevel === 'high'
        ? 'BioCross found ingredient-level information that may make this supplement inappropriate for you.'
        : riskLevel === 'caution'
          ? 'Something to review based on ingredients and your health profile.'
          : 'We need more confirmed profile or product information before a full assessment.';

    return {
      id: `check-${Date.now()}`,
      userId,
      supplement,
      checkedAt: new Date().toISOString(),
      riskLevel,
      headline,
      summary,
      findings: ruleResult.findings,
      evidence: ruleResult.evidence,
      tips:
        riskLevel === 'high'
          ? ['Do not take this supplement without clinician guidance.', 'Ask about safer alternatives.']
          : ['Review findings with your healthcare provider.', 'Keep your health profile up to date.'],
      disclaimer:
        'BioCross provides informational insights, not medical advice. Always talk to your healthcare provider with any concerns.',
      profileSnapshotNote: 'We analyzed active ingredients against your confirmed health profile.',
    };
  }

  const name = supplement.name.toLowerCase();
  if (name.includes('magnesium') || name.includes('vitamin d')) {
    return {
      ...DEMO_LOW_RISK_CHECK,
      id: `check-${Date.now()}`,
      userId,
      supplement,
      checkedAt: new Date().toISOString(),
      evidence: DEMO_EVIDENCE.filter((e) => e.id === 'ev-3'),
    };
  }

  return buildDefaultLow(supplement, profile, userId);
}

function buildDefaultLow(supplement: Supplement, profile: HealthProfile, userId: string): SupplementCheck {
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
        id: `f-${Date.now()}`,
        severity: 'low',
        title: 'No known conflicts found',
        summary:
          'No known conflicts were identified based on the health information currently available to BioCross.',
        whatWeFound: `Reviewed ${supplement.ingredients.length || 'available'} active ingredient(s) against your confirmed profile.`,
        whyItMatters:
          'BioCross only reports based on confirmed profile items and available evidence — this is not a guarantee of safety.',
        evidenceIds: [],
        discussWithProvider: 'Share this product with your healthcare provider if you have any questions.',
        category: 'general',
      },
    ],
    evidence: [],
    tips: [
      'Keep your health profile up to date.',
      'Re-check if your medications or conditions change.',
    ],
    disclaimer:
      'BioCross provides informational insights, not medical advice. Always talk to your healthcare provider with any concerns.',
    profileSnapshotNote: 'We analyzed this supplement against your health profile.',
  };
}

export function findSupplementByQuery(query: string): Supplement[] {
  const q = query.trim().toLowerCase();
  if (!q) return SUPPLEMENT_CATALOG;
  return SUPPLEMENT_CATALOG.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.brand?.toLowerCase().includes(q) ||
      s.ingredients.some((i) => i.name.toLowerCase().includes(q)) ||
      s.barcode?.includes(q),
  );
}

export function findSupplementByBarcode(barcode: string): Supplement | undefined {
  return SUPPLEMENT_CATALOG.find((s) => s.barcode === barcode);
}

export function riskLevelLabel(level: RiskLevel): string {
  switch (level) {
    case 'low':
      return 'No Known Conflicts';
    case 'caution':
      return 'Use Caution';
    case 'high':
      return 'High Risk';
    case 'more_info':
      return 'More Information Needed';
  }
}

export function countByCategory(profile: HealthProfile) {
  const confirmed = (cat: string) =>
    profile.items.filter((i) => i.category === cat && i.status === 'confirmed').length;
  return {
    conditions: confirmed('condition'),
    medications: confirmed('medication'),
    supplements: confirmed('supplement'),
    allergies: confirmed('allergy'),
    surgeries: confirmed('procedure'),
    testResults: confirmed('lab_result'),
  };
}
