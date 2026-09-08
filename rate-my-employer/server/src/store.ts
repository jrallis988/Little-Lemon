import {
  memoryCompanies,
  memoryInterviews,
  memoryReviews,
  memoryWorkplaces,
  type MemoryInterview,
  type MemoryReview,
} from './data/memory.js';

/** Mutable in-memory store for local/dev API when Postgres is unavailable. */
export const store = {
  companies: [...memoryCompanies],
  workplaces: [...memoryWorkplaces],
  reviews: [...memoryReviews],
  interviews: [...memoryInterviews],
};

export function searchMemoryCompanies(q: string, page: number, pageSize: number) {
  const query = q.trim().toLowerCase();
  const filtered = store.companies.filter(
    (company) =>
      !query ||
      company.name.toLowerCase().includes(query) ||
      company.industry.toLowerCase().includes(query) ||
      company.location.toLowerCase().includes(query),
  );
  const offset = (page - 1) * pageSize;
  return {
    data: filtered.slice(offset, offset + pageSize),
    page,
    pageSize,
    total: filtered.length,
  };
}

export function findMemoryCompany(idOrSlug: string) {
  return store.companies.find((item) => item.id === idOrSlug || item.slug === idOrSlug);
}

export function listMemoryWorkplaces(companyId: string) {
  return store.workplaces.filter((item) => item.companyId === companyId);
}

export function findMemoryWorkplace(id: string) {
  return store.workplaces.find((item) => item.id === id);
}

export function listMemoryReviews(companyId: string, workplaceId?: string | null) {
  return store.reviews
    .filter(
      (item) =>
        item.companyId === companyId &&
        (workplaceId ? item.workplaceId === workplaceId : true),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function listMemoryInterviews(companyId: string, workplaceId?: string | null) {
  return store.interviews
    .filter(
      (item) =>
        item.companyId === companyId &&
        (workplaceId ? item.workplaceId === workplaceId : true),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addMemoryReview(review: MemoryReview) {
  store.reviews = [review, ...store.reviews];
  return review;
}

export function addMemoryInterview(interview: MemoryInterview) {
  store.interviews = [interview, ...store.interviews];
  return interview;
}

export function updateMemoryReview(id: string, patch: Partial<MemoryReview>) {
  const index = store.reviews.findIndex((item) => item.id === id);
  if (index < 0) return null;
  store.reviews[index] = { ...store.reviews[index], ...patch, updatedAt: new Date().toISOString() };
  return store.reviews[index];
}
