"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { PRESCRIPTIONS } from "@/lib/data/catalog";
import type { Prescription, PrescriptionStatus } from "@/lib/types";

interface PharmacyContextValue {
  prescriptions: Prescription[];
  refillPrescriptions: (ids: string[]) => void;
  advancingIds: string[];
}

const PharmacyContext = createContext<PharmacyContextValue | null>(null);

function withStatus(
  rx: Prescription,
  status: PrescriptionStatus,
): Prescription {
  return {
    ...rx,
    status,
    statusUpdatedAt: new Date().toISOString(),
  };
}

export function PharmacyProvider({ children }: { children: ReactNode }) {
  const [prescriptions, setPrescriptions] =
    useState<Prescription[]>(PRESCRIPTIONS);
  const [advancingIds, setAdvancingIds] = useState<string[]>([]);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const refillPrescriptions = useCallback(
    (ids: string[]) => {
      if (ids.length === 0) return;

      clearTimers();
      setAdvancingIds(ids);

      const readyBy = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

      setPrescriptions((current) =>
        current.map((rx) => {
          if (!ids.includes(rx.id)) return rx;
          return {
            ...withStatus(rx, "received"),
            refillsRemaining: Math.max(0, rx.refillsRemaining - 1),
            readyBy,
          };
        }),
      );

      const fillingTimer = window.setTimeout(() => {
        setPrescriptions((current) =>
          current.map((rx) =>
            ids.includes(rx.id) && rx.status === "received"
              ? withStatus(rx, "filling")
              : rx,
          ),
        );
      }, 1400);

      const readyTimer = window.setTimeout(() => {
        setPrescriptions((current) =>
          current.map((rx) =>
            ids.includes(rx.id) &&
            (rx.status === "filling" || rx.status === "received")
              ? withStatus(rx, "ready")
              : rx,
          ),
        );
        setAdvancingIds((current) =>
          current.filter((id) => !ids.includes(id)),
        );
      }, 3200);

      timersRef.current = [fillingTimer, readyTimer];
    },
    [clearTimers],
  );

  const value = useMemo(
    () => ({
      prescriptions,
      refillPrescriptions,
      advancingIds,
    }),
    [advancingIds, prescriptions, refillPrescriptions],
  );

  return (
    <PharmacyContext.Provider value={value}>{children}</PharmacyContext.Provider>
  );
}

export function usePharmacy(): PharmacyContextValue {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error("usePharmacy must be used within PharmacyProvider");
  }
  return context;
}
