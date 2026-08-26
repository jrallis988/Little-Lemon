import { create } from "zustand";
import { AVATAR_COLORS, DEFAULT_SETTINGS } from "@/data/seed";
import { db, ensureSeedData } from "@/lib/db";
import type {
  AppSettings,
  AttachmentMeta,
  Contact,
  Draft,
  FolderId,
  GradeLevel,
  InboxFilter,
  LearningStage,
  Message,
  SafetyLevel,
} from "@/types/mail";
import { stageFromGrade } from "@/types/mail";

const GRADE_STORAGE_KEY = "mailbox.grade";
const LEGACY_STAGE_STORAGE_KEY = "mailbox.learningStage";
const TEACHER_SESSION_KEY = "mailbox.teacherUnlocked";

function isGradeLevel(value: number): value is GradeLevel {
  return Number.isInteger(value) && value >= 1 && value <= 12;
}

function readStoredGrade(fallback: GradeLevel): GradeLevel {
  try {
    const raw = localStorage.getItem(GRADE_STORAGE_KEY);
    if (raw) {
      const parsed = Number(raw);
      if (isGradeLevel(parsed)) return parsed;
    }

    const legacy = localStorage.getItem(LEGACY_STAGE_STORAGE_KEY);
    if (legacy === "middle") return 7;
    if (legacy === "high") return 10;
    if (legacy === "elementary") return 3;
  } catch {
    /* ignore */
  }
  return fallback;
}

