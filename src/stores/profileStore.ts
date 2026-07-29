import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_DAILY_LIMIT_MINUTES,
  DEFAULT_WHITELIST,
  STORAGE_KEYS,
} from "@/lib/constants";
import { createId } from "@/lib/utils";
import type {
  AccessibilitySettings,
  HistoryEntry,
  ParentControls,
  UsageDay,
  UserProfile,
} from "@/types";
import { hashPin } from "@/services/parentGate";

const defaultAccessibility: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
};

function createDefaultProfiles(): UserProfile[] {
  return [
    {
      id: createId("profile"),
      displayName: "Avery",
      avatar: {
        shape: "soft-blob",
        primary: "#F7921E",
        secondary: "#234197",
      },
      accessibility: { ...defaultAccessibility },
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("profile"),
      displayName: "Jordan",
      avatar: {
        shape: "hex",
        primary: "#288CC1",
        secondary: "#8C6DE6",
      },
      accessibility: { ...defaultAccessibility },
      createdAt: new Date().toISOString(),
    },
  ];
}

type ProfileState = {
  profiles: UserProfile[];
  activeProfileId: string | null;
  setActiveProfile: (id: string) => void;
  updateAccessibility: (
    profileId: string,
    patch: Partial<AccessibilitySettings>,
  ) => void;
  renameProfile: (profileId: string, displayName: string) => void;
  addProfile: (displayName: string) => void;
  getActiveProfile: () => UserProfile | null;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => {
      const profiles = createDefaultProfiles();
      return {
        profiles,
        activeProfileId: profiles[0]?.id ?? null,
        setActiveProfile: (id) => set({ activeProfileId: id }),
        updateAccessibility: (profileId, patch) =>
          set((state) => ({
            profiles: state.profiles.map((profile) =>
              profile.id === profileId
                ? {
                    ...profile,
                    accessibility: { ...profile.accessibility, ...patch },
                  }
                : profile,
            ),
          })),
        renameProfile: (profileId, displayName) =>
          set((state) => ({
            profiles: state.profiles.map((profile) =>
              profile.id === profileId ? { ...profile, displayName } : profile,
            ),
          })),
        addProfile: (displayName) =>
          set((state) => ({
            profiles: [
              ...state.profiles,
              {
                id: createId("profile"),
                displayName,
                avatar: {
                  shape: "circle",
                  primary: "#234197",
                  secondary: "#F7921E",
                },
                accessibility: { ...defaultAccessibility },
                createdAt: new Date().toISOString(),
              },
            ],
          })),
        getActiveProfile: () => {
          const { profiles: list, activeProfileId } = get();
          return list.find((p) => p.id === activeProfileId) ?? null;
        },
      };
    },
    { name: STORAGE_KEYS.profiles },
  ),
);

type ParentState = {
  controls: ParentControls;
  unlockedUntil: number | null;
  history: HistoryEntry[];
  usage: UsageDay[];
  setDailyLimit: (minutes: number) => void;
  setWhitelist: (domains: string[]) => void;
  addWhitelistDomain: (domain: string) => void;
  removeWhitelistDomain: (domain: string) => void;
  setLearningModeEnabled: (enabled: boolean) => void;
  setAllowlistOnly: (enabled: boolean) => void;
  setPin: (pin: string) => Promise<void>;
  unlock: (pin: string) => Promise<boolean>;
  lock: () => void;
  isUnlocked: () => boolean;
  pushHistory: (entry: Omit<HistoryEntry, "id">) => void;
  recordUsageTick: (profileId: string, seconds: number) => void;
  recordSearch: () => void;
  recordBlockedAttempt: () => void;
};

async function createDefaultParentControls(): Promise<ParentControls> {
  const seeded = await hashPin("0000", "surf-default-salt");
  return {
    pinHash: seeded.hash,
    pinSalt: seeded.salt,
    dailyLimitMinutes: DEFAULT_DAILY_LIMIT_MINUTES,
    whitelist: [...DEFAULT_WHITELIST],
    learningModeEnabled: true,
    allowlistOnly: true,
  };
}

const initialParentControls: ParentControls = {
  pinHash: "",
  pinSalt: "surf-default-salt",
  dailyLimitMinutes: DEFAULT_DAILY_LIMIT_MINUTES,
  whitelist: [...DEFAULT_WHITELIST],
  learningModeEnabled: true,
  allowlistOnly: true,
};

