/** Print / production checklist content for the case study */

export const processSteps = [
  {
    title: 'Strategy',
    detail: 'Travel-inspired positioning without rustic coffee clichés. Brand line locked early: Coffee for wherever you’re going.',
  },
  {
    title: 'Identity',
    detail: 'Compass/path mark + ROAM wordmark. Primary, secondary, one-color, reversed, and small-scale lockups.',
  },
  {
    title: 'Architecture',
    detail: 'Four directional SKUs — North, East, South, West — distinguished by pattern, color, and typography, not recolors.',
  },
  {
    title: 'Packaging',
    detail: 'Front/back bag system, variable labels, RTD cans, gift box, cups, and merch sharing one visual language.',
  },
  {
    title: 'Retail',
    detail: 'Storefront, interior graphics, wall + printed menus, shelf system, and seasonal POS within the brand.',
  },
  {
    title: 'Production',
    detail: 'Dielines with bleed/trim/safe/fold/seal, barcode clearance, hierarchy, and print-ready file thinking.',
  },
] as const;

export const adobeWorkflow = [
  {
    app: 'Illustrator',
    role: 'Primary',
    uses: ['Logo system', 'Bag & label artwork', 'Dielines', 'Vector patterns', 'Signage', 'POS vector'],
  },
  {
    app: 'Photoshop',
    role: 'Imaging',
    uses: ['Product photography', 'Retouching', 'Environmental mockups', 'Campaign composites'],
  },
  {
    app: 'InDesign',
    role: 'Collateral',
    uses: ['Printed menu', 'Product sheets', 'Multi-page case study', 'Retail leave-behinds'],
  },
] as const;

export const preflightChecks = [
  { id: 'colors', label: 'Color mode', detail: 'CMYK for process print; spot accents documented where used' },
  { id: 'bleed', label: 'Bleed', detail: '0.125" minimum beyond trim on all sides' },
  { id: 'trim', label: 'Trim & fold', detail: 'Trim marks and fold lines on separate dieline layer' },
  { id: 'safe', label: 'Safe area', detail: 'Critical type and logos inside safe margin' },
  { id: 'type', label: 'Type', detail: 'Fonts outlined or packaged; hierarchy locked' },
  { id: 'images', label: 'Images', detail: '300 ppi at final size; linked files collected' },
  { id: 'barcode', label: 'Barcode', detail: 'Quiet zone clear; contrast verified; placeholder noted' },
  { id: 'export', label: 'Export', detail: 'PDF/X-1a or printer-specified PDF; layered AI retained' },
] as const;

export const exportManifest = [
  { path: '01-identity/', items: 'Logo AI + SVG + one-color / reversed PDFs' },
  { path: '02-packaging/', items: 'North–West bag fronts/backs, dielines, label set' },
  { path: '03-rtd/', items: 'Can wraps front/back + nutrition panels' },
  { path: '04-box/', items: 'Gift box exterior/interior + info card' },
  { path: '05-cups-merch/', items: 'Cup, sleeve, bag, mug, tote, tee, hat art' },
  { path: '06-retail/', items: 'Storefront, interior, shelf, signage exports' },
  { path: '07-menu-pos/', items: 'Wall menu, printed menu, winter POS set, posters' },
  { path: '08-production/', items: 'Print-ready PDF/X + preflight notes' },
] as const;
