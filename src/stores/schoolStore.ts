import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";
import { createId } from "@/lib/utils";

export type ClassRoster = {
  id: string;
  name: string;
  code: string;
  teacherName: string;
  createdAt: string;
  memberProfileIds: string[];
  sharedAllowlist: string[];
};

type SchoolState = {
  classes: ClassRoster[];
  createClass: (input: {
    name: string;
    teacherName: string;
    sharedAllowlist?: string[];
  }) => ClassRoster;
  joinClass: (code: string, profileId: string) => boolean;
  removeClass: (id: string) => void;
  getClass: (id: string) => ClassRoster | undefined;
};

function makeCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export const useSchoolStore = create<SchoolState>()(
  persist(
    (set, get) => ({
      classes: [],
      createClass: ({ name, teacherName, sharedAllowlist = [] }) => {
        const roster: ClassRoster = {
          id: createId("class"),
          name: name.trim() || "Classroom",
          code: makeCode(),
          teacherName: teacherName.trim() || "Teacher",
          createdAt: new Date().toISOString(),
          memberProfileIds: [],
          sharedAllowlist,
        };
        set((state) => ({ classes: [roster, ...state.classes] }));
        return roster;
      },
      joinClass: (code, profileId) => {
        const normalized = code.trim().toUpperCase();
        const match = get().classes.find((item) => item.code === normalized);
        if (!match) return false;
        set((state) => ({
          classes: state.classes.map((item) =>
            item.id === match.id &&
            !item.memberProfileIds.includes(profileId)
              ? {
                  ...item,
                  memberProfileIds: [...item.memberProfileIds, profileId],
                }
              : item,
          ),
        }));
        return true;
      },
      removeClass: (id) =>
        set((state) => ({
          classes: state.classes.filter((item) => item.id !== id),
        })),
      getClass: (id) => get().classes.find((item) => item.id === id),
    }),
    { name: `${STORAGE_KEYS.parentControls}.school` },
  ),
);

export function buildUsageReport(input: {
  childName: string;
  grade: number;
  searches: number;
  minutes: number;
  blockedAttempts: number;
  recentTitles: string[];
}): string {
  const date = new Date().toLocaleDateString();
  return [
    `Surf Learning Report — ${date}`,
    `Student: ${input.childName} (Grade ${input.grade})`,
    `Session minutes (recorded): ${input.minutes}`,
    `Searches: ${input.searches}`,
    `Blocked attempts: ${input.blockedAttempts}`,
    "",
    "Recent learning titles:",
    ...(input.recentTitles.length
      ? input.recentTitles.map((title, index) => `${index + 1}. ${title}`)
      : ["(none yet)"]),
    "",
    "Generated for parents/teachers from Surf parent controls.",
  ].join("\n");
}
