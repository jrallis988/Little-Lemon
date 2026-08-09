import { create } from "zustand";
import type { UrlCheckResult } from "@/types";
import { checkUrlAgainstWhitelist } from "@/services/urlFilter";
import { useParentStore } from "@/stores/profileStore";

type SafetyState = {
  lastCheck: UrlCheckResult | null;
  interceptorEnabled: boolean;
  setInterceptorEnabled: (enabled: boolean) => void;
  intercept: (rawUrl: string) => UrlCheckResult;
};

export const useSafetyStore = create<SafetyState>((set) => ({
  lastCheck: null,
  interceptorEnabled: true,
  setInterceptorEnabled: (enabled) => set({ interceptorEnabled: enabled }),
  intercept: (rawUrl) => {
    const { controls } = useParentStore.getState();
    const result = checkUrlAgainstWhitelist(rawUrl, {
      whitelist: controls.whitelist,
      allowlistOnly: controls.allowlistOnly,
      blocklist: controls.blocklist ?? [],
    });
    set({ lastCheck: result });
    if (!result.allowed) {
      useParentStore.getState().recordBlockedAttempt();
    }
    return result;
  },
}));
