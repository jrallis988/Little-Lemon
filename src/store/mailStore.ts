import { create } from "zustand";
import { db, ensureSeedData } from "@/lib/db";
import type {
  Contact,
  Draft,
  FolderId,
  GradeLevel,
  LearningStage,
  Message,
} from "@/types/mail";
import { stageFromGrade } from "@/types/mail";

const GRADE_STORAGE_KEY = "mailbox.grade";
const LEGACY_STAGE_STORAGE_KEY = "mailbox.learningStage";

function isGradeLevel(value: number): value is GradeLevel {
  return Number.isInteger(value) && value >= 1 && value <= 12;
}

function readStoredGrade(): GradeLevel {
  try {
    const raw = localStorage.getItem(GRADE_STORAGE_KEY);
    if (raw) {
      const parsed = Number(raw);
      if (isGradeLevel(parsed)) return parsed;
    }

    // Migrate older band-only preference into a representative grade.
    const legacy = localStorage.getItem(LEGACY_STAGE_STORAGE_KEY);
    if (legacy === "middle") return 7;
    if (legacy === "high") return 10;
    if (legacy === "elementary") return 3;
  } catch {
    /* ignore */
  }
  return 3;
}

interface MailState {
  ready: boolean;
  grade: GradeLevel;
  learningStage: LearningStage;
  folder: FolderId;
  selectedMessageId: string | null;
  messages: Message[];
  contacts: Contact[];
  drafts: Draft[];
  searchQuery: string;
  hydrate: () => Promise<void>;
  setGrade: (grade: GradeLevel) => void;
  setFolder: (folder: FolderId) => void;
  selectMessage: (id: string | null) => void;
  markRead: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  saveDraft: (
    draft: Omit<Draft, "id" | "updatedAt"> & { id?: string },
  ) => Promise<string>;
  sendDraft: (
    draft: Omit<Draft, "id" | "updatedAt"> & { id?: string },
  ) => Promise<void>;
}

function contactMap(contacts: Contact[]) {
  return new Map(contacts.map((c) => [c.id, c]));
}

export function getContact(
  contacts: Contact[],
  contactId: string,
): Contact | undefined {
  return contactMap(contacts).get(contactId);
}

export const useMailStore = create<MailState>((set, get) => ({
  ready: false,
  grade: 3,
  learningStage: "elementary",
  folder: "inbox",
  selectedMessageId: null,
  messages: [],
  contacts: [],
  drafts: [],
  searchQuery: "",

  hydrate: async () => {
    await ensureSeedData();
    const [messages, contacts, drafts] = await Promise.all([
      db.messages.orderBy("sentAt").reverse().toArray(),
      db.contacts.toArray(),
      db.drafts.orderBy("updatedAt").reverse().toArray(),
    ]);

    const grade = readStoredGrade();
    const inboxFirst = messages.find((m) => m.folder === "inbox");
    set({
      ready: true,
      grade,
      learningStage: stageFromGrade(grade),
      messages,
      contacts,
      drafts,
      selectedMessageId: get().selectedMessageId ?? inboxFirst?.id ?? null,
    });
  },

  setGrade: (grade) => {
    try {
      localStorage.setItem(GRADE_STORAGE_KEY, String(grade));
      localStorage.removeItem(LEGACY_STAGE_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    set({ grade, learningStage: stageFromGrade(grade) });
  },

  setFolder: (folder) => {
    const { messages } = get();
    const first = messages.find((m) => m.folder === folder);
    set({
      folder,
      selectedMessageId: first?.id ?? null,
      searchQuery: "",
    });
  },

  selectMessage: (id) => set({ selectedMessageId: id }),

  markRead: async (id) => {
    await db.messages.update(id, { unread: false });
    set({
      messages: get().messages.map((m) =>
        m.id === id ? { ...m, unread: false } : m,
      ),
    });
  },

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  saveDraft: async (draftInput) => {
    const id = draftInput.id ?? crypto.randomUUID();
    const draft: Draft = {
      id,
      to: draftInput.to,
      subject: draftInput.subject,
      body: draftInput.body,
      updatedAt: new Date().toISOString(),
    };

    await db.drafts.put(draft);
    const drafts = await db.drafts.orderBy("updatedAt").reverse().toArray();
    set({ drafts });
    return id;
  },

  sendDraft: async (draftInput) => {
    const now = new Date().toISOString();
    const message: Message = {
      id: crypto.randomUUID(),
      folder: "sent",
      fromContactId: "c-teacher",
      toLabel: draftInput.to || "Recipient",
      subject: draftInput.subject || "(No subject)",
      preview: draftInput.body.slice(0, 90),
      body: draftInput.body,
      sentAt: now,
      unread: false,
    };

    await db.messages.put(message);
    if (draftInput.id) {
      await db.drafts.delete(draftInput.id);
    }

    const [messages, drafts] = await Promise.all([
      db.messages.orderBy("sentAt").reverse().toArray(),
      db.drafts.orderBy("updatedAt").reverse().toArray(),
    ]);

    set({
      messages,
      drafts,
      folder: "sent",
      selectedMessageId: message.id,
    });
  },
}));
