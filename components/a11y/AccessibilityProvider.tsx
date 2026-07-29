"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyA11yPrefs,
  defaultA11yPrefs,
  loadA11yPrefs,
  saveA11yPrefs,
  type A11yPrefs,
} from "@/lib/a11y-prefs";

type A11yContextValue = {
  prefs: A11yPrefs;
  setPrefs: (next: A11yPrefs | ((prev: A11yPrefs) => A11yPrefs)) => void;
  resetPrefs: () => void;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
};

const A11yContext = createContext<A11yContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefsState] = useState<A11yPrefs>(defaultA11yPrefs);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const loaded = loadA11yPrefs();
    setPrefsState(loaded);
    applyA11yPrefs(loaded);
  }, []);

  const setPrefs = useCallback(
    (next: A11yPrefs | ((prev: A11yPrefs) => A11yPrefs)) => {
      setPrefsState((prev) => {
        const value = typeof next === "function" ? next(prev) : next;
        applyA11yPrefs(value);
        saveA11yPrefs(value);
        return value;
      });
    },
    []
  );

  const resetPrefs = useCallback(() => {
    setPrefs(defaultA11yPrefs);
  }, [setPrefs]);

  const value = useMemo(
    () => ({
      prefs,
      setPrefs,
      resetPrefs,
      panelOpen,
      openPanel: () => setPanelOpen(true),
      closePanel: () => setPanelOpen(false),
    }),
    [prefs, setPrefs, resetPrefs, panelOpen]
  );

  return (
    <A11yContext.Provider value={value}>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) {
    throw new Error("useA11y must be used within AccessibilityProvider");
  }
  return ctx;
}
