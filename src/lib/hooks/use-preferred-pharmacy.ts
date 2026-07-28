"use client";

import { useCallback, useState } from "react";

/** Toggle preferred pharmacy via account API; tracks local UI state. */
export function usePreferredPharmacy(initial = false) {
  const [isPreferred, setIsPreferred] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);

  const togglePreferred = useCallback(async (pharmacyId: string) => {
    setMessage(null);
    if (isPreferred) {
      const res = await fetch(
        `/api/me/pharmacies?pharmacyId=${encodeURIComponent(pharmacyId)}`,
        { method: "DELETE" }
      );
      if (res.status === 401) {
        setMessage("Sign in to save pharmacies.");
        return;
      }
      if (res.ok) setIsPreferred(false);
      return;
    }

    const res = await fetch("/api/me/pharmacies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pharmacyId }),
    });
    if (res.status === 401) {
      setMessage("Sign in to save pharmacies.");
      return;
    }
    if (res.ok) setIsPreferred(true);
  }, [isPreferred]);

  return { isPreferred, togglePreferred, message };
}
