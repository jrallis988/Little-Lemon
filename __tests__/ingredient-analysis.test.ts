import { analyzeSupplement } from '../src/domain/analysis';
import { evaluateIngredientRules } from '../src/domain/ingredientRules';
import { recheckSupplement, shouldOfferRecheck } from '../src/domain/recheck';
import {
  DEMO_HEALTH_PROFILE,
  DEMO_USER,
  SUPPLEMENT_CATALOG,
} from '../src/domain/fixtures';

describe('Ingredient-level analysis', () => {
  it('flags yohimbe as high risk for cardiovascular profile', () => {
    const testo = SUPPLEMENT_CATALOG.find((s) => s.id === 'sup-catalog-testo')!;
    const check = analyzeSupplement(testo, DEMO_HEALTH_PROFILE, DEMO_USER.id);
    expect(check.riskLevel).toBe('high');
    expect(check.findings.some((f) => f.ingredientName?.toLowerCase().includes('yohimbe'))).toBe(true);
  });

  it('evaluates ginkgo against aspirin profile item', () => {
    const ginkgo = SUPPLEMENT_CATALOG.find((s) => s.id === 'sup-catalog-ginkgo')!;
    const result = evaluateIngredientRules(
      ginkgo.ingredients.map((i) => i.name),
      DEMO_HEALTH_PROFILE,
    );
    expect(result.findings.length).toBeGreaterThan(0);
  });
});

describe('Recheck logic', () => {
  it('offers recheck when profile updated after check', () => {
    const testo = SUPPLEMENT_CATALOG.find((s) => s.id === 'sup-catalog-testo')!;
    const check = {
      ...analyzeSupplement(testo, DEMO_HEALTH_PROFILE, DEMO_USER.id),
      checkedAt: '2020-01-01T00:00:00.000Z',
    };
    const staleProfile = { ...DEMO_HEALTH_PROFILE, lastUpdatedAt: new Date().toISOString() };
    expect(shouldOfferRecheck(check, staleProfile)).toBe(true);
  });

  it('recheck clears newerInfoAvailable flag', () => {
    const testo = SUPPLEMENT_CATALOG.find((s) => s.id === 'sup-catalog-testo')!;
    const prior = {
      ...analyzeSupplement(testo, DEMO_HEALTH_PROFILE, DEMO_USER.id),
      id: 'check-recheck-1',
      newerInfoAvailable: true,
    };
    const next = recheckSupplement(prior, DEMO_HEALTH_PROFILE, DEMO_USER.id);
    expect(next.newerInfoAvailable).toBe(false);
    expect(next.id).toBe(prior.id);
  });
});
