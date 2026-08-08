import type {
  Company,
  CompanyDetail,
  EmployerResponse,
  Review,
  Salary,
  Tag,
  User,
} from './models';

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface Paginated<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface SearchCompaniesParams {
  q?: string;
  industry?: string;
  location?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateReviewInput {
  companyId: string;
  title: string;
  body: string;
  role: string;
  department?: string;
  employmentStatus: Review['employmentStatus'];
  employmentType?: Review['employmentType'];
  wouldRecommend: boolean;
  scores: Review['scores'];
  tagIds?: string[];
  isAnonymous?: boolean;
}

export interface CreateSalaryInput {
  companyId: string;
  role: string;
  department?: string;
  employmentType: Salary['employmentType'];
  baseAnnual: number;
  bonusAnnual?: number;
  equityAnnual?: number;
  currency: string;
  yearsExperience?: number;
  location?: string;
}

export interface CreateEmployerResponseInput {
  reviewId: string;
  body: string;
}

export type {
  Company,
  CompanyDetail,
  EmployerResponse,
  Review,
  Salary,
  Tag,
  User,
};
