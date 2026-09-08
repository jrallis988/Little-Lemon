import AsyncStorage from '@react-native-async-storage/async-storage';
import { biocrossApi } from '../api/client';
import { authStorage } from '../api/authStorage';
import { getMockExtractedItems, saveMockExtractedItems, updateMockUser } from '../api/mockServer';
import { isRemoteApi } from '../api/config';
import type {
  AppPreferences,
  ExtractedHealthItem,
  HealthProfile,
  HealthProfileItem,
  SafetyAlert,
  Supplement,
  SupplementCheck,
  UploadedDocument,
  User,
} from './models';
import {
  DEMO_CHECKS,
  DEMO_DOCUMENT,
  DEMO_EXTRACTED_ITEMS,
  DEMO_HEALTH_PROFILE,
  DEMO_PREFERENCES,
  DEMO_USER,
} from './fixtures';
import { analyzeSupplement } from './analysis';
import type { Supplement as SupplementType } from './models';

const LOCAL_KEYS = {
  onboarded: '@biocross/onboarded',
  extracted: '@biocross/extracted-local',
  checks: '@biocross/checks',
} as const;

async function readLocalJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function hasSession(): Promise<boolean> {
  const token = await authStorage.getAccessToken();
  return Boolean(token);
}

function mergeChecks(remote: SupplementCheck[], local: SupplementCheck[]): SupplementCheck[] {
  const map = new Map<string, SupplementCheck>();
  for (const c of remote) map.set(c.id, c);
  for (const c of local) map.set(c.id, c);
  return [...map.values()].sort(
    (a, b) => new Date(b.checkedAt).getTime() - new Date(a.checkedAt).getTime(),
  );
}

