import {
  memoryCompanies,
  memoryInterviews,
  memoryReviews,
  memoryWorkplaces,
  type MemoryInterview,
  type MemoryReview,
} from './data/memory.js';

export type MemoryUser = {
  id: string;
  email: string;
  passwordHash: string;
  displayName: string;
  username?: string;
  role: 'user' | 'employer_admin' | 'moderator' | 'admin';
  headline?: string | null;
  createdAt: string;
  updatedAt: string;
};

type PasswordReset = {
  token: string;
  expiresAt: number;
};

/** Mutable in-memory store for local/dev API when Postgres is unavailable. */
export const store = {
  companies: [...memoryCompanies],
  workplaces: [...memoryWorkplaces],
  reviews: [...memoryReviews],
  interviews: [...memoryInterviews],
  users: [] as MemoryUser[],
  passwordResets: new Map<string, PasswordReset>(),
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

export function addMemoryUser(user: MemoryUser) {
  store.users = [...store.users, user];
  return user;
}

export function findMemoryUserByEmail(email: string) {
  return store.users.find((item) => item.email === email.trim().toLowerCase());
}

export function findMemoryUserById(id: string) {
  return store.users.find((item) => item.id === id);
}

export function updateMemoryUserPassword(email: string, passwordHash: string) {
  const index = store.users.findIndex((item) => item.email === email.trim().toLowerCase());
  if (index < 0) return null;
  store.users[index] = {
    ...store.users[index],
    passwordHash,
    updatedAt: new Date().toISOString(),
  };
  return store.users[index];
}

export function setPasswordReset(email: string, token: string, expiresAt: number) {
  store.passwordResets.set(email.trim().toLowerCase(), { token, expiresAt });
}

export function takePasswordReset(email: string, token: string) {
  const key = email.trim().toLowerCase();
  const entry = store.passwordResets.get(key);
  if (!entry) return null;
  if (entry.expiresAt < Date.now() || entry.token !== token) return null;
  store.passwordResets.delete(key);
  return entry;
}
