import type {
  Course,
  Department,
  DirectorySearchResult,
  Dorm,
  PaginatedResponse,
  Professor,
  Review,
  ReviewAggregate,
  ReviewCreatePayload,
  ReviewTargetType,
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

  getUniversity(id: string) {
    return request<University>(`/universities/${id}`);
  },

  listDepartments(universityId: string, q?: string) {
    const query = q ? `?q=${encodeURIComponent(q)}` : '';
    return request<PaginatedResponse<Department>>(
      `/universities/${universityId}/departments${query}`
    );
  },

  listProfessors(opts: {
    universityId?: string;
    departmentId?: string;
    q?: string;
  }) {
    if (opts.departmentId) {
      const params = new URLSearchParams();
      if (opts.q) params.set('q', opts.q);
      const qs = params.toString() ? `?${params}` : '';
      return request<PaginatedResponse<Professor>>(
        `/departments/${opts.departmentId}/professors${qs}`
      );
    }
    if (!opts.universityId) {
      return Promise.resolve({ items: [], total: 0, limit: 0, offset: 0 });
    }
    const params = new URLSearchParams();
    if (opts.q) params.set('q', opts.q);
    const qs = params.toString() ? `?${params}` : '';
    return request<PaginatedResponse<Professor>>(
      `/universities/${opts.universityId}/professors${qs}`
    );
  },

  listCourses(opts: {
    universityId?: string;
    departmentId?: string;
    q?: string;
  }) {
    if (opts.departmentId) {
      const params = new URLSearchParams();
      if (opts.q) params.set('q', opts.q);
      const qs = params.toString() ? `?${params}` : '';
      return request<PaginatedResponse<Course>>(
        `/departments/${opts.departmentId}/courses${qs}`
      );
    }
    if (!opts.universityId) {
      return Promise.resolve({ items: [], total: 0, limit: 0, offset: 0 });
    }
    const params = new URLSearchParams();
    if (opts.q) params.set('q', opts.q);
    const qs = params.toString() ? `?${params}` : '';
    return request<PaginatedResponse<Course>>(
      `/universities/${opts.universityId}/courses${qs}`
    );
  },

  listDorms(universityId: string, q?: string) {
    const query = q ? `?q=${encodeURIComponent(q)}` : '';
    return request<PaginatedResponse<Dorm>>(
      `/universities/${universityId}/dorms${query}`
    );
  },

  searchDirectory(q: string, universityId?: string) {
    const params = new URLSearchParams({ q });
    if (universityId) params.set('university_id', universityId);
    return request<DirectorySearchResult[]>(`/search?${params.toString()}`);
  },

  getAggregate(targetType: ReviewTargetType, targetId: string) {
    return request<ReviewAggregate>(
      `/reviews/${targetType}/${targetId}/aggregate`
    );
  },

  listReviews(targetType: ReviewTargetType, targetId: string) {
    return request<PaginatedResponse<Review>>(
      `/reviews/${targetType}/${targetId}`
    );
  },

  submitReview(payload: ReviewCreatePayload) {
    return request('/reviews', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
