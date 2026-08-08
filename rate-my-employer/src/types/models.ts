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
  /** Optional public headline shown on reviews */
  headline?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  industry: string;
  location: string;
  /** HQ city/region; may differ from work locations */
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
  careerGrowth?: number;
}

export interface Review {
  id: string;
  companyId: string;
  userId: string;
  authorName: string;
  title: string;
  body: string;
  role: string;
  department?: string | null;
  employmentStatus: EmploymentStatus;
  employmentType?: EmploymentType;
  wouldRecommend: boolean;
  scores: ReviewScores;
  /** Associated tag ids or embedded tags depending on API shape */
  tagIds?: string[];
  tags?: Tag[];
  isAnonymous?: boolean;
  helpfulCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Tag {
  id: string;
  /** Stable key, e.g. "work-life-balance" */
  key: string;
  label: string;
  /** positive | neutral | negative — drives chip styling */
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
  /** Annualized base in major units (e.g. USD dollars) */
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

/** Official reply from a claimed company account */
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
