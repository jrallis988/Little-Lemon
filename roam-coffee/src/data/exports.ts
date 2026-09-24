import type { VarietyId } from './brand';

/** Expected export filenames under /exports/ — drop Adobe finals here. */
export const EXPORT_BASE = `${import.meta.env.BASE_URL}exports`;

export type ExportSlot = {
  id: string;
  folder: string;
  file: string;
  label: string;
  category: string;
};

export function exportUrl(folder: string, file: string): string {
  return `${EXPORT_BASE}/${folder}/${file}`;
}

export const packagingExports: Record<
  VarietyId,
  { front: string; back: string; dieline: string }
> = {
  north: {
    front: 'roam-north-front.png',
    back: 'roam-north-back.png',
    dieline: 'roam-north-dieline.png',
  },
  east: {
    front: 'roam-east-front.png',
    back: 'roam-east-back.png',
    dieline: 'roam-east-dieline.png',
  },
  south: {
    front: 'roam-south-front.png',
    back: 'roam-south-back.png',
    dieline: 'roam-south-dieline.png',
  },
  west: {
    front: 'roam-west-front.png',
    back: 'roam-west-back.png',
    dieline: 'roam-west-dieline.png',
  },
};

export const exportSlots: ExportSlot[] = [
  { id: 'logo-primary', folder: '01-identity', file: 'roam-logo-primary.png', label: 'Primary logo', category: 'Identity' },
  { id: 'logo-system', folder: '01-identity', file: 'roam-logo-system.png', label: 'Logo system board', category: 'Identity' },
  ...(['north', 'east', 'south', 'west'] as VarietyId[]).flatMap((id) => {
    const name = id.toUpperCase();
    const files = packagingExports[id];
    return [
      { id: `${id}-front`, folder: '02-packaging', file: files.front, label: `${name} bag front`, category: 'Packaging' },
      { id: `${id}-back`, folder: '02-packaging', file: files.back, label: `${name} bag back`, category: 'Packaging' },
      { id: `${id}-dieline`, folder: '02-packaging', file: files.dieline, label: `${name} dieline`, category: 'Packaging' },
    ];
  }),
  { id: 'rtd-family', folder: '03-rtd', file: 'roam-rtd-family.png', label: 'RTD family', category: 'RTD' },
  { id: 'box-exterior', folder: '04-box', file: 'roam-box-exterior.png', label: 'Gift box exterior', category: 'Gift Box' },
  { id: 'cups-system', folder: '05-cups-merch', file: 'roam-cups-system.png', label: 'Cup system', category: 'Cups / Merch' },
  { id: 'storefront', folder: '06-retail', file: 'roam-storefront.png', label: 'Storefront', category: 'Retail' },
  { id: 'wall-menu', folder: '07-menu-pos', file: 'roam-wall-menu.png', label: 'Wall menu', category: 'Menu / POS' },
  { id: 'winter-pos', folder: '07-menu-pos', file: 'roam-winter-pos.png', label: 'Winter POS set', category: 'Menu / POS' },
  { id: 'preflight-pdf', folder: '08-production', file: 'roam-preflight-notes.pdf', label: 'Preflight notes PDF', category: 'Production' },
  { id: 'process-board', folder: '09-process', file: 'roam-process-board.png', label: 'Process board', category: 'Process' },
];
