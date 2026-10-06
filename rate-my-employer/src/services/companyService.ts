import type { Company, CompanyDetail, Paginated, SearchCompaniesParams } from '../types';
import { apiRequest } from './apiClient';
import { seedCompanies, seedReviews, seedTags } from '../data/seed';
import { averageReviews } from '../lib/averages';

/** Prefer API when available; fall back to local seed for offline/dev. */
export async function searchCompanies(
  params: SearchCompaniesParams = {},
): Promise<Paginated<Company>> {
  try {
    const query = new URLSearchParams();
    if (params.q) query.set('q', params.q);
    if (params.industry) query.set('industry', params.industry);
    if (params.location) query.set('location', params.location);
    if (params.page) query.set('page', String(params.page));
    if (params.pageSize) query.set('pageSize', String(params.pageSize));
    return await apiRequest<Paginated<Company>>(`/api/companies?${query.toString()}`);
  } catch {
    const q = (params.q ?? '').trim().toLowerCase();
    const data = seedCompanies.filter(
      (company) =>
        !q ||
        company.name.toLowerCase().includes(q) ||
        company.industry.toLowerCase().includes(q) ||
        company.location.toLowerCase().includes(q),
    );
    return { data, page: 1, pageSize: data.length, total: data.length };
  }
}

export async function getCompanyDetail(idOrSlug: string): Promise<CompanyDetail | null> {
  try {
    return await apiRequest<CompanyDetail>(`/api/companies/${idOrSlug}`);
  } catch {
    const company = seedCompanies.find(
      (item) => item.id === idOrSlug || item.slug === idOrSlug,
    );
    if (!company) return null;
    const reviews = seedReviews.filter((review) => review.companyId === company.id);
    return {
      ...company,
      averages: averageReviews(reviews),
      topTags: seedTags.slice(0, 5),
      reviews,
      salaries: [],
    };
  }
}
