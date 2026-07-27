"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SavedMedication, SupplyDays } from "@/lib/types";

interface ProfileState {
  displayName: string;
  preferredPharmacyIds: string[];
  savedMedications: SavedMedication[];
  allowPersonalizedTips: boolean;
  hasSeenWelcome: boolean;
  setDisplayName: (name: string) => void;
  togglePreferredPharmacy: (pharmacyId: string) => void;
  saveMedication: (med: Omit<SavedMedication, "savedAtIso">) => void;
  removeMedication: (drugId: string, strengthId: string) => void;
  setPriceAlert: (
    drugId: string,
    strengthId: string,
    enabled: boolean,
    baseline?: number
  ) => void;
  setAllowPersonalizedTips: (allow: boolean) => void;
  setHasSeenWelcome: (seen: boolean) => void;
  updateSupplyPreference: (
    drugId: string,
    strengthId: string,
    supplyDays: SupplyDays
  ) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      displayName: "",
      preferredPharmacyIds: [],
      savedMedications: [],
      allowPersonalizedTips: false,
      hasSeenWelcome: false,
      setDisplayName: (name) => set({ displayName: name.trim() }),
      togglePreferredPharmacy: (pharmacyId) => {
        const current = get().preferredPharmacyIds;
        set({
          preferredPharmacyIds: current.includes(pharmacyId)
            ? current.filter((id) => id !== pharmacyId)
            : [...current, pharmacyId],
        });
      },
      saveMedication: (med) => {
        const existing = get().savedMedications.filter(
          (m) => !(m.drugId === med.drugId && m.strengthId === med.strengthId)
        );
        set({
          savedMedications: [
            ...existing,
            { ...med, savedAtIso: new Date().toISOString() },
          ],
        });
      },
      removeMedication: (drugId, strengthId) => {
        set({
          savedMedications: get().savedMedications.filter(
            (m) => !(m.drugId === drugId && m.strengthId === strengthId)
          ),
        });
      },
      setPriceAlert: (drugId, strengthId, enabled, baseline) => {
        set({
          savedMedications: get().savedMedications.map((m) =>
            m.drugId === drugId && m.strengthId === strengthId
              ? {
                  ...m,
                  priceAlertEnabled: enabled,
                  alertBaselinePrice: enabled
                    ? (baseline ?? m.alertBaselinePrice)
                    : undefined,
                }
              : m
          ),
        });
      },
      setAllowPersonalizedTips: (allow) => set({ allowPersonalizedTips: allow }),
      setHasSeenWelcome: (seen) => set({ hasSeenWelcome: seen }),
      updateSupplyPreference: (drugId, strengthId, supplyDays) => {
        set({
          savedMedications: get().savedMedications.map((m) =>
            m.drugId === drugId && m.strengthId === strengthId
              ? { ...m, supplyDays }
              : m
          ),
        });
      },
    }),
    { name: "trump-rx-profile-v1" }
  )
);
