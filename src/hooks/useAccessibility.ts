import { useEffect } from "react";
import { useProfileStore } from "@/stores/profileStore";

export function useAccessibility() {
  const profiles = useProfileStore((s) => s.profiles);
  const activeProfileId = useProfileStore((s) => s.activeProfileId);
  const active = profiles.find((p) => p.id === activeProfileId);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle(
      "high-contrast",
      Boolean(active?.accessibility.highContrast),
    );
    root.classList.toggle(
      "large-text",
      Boolean(active?.accessibility.largeText),
    );
  }, [active?.accessibility.highContrast, active?.accessibility.largeText]);

  return active?.accessibility ?? { highContrast: false, largeText: false };
}
