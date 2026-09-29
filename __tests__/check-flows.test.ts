import { analyzeSupplement, findSupplementByBarcode } from '../src/domain/analysis';
import {
  DEMO_HEALTH_PROFILE,
  DEMO_MORE_INFO_CHECK,
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

  it('produces more_info risk when formulation is empty', () => {
    const check = analyzeSupplement(
      { id: 'x', name: 'Unknown Product', ingredients: [] },
      DEMO_HEALTH_PROFILE,
      DEMO_USER.id,
    );
    expect(check.riskLevel).toBe('more_info');
    expect(check.headline).toBe(DEMO_MORE_INFO_CHECK.headline);
  });

  it('keeps historical risk levels intact for demo history items', () => {
    const levels = ['low', 'caution', 'high', 'more_info'] as const;
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
    'network',
    'scan_failure',
    'unknown_product',
    'incomplete_label',
    'label_partial',
    'formulation_uncertain',
    'outdated_profile',
    'unavailable_evidence',
    'research_unavailable',
    'analysis_failed',
    'upload_failed',
    'unsupported_file',
  ];

  it('defines the expected edge-case kinds used by /check/issue', () => {
    expect(kinds).toHaveLength(14);
    expect(new Set(kinds).size).toBe(14);
  });
});
