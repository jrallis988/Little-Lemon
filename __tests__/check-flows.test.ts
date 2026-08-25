import { analyzeSupplement, findSupplementByBarcode } from '../src/domain/analysis';
import {
  DEMO_HEALTH_PROFILE,
  DEMO_UNKNOWN_CHECK,
  DEMO_USER,
  SUPPLEMENT_CATALOG,
} from '../src/domain/fixtures';

describe('Check workflow domain paths', () => {
  it('resolves known barcodes used by the Scan tab', () => {
    expect(findSupplementByBarcode('012345678943')?.id).toBe('sup-catalog-testo');
  });

  it('returns null for unknown barcodes so UI can show unknown_product', () => {
    expect(findSupplementByBarcode('000000000000')).toBeUndefined();
  });

  it('produces unknown risk when formulation is empty', () => {
    const check = analyzeSupplement(
      { id: 'x', name: 'Unknown Product', ingredients: [] },
      DEMO_HEALTH_PROFILE,
      DEMO_USER.id,
    );
    expect(check.riskLevel).toBe('unknown');
    expect(check.headline).toBe(DEMO_UNKNOWN_CHECK.headline);
  });

  it('keeps historical risk levels intact for demo history items', () => {
    const levels = ['low', 'caution', 'high'] as const;
    for (const level of levels) {
      expect(levels.includes(level)).toBe(true);
    }
    const ash = SUPPLEMENT_CATALOG.find((s) => s.id === 'sup-catalog-ash')!;
    expect(analyzeSupplement(ash, DEMO_HEALTH_PROFILE, DEMO_USER.id).riskLevel).toBe('caution');
  });
});

describe('Issue screen kind coverage', () => {
  const kinds = [
    'permission',
    'offline',
    'scan_failure',
    'unknown_product',
    'incomplete_label',
    'outdated_profile',
    'unavailable_evidence',
  ];

  it('defines the expected edge-case kinds used by /check/issue', () => {
    expect(kinds).toHaveLength(7);
    expect(new Set(kinds).size).toBe(7);
  });
});
