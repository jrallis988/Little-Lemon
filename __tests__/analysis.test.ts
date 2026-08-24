import {
  analyzeSupplement,
  findSupplementByBarcode,
  findSupplementByQuery,
  riskLevelLabel,
} from '../src/domain/analysis';
import {
  DEMO_HEALTH_PROFILE,
  DEMO_USER,
  SUPPLEMENT_CATALOG,
} from '../src/domain/fixtures';

describe('BioCross safety analysis', () => {
  const profile = DEMO_HEALTH_PROFILE;
  const userId = DEMO_USER.id;

  it('returns high risk for TestoMax with structured findings', () => {
    const supplement = SUPPLEMENT_CATALOG.find((s) => s.id === 'sup-catalog-testo')!;
    const result = analyzeSupplement(supplement, profile, userId);

    expect(result.riskLevel).toBe('high');
    expect(result.headline).toBe('High Risk');
    expect(result.findings.length).toBeGreaterThanOrEqual(3);
    expect(result.findings.some((f) => f.category === 'interaction')).toBe(true);
    expect(result.findings.some((f) => f.triggeredByProfileItemLabel)).toBe(true);
    expect(result.disclaimer.toLowerCase()).toContain('not medical advice');
  });

  it('returns low risk language without absolute safety guarantees for magnesium', () => {
    const supplement = SUPPLEMENT_CATALOG.find((s) => s.id === 'sup-catalog-mag')!;
    const result = analyzeSupplement(supplement, profile, userId);

    expect(result.riskLevel).toBe('low');
    expect(result.summary.toLowerCase()).not.toContain('this supplement is safe for you');
    expect(result.headline).toBe('Low Risk');
  });

  it('returns unknown when product identity is incomplete', () => {
    const result = analyzeSupplement(
      { id: 'x', name: 'Unknown Product', ingredients: [] },
      profile,
      userId,
    );

    expect(result.riskLevel).toBe('unknown');
    expect(result.headline).toBe('Unable to Determine');
  });

  it('returns caution for ashwagandha against heart condition profile', () => {
    const supplement = SUPPLEMENT_CATALOG.find((s) => s.id === 'sup-catalog-ash')!;
    const result = analyzeSupplement(supplement, profile, userId);

    expect(result.riskLevel).toBe('caution');
    expect(result.findings[0]?.triggeredByProfileItemLabel).toMatch(/heart/i);
  });

  it('preserves evidence linkage on high-risk St. John\'s Wort findings', () => {
    const supplement = SUPPLEMENT_CATALOG.find((s) => s.id === 'sup-catalog-sjw')!;
    const result = analyzeSupplement(supplement, profile, userId);

    expect(result.riskLevel).toBe('high');
    expect(result.evidence.length).toBeGreaterThan(0);
    expect(result.findings[0]?.evidenceIds.length).toBeGreaterThan(0);
  });
});

describe('Supplement lookup', () => {
  it('finds supplements by name, brand, or ingredient', () => {
    expect(findSupplementByQuery('Magnesium').length).toBeGreaterThan(0);
    expect(findSupplementByQuery('PureHealth').length).toBeGreaterThan(0);
    expect(findSupplementByQuery('Yohimbe').length).toBeGreaterThan(0);
  });

  it('resolves barcodes to catalog products', () => {
    expect(findSupplementByBarcode('012345678943')?.name).toBe('TestoMax 9000');
    expect(findSupplementByBarcode('000')).toBeUndefined();
  });

  it('maps risk levels to accessible text labels', () => {
    expect(riskLevelLabel('low')).toBe('Low Risk');
    expect(riskLevelLabel('caution')).toBe('Use Caution');
    expect(riskLevelLabel('high')).toBe('High Risk');
    expect(riskLevelLabel('unknown')).toBe('Unable to Determine');
  });
});

describe('Health profile provenance', () => {
  const profile = DEMO_HEALTH_PROFILE;

  it('keeps document provenance on imported confirmed items', () => {
    const imported = profile.items.filter((i) => i.sourceDocumentId);
    expect(imported.length).toBeGreaterThan(0);
    expect(imported.every((i) => i.status === 'confirmed' || i.status === 'pending_review')).toBe(true);
  });

  it('distinguishes missing/not reviewed from confirmed information', () => {
    const statuses = new Set(profile.items.map((i) => i.status));
    expect(statuses.has('confirmed')).toBe(true);
    expect(
      profile.items.some((i) => i.status === 'not_reviewed' || i.status === 'pending_review'),
    ).toBe(true);
  });
});
