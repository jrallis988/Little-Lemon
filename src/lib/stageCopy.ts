import type { GradeLevel, LearningStage } from "@/types/mail";
import { stageFromGrade } from "@/types/mail";

export interface StageCopy {
  tagline: string;
  composeTitle: string;
  composeHint: string;
  composeCta: string;
  toPlaceholder: string;
  subjectPlaceholder: string;
  bodyPlaceholder: string;
  safetyFooter: string;
  safeContactsHint: string;
  unknownSenderHint: string;
  showFolderDescriptions: boolean;
  classLabel: string;
  course: string;
  learningTarget: string;
  genreLabel: string;
}

export const STAGE_COPY: Record<LearningStage, StageCopy> = {
  elementary: {
    tagline: "School communication",
    composeTitle: "Write a school message",
    composeHint: "Name your reader, state the topic, then write in complete sentences.",
    composeCta: "New message",
    toPlaceholder: "Teacher or approved contact",
    subjectPlaceholder: "Topic in a few words",
    bodyPlaceholder:
      "Greeting,\n\nWhat do you need to say?\n\nThank you,\nYour name",
    safetyFooter:
      "Use Safe Contacts. If a sender is unknown, ask a teacher before you reply.",
    safeContactsHint:
      "These are approved school and family contacts for class messages.",
    unknownSenderHint:
      "This sender is not on the class contact list. Ask a teacher before opening links or sharing personal information.",
    showFolderDescriptions: true,
    classLabel: "Homeroom · Ms. Alvarez",
    course: "English Language Arts",
    learningTarget:
      "Write a greeting, one clear request, and a polite closing.",
    genreLabel: "Message type",
  },
  middle: {
    tagline: "Academic communication",
    composeTitle: "Compose",
    composeHint: "Lead with purpose. Keep the request specific and respectful.",
    composeCta: "Compose",
    toPlaceholder: "Recipient",
    subjectPlaceholder: "Precise subject",
    bodyPlaceholder:
      "Greeting,\n\nI am writing because…\n\nThank you,\n",
    safetyFooter:
      "Prefer class-approved contacts. Verify unknown senders before you interact.",
    safeContactsHint: "Approved contacts for school-related messages.",
    unknownSenderHint:
      "Unknown sender. Do not click links or share personal details without checking with a teacher.",
    showFolderDescriptions: true,
    classLabel: "Period 2 · Ms. Alvarez",
    course: "English Language Arts",
    learningTarget:
      "State your purpose in the opening and support it with necessary detail.",
    genreLabel: "Writing genre",
  },
  high: {
    tagline: "Professional correspondence",
    composeTitle: "Compose",
    composeHint: "Be concise, specific, and professional.",
    composeCta: "Compose",
    toPlaceholder: "To",
    subjectPlaceholder: "Subject",
    bodyPlaceholder: "",
    safetyFooter: "Review unknown senders before interacting with links.",
    safeContactsHint: "Trusted contacts for this school account.",
    unknownSenderHint:
      "This sender is not trusted. Verify before clicking links or sharing information.",
    showFolderDescriptions: false,
    classLabel: "English 10 · Alvarez",
    course: "English",
    learningTarget:
      "Write a concise professional request with a clear subject and next step.",
    genreLabel: "Genre",
  },
};

const MIDDLE_GRADE_COPY: Record<6 | 7 | 8, Partial<StageCopy>> = {
  6: {
    tagline: "School correspondence",
    composeHint: "Include a greeting, a clear subject, and what you need.",
    learningTarget:
      "Organize a message with greeting, purpose, and closing.",
    safetyFooter:
      "Pause on unknown senders and ask a teacher if something feels off.",
  },
  7: {
    tagline: "Academic correspondence",
    composeHint: "Lead with your purpose, then add only the details that matter.",
    learningTarget:
      "Open with purpose and keep supporting detail relevant.",
    safetyFooter:
      "Verify senders before clicking links or sharing personal information.",
  },
  8: {
    tagline: "Independent correspondence",
    composeHint: "Be specific, polite, and ready to follow up if needed.",
    showFolderDescriptions: false,
    learningTarget:
      "Write a self-directed request that a teacher could act on immediately.",
    safetyFooter:
      "Treat unknown mail carefully — confirm before you respond.",
    unknownSenderHint:
      "Unknown sender. Confirm with a teacher before interacting.",
  },
};

export function copyForGrade(grade: GradeLevel): StageCopy {
  const stage = stageFromGrade(grade);
  const base = STAGE_COPY[stage];
  if (grade === 6 || grade === 7 || grade === 8) {
    return { ...base, ...MIDDLE_GRADE_COPY[grade] };
  }
  return base;
}
