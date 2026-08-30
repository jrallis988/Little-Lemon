/** Core domain models — Employer → Workplace hierarchy */

export type EmploymentStatus = 'current' | 'former';
export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'intern' | 'freelance';
export type UserRole = 'user' | 'employer_admin' | 'moderator' | 'admin';
export type ExperienceType = 'work' | 'interview';

export interface User {
  id: string;
  email: string;
  displayName: string;
  username?: string;
  avatarUrl?: string | null;
  role: UserRole;
  headline?: string | null;
  isVerifiedEmployee?: boolean;
  workEmailDomain?: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Corporate / brand-level employer */
export interface Company {
  id: string;
  name: string;
  slug: string;
  industry: string;
  location: string;
  headquarters?: string | null;
  size: string;
  website?: string | null;
  logoUrl?: string | null;
  logoColor?: string;
  summary: string;
  foundedYear?: number | null;
  createdAt: string;
  updatedAt: string;
}

/** Specific store / campus / office under an employer */
export interface Workplace {
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
}

export interface ReviewScores {
  overall: number;
  culture: number;
  pay: number;
  management: number;
  workLife: number;
  careerGrowth: number;
}

export interface Review {
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
  employmentStatus: EmploymentStatus;
  employmentType?: EmploymentType;
  wouldRecommend: boolean;
  scores: ReviewScores;
  tagIds?: string[];
  tags?: Tag[];
  isAnonymous?: boolean;
  helpfulCount?: number;
  notHelpfulCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Interview {
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
}

export interface Tag {
  id: string;
  key: string;
  label: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  category?: 'culture' | 'pay' | 'management' | 'process' | 'other';
}

export interface Salary {
  id: string;
  companyId: string;
  workplaceId?: string | null;
  userId: string;
  role: string;
  department?: string | null;
  employmentType: EmploymentType;
  baseAnnual: number;
  /** Hourly when pay is reported that way */
  hourlyRate?: number | null;
  bonusAnnual?: number | null;
  equityAnnual?: number | null;
  currency: string;
  yearsExperience?: number | null;
  location?: string | null;
  isVerified?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface EmployerResponse {
  id: string;
  reviewId: string;
  companyId: string;
  responderUserId: string;
  responderName: string;
  body: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ActivityItem {
  id: string;
  type: 'helpful' | 'reply' | 'system';
  title: string;
  body: string;
  createdAt: string;
  read?: boolean;
}

export interface CompanyAverages extends ReviewScores {
  reviewCount: number;
  recommendPercent: number;
  salaryCount?: number;
  interviewCount?: number;
  experienceCount?: number;
}

export interface CompanyDetail extends Company {
  averages: CompanyAverages;
  topTags: Tag[];
  reviews: Review[];
  salaries?: Salary[];
  workplaces?: Workplace[];
}

export type FeedItem =
  | { kind: 'review'; id: string; review: Review; company: Company }
  | { kind: 'salary'; id: string; salary: Salary; company: Company }
  | { kind: 'interview'; id: string; interview: Interview; company: Company };

export type ExploreFilter = 'trending' | 'tech' | 'retail' | 'remote' | 'all';

export const INDUSTRY_CATEGORIES = [
  'Retail',
  'Healthcare',
  'Technology',
  'Education',
  'Hospitality',
  'Finance',
  'Logistics',
  'Food & Bev',
] as const;

export type IndustryCategory = (typeof INDUSTRY_CATEGORIES)[number];

export const POPULAR_ROLES = [
  'Sales Associate',
  'Cashier',
  'Customer Service',
  'Freight / Receiving',
  'Department Supervisor',
  'Assistant Store Manager',
  'Store Manager',
  'Operations',
] as const;
