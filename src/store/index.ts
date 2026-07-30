"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppointmentDraft } from "@/content/types";

type AppointmentState = {
  step: number;
  draft: AppointmentDraft;
  submitting: boolean;
  submitError: string | null;
  setStep: (step: number) => void;
  updateDraft: (partial: Partial<AppointmentDraft>) => void;
  reset: () => void;
  /** Persist confirmation after API success */
  completeWithReference: (referenceId: string) => void;
  setSubmitting: (submitting: boolean) => void;
  setSubmitError: (error: string | null) => void;
};

const emptyDraft: AppointmentDraft = {
  conditionOrDepartment: "",
  insuranceCarrierId: "",
  locationSlug: "",
  telehealth: false,
  patientName: "",
  phone: "",
  email: "",
  notes: "",
};

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      step: 0,
      draft: emptyDraft,
      submitting: false,
      submitError: null,
      setStep: (step) => set({ step: Math.max(0, Math.min(4, step)) }),
      updateDraft: (partial) =>
        set({ draft: { ...get().draft, ...partial } }),
      reset: () =>
        set({
          step: 0,
          draft: emptyDraft,
          submitting: false,
          submitError: null,
        }),
      completeWithReference: (referenceId) => {
        set({
          step: 4,
          draft: { ...get().draft, referenceId },
          submitting: false,
          submitError: null,
        });
      },
      setSubmitting: (submitting) => set({ submitting }),
      setSubmitError: (submitError) => set({ submitError }),
    }),
    {
      name: "bch-appointment-draft",
      partialize: (state) => ({ step: state.step, draft: state.draft }),
    },
  ),
);

export type PortalThreadMessage = {
  id: string;
  from: string;
  date: string;
  body: string;
};

export type PortalMessage = {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  thread: PortalThreadMessage[];
};

export type PortalResult = {
  id: string;
  name: string;
  date: string;
  status: "final" | "pending";
  detail?: string;
};

export type PortalVisit = {
  id: string;
  title: string;
  when: string;
  location: string;
  status: "scheduled" | "cancelled" | "completed";
};

export type PortalMedication = {
  id: string;
  name: string;
  dose: string;
  instructions: string;
  refillsLeft: number;
};

type PortalState = {
  signedIn: boolean;
  activeTab: "overview" | "results" | "messages" | "visits" | "refills";
  messages: PortalMessage[];
  results: PortalResult[];
  visits: PortalVisit[];
  medications: PortalMedication[];
  refillRequested: boolean;
  selectedMessageId: string | null;
  signIn: () => void;
  signOut: () => void;
  setTab: (tab: PortalState["activeTab"]) => void;
  markMessageRead: (id: string) => void;
  selectMessage: (id: string) => void;
  replyToMessage: (id: string, body: string) => void;
  requestRefill: () => void;
  cancelVisit: (id: string) => void;
};

