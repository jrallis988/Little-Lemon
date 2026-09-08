import type { AuthSession } from '../types';
import { apiRequest } from './apiClient';

export async function signIn(email: string, password: string): Promise<AuthSession> {
  return apiRequest<AuthSession>('/api/auth/sign-in', {
    method: 'POST',
    body: { email, password },
  });
}

export async function signUp(input: {
  email: string;
  password: string;
  displayName: string;
}): Promise<AuthSession> {
  return apiRequest<AuthSession>('/api/auth/sign-up', {
    method: 'POST',
    body: input,
  });
}
