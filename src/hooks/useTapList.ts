import { useEffect, useState } from "react";
import {
  Beer,
  classics as fallbackClassics,
  pouringNow as fallbackPouring,
  tapListUpdatedLabel,
} from "../data/beers";
import { asset } from "../lib/asset";

type TapPayload = {
  updated?: string;
  pouringNow: Beer[];
  classics: Beer[];
};

export function useTapList() {
  const [pouringNow, setPouringNow] = useState<Beer[]>(fallbackPouring);
  const [classics, setClassics] = useState<Beer[]>(fallbackClassics);
  const [updatedLabel, setUpdatedLabel] = useState(tapListUpdatedLabel());

  useEffect(() => {
    let cancelled = false;

    fetch(asset("data/taps.json"), { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: TapPayload) => {
        if (cancelled) return;
        if (Array.isArray(data.pouringNow) && data.pouringNow.length) {
          setPouringNow(data.pouringNow);
        }
        if (Array.isArray(data.classics) && data.classics.length) {
          setClassics(data.classics);
        }
        if (data.updated) {
          const d = new Date(`${data.updated}T12:00:00`);
          if (!Number.isNaN(d.getTime())) {
            setUpdatedLabel(tapListUpdatedLabel(d));
          }
        }
      })
      .catch(() => {
        /* keep bundled fallbacks */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { pouringNow, classics, updatedLabel };
}
