import type {
  DirectorySearchResult,
  PaginatedResponse,
  ReviewCreatePayload,
  University,
} from '../types';

const API_BASE =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API ${response.status}: ${body}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  listUniversities(q?: string) {
    const query = q ? `?q=${encodeURIComponent(q)}` : '';
    return request<PaginatedResponse<University>>(`/universities${query}`);
  },

  searchDirectory(q: string, universityId?: string) {
    const params = new URLSearchParams({ q });
    if (universityId) params.set('university_id', universityId);
    return request<DirectorySearchResult[]>(`/search?${params.toString()}`);
  },

  submitReview(payload: ReviewCreatePayload) {
    return request('/reviews', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
