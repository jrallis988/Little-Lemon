"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getClubById, type Club } from "@/lib/clubs";
import { HOME_CLUB } from "@/lib/home-club";

type SelectedClubContextValue = {
  club: Club | null;
  setClub: (club: Club | null) => void;
};

const SelectedClubContext = createContext<SelectedClubContextValue | null>(
  null
);

export function SelectedClubProvider({ children }: { children: ReactNode }) {
  const [club, setClub] = useState<Club | null>(() => getClubById(HOME_CLUB.id));
  const value = useMemo(() => ({ club, setClub }), [club]);
  return (
    <SelectedClubContext.Provider value={value}>
      {children}
    </SelectedClubContext.Provider>
  );
}

export function useSelectedClub() {
  const ctx = useContext(SelectedClubContext);
  if (!ctx) {
    return {
      club: null as Club | null,
      setClub: (() => undefined) as (club: Club | null) => void,
    };
  }
  return ctx;
}
