import type { User } from '../types';

/** Seeded account so recruiters can tap through signed-in flows without registering. */
export const DEMO_ACCOUNT: User & { password: string } = {
  id: 'seed-user-1',
  email: 'demo@ratemyemployer.app',
  password: 'demo123',
  displayName: 'PurpleBunny75',
  username: 'PurpleBunny75',
  role: 'user',
  headline: 'Sales associate · Home Depot Portsmouth',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};
