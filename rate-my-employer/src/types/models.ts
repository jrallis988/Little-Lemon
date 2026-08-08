/** Core domain models for Rate My Employer */

export type EmploymentStatus = 'current' | 'former';
export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'intern' | 'freelance';
export type UserRole = 'user' | 'employer_admin' | 'moderator' | 'admin';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string | null;
  role: UserRole;
  headline?: string | null;
  /** Corporate-domain verification badge */
  isVerifiedEmployee?: boolean;
  workEmailDomain?: string | null;
  createdAt: string;
  updatedAt: string;
}

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
  summary: string;
  foundedYear?: number | null;
  createdAt: string;
  updatedAt: string;
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
  userId: string;
  role: string;
  department?: string | null;
  employmentType: EmploymentType;
  baseAnnual: number;
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

export interface CompanyAverages extends ReviewScores {
  reviewCount: number;
  recommendPercent: number;
  salaryCount?: number;
}

export interface CompanyDetail extends Company {
  averages: CompanyAverages;
  topTags: Tag[];
  reviews: Review[];
  salaries?: Salary[];
}

export type FeedItem =
  | { kind: 'review'; id: string; review: Review; company: Company }
  | { kind: 'salary'; id: string; salary: Salary; company: Company };

export type ExploreFilter = 'trending' | 'tech' | 'retail' | 'remote' | 'all';

export const INDUSTRY_CATEGORIES = [
  'Technology',
  'Healthcare',
  'Hospitality',
  'Retail',
  'Finance',
  'Logistics',
  'Media',
  'Food & Bev',
  'Agency',
] as const;

export type IndustryCategory = (typeof INDUSTRY_CATEGORIES)[number];
