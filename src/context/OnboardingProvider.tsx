import { useCallback, useMemo, useState, type ReactNode } from "react";
import { OnboardingModal } from "../components/onboarding/OnboardingModal";
import { OnboardingContext } from "./onboardingContext";

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openOnboarding = useCallback(() => setOpen(true), []);
  const closeOnboarding = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openOnboarding, closeOnboarding }),
    [open, openOnboarding, closeOnboarding]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
      <OnboardingModal open={open} onClose={closeOnboarding} />
    </OnboardingContext.Provider>
  );
}
