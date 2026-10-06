/** In-memory catalog used when DATABASE_URL is unset or Postgres is unreachable. */

export type MemoryCompany = {
  id: string;
  name: string;
  slug: string;
  industry: string;
  location: string;
  headquarters?: string | null;
  size: string;
  website?: string | null;
  logoUrl?: string | null;
  summary: string;
  foundedYear?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type MemoryWorkplace = {
  id: string;
  companyId: string;
  name: string;
  storeCode?: string | null;
  address: string;
  city: string;
  state: string;
  zip: string;
  isRemoteOrCorporate?: boolean;
  summary?: string;
};

export type MemoryReview = {
  id: string;
  companyId: string;
  workplaceId?: string | null;
  userId: string;
  authorName: string;
  title: string;
  body: string;
  pros?: string;
  cons?: string;
  role: string;
  department?: string | null;
  employmentStatus: 'current' | 'former';
  employmentType?: 'full_time' | 'part_time' | 'contract' | 'intern' | 'freelance';
  wouldRecommend: boolean;
  scores: {
    overall: number;
    culture: number;
    pay: number;
    management: number;
    workLife: number;
    careerGrowth: number;
  };
  tagIds?: string[];
  isAnonymous?: boolean;
  helpfulCount?: number;
  notHelpfulCount?: number;
  createdAt: string;
  updatedAt?: string;
};

export type MemoryInterview = {
  id: string;
  companyId: string;
  workplaceId?: string | null;
  userId: string;
  authorName: string;
  role: string;
  rating: number;
  outcome: 'positive' | 'neutral' | 'negative';
  body: string;
  questions: string[];
  interviewDate?: string;
  helpfulCount?: number;
  createdAt: string;
};

export const memoryCompanies: MemoryCompany[] = [
  {
    id: 'home-depot',
    name: 'The Home Depot',
    slug: 'home-depot',
    industry: 'Retail',
    location: 'Atlanta, GA',
    headquarters: 'Atlanta, GA',
    size: '400,000+',
    summary: 'Home improvement retailer with stores across North America.',
    foundedYear: 1978,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    slug: 'amazon',
    industry: 'Technology',
    location: 'Seattle, WA',
    headquarters: 'Seattle, WA',
    size: '1,500,000+',
    summary: 'E-commerce, cloud, and logistics giant.',
    foundedYear: 1994,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'target',
    name: 'Target',
    slug: 'target',
    industry: 'Retail',
    location: 'Minneapolis, MN',
    headquarters: 'Minneapolis, MN',
    size: '400,000+',
    summary: 'General merchandise retailer known for design-forward stores.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'walmart',
    name: 'Walmart',
    slug: 'walmart',
    industry: 'Retail',
    location: 'Bentonville, AR',
    size: '2,000,000+',
    summary: 'Multinational retail corporation.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'best-buy',
    name: 'Best Buy',
    slug: 'best-buy',
    industry: 'Retail',
    location: 'Richfield, MN',
    size: '90,000+',
    summary: 'Consumer electronics retailer.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'gbcc',
    name: 'Great Bay Community College',
    slug: 'great-bay-community-college',
    industry: 'Education',
    location: 'Portsmouth, NH',
    size: '501–1,000',
    summary: 'Community college serving the Seacoast region of New Hampshire.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

export const memoryWorkplaces: MemoryWorkplace[] = [
  {
    id: 'hd-3404',
    companyId: 'home-depot',
    name: 'Home Depot — Portsmouth, NH',
    storeCode: '#3404',
    address: '100 Gosling Rd',
    city: 'Portsmouth',
    state: 'NH',
    zip: '03801',
    summary: 'Full-service home improvement store serving the Seacoast.',
  },
  {
    id: 'hd-3410',
    companyId: 'home-depot',
    name: 'Home Depot — Seabrook, NH',
    storeCode: '#3410',
    address: '300 Lafayette Rd',
    city: 'Seabrook',
    state: 'NH',
    zip: '03874',
  },
  {
    id: 'hd-remote',
    companyId: 'home-depot',
    name: 'Corporate / Remote',
    address: 'Remote',
    city: 'Remote',
    state: 'US',
    zip: '',
    isRemoteOrCorporate: true,
  },
  {
    id: 'gbcc-portsmouth',
    companyId: 'gbcc',
    name: 'GBCC — Portsmouth Campus',
    address: '320 Corporate Dr',
    city: 'Portsmouth',
    state: 'NH',
    zip: '03801',
  },
  {
    id: 'gbcc-rochester',
    companyId: 'gbcc',
    name: 'GBCC — Rochester Campus',
    address: '5 Rochester Hill Rd',
    city: 'Rochester',
    state: 'NH',
    zip: '03867',
  },
  {
    id: 'target-portsmouth',
    companyId: 'target',
    name: 'Target — Portsmouth, NH',
    storeCode: 'T-1892',
    address: '120 Spaulding Turnpike',
    city: 'Portsmouth',
    state: 'NH',
    zip: '03801',
  },
];

export const memoryReviews: MemoryReview[] = [
  {
    id: 'rev-1',
    companyId: 'home-depot',
    workplaceId: 'hd-3404',
    userId: 'seed-user-1',
    authorName: 'PurpleBunny75',
    title: 'Solid training, busy weekends',
    body: 'Management is fair if you show up ready. Weekends and holidays are nonstop, but the team helps each other out.',
    pros: 'Training program, employee discount, steady hours.',
    cons: 'Weekend volume, some understaffed shifts.',
    role: 'Sales Associate',
    department: 'Sales & Customer Service',
    employmentStatus: 'current',
    employmentType: 'full_time',
    wouldRecommend: true,
    scores: { overall: 4, culture: 4, pay: 3, management: 4, workLife: 3, careerGrowth: 3 },
    tagIds: ['tag-2', 'tag-5', 'tag-7'],
    helpfulCount: 14,
    createdAt: '2026-06-12T14:00:00.000Z',
  },
  {
    id: 'rev-2',
    companyId: 'home-depot',
    workplaceId: 'hd-3404',
    userId: 'seed-user-2',
    authorName: 'Anonymous',
    title: 'Depends heavily on your supervisor',
    body: 'Pay is okay for retail. Schedule flexibility varies a lot by department lead.',
    role: 'Cashier',
    employmentStatus: 'former',
    employmentType: 'part_time',
    wouldRecommend: false,
    scores: { overall: 3, culture: 3, pay: 3, management: 2, workLife: 3, careerGrowth: 2 },
    tagIds: ['tag-4', 'tag-8'],
    isAnonymous: true,
    helpfulCount: 9,
    createdAt: '2026-05-02T10:30:00.000Z',
  },
  {
    id: 'rev-3',
    companyId: 'gbcc',
    workplaceId: 'gbcc-portsmouth',
    userId: 'seed-user-3',
    authorName: 'SeacoastStaff',
    title: 'Students first, bureaucracy second',
    body: 'Faculty and staff care about students. Internal processes can be slow across campuses.',
    role: 'Academic Advisor',
    employmentStatus: 'current',
    employmentType: 'full_time',
    wouldRecommend: true,
    scores: { overall: 4, culture: 4, pay: 3, management: 3, workLife: 4, careerGrowth: 3 },
    tagIds: ['tag-1', 'tag-2'],
    helpfulCount: 6,
    createdAt: '2026-04-18T16:45:00.000Z',
  },
];

export const memoryInterviews: MemoryInterview[] = [
  {
    id: 'int-1',
    companyId: 'home-depot',
    workplaceId: 'hd-3404',
    userId: 'seed-user-6',
    authorName: 'JobHunter22',
    role: 'Sales Associate',
    rating: 4,
    outcome: 'positive',
    body: 'Two-step process: online application then in-store interview with an ASM.',
    questions: [
      'Tell me about a time you helped a difficult customer.',
      'Are you comfortable lifting 50 lbs?',
    ],
    interviewDate: '2026-05-10',
    helpfulCount: 7,
    createdAt: '2026-05-12T18:00:00.000Z',
  },
  {
    id: 'int-2',
    companyId: 'gbcc',
    workplaceId: 'gbcc-portsmouth',
    userId: 'seed-user-8',
    authorName: 'CampusHire',
    role: 'Academic Advisor',
    rating: 5,
    outcome: 'positive',
    body: 'Panel interview with student success leadership.',
    questions: ['How would you support a first-gen student?'],
    interviewDate: '2026-02-20',
    helpfulCount: 5,
    createdAt: '2026-02-22T09:00:00.000Z',
  },
];
