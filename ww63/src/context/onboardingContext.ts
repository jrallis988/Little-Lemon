import { createContext } from "react";

export type OnboardingContextValue = {
  open: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
};

export const OnboardingContext = createContext<OnboardingContextValue | null>(null);
