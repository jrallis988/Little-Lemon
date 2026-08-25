/** ROAM Coffee — brand & product data for the portfolio presentation */

export const brand = {
  name: 'ROAM',
  fullName: 'ROAM Coffee',
  line: 'Coffee for wherever you’re going.',
  tagline: 'COFFEE FOR WHEREVER YOU’RE GOING.',
  audience: 'Ages 20–45',
  description:
    'A contemporary specialty coffee company built around travel, exploration, places, and everyday routines.',
} as const;

export type VarietyId = 'north' | 'east' | 'south' | 'west';

export interface CoffeeVariety {
  id: VarietyId;
  name: string;
  roast: string;
  notes: [string, string, string];
  origin: string;
  altitude: string;
  process: string;
  weight: string;
  brew: string;
  color: string;
  colorSoft: string;
  ink: string;
  pattern: 'aurora' | 'dawn' | 'ember' | 'horizon';
  story: string;
}

export const varieties: CoffeeVariety[] = [
  {
    id: 'north',
    name: 'NORTH',
    roast: 'Light Roast',
    notes: ['Bright', 'Citrus', 'Floral'],
    origin: 'Yirgacheffe, Ethiopia',
    altitude: '1,900–2,200 masl',
    process: 'Washed',
    weight: '12 oz / 340 g',
    brew: 'Pour-over · 1:16 · 205°F · 3:00',
    color: '#4A7C8C',
    colorSoft: '#D4E4E8',
    ink: '#1A2F36',
    pattern: 'aurora',
    story: 'High-elevation lots with bergamot lift and jasmine finish — coffee for clear mornings and open roads.',
  },
  {
    id: 'east',
    name: 'EAST',
    roast: 'Medium Roast',
    notes: ['Caramel', 'Berry', 'Balanced'],
    origin: 'Huila, Colombia',
    altitude: '1,600–1,900 masl',
    process: 'Washed',
    weight: '12 oz / 340 g',
    brew: 'Drip · 1:15 · 200°F · 4:00',
    color: '#C45B5B',
    colorSoft: '#F0D8D6',
    ink: '#3A1F1F',
    pattern: 'dawn',
    story: 'Sunrise sweetness with soft berry and caramel — the everyday cup that still feels like somewhere new.',
  },
  {
    id: 'south',
    name: 'SOUTH',
    roast: 'Dark Roast',
    notes: ['Chocolate', 'Toasted', 'Full Body'],
    origin: 'Tarrazú, Costa Rica',
    altitude: '1,400–1,700 masl',
    process: 'Honey',
    weight: '12 oz / 340 g',
    brew: 'French press · 1:14 · 200°F · 4:00',
    color: '#6B3A4A',
    colorSoft: '#E8D6DC',
    ink: '#2A151C',
    pattern: 'ember',
    story: 'Deep cocoa and toasted sugar with lasting body — for late nights, long trains, and quiet tables.',
  },
  {
    id: 'west',
    name: 'WEST',
    roast: 'Espresso',
    notes: ['Cocoa', 'Nutty', 'Rich'],
    origin: 'Antigua, Guatemala',
    altitude: '1,500–1,700 masl',
    process: 'Washed',
    weight: '12 oz / 340 g',
    brew: 'Espresso · 18g in · 36g out · 28s',
    color: '#C4893A',
    colorSoft: '#F0E4D0',
    ink: '#2E2418',
    pattern: 'horizon',
    story: 'Dense, nutty espresso with cocoa depth — built for milk drinks and the last stretch of the day.',
  },
];

export type RtdId = 'original' | 'oat' | 'vanilla';

export interface RtdProduct {
  id: RtdId;
  name: string;
  subtitle: string;
  notes: string;
  color: string;
  colorSoft: string;
  size: string;
  calories: number;
  caffeine: string;
}