function readTeacherUnlocked(): boolean {
  try {
    return localStorage.getItem(TEACHER_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export interface ComposePayload {
  id?: string;
  to: string;
  subject: string;
  body: string;
  attachments?: AttachmentMeta[];
  replyToId?: string;
  teacherComment?: string;
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
  settings: AppSettings;
  teacherUnlocked: boolean;
  searchQuery: string;
  inboxFilter: InboxFilter;
  hydrate: () => Promise<void>;
  setGrade: (grade: GradeLevel) => void;
  setFolder: (folder: FolderId) => void;
  selectMessage: (id: string | null) => void;
  markRead: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setInboxFilter: (filter: InboxFilter) => void;
  completeOnboarding: (grade: GradeLevel) => Promise<void>;
  unlockTeacher: (pin: string) => boolean;
  lockTeacher: () => void;
  updateSettings: (patch: Partial<AppSettings>) => Promise<void>;
  addSafeContact: (input: {
    name: string;
    email: string;
    relationship?: string;
    safety?: SafetyLevel;
    category?: Contact["category"];
  }) => Promise<void>;
  updateContactSafety: (id: string, safety: SafetyLevel) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
  saveDraft: (draft: ComposePayload) => Promise<string>;
  deleteDraft: (id: string) => Promise<void>;
  sendMessage: (draft: ComposePayload) => Promise<"sent" | "pending">;
  approveMessage: (id: string) => Promise<void>;
  rejectMessage: (id: string, comment?: string) => Promise<void>;
  reportUnknownSender: (messageId: string) => Promise<void>;
  refreshAll: () => Promise<void>;
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

async function loadCollections() {
  const [messages, contacts, drafts, settings] = await Promise.all([
    db.messages.orderBy("sentAt").reverse().toArray(),
    db.contacts.toArray(),
    db.drafts.orderBy("updatedAt").reverse().toArray(),
    db.settings.get("app"),
  ]);
  return {
    messages,
    contacts,
    drafts,
    settings: { ...DEFAULT_SETTINGS, ...settings },
  };
}

export const useMailStore = create<MailState>((set, get) => ({
  ready: false,
  grade: 6,
  learningStage: "middle",
  folder: "inbox",
  selectedMessageId: null,
  messages: [],
  contacts: [],
  drafts: [],
  settings: DEFAULT_SETTINGS,
  teacherUnlocked: false,
  searchQuery: "",
  inboxFilter: "all",

  hydrate: async () => {
    await ensureSeedData();
    const data = await loadCollections();
    const grade = readStoredGrade(data.settings.defaultGrade);
    const inboxFirst = data.messages.find((m) => m.folder === "inbox");
    set({
      ready: true,
      grade,
      learningStage: stageFromGrade(grade),
      messages: data.messages,
      contacts: data.contacts,
      drafts: data.drafts,
      settings: data.settings,
      teacherUnlocked: readTeacherUnlocked(),
      selectedMessageId: get().selectedMessageId ?? inboxFirst?.id ?? null,
    });
  },

  refreshAll: async () => {
    const data = await loadCollections();
    set({
      messages: data.messages,
      contacts: data.contacts,
      drafts: data.drafts,
      settings: data.settings,
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
      searchQuery: folder === "inbox" ? get().searchQuery : "",
      inboxFilter: "all",
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
  setInboxFilter: (inboxFilter) => set({ inboxFilter }),

  completeOnboarding: async (grade) => {
    const settings = {
      ...get().settings,
      onboardingComplete: true,
      defaultGrade: grade,
    };
    await db.settings.put(settings);
    try {
      localStorage.setItem(GRADE_STORAGE_KEY, String(grade));
    } catch {
      /* ignore */
    }
    set({
      settings,
      grade,
      learningStage: stageFromGrade(grade),
    });
  },

  unlockTeacher: (pin) => {
    if (pin.trim() !== get().settings.teacherPin) return false;
    try {
      localStorage.setItem(TEACHER_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    set({ teacherUnlocked: true });
    return true;
  },

  lockTeacher: () => {
    try {
      localStorage.removeItem(TEACHER_SESSION_KEY);
    } catch {
      /* ignore */
    }
    set({ teacherUnlocked: false });
  },

  updateSettings: async (patch) => {
    const needsTeacher =
      "requireSendApproval" in patch || "teacherPin" in patch;
    if (needsTeacher && !get().teacherUnlocked) return;

    const settings = { ...get().settings, ...patch, id: "app" as const };
    await db.settings.put(settings);
    if (typeof patch.defaultGrade === "number") {
      try {
        localStorage.setItem(GRADE_STORAGE_KEY, String(patch.defaultGrade));
      } catch {
        /* ignore */
      }
      set({
        settings,
        grade: patch.defaultGrade,
        learningStage: stageFromGrade(patch.defaultGrade),
      });
      return;
    }
    set({ settings });
  },

  addSafeContact: async (input) => {
    if (!get().teacherUnlocked) return;
    const contact: Contact = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      relationship: input.relationship?.trim() || "Approved contact",
      safety: input.safety ?? "trusted",
      category: input.category,
      initials: initialsFromName(input.name),
      avatarColor:
        AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    };
    await db.contacts.put(contact);
    const contacts = await db.contacts.toArray();
    set({ contacts });
  },

  updateContactSafety: async (id, safety) => {
    if (!get().teacherUnlocked) return;
    await db.contacts.update(id, { safety });
    set({
      contacts: get().contacts.map((c) =>
        c.id === id ? { ...c, safety } : c,
      ),
    });
  },

  removeContact: async (id) => {
    if (!get().teacherUnlocked) return;
    await db.contacts.delete(id);
    set({ contacts: get().contacts.filter((c) => c.id !== id) });
  },

  saveDraft: async (draftInput) => {
    const id = draftInput.id ?? crypto.randomUUID();
    const draft: Draft = {
      id,
      to: draftInput.to,
      subject: draftInput.subject,
      body: draftInput.body,
      attachments: draftInput.attachments ?? [],
      replyToId: draftInput.replyToId,
      teacherComment: draftInput.teacherComment,
      updatedAt: new Date().toISOString(),
    };

    await db.drafts.put(draft);

    const mirrorId = `draft-msg-${id}`;
    const mirror: Message = {
      id: mirrorId,
      folder: "drafts",
      fromContactId: "c-teacher",
      toLabel: draft.to || "Draft",
      subject: draft.subject || "(No subject)",
      preview: draft.body.slice(0, 90),
      body: draft.body,
      sentAt: draft.updatedAt,
      unread: false,
      hasAttachment: (draft.attachments?.length ?? 0) > 0,
      attachments: draft.attachments,
      approvalStatus: draft.teacherComment ? "rejected" : "none",
      replyToId: draft.replyToId,
      teacherComment: draft.teacherComment,
    };
    await db.messages.put(mirror);

    const [drafts, messages] = await Promise.all([
      db.drafts.orderBy("updatedAt").reverse().toArray(),
      db.messages.orderBy("sentAt").reverse().toArray(),
    ]);
    set({ drafts, messages });
    return id;
  },

  deleteDraft: async (id) => {
    await db.drafts.delete(id);
    await db.messages.delete(`draft-msg-${id}`);
    const [drafts, messages] = await Promise.all([
      db.drafts.orderBy("updatedAt").reverse().toArray(),
      db.messages.orderBy("sentAt").reverse().toArray(),
    ]);
    set({ drafts, messages });
  },

  sendMessage: async (draftInput) => {
    const now = new Date().toISOString();
    const requireApproval = get().settings.requireSendApproval;
    const attachments = draftInput.attachments ?? [];
    const message: Message = {
      id: crypto.randomUUID(),
      folder: requireApproval ? "pending" : "sent",
      fromContactId: "c-teacher",
      toLabel: draftInput.to || "Recipient",
      subject: draftInput.subject || "(No subject)",
      preview: draftInput.body.slice(0, 90),
      body: draftInput.body,
      sentAt: now,
      unread: false,
      hasAttachment: attachments.length > 0,
      attachments,
      approvalStatus: requireApproval ? "pending" : "approved",
      replyToId: draftInput.replyToId,
    };

    await db.messages.put(message);
    if (draftInput.id) {
      await db.drafts.delete(draftInput.id);
      await db.messages.delete(`draft-msg-${draftInput.id}`);
    }

    const [messages, drafts] = await Promise.all([
      db.messages.orderBy("sentAt").reverse().toArray(),
      db.drafts.orderBy("updatedAt").reverse().toArray(),
    ]);

    set({
      messages,
      drafts,
      folder: message.folder,
      selectedMessageId: message.id,
    });

    return requireApproval ? "pending" : "sent";
  },

  approveMessage: async (id) => {
    if (!get().teacherUnlocked) return;
    await db.messages.update(id, {
      folder: "sent",
      approvalStatus: "approved",
      teacherComment: undefined,
    });
    const messages = await db.messages.orderBy("sentAt").reverse().toArray();
    set({
      messages,
      folder: "sent",
      selectedMessageId: id,
    });
  },

  rejectMessage: async (id, comment) => {
    if (!get().teacherUnlocked) return;
    const message = get().messages.find((m) => m.id === id);
    if (!message) return;

    const draftId = crypto.randomUUID();
    const teacherComment =
      comment?.trim() ||
      "Please revise this message and send it again for review.";
    await get().saveDraft({
      id: draftId,
      to: message.toLabel,
      subject: message.subject,
      body: message.body,
      attachments: message.attachments ?? [],
      replyToId: message.replyToId,
      teacherComment,
    });
    await db.messages.delete(id);

    const data = await loadCollections();
    set({
      messages: data.messages,
      drafts: data.drafts,
      folder: "drafts",
      selectedMessageId: `draft-msg-${draftId}`,
    });
  },

  reportUnknownSender: async (messageId) => {
    const message = get().messages.find((m) => m.id === messageId);
    if (!message) return;
    await db.contacts.update(message.fromContactId, { safety: "unknown" });
    await db.messages.update(messageId, { unread: false });
    const contacts = await db.contacts.toArray();
    set({
      contacts,
      messages: get().messages.map((m) =>
        m.id === messageId ? { ...m, unread: false } : m,
      ),
    });
  },
}));