export const biocrossRepository = {
  async getUser(): Promise<User> {
    if (await hasSession()) {
      try {
        return await biocrossApi.getMe();
      } catch {
        /* fall through to local */
      }
    }
    return { ...DEMO_USER };
  },

  async saveUser(user: User): Promise<User> {
    if (await hasSession()) {
      try {
        return await biocrossApi.updateUser(user);
      } catch {
        await updateMockUser(user);
      }
    }
    return user;
  },

  async isOnboarded(): Promise<boolean> {
    const flag = await AsyncStorage.getItem(LOCAL_KEYS.onboarded);
    if (flag === 'true') return true;
    const user = await this.getUser();
    return user.onboardingCompleted;
  },

  async completeOnboarding(): Promise<void> {
    if (await hasSession()) {
      await biocrossApi.completeOnboarding();
    }
    const user = await this.getUser();
    await this.saveUser({ ...user, onboardingCompleted: true });
    await AsyncStorage.setItem(LOCAL_KEYS.onboarded, 'true');
  },

  async resetDemo(): Promise<void> {
    await authStorage.clearTokens();
    await AsyncStorage.multiRemove(Object.values(LOCAL_KEYS));
  },

  async getHealthProfile(): Promise<HealthProfile> {
    if (await hasSession()) {
      try {
        return await biocrossApi.getProfile();
      } catch {
        /* fall through */
      }
    }
    return DEMO_HEALTH_PROFILE;
  },

  async saveHealthProfile(profile: HealthProfile): Promise<HealthProfile> {
    const next = { ...profile, lastUpdatedAt: new Date().toISOString() };
    if (await hasSession()) {
      try {
        return await biocrossApi.saveProfile(next);
      } catch {
        /* fall through */
      }
    }
    return next;
  },

  async addProfileItems(items: HealthProfileItem[]): Promise<HealthProfile> {
    let profile = await this.getHealthProfile();
    for (const item of items) {
      if (await hasSession()) {
        try {
          profile = await biocrossApi.addProfileItem(item);
        } catch {
          const merged = [...profile.items];
          const idx = merged.findIndex(
            (m) => m.id === item.id || (m.name === item.name && m.category === item.category),
          );
          if (idx >= 0) merged[idx] = item;
          else merged.push(item);
          profile = { ...profile, items: merged, readiness: 'strong' };
        }
      }
    }
    return this.saveHealthProfile(profile);
  },

  async addProfileItem(item: HealthProfileItem): Promise<HealthProfile> {
    if (await hasSession()) {
      try {
        return await biocrossApi.addProfileItem(item);
      } catch {
        /* fall through */
      }
    }
    return this.addProfileItems([item]);
  },

  async removeProfileItem(itemId: string): Promise<HealthProfile> {
    if (await hasSession()) {
      try {
        return await biocrossApi.removeProfileItem(itemId);
      } catch {
        /* fall through */
      }
    }
    const profile = await this.getHealthProfile();
    return this.saveHealthProfile({
      ...profile,
      items: profile.items.filter((i) => i.id !== itemId),
    });
  },

  async confirmProfileItem(itemId: string): Promise<HealthProfile> {
    if (await hasSession()) {
      try {
        return await biocrossApi.confirmProfileItem(itemId);
      } catch {
        /* fall through */
      }
    }
    const profile = await this.getHealthProfile();
    const items = profile.items.map((i) =>
      i.id === itemId
        ? { ...i, status: 'confirmed' as const, confirmedAt: new Date().toISOString() }
        : i,
    );
    return this.saveHealthProfile({ ...profile, items });
  },

  async getPreferences(): Promise<AppPreferences> {
    if (await hasSession()) {
      try {
        return await biocrossApi.getPreferences();
      } catch {
        /* fall through */
      }
    }
    return DEMO_PREFERENCES;
  },

  async savePreferences(prefs: AppPreferences): Promise<AppPreferences> {
    if (await hasSession()) {
      try {
        return await biocrossApi.savePreferences(prefs);
      } catch {
        /* fall through */
      }
    }
    return prefs;
  },

  async getChecks(): Promise<SupplementCheck[]> {
    const local = await readLocalJSON<SupplementCheck[] | null>(LOCAL_KEYS.checks, null);
    if (await hasSession()) {
      try {
        const remote = await biocrossApi.getChecks();
        return local ? mergeChecks(remote, local) : remote;
      } catch {
        /* fall through */
      }
    }
    return local ?? DEMO_CHECKS;
  },

  async getCheckById(id: string): Promise<SupplementCheck | undefined> {
    const checks = await this.getChecks();
    return checks.find((c) => c.id === id);
  },

  async saveCheck(check: SupplementCheck): Promise<SupplementCheck> {
    const checks = await this.getChecks();
    const next = [check, ...checks.filter((c) => c.id !== check.id)];
    await AsyncStorage.setItem(LOCAL_KEYS.checks, JSON.stringify(next));
    return check;
  },

  async searchSupplements(query: string): Promise<Supplement[]> {
    if (await hasSession()) {
      try {
        const res = await biocrossApi.searchSupplements(query);
        return res.supplements;
      } catch {
        /* fall through */
      }
    }
    const { findSupplementByQuery } = await import('./analysis');
    return findSupplementByQuery(query);
  },

  async lookupBarcode(barcode: string): Promise<Supplement | null> {
    if (await hasSession()) {
      try {
        const res = await biocrossApi.lookupBarcode(barcode);
        return res.supplement;
      } catch {
        /* fall through */
      }
    }
    const { findSupplementByBarcode } = await import('./analysis');
    return findSupplementByBarcode(barcode) ?? null;
  },

  async runAnalysis(supplement: SupplementType): Promise<SupplementCheck> {
    if (await hasSession()) {
      try {
        const check = await biocrossApi.runAnalysis(supplement.id);
        return this.saveCheck(check);
      } catch {
        /* fall through to local analysis */
      }
    }
    const user = await this.getUser();
    const profile = await this.getHealthProfile();
    const check = analyzeSupplement(supplement, profile, user.id);
    return this.saveCheck(check);
  },

  async getAlerts(): Promise<SafetyAlert[]> {
    if (await hasSession()) {
      try {
        return await biocrossApi.getAlerts();
      } catch {
        /* fall through */
      }
    }
    const { DEMO_ALERTS } = await import('./fixtures');
    return DEMO_ALERTS;
  },

  async markAlertRead(id: string): Promise<void> {
    if (await hasSession()) {
      try {
        await biocrossApi.markAlertRead(id);
        return;
      } catch {
        /* fall through */
      }
    }
  },

  async getDocuments(): Promise<UploadedDocument[]> {
    if (await hasSession()) {
      try {
        return await biocrossApi.getDocuments();
      } catch {
        /* fall through */
      }
    }
    return [DEMO_DOCUMENT];
  },

  async getExtractedItems(documentId: string): Promise<ExtractedHealthItem[]> {
    if (await hasSession()) {
      try {
        const res = await biocrossApi.getExtractedItems(documentId);
        return res.items;
      } catch {
        /* fall through */
      }
    }
    if (!isRemoteApi()) {
      const all = await getMockExtractedItems();
      return all.filter((i) => i.documentId === documentId);
    }
    const all = await readLocalJSON(LOCAL_KEYS.extracted, DEMO_EXTRACTED_ITEMS);
    return all.filter((i) => i.documentId === documentId);
  },

  async saveExtractedItems(items: ExtractedHealthItem[]): Promise<void> {
    if (!isRemoteApi()) {
      await saveMockExtractedItems(items);
    }
    await AsyncStorage.setItem(LOCAL_KEYS.extracted, JSON.stringify(items));
  },

  async simulateUpload(fileName: string): Promise<UploadedDocument> {
    if (await hasSession()) {
      try {
        return await biocrossApi.uploadDocument(fileName);
      } catch {
        /* fall through */
      }
    }
    const doc: UploadedDocument = {
      id: `doc-${Date.now()}`,
      fileName,
      mimeType: fileName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
      sizeBytes: 1_200_000,
      pageCount: 12,
      uploadedAt: new Date().toISOString(),
      status: 'extracted',
    };
    return doc;
  },
};
