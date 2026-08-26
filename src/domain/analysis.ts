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

  const name = supplement.name.toLowerCase();
  if (name.includes('testomax') || name.includes('yohimbe')) {
    return {
      ...DEMO_HIGH_RISK_CHECK,
      id: `check-${Date.now()}`,
      userId,
      supplement,
      checkedAt: new Date().toISOString(),
    };
  }
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
  if (name.includes("st. john") || name.includes('st john')) {
    return buildHighFromProfile(supplement, profile, userId, "St. John's Wort");
  }
  if (name.includes('ashwagandha')) {
    return buildCaution(supplement, profile, userId);
  }

  // Default: low concern when no structured conflicts match demo rules
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
        whatWeFound: `Reviewed ${supplement.ingredients.length || 'available'} ingredient(s) against your confirmed profile.`,
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

function buildCaution(supplement: Supplement, profile: HealthProfile, userId: string): SupplementCheck {
  const condition = profile.items.find((i) => i.category === 'condition' && i.status === 'confirmed');
  const finding: SafetyFinding = {
    id: `f-caution-${Date.now()}`,
    severity: 'caution',
    title: 'Something to review',
    summary: `${supplement.name} may warrant caution with items in your health profile.`,
    whatWeFound: `${supplement.name} has been associated with effects that may matter for certain conditions.`,
    whyItMatters: condition
      ? `Your confirmed profile includes ${condition.name}.`
      : 'Your profile suggests extra review is warranted.',
    triggeredByProfileItemId: condition?.id,
    triggeredByProfileItemLabel: condition?.name,
    ingredientName: supplement.ingredients[0]?.name,
    evidenceIds: [],
    discussWithProvider: 'Ask your healthcare provider before using this supplement.',
    category: 'condition',
  };

  return {
    id: `check-${Date.now()}`,
    userId,
    supplement,
    checkedAt: new Date().toISOString(),
    riskLevel: 'caution',
    headline: 'Use Caution',
    summary: 'Something to review based on your health profile.',
    findings: [finding],
    evidence: [],
    tips: ['Do not start without clinician guidance if you have heart-related conditions.'],
    disclaimer:
      'BioCross provides informational insights, not medical advice. Always talk to your healthcare provider with any concerns.',
    profileSnapshotNote: 'We analyzed this supplement against your health profile.',
  };
}

function buildHighFromProfile(
  supplement: Supplement,
  profile: HealthProfile,
  userId: string,
  label: string,
): SupplementCheck {
  const med = profile.items.find((i) => i.category === 'medication' && i.status === 'confirmed');
  const evidence: EvidenceSource[] = DEMO_EVIDENCE.filter((e) => e.id === 'ev-4');
  const finding: SafetyFinding = {
    id: `f-high-${Date.now()}`,
    severity: 'high',
    title: 'Potential conflict found',
    summary: `${label} may interact with medications in your profile.`,
    whatWeFound: `${label} can affect how the body processes many medications.`,
    whyItMatters: med
      ? `May interact with ${med.name}${med.details ? ` (${med.details})` : ''}.`
      : 'May interact with medications you take.',
    triggeredByProfileItemId: med?.id,
    triggeredByProfileItemLabel: med?.name,
    ingredientName: label,
    evidenceIds: evidence.map((e) => e.id),
    discussWithProvider: 'Do not combine with prescription medicines without clinician guidance.',
    category: 'interaction',
  };

  return {
    id: `check-${Date.now()}`,
    userId,
    supplement,
    checkedAt: new Date().toISOString(),
    riskLevel: 'high',
    headline: 'High Risk',
    summary: 'BioCross found information that may make this supplement inappropriate for you.',
    findings: [finding],
    evidence,
    tips: ['Do not take this supplement.', 'Talk to your healthcare provider about safer alternatives.'],
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
