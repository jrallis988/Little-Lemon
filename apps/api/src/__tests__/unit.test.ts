import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createHash, randomBytes } from 'node:crypto';
import { hashPassword, verifyPassword } from '../auth.js';
import { rateLimit } from '../rateLimit.js';
import { findByBarcode, findById, SUPPLEMENT_CATALOG } from '../catalog.js';
import { analyzeSupplement } from '../analysis.js';
import { buildExtractedItems, buildUploadedDocument, inferMimeType } from '../documents.js';
import type { HealthProfile } from '../types.js';

describe('auth hashing', () => {
  it('hashes with scrypt and verifies', () => {
    const hash = hashPassword('demo1234');
    assert.match(hash, /^scrypt:/);
    assert.equal(verifyPassword('demo1234', hash), true);
    assert.equal(verifyPassword('wrong', hash), false);
  });

  it('verifies legacy sha256 salt:digest hashes', () => {
    const salt = randomBytes(8).toString('hex');
    const digest = createHash('sha256').update(salt + 'legacy-pass').digest('hex');
    const legacy = `${salt}:${digest}`;
    assert.equal(verifyPassword('legacy-pass', legacy), true);
    assert.equal(verifyPassword('nope', legacy), false);
  });
});

describe('rateLimit', () => {
  it('allows up to the limit then blocks', () => {
    const key = `test-${Date.now()}-${Math.random()}`;
    for (let i = 0; i < 3; i++) {
      assert.equal(rateLimit({ key, limit: 3, windowMs: 60_000 }).ok, true);
    }
    const blocked = rateLimit({ key, limit: 3, windowMs: 60_000 });
    assert.equal(blocked.ok, false);
    if (!blocked.ok) assert.ok(blocked.retryAfterSec >= 1);
  });
});

describe('catalog', () => {
  it('includes turmeric/zinc/iron and resolves barcodes', () => {
    assert.ok(findById('sup-catalog-turmeric'));
    assert.ok(findById('sup-catalog-zinc'));
    assert.ok(findById('sup-catalog-iron'));
    assert.equal(findByBarcode('012345678943')?.id, 'sup-catalog-testo');
    assert.ok(SUPPLEMENT_CATALOG.length >= 11);
  });
});

describe('documents', () => {
  it('builds rich extraction set for uploads', () => {
    const doc = buildUploadedDocument({
      fileName: 'Visit_Summary.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 2_500_000,
      pageCount: 8,
    });
    assert.equal(doc.mimeType, 'application/pdf');
    assert.equal(doc.sizeBytes, 2_500_000);
    assert.equal(doc.pageCount, 8);
    assert.equal(doc.status, 'extracted');

    const items = buildExtractedItems(doc.id);
    assert.equal(items.length, 9);
    assert.ok(items.every((i) => i.documentId === doc.id));
    assert.ok(items.some((i) => i.name === 'Losartan'));
    assert.ok(items.some((i) => i.status === 'needs_detail'));
  });

  it('infers mime from filename', () => {
    assert.equal(inferMimeType('x.png'), 'image/png');
    assert.equal(inferMimeType('x.PDF'), 'application/pdf');
  });
});

describe('analysis', () => {
  it('flags TestoMax as high risk for demo heart profile', () => {
    const supplement = findById('sup-catalog-testo')!;
    const profile: HealthProfile = {
      id: 'p1',
      userId: 'u1',
      readiness: 'strong',
      readinessNote: '',
      lastUpdatedAt: new Date().toISOString(),
      items: [
        {
          id: 'c1',
          category: 'condition',
          name: 'Congenital heart disease',
          status: 'confirmed',
        },
        {
          id: 'm1',
          category: 'medication',
          name: 'Losartan',
          status: 'confirmed',
        },
      ],
    };
    const check = analyzeSupplement(supplement, profile, 'u1');
    assert.equal(check.riskLevel, 'high');
    assert.equal(check.rulesetVersion, 'ruleset_v1');
  });
});
