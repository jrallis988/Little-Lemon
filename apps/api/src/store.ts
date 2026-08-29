/** In-memory demo store — replace with Postgres in production. */
import { hashPassword } from './auth.js';

interface UserRecord {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  onboardingCompleted: boolean;
  createdAt: string;
}

interface ProfileRecord {
  id: string;
  userId: string;
  readiness: string;
  readinessNote: string;
  lastUpdatedAt: string;
  items: unknown[];
}

const users = new Map<string, UserRecord>();
const profiles = new Map<string, ProfileRecord>();

const demoUser: UserRecord = {
  id: 'user-demo-001',
  email: 'demo@biocross.app',
  fullName: 'Olivia Harper',
  passwordHash: hashPassword('demo1234'),
  onboardingCompleted: true,
  createdAt: new Date().toISOString(),
};
users.set(demoUser.id, demoUser);
profiles.set(demoUser.id, {
  id: 'profile-demo-001',
  userId: demoUser.id,
  readiness: 'strong',
  readinessNote: 'Demo profile seeded.',
  lastUpdatedAt: new Date().toISOString(),
  items: [],
});

export const store = {
  findUserByEmail(email: string) {
    return [...users.values()].find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
  getUser(id: string) {
    return users.get(id);
  },
  createUser(email: string, fullName: string, passwordHash: string) {
    const id = `user-${Date.now()}`;
    const user: UserRecord = {
      id,
      email,
      fullName,
      passwordHash,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
    };
    users.set(id, user);
    profiles.set(id, {
      id: `profile-${id}`,
      userId: id,
      readiness: 'getting_started',
      readinessNote: 'Add health information for stronger checks.',
      lastUpdatedAt: new Date().toISOString(),
      items: [],
    });
    return user;
  },
  publicUser(user: UserRecord) {
    const { passwordHash: _, ...rest } = user;
    return rest;
  },
  getProfile(userId: string) {
    return profiles.get(userId)!;
  },
  createSession(_userId: string) {
    return {
      accessToken: `tok_${Date.now()}`,
      refreshToken: `ref_${Date.now()}`,
    };
  },
};
