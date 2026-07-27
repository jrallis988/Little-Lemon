"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_LOCATION } from "@/lib/data/pharmacies";
import { resolveLocationFromZip } from "@/lib/pricing";
import type { LocationContext } from "@/lib/types";

interface LocationState {
  location: LocationContext;
  setZip: (zip: string) => boolean;
  setLocation: (location: LocationContext) => void;
  requestBrowserGeolocation: () => Promise<{ ok: boolean; message?: string }>;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      location: { ...DEFAULT_LOCATION },
      setZip: (zip) => {
        const resolved = resolveLocationFromZip(zip);
        if (!resolved) return false;
        set({ location: resolved });
        return true;
      },
      setLocation: (location) => set({ location }),
      requestBrowserGeolocation: () =>
        new Promise((resolve) => {
          if (typeof navigator === "undefined" || !navigator.geolocation) {
            resolve({ ok: false, message: "Geolocation is not available in this browser." });
            return;
          }
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              set({
                location: {
                  zip: DEFAULT_LOCATION.zip,
                  city: "Near you",
                  state: DEFAULT_LOCATION.state,
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                  label: "Current location",
                },
              });
              resolve({ ok: true });
            },
            () =>
              resolve({
                ok: false,
                message: "Location permission denied. You can still enter a ZIP code.",
              }),
            { enableHighAccuracy: false, timeout: 8000 }
          );
        }),
    }),
    { name: "trump-rx-location-v1" }
  )
);
