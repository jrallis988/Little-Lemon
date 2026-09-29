/**
 * Demo extraction fixtures for document upload (beta — no OCR yet).
 * Mirrors the mock client's DEMO_EXTRACTED_ITEMS set so remote onboarding matches.
 */
import type { ExtractedHealthItem } from './types.js';

export interface UploadMeta {
  fileName: string;
  mimeType?: string;
  sizeBytes?: number;
  pageCount?: number;
}

const EXTRACTION_TEMPLATE: Omit<ExtractedHealthItem, 'id' | 'documentId'>[] = [
  {
    category: 'condition',
    name: 'Congenital heart disease',
    details: 'D-Transposition of the Great Arteries',
    status: 'ready',
  },
  {
    category: 'procedure',
    name: 'Pulmonary valve replacement',
    details: '2016',
    status: 'ready',
  },
  {
    category: 'medication',
    name: 'Losartan',
    details: '50 mg daily',
    status: 'ready',
  },
  {
    category: 'medication',
    name: 'Aspirin',
    details: '81 mg daily',
    status: 'ready',
  },
  {
    category: 'medication',
    name: 'Digoxin',
    details: '125 mcg daily',
    status: 'ready',
  },
  {
    category: 'medication',
    name: 'Amoxicillin',
    details: '500 mg before dental procedures',
    status: 'ready',
  },
  {
    category: 'allergy',
    name: 'No known allergies (NKDA)',
    status: 'ready',
  },
  {
    category: 'lab_result',
    name: 'Kidney function labs',
    details: 'Multiple results found.',
    status: 'needs_detail',
    needsDetailReason: 'Multiple results found',
  },
  {
    category: 'lab_result',
    name: 'Liver enzyme results',
    details: 'Multiple results found.',
    status: 'needs_detail',
    needsDetailReason: 'Multiple results found',
  },
];

export function inferMimeType(fileName: string, mimeType?: string): string {
  if (mimeType?.trim()) return mimeType.trim();
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.pdf')) return 'application/pdf';
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  return 'image/jpeg';
}

export function buildUploadedDocument(meta: UploadMeta) {
  const fileName = meta.fileName?.trim() || 'upload.pdf';
  return {
    id: `doc-${Date.now()}`,
    fileName,
    mimeType: inferMimeType(fileName, meta.mimeType),
    sizeBytes: typeof meta.sizeBytes === 'number' && meta.sizeBytes > 0 ? meta.sizeBytes : 1_200_000,
    pageCount: typeof meta.pageCount === 'number' && meta.pageCount > 0 ? meta.pageCount : 12,
    uploadedAt: new Date().toISOString(),
    status: 'extracted' as const,
  };
}

export function buildExtractedItems(documentId: string): ExtractedHealthItem[] {
  return EXTRACTION_TEMPLATE.map((item, index) => ({
    ...item,
    id: `ext-${documentId}-${index + 1}`,
    documentId,
  }));
}