export const useParentStore = create<ParentState>()(
  persist(
    (set, get) => ({
      controls: initialParentControls,
      unlockedUntil: null,
      history: [],
      usage: [],
      setDailyLimit: (minutes) =>
        set((state) => ({
          controls: {
            ...state.controls,
            dailyLimitMinutes: Math.min(240, Math.max(15, minutes)),
          },
        })),
      setWhitelist: (domains) =>
        set((state) => ({
          controls: { ...state.controls, whitelist: domains },
        })),
      addWhitelistDomain: (domain) =>
        set((state) => {
          const normalized = domain.trim().toLowerCase().replace(/^www\./, "");
          if (!normalized || state.controls.whitelist.includes(normalized)) {
            return state;
          }
          return {
            controls: {
              ...state.controls,
              whitelist: [...state.controls.whitelist, normalized],
            },
          };
        }),
      removeWhitelistDomain: (domain) =>
        set((state) => ({
          controls: {
            ...state.controls,
            whitelist: state.controls.whitelist.filter((d) => d !== domain),
          },
        })),
      setLearningModeEnabled: (enabled) =>
        set((state) => ({
          controls: { ...state.controls, learningModeEnabled: enabled },
        })),
      setAllowlistOnly: (enabled) =>
        set((state) => ({
          controls: { ...state.controls, allowlistOnly: enabled },
        })),
      setPin: async (pin) => {
        const salted = await hashPin(pin);
        set((state) => ({
          controls: {
            ...state.controls,
            pinHash: salted.hash,
            pinSalt: salted.salt,
          },
        }));
      },
      unlock: async (pin) => {
        const { controls } = get();
        const attempt = await hashPin(pin, controls.pinSalt);
        if (attempt.hash !== controls.pinHash) return false;
        set({ unlockedUntil: Date.now() + 15 * 60 * 1000 });
        return true;
      },
      lock: () => set({ unlockedUntil: null }),
      isUnlocked: () => {
        const until = get().unlockedUntil;
        return Boolean(until && until > Date.now());
      },
      pushHistory: (entry) =>
        set((state) => ({
          history: [
            { ...entry, id: createId("hist") },
            ...state.history,
          ].slice(0, 200),
        })),
      recordUsageTick: (_profileId, seconds) => {
        if (seconds < 60) return;
        const date = new Date().toISOString().slice(0, 10);
        set((state) => {
          const existing = state.usage.find((day) => day.date === date);
          if (!existing) {
            return {
              usage: [
                ...state.usage,
                {
                  date,
                  minutes: 1,
                  searches: 0,
                  blockedAttempts: 0,
                },
              ].slice(-30),
            };
          }
          return {
            usage: state.usage.map((day) =>
              day.date === date
                ? { ...day, minutes: day.minutes + 1 }
                : day,
            ),
          };
        });
      },
      recordSearch: () => {
        const date = new Date().toISOString().slice(0, 10);
        set((state) => {
          const existing = state.usage.find((day) => day.date === date);
          if (!existing) {
            return {
              usage: [
                ...state.usage,
                { date, minutes: 0, searches: 1, blockedAttempts: 0 },
              ].slice(-30),
            };
          }
          return {
            usage: state.usage.map((day) =>
              day.date === date
                ? { ...day, searches: day.searches + 1 }
                : day,
            ),
          };
        });
      },
      recordBlockedAttempt: () => {
        const date = new Date().toISOString().slice(0, 10);
        set((state) => {
          const existing = state.usage.find((day) => day.date === date);
          if (!existing) {
            return {
              usage: [
                ...state.usage,
                { date, minutes: 0, searches: 0, blockedAttempts: 1 },
              ].slice(-30),
            };
          }
          return {
            usage: state.usage.map((day) =>
              day.date === date
                ? { ...day, blockedAttempts: day.blockedAttempts + 1 }
                : day,
            ),
          };
        });
      },
    }),
    {
      name: STORAGE_KEYS.parentControls,
      partialize: (state) => ({
        controls: state.controls,
        history: state.history,
        usage: state.usage,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (!state.controls.pinHash) {
          void createDefaultParentControls().then((controls) => {
            useParentStore.setState({ controls });
          });
        }
      },
    },
  ),
);
