import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
} from '../domain/models';
import { biocrossRepository } from '../domain/repository';

interface BioCrossContextValue {
  ready: boolean;
  user: User | null;
  profile: HealthProfile | null;
  checks: SupplementCheck[];
  alerts: SafetyAlert[];
  preferences: AppPreferences | null;
  documents: UploadedDocument[];
  onboarded: boolean;
  refresh: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  updateUser: (patch: Partial<User>) => Promise<void>;
  updatePreferences: (prefs: AppPreferences) => Promise<void>;
  runCheck: (supplement: Supplement) => Promise<SupplementCheck>;
  searchSupplements: (q: string) => Promise<Supplement[]>;
  lookupBarcode: (code: string) => Promise<Supplement | null>;
  uploadDocument: (fileName: string) => Promise<UploadedDocument>;
  getExtractedItems: (documentId: string) => Promise<ExtractedHealthItem[]>;
  confirmExtractedItems: (items: ExtractedHealthItem[]) => Promise<void>;
  markAlertRead: (id: string) => Promise<void>;
  addProfileItem: (item: HealthProfileItem) => Promise<void>;
  removeProfileItem: (itemId: string) => Promise<void>;
  confirmProfileItem: (itemId: string) => Promise<void>;
}

const BioCrossContext = createContext<BioCrossContextValue | null>(null);

export function BioCrossProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<HealthProfile | null>(null);
  const [checks, setChecks] = useState<SupplementCheck[]>([]);
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [preferences, setPreferences] = useState<AppPreferences | null>(null);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [onboarded, setOnboarded] = useState(false);

  const refresh = useCallback(async () => {
    const [u, p, c, a, pref, docs, onb] = await Promise.all([
      biocrossRepository.getUser(),
      biocrossRepository.getHealthProfile(),
      biocrossRepository.getChecks(),
      biocrossRepository.getAlerts(),
      biocrossRepository.getPreferences(),
      biocrossRepository.getDocuments(),
      biocrossRepository.isOnboarded(),
    ]);
    setUser(u);
    setProfile(p);
    setChecks(c);
    setAlerts(a);
    setPreferences(pref);
    setDocuments(docs);
    setOnboarded(onb);
    setReady(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo<BioCrossContextValue>(
    () => ({
      ready,
      user,
      profile,
      checks,
      alerts,
      preferences,
      documents,
      onboarded,
      refresh,
      completeOnboarding: async () => {
        await biocrossRepository.completeOnboarding();
        await refresh();
      },
      updateUser: async (patch) => {
        if (!user) return;
        await biocrossRepository.saveUser({ ...user, ...patch });
        await refresh();
      },
      updatePreferences: async (prefs) => {
        await biocrossRepository.savePreferences(prefs);
        await refresh();
      },
      runCheck: async (supplement) => {
        const check = await biocrossRepository.runAnalysis(supplement);
        await refresh();
        return check;
      },
      searchSupplements: (q) => biocrossRepository.searchSupplements(q),
      lookupBarcode: (code) => biocrossRepository.lookupBarcode(code),
      uploadDocument: async (fileName) => {
        const doc = await biocrossRepository.simulateUpload(fileName);
        await refresh();
        return doc;
      },
      getExtractedItems: (documentId) => biocrossRepository.getExtractedItems(documentId),
      confirmExtractedItems: async (items) => {
        const selected = items.filter((i) => i.status === 'added');
        await biocrossRepository.addProfileItems(
          selected.map((i) => ({
            id: `imported-${i.id}`,
            category: i.category,
            name: i.name,
            details: i.details,
            status: 'confirmed' as const,
            sourceDocumentId: i.documentId,
            confirmedAt: new Date().toISOString(),
            extractedAt: new Date().toISOString(),
          })),
        );
        await biocrossRepository.saveExtractedItems(items);
        await refresh();
      },
      markAlertRead: async (id) => {
        await biocrossRepository.markAlertRead(id);
        await refresh();
      },
      addProfileItem: async (item) => {
        await biocrossRepository.addProfileItem(item);
        await refresh();
      },
      removeProfileItem: async (itemId) => {
        await biocrossRepository.removeProfileItem(itemId);
        await refresh();
      },
      confirmProfileItem: async (itemId) => {
        await biocrossRepository.confirmProfileItem(itemId);
        await refresh();
      },
    }),
    [ready, user, profile, checks, alerts, preferences, documents, onboarded, refresh],
  );

  return <BioCrossContext.Provider value={value}>{children}</BioCrossContext.Provider>;
}

export function useBioCross() {
  const ctx = useContext(BioCrossContext);
  if (!ctx) throw new Error('useBioCross must be used within BioCrossProvider');
  return ctx;
}
