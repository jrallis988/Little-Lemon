import type { AuthSession, User } from '../types';
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
  username?: string;
}): Promise<AuthSession> {
  return apiRequest<AuthSession>('/api/auth/sign-up', {
    method: 'POST',
    body: input,
  });
}

export async function fetchMe(token: string): Promise<User> {
  return apiRequest<User>('/api/auth/me', { token });
}

export async function requestPasswordReset(email: string): Promise<{
  ok: boolean;
  message: string;
  resetToken?: string;
  expiresInMinutes?: number;
}> {
  return apiRequest('/api/auth/forgot-password', {
    method: 'POST',
    body: { email },
  });
}

export async function resetPassword(input: {
  email: string;
  token: string;
  password: string;
}): Promise<{ ok: boolean; message: string }> {
  return apiRequest('/api/auth/reset-password', {
    method: 'POST',
    body: input,
  });
}
