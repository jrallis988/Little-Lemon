import { hashPassword } from '../auth/password.js';

/** Matches the mobile demo account so API sign-in works in memory mode. */
export const DEMO_EMAIL = 'demo@ratemyemployer.app';
export const DEMO_PASSWORD = 'demo123';

export function createDemoUser() {
  const now = '2026-01-01T00:00:00.000Z';
  return {
    id: 'seed-user-1',
    email: DEMO_EMAIL,
    passwordHash: hashPassword(DEMO_PASSWORD),
    displayName: 'PurpleBunny75',
    username: 'PurpleBunny75',
    role: 'user' as const,
    headline: 'Sales associate · Home Depot Portsmouth',
    createdAt: now,
    updatedAt: now,
  };
}
