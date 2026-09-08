import type { CreateReviewInput, EmployerResponse, Interview, Review } from '../types';
import { apiRequest } from './apiClient';
import { seedInterviews, seedReviews } from '../data/seed';

export async function listReviews(
  companyId: string,
  workplaceId?: string | null,
): Promise<Review[]> {
  try {
    const query = new URLSearchParams();
    if (workplaceId) query.set('workplaceId', workplaceId);
    const suffix = query.toString() ? `?${query.toString()}` : '';
    const result = await apiRequest<{ data: Review[] }>(
      `/api/companies/${companyId}/reviews${suffix}`,
    );
    return result.data;
  } catch {
    return seedReviews.filter(
      (review) =>
        review.companyId === companyId &&
        (workplaceId ? review.workplaceId === workplaceId : true),
    );
  }
}

export async function createReview(
  input: CreateReviewInput,
  token?: string | null,
): Promise<Review> {
  return apiRequest<Review>('/api/reviews', {
    method: 'POST',
    body: input,
    token,
  });
}

export async function updateReviewRemote(
  reviewId: string,
  input: Partial<CreateReviewInput>,
  token?: string | null,
): Promise<Review> {
  return apiRequest<Review>(`/api/reviews/${reviewId}`, {
    method: 'PATCH',
    body: input,
    token,
  });
}

export async function listInterviews(
  companyId: string,
  workplaceId?: string | null,
): Promise<Interview[]> {
  try {
    const query = new URLSearchParams();
    if (workplaceId) query.set('workplaceId', workplaceId);
    const suffix = query.toString() ? `?${query.toString()}` : '';
    const result = await apiRequest<{ data: Interview[] }>(
      `/api/companies/${companyId}/interviews${suffix}`,
    );
    return result.data;
  } catch {
    return seedInterviews.filter(
      (item) =>
        item.companyId === companyId &&
        (workplaceId ? item.workplaceId === workplaceId : true),
    );
  }
}

export async function createInterview(
  input: {
    companyId: string;
    workplaceId?: string | null;
    role: string;
    rating: number;
    outcome: Interview['outcome'];
    body: string;
    questions: string[];
    authorName?: string;
    userId?: string;
  },
  token?: string | null,
): Promise<Interview> {
  return apiRequest<Interview>('/api/interviews', {
    method: 'POST',
    body: input,
    token,
  });
}

export async function createEmployerResponse(
  input: { reviewId: string; body: string },
  token: string,
): Promise<EmployerResponse> {
  return apiRequest<EmployerResponse>('/api/employer-responses', {
    method: 'POST',
    body: input,
    token,
  });
}
