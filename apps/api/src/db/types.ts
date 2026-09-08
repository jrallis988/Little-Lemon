import type {
  AppPreferences,
  ExtractedHealthItem,
  HealthProfile,
  HealthProfileItem,
  SafetyAlert,
  SupplementCheck,
  UploadedDocument,
  User,
  UserRecord,
} from '../types.js';

export interface DataStore {
  readonly kind: 'postgres' | 'sqlite';
  ready(): Promise<void>;
  close(): Promise<void>;

  findUserByEmail(email: string): Promise<UserRecord | null>;
  getUser(id: string): Promise<UserRecord | null>;
  createUser(user: UserRecord): Promise<UserRecord>;
  updateUser(user: UserRecord): Promise<UserRecord>;
  deleteUser(id: string): Promise<void>;

  getProfile(userId: string): Promise<HealthProfile>;
  saveProfile(profile: HealthProfile): Promise<HealthProfile>;

  getChecks(userId: string): Promise<SupplementCheck[]>;
  getCheck(userId: string, id: string): Promise<SupplementCheck | null>;
  saveCheck(check: SupplementCheck): Promise<SupplementCheck>;

  getAlerts(userId: string): Promise<SafetyAlert[]>;
  saveAlerts(userId: string, alerts: SafetyAlert[]): Promise<void>;
  markAlertRead(userId: string, id: string): Promise<SafetyAlert | null>;

  getPreferences(userId: string): Promise<AppPreferences>;
  savePreferences(userId: string, prefs: AppPreferences): Promise<AppPreferences>;

  getDocuments(userId: string): Promise<UploadedDocument[]>;
  saveDocument(userId: string, doc: UploadedDocument): Promise<UploadedDocument>;
  getExtracted(userId: string, documentId: string): Promise<ExtractedHealthItem[]>;
  saveExtracted(userId: string, items: ExtractedHealthItem[]): Promise<void>;

  savePasswordReset(token: string, userId: string, expiresAt: string): Promise<void>;
  consumePasswordReset(token: string): Promise<string | null>;
}

export function publicUser(user: UserRecord): User {
  const { passwordHash: _, ...rest } = user;
  return rest;
}

export function emptyProfile(userId: string): HealthProfile {
  return {
    id: `profile-${userId}`,
    userId,
    readiness: 'getting_started',
    readinessNote: 'Add medications, conditions, and allergies for stronger safety checks.',
    lastUpdatedAt: new Date().toISOString(),
    items: [],
  };
}

export function defaultPreferences(): AppPreferences {
  return {
    goals: [],
    dietary: [],
    lifestyle: [],
    safetyAlertsEnabled: true,
    insightsEnabled: true,
    appearance: 'light',
    language: 'English (US)',
  };
}

export function mergeProfileItem(profile: HealthProfile, item: HealthProfileItem): HealthProfile {
  const items = [...profile.items];
  const idx = items.findIndex((m) => m.id === item.id || (m.name === item.name && m.category === item.category));
  if (idx >= 0) items[idx] = item;
  else items.push(item);
  return {
    ...profile,
    items,
    readiness: items.some((i) => i.status === 'confirmed') ? 'strong' : profile.readiness,
    lastUpdatedAt: new Date().toISOString(),
  };
}
