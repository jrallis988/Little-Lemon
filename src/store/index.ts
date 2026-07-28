"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppointmentDraft } from "@/content/types";

type AppointmentState = {
  step: number;
  draft: AppointmentDraft;
  setStep: (step: number) => void;
  updateDraft: (partial: Partial<AppointmentDraft>) => void;
  reset: () => void;
  complete: () => string;
};

const emptyDraft: AppointmentDraft = {
  conditionOrDepartment: "",
  insuranceCarrierId: "",
  locationSlug: "",
  telehealth: false,
  patientName: "",
  phone: "",
  notes: "",
};

function makeReferenceId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `BCH-${n}`;
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      step: 0,
      draft: emptyDraft,
      setStep: (step) => set({ step }),
      updateDraft: (partial) =>
        set({ draft: { ...get().draft, ...partial } }),
      reset: () => set({ step: 0, draft: emptyDraft }),
      complete: () => {
        const referenceId = makeReferenceId();
        set({
          step: 4,
          draft: { ...get().draft, referenceId },
        });
        return referenceId;
      },
    }),
    { name: "bch-appointment-draft" },
  ),
);

export type PortalMessage = {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
};

export type PortalResult = {
  id: string;
  name: string;
  date: string;
  status: "final" | "pending";
};

export type PortalVisit = {
  id: string;
  title: string;
  when: string;
  location: string;
};

type PortalState = {
  signedIn: boolean;
  activeTab: "overview" | "results" | "messages" | "visits" | "refills";
  messages: PortalMessage[];
  results: PortalResult[];
  visits: PortalVisit[];
  refillRequested: boolean;
  signIn: () => void;
  signOut: () => void;
  setTab: (tab: PortalState["activeTab"]) => void;
  markMessageRead: (id: string) => void;
  requestRefill: () => void;
};

export const usePortalStore = create<PortalState>()(
  persist(
    (set, get) => ({
      signedIn: false,
      activeTab: "overview",
      messages: [
        {
          id: "m1",
          from: "Epilepsy Program Nurse",
          subject: "Pre-visit questionnaire",
          preview: "Please complete this form before your upcoming visit.",
          date: "Jul 24",
          unread: true,
        },
        {
          id: "m2",
          from: "Dr. Sarah Chen",
          subject: "EEG results available",
          preview: "Your child's EEG report is ready to review.",
          date: "Jul 18",
          unread: false,
        },
      ],
      results: [
        {
          id: "r1",
          name: "EEG — routine",
          date: "Jul 17, 2025",
          status: "final",
        },
        {
          id: "r2",
          name: "Basic metabolic panel",
          date: "Jul 10, 2025",
          status: "final",
        },
        {
          id: "r3",
          name: "MRI brain w/o contrast",
          date: "Pending scheduling",
          status: "pending",
        },
      ],
      visits: [
        {
          id: "v1",
          title: "Neurology follow-up — Dr. Chen",
          when: "Aug 12, 2025 · 10:30 AM",
          location: "Main Campus — Longwood",
        },
        {
          id: "v2",
          title: "Telehealth check-in",
          when: "Sep 3, 2025 · 2:00 PM",
          location: "Telehealth",
        },
      ],
      refillRequested: false,
      signIn: () => set({ signedIn: true }),
      signOut: () => set({ signedIn: false, activeTab: "overview" }),
      setTab: (activeTab) => set({ activeTab }),
      markMessageRead: (id) =>
        set({
          messages: get().messages.map((m) =>
            m.id === id ? { ...m, unread: false } : m,
          ),
        }),
      requestRefill: () => set({ refillRequested: true }),
    }),
    { name: "bch-portal-sandbox" },
  ),
);
