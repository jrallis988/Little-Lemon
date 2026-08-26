import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  AppPreferences,
  ExtractedHealthItem,
  HealthProfile,
  HealthProfileItem,
  SafetyAlert,
  SupplementCheck,
  UploadedDocument,
  User,
} from './models';
import {
  DEMO_ALERTS,
  DEMO_CHECKS,
  DEMO_DOCUMENT,
  DEMO_EXTRACTED_ITEMS,
  DEMO_HEALTH_PROFILE,
  DEMO_PREFERENCES,
  DEMO_USER,
} from './fixtures';
import { analyzeSupplement, findSupplementByBarcode, findSupplementByQuery } from './analysis';
import type { Supplement } from './models';

const KEYS = {
  user: '@biocross/user',
  profile: '@biocross/profile',
  checks: '@biocross/checks',
  alerts: '@biocross/alerts',
  prefs: '@biocross/prefs',
  documents: '@biocross/documents',
  extracted: '@biocross/extracted',
  onboarded: '@biocross/onboarded',
} as const;

async function readJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJSON<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const biocrossRepository = {
  async getUser(): Promise<User> {
    return readJSON(KEYS.user, DEMO_USER);
  },

  async saveUser(user: User): Promise<User> {
    await writeJSON(KEYS.user, user);
    return user;
  },

  async isOnboarded(): Promise<boolean> {
    const flag = await AsyncStorage.getItem(KEYS.onboarded);
    if (flag === 'true') return true;
    const user = await this.getUser();
    return user.onboardingCompleted;
  },

  async completeOnboarding(): Promise<void> {
    const user = await this.getUser();
    await this.saveUser({ ...user, onboardingCompleted: true });
    await AsyncStorage.setItem(KEYS.onboarded, 'true');
  },

  async resetDemo(): Promise<void> {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  },

  async getHealthProfile(): Promise<HealthProfile> {
    return readJSON(KEYS.profile, DEMO_HEALTH_PROFILE);
  },

  async saveHealthProfile(profile: HealthProfile): Promise<HealthProfile> {
    const next = { ...profile, lastUpdatedAt: new Date().toISOString() };
    await writeJSON(KEYS.profile, next);
    return next;
  },

  async addProfileItems(items: HealthProfileItem[]): Promise<HealthProfile> {
    const profile = await this.getHealthProfile();
    const merged = [...profile.items];
    for (const item of items) {
      const idx = merged.findIndex((m) => m.id === item.id || (m.name === item.name && m.category === item.category));
      if (idx >= 0) merged[idx] = item;
      else merged.push(item);
    }
    return this.saveHealthProfile({ ...profile, items: merged, readiness: 'strong' });
  },

  async addProfileItem(item: HealthProfileItem): Promise<HealthProfile> {
    return this.addProfileItems([item]);
  },

  async removeProfileItem(itemId: string): Promise<HealthProfile> {
    const profile = await this.getHealthProfile();
    return this.saveHealthProfile({
      ...profile,
      items: profile.items.filter((i) => i.id !== itemId),
    });
  },

  async confirmProfileItem(itemId: string): Promise<HealthProfile> {
    const profile = await this.getHealthProfile();
    const items = profile.items.map((i) =>
      i.id === itemId
        ? { ...i, status: 'confirmed' as const, confirmedAt: new Date().toISOString() }
        : i,
    );
    return this.saveHealthProfile({ ...profile, items });
  },

  async getPreferences(): Promise<AppPreferences> {
    return readJSON(KEYS.prefs, DEMO_PREFERENCES);
  },

  async savePreferences(prefs: AppPreferences): Promise<AppPreferences> {
    await writeJSON(KEYS.prefs, prefs);
    return prefs;
  },

  async getChecks(): Promise<SupplementCheck[]> {
    return readJSON(KEYS.checks, DEMO_CHECKS);
  },

  async getCheckById(id: string): Promise<SupplementCheck | undefined> {
    const checks = await this.getChecks();
    return checks.find((c) => c.id === id);
  },

  async saveCheck(check: SupplementCheck): Promise<SupplementCheck> {
    const checks = await this.getChecks();
    const next = [check, ...checks.filter((c) => c.id !== check.id)];
    await writeJSON(KEYS.checks, next);
    return check;
  },

  async searchSupplements(query: string): Promise<Supplement[]> {
    await delay(250);
    return findSupplementByQuery(query);
  },

  async lookupBarcode(barcode: string): Promise<Supplement | null> {
    await delay(500);
    return findSupplementByBarcode(barcode) ?? null;
  },

  async runAnalysis(supplement: Supplement): Promise<SupplementCheck> {
    await delay(900);
    const user = await this.getUser();
    const profile = await this.getHealthProfile();
    const check = analyzeSupplement(supplement, profile, user.id);
    await this.saveCheck(check);
    return check;
  },

  async getAlerts(): Promise<SafetyAlert[]> {
    return readJSON(KEYS.alerts, DEMO_ALERTS);
  },

  async markAlertRead(id: string): Promise<void> {
    const alerts = await this.getAlerts();
    await writeJSON(
      KEYS.alerts,
      alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
    );
  },

  async getDocuments(): Promise<UploadedDocument[]> {
    return readJSON(KEYS.documents, [DEMO_DOCUMENT]);
  },

  async getExtractedItems(documentId: string): Promise<ExtractedHealthItem[]> {
    const all = await readJSON(KEYS.extracted, DEMO_EXTRACTED_ITEMS);
    return all.filter((i) => i.documentId === documentId);
  },

  async saveExtractedItems(items: ExtractedHealthItem[]): Promise<void> {
    await writeJSON(KEYS.extracted, items);
  },

  async simulateUpload(fileName: string): Promise<UploadedDocument> {
    await delay(800);
    const doc: UploadedDocument = {
      id: `doc-${Date.now()}`,
      fileName,
      mimeType: fileName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
      sizeBytes: 1_200_000,
      pageCount: 12,
      uploadedAt: new Date().toISOString(),
      status: 'processing',
    };
    const docs = await this.getDocuments();
    await writeJSON(KEYS.documents, [doc, ...docs]);
    await delay(700);
    const ready = { ...doc, status: 'extracted' as const };
    await writeJSON(KEYS.documents, [ready, ...docs]);
    // Seed extracted items for new upload from demo template with new document id
    const extracted = DEMO_EXTRACTED_ITEMS.map((i) => ({
      ...i,
      id: `${i.id}-${ready.id}`,
      documentId: ready.id,
      status: i.status,
    }));
    const existing = await readJSON(KEYS.extracted, DEMO_EXTRACTED_ITEMS);
    await writeJSON(KEYS.extracted, [...extracted, ...existing]);
    return ready;
  },
};