export const rtdProducts: RtdProduct[] = [
  {
    id: 'original',
    name: 'ORIGINAL',
    subtitle: 'Cold Brew',
    notes: 'Smooth · Chocolate · Clean finish',
    color: '#1A2A32',
    colorSoft: '#D6DEE2',
    size: '11 fl oz',
    calories: 15,
    caffeine: '155 mg',
  },
  {
    id: 'oat',
    name: 'OAT',
    subtitle: 'Cold Brew + Oat',
    notes: 'Creamy · Toasted · Soft sweetness',
    color: '#8B6B4A',
    colorSoft: '#E8DFD4',
    size: '11 fl oz',
    calories: 120,
    caffeine: '145 mg',
  },
  {
    id: 'vanilla',
    name: 'VANILLA',
    subtitle: 'Cold Brew',
    notes: 'Vanilla bean · Round · Easy',
    color: '#5A6B7A',
    colorSoft: '#DCE2E8',
    size: '11 fl oz',
    calories: 90,
    caffeine: '150 mg',
  },
];

export const menuCategories = [
  {
    id: 'coffee',
    title: 'COFFEE',
    items: [
      { name: 'House Drip', detail: 'East · rotating', price: '3.50' },
      { name: 'Pour-Over', detail: 'Single origin', price: '5.00' },
      { name: 'Batch Brew', detail: 'North or South', price: '3.75' },
      { name: 'Coffee Refill', detail: 'Same day', price: '1.50' },
    ],
  },
  {
    id: 'espresso',
    title: 'ESPRESSO',
    items: [
      { name: 'Espresso', detail: 'West', price: '3.25' },
      { name: 'Americano', detail: '', price: '3.75' },
      { name: 'Cappuccino', detail: '', price: '4.50' },
      { name: 'Latte', detail: 'Oat +0.75', price: '4.75' },
      { name: 'Flat White', detail: '', price: '4.75' },
      { name: 'Mocha', detail: '', price: '5.25' },
    ],
  },
  {
    id: 'cold',
    title: 'COLD',
    items: [
      { name: 'Iced Coffee', detail: '', price: '4.00' },
      { name: 'Cold Brew', detail: 'Original', price: '4.50' },
      { name: 'Oat Cold Brew', detail: 'Bottled or draft', price: '5.00' },
      { name: 'Vanilla Cold Brew', detail: '', price: '5.00' },
      { name: 'Iced Latte', detail: '', price: '5.00' },
    ],
  },
  {
    id: 'tea',
    title: 'TEA',
    items: [
      { name: 'Assam Black', detail: '', price: '3.50' },
      { name: 'Sencha', detail: '', price: '3.50' },
      { name: 'Chamomile', detail: '', price: '3.50' },
      { name: 'Chai Latte', detail: '', price: '4.75' },
    ],
  },
  {
    id: 'food',
    title: 'FOOD',
    items: [
      { name: 'Butter Croissant', detail: '', price: '3.75' },
      { name: 'Banana Bread', detail: '', price: '3.50' },
      { name: 'Avocado Toast', detail: '', price: '8.50' },
      { name: 'Seasonal Pastry', detail: 'Ask us', price: '4.00' },
    ],
  },
] as const;

export const caseStudyNav = [
  { id: 'challenge', label: 'Challenge' },
  { id: 'concept', label: 'Concept' },
  { id: 'identity', label: 'Identity' },
  { id: 'architecture', label: 'Products' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'dielines', label: 'Dielines' },
  { id: 'family', label: 'Family' },
  { id: 'labels', label: 'Labels' },
  { id: 'rtd', label: 'Ready-to-Drink' },
  { id: 'box', label: 'Gift Box' },
  { id: 'cups', label: 'Cups' },
  { id: 'merch', label: 'Merchandise' },
  { id: 'retail', label: 'Retail' },
  { id: 'menu', label: 'Menu' },
  { id: 'shelf', label: 'Shelf' },
  { id: 'pos', label: 'Point of Sale' },
  { id: 'posters', label: 'Posters' },
  { id: 'hierarchy', label: 'Hierarchy' },
  { id: 'production', label: 'Production' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'final', label: 'Final System' },
] as const;