export const usePortalStore = create<PortalState>()(
  persist(
    (set, get) => ({
      signedIn: false,
      activeTab: "overview",
      selectedMessageId: null,
      messages: [
        {
          id: "m1",
          from: "Epilepsy Program Nurse",
          subject: "Pre-visit questionnaire",
          preview: "Please complete this form before your upcoming visit.",
          date: "Jul 24",
          unread: true,
          thread: [
            {
              id: "m1-t1",
              from: "Epilepsy Program Nurse",
              date: "Jul 24 · 9:12 AM",
              body: "Please complete the pre-visit questionnaire in MyChildren’s before August 12. It helps us prepare for seizure history updates and medication review.",
            },
          ],
        },
        {
          id: "m2",
          from: "Dr. Sarah Chen",
          subject: "EEG results available",
          preview: "Your child's EEG report is ready to review.",
          date: "Jul 18",
          unread: false,
          thread: [
            {
              id: "m2-t1",
              from: "Dr. Sarah Chen",
              date: "Jul 18 · 3:40 PM",
              body: "The routine EEG report is finalized. Overall findings are consistent with prior studies. We’ll review together at the follow-up visit.",
            },
            {
              id: "m2-t2",
              from: "You",
              date: "Jul 18 · 4:05 PM",
              body: "Thank you — should we continue the current medication dose until then?",
            },
            {
              id: "m2-t3",
              from: "Dr. Sarah Chen",
              date: "Jul 18 · 4:22 PM",
              body: "Yes, continue as prescribed unless new side effects appear. Call the nurse line for urgent concerns.",
            },
          ],
        },
        {
          id: "m3",
          from: "Billing Support",
          subject: "Explanation of benefits",
          preview: "A new EOB is available for your July imaging visit.",
          date: "Jul 12",
          unread: true,
          thread: [
            {
              id: "m3-t1",
              from: "Billing Support",
              date: "Jul 12 · 11:00 AM",
              body: "An explanation of benefits for the July imaging visit is ready. This is a demo message — no payment is due in the sandbox.",
            },
          ],
        },
      ],
      results: [
        {
          id: "r1",
          name: "EEG — routine",
          date: "Jul 17, 2025",
          status: "final",
          detail:
            "Impression: no electrographic seizures during the recording. Background activity age-appropriate.",
        },
        {
          id: "r2",
          name: "Basic metabolic panel",
          date: "Jul 10, 2025",
          status: "final",
          detail: "All values within reference range for age.",
        },
        {
          id: "r3",
          name: "MRI brain w/o contrast",
          date: "Pending scheduling",
          status: "pending",
          detail: "Order placed — scheduling team will contact you.",
        },
        {
          id: "r4",
          name: "CBC with differential",
          date: "Jun 28, 2025",
          status: "final",
          detail: "No significant abnormalities.",
        },
      ],
      visits: [
        {
          id: "v1",
          title: "Neurology follow-up — Dr. Chen",
          when: "Aug 12, 2025 · 10:30 AM",
          location: "Main Campus — Longwood",
          status: "scheduled",
        },
        {
          id: "v2",
          title: "Telehealth check-in",
          when: "Sep 3, 2025 · 2:00 PM",
          location: "Telehealth",
          status: "scheduled",
        },
        {
          id: "v3",
          title: "EEG appointment",
          when: "Jul 17, 2025 · 8:00 AM",
          location: "Main Campus — Longwood",
          status: "completed",
        },
      ],
      medications: [
        {
          id: "med1",
          name: "Levetiracetam",
          dose: "250 mg tablet",
          instructions: "Take twice daily with food",
          refillsLeft: 2,
        },
        {
          id: "med2",
          name: "Vitamin D3",
          dose: "1000 IU",
          instructions: "Take once daily",
          refillsLeft: 5,
        },
      ],
      refillRequested: false,
      signIn: () => set({ signedIn: true }),
      signOut: () =>
        set({
          signedIn: false,
          activeTab: "overview",
          selectedMessageId: null,
        }),
      setTab: (activeTab) => set({ activeTab }),
      markMessageRead: (id) =>
        set({
          messages: get().messages.map((m) =>
            m.id === id ? { ...m, unread: false } : m,
          ),
        }),
      selectMessage: (id) => set({ selectedMessageId: id }),
      replyToMessage: (id, body) =>
        set({
          messages: get().messages.map((m) =>
            m.id === id
              ? {
                  ...m,
                  unread: false,
                  thread: [
                    ...m.thread,
                    {
                      id: `${id}-reply-${m.thread.length + 1}`,
                      from: "You",
                      date: "Just now",
                      body,
                    },
                  ],
                }
              : m,
          ),
        }),
      requestRefill: () => set({ refillRequested: true }),
      cancelVisit: (id) =>
        set({
          visits: get().visits.map((v) =>
            v.id === id ? { ...v, status: "cancelled" } : v,
          ),
        }),
    }),
    { name: "bch-portal-sandbox" },
  ),
);
