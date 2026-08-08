import type { CreateReviewInput, EmployerResponse, Review } from '../types';
import { apiRequest } from './apiClient';

export async function listReviews(companyId: string, token?: string | null): Promise<Review[]> {
  return apiRequest<Review[]>(`/api/companies/${companyId}/reviews`, { token });
}

export async function createReview(
  input: CreateReviewInput,
  token: string,
): Promise<Review> {
  return apiRequest<Review>('/api/reviews', {
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
