import type {
  AppSettings,
  AttachmentMeta,
  Contact,
  Draft,
  FolderMeta,
  Message,
} from "@/types/mail";

export const DEFAULT_SETTINGS: AppSettings = {
  id: "app",
  onboardingComplete: false,
  requireSendApproval: true,
  teacherPin: "1234",
  defaultGrade: 3,
};

export const FOLDERS: FolderMeta[] = [
  {
    id: "inbox",
    label: "Inbox",
    description: "",
    verified: true,
  },
  {
    id: "drafts",
    label: "Drafts",
    description: "",
  },
  {
    id: "pending",
    label: "Pending",
    description: "",
  },
  {
    id: "sent",
    label: "Sent",
    description: "",
    verified: true,
  },
  {
    id: "safe-contacts",
    label: "Safe Contacts",
    description: "",
    verified: true,
  },
];

export const SEED_CONTACTS: Contact[] = [
  {
    id: "c-teacher",
    name: "Ms. Alvarez",
    email: "alvarez@school.edu",
    avatarColor: "#2A9D8F",
    initials: "MA",
    safety: "verified",
    relationship: "Homeroom teacher",
  },
  {
    id: "c-grandma",
    name: "Grandma June",
    email: "june@family.mail",
    avatarColor: "#F4A261",
    initials: "GJ",
    safety: "verified",
    relationship: "Family",
  },
  {
    id: "c-sam",
    name: "Sam Chen",
    email: "sam.chen@school.edu",
    avatarColor: "#457B9D",
    initials: "SC",
    safety: "trusted",
    relationship: "Classmate",
  },
  {
    id: "c-library",
    name: "School Library",
    email: "library@school.edu",
    avatarColor: "#E76F51",
    initials: "SL",
    safety: "verified",
    relationship: "Campus resource",
  },
  {
    id: "c-unknown",
    name: "Prize Bot",
    email: "winner@not-real.biz",
    avatarColor: "#9CA3AF",
    initials: "?",
    safety: "unknown",
  },
];

export const SEED_MESSAGES: Message[] = [
  {
    id: "m1",
    folder: "inbox",
    fromContactId: "c-teacher",
    toLabel: "You",
    subject: "Reading reflection due Friday",
    preview:
      "Please send a short paragraph about the chapter you finished this week.",
    body: "Hi,\n\nPlease send a short paragraph about the chapter you finished this week. Use a clear subject line and check your spelling before you send.\n\nThank you,\nMs. Alvarez",
    sentAt: "2026-07-24T08:12:00.000Z",
    unread: true,
    approvalStatus: "none",
  },
  {
    id: "m2",
    folder: "inbox",
    fromContactId: "c-sam",
    toLabel: "You",
    subject: "Science project partner?",
    preview: "Want to build the volcano model together this weekend?",
    body: "Hey,\n\nWant to build the volcano model together this weekend? I can bring the paint if you bring the cardboard.\n\n— Sam",
    sentAt: "2026-07-23T19:40:00.000Z",
    unread: true,
    hasAttachment: true,
    attachments: [
      {
        id: "a1",
        name: "volcano-plan.pdf",
        size: 184320,
        type: "application/pdf",
      },
    ],
    approvalStatus: "none",
  },
  {
    id: "m3",
    folder: "inbox",
    fromContactId: "c-library",
    toLabel: "You",
    subject: "Summer reading checkpoint",
    preview:
      "You are on track — four books logged. Stop by for the next challenge card.",
    body: "Hello,\n\nYou are on track — four books logged. Stop by the library desk for the next challenge card.\n\nSchool Library",
    sentAt: "2026-07-23T15:05:00.000Z",
    unread: false,
    approvalStatus: "none",
  },
  {
    id: "m4",
    folder: "inbox",
    fromContactId: "c-grandma",
    toLabel: "You",
    subject: "Proud of your science fair work",
    preview: "I saw your project photos. Tell me how the presentation went.",
    body: "Hi,\n\nI saw your project photos. Tell me how the presentation went when you have a minute.\n\nLove,\nGrandma June",
    sentAt: "2026-07-22T11:20:00.000Z",
    unread: false,
    approvalStatus: "none",
  },
  {
    id: "m5",
    folder: "inbox",
    fromContactId: "c-unknown",
    toLabel: "You",
    subject: "You won a free phone!!!",
    preview: "Click now to claim your prize before it disappears…",
    body: "Click now to claim your prize before it disappears…\n\n(Practice message: notice the urgent language, unknown sender, and request to click.)",
    sentAt: "2026-07-21T09:00:00.000Z",
    unread: true,
    approvalStatus: "none",
  },
  {
    id: "m6",
    folder: "sent",
    fromContactId: "c-teacher",
    toLabel: "Ms. Alvarez",
    subject: "Reading reflection — Chapter 4",
    preview:
      "In this chapter, the main character learns to ask for help when a problem feels too big.",
    body: "Hi Ms. Alvarez,\n\nIn this chapter, the main character learns to ask for help when a problem feels too big. That reminded me of working on group projects in class.\n\nThank you,\nAlex",
    sentAt: "2026-07-20T17:30:00.000Z",
    unread: false,
    approvalStatus: "approved",
  },
  {
    id: "draft-msg-d1",
    folder: "drafts",
    fromContactId: "c-sam",
    toLabel: "Sam Chen",
    subject: "Idea for the volcano",
    preview: "Maybe we add baking soda and red tissue paper for lava…",
    body: "Maybe we add baking soda and red tissue paper for lava…",
    sentAt: "2026-07-24T07:00:00.000Z",
    unread: false,
    approvalStatus: "none",
  },
  {
    id: "m8",
    folder: "pending",
    fromContactId: "c-teacher",
    toLabel: "sam.chen@school.edu",
    subject: "Can we meet to plan the science board?",
    preview: "Hi Sam, Can we meet after school on Thursday to plan the board?",
    body: "Hi Sam,\n\nCan we meet after school on Thursday to plan the board?\n\nThanks,\nAlex",
    sentAt: "2026-07-24T09:15:00.000Z",
    unread: false,
    approvalStatus: "pending",
  },
];

export const SEED_DRAFTS: Draft[] = [
  {
    id: "d1",
    to: "sam.chen@school.edu",
    subject: "Idea for the volcano",
    body: "Maybe we add baking soda and red tissue paper for lava…",
    updatedAt: "2026-07-24T07:00:00.000Z",
  },
];

export const ALLOWED_ATTACHMENT_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const ALLOWED_ATTACHMENT_EXTENSIONS = [
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".txt",
  ".docx",
] as const;

export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

export function createAttachmentMeta(file: File): AttachmentMeta {
  return {
    id: crypto.randomUUID(),
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
  };
}

export function validateAttachment(file: File): string | null {
  if (file.size > MAX_ATTACHMENT_BYTES) {
    return "Files must be 5 MB or smaller.";
  }
  const lower = file.name.toLowerCase();
  const extOk = ALLOWED_ATTACHMENT_EXTENSIONS.some((ext) => lower.endsWith(ext));
  const typeOk =
    !file.type ||
    (ALLOWED_ATTACHMENT_TYPES as readonly string[]).includes(file.type);
  if (!extOk || !typeOk) {
    return "Allowed files: PDF, PNG, JPG, TXT, or DOCX.";
  }
  return null;
}

export const AVATAR_COLORS = [
  "#2A9D8F",
  "#457B9D",
  "#E76F51",
  "#F4A261",
  "#6D6875",
  "#2F7D8C",
];
