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
}

export const STAGE_COPY: Record<LearningStage, StageCopy> = {
  elementary: {
    tagline: "Email for school",
    composeTitle: "New message",
    composeHint: "Say who it is for, what it is about, then write clearly.",
    composeCta: "Write a message",
    toPlaceholder: "Who are you writing to?",
    subjectPlaceholder: "What is this about?",
    bodyPlaceholder:
      "Start with a greeting. Then share your update, question, or thank-you.",
    safetyFooter:
      "Verified folders and Safe Contacts help you recognize trustworthy mail.",
    safeContactsHint:
      "These are people and places approved for school communication.",
    unknownSenderHint:
      "This sender is not on your Safe Contacts list. Ask a teacher or parent before opening links or sharing personal information.",
    showFolderDescriptions: true,
  },
  middle: {
    tagline: "Clear communication",
    composeTitle: "Compose",
    composeHint: "Use a clear subject and get to your point.",
    composeCta: "Compose",
    toPlaceholder: "Recipient",
    subjectPlaceholder: "Subject",
    bodyPlaceholder: "Write your message…",
    safetyFooter:
      "Stay alert with unknown senders. Prefer contacts approved for school.",
    safeContactsHint: "Approved contacts for school-related messages.",
    unknownSenderHint:
      "Unknown sender. Do not click links or share personal details without checking with an adult.",
    showFolderDescriptions: true,
  },
  high: {
    tagline: "Your email",
    composeTitle: "Compose",
    composeHint: "Keep it concise, specific, and professional.",
    composeCta: "Compose",
    toPlaceholder: "To",
    subjectPlaceholder: "Subject",
    bodyPlaceholder: "",
    safetyFooter: "Review unknown senders before interacting with links.",
    safeContactsHint: "Trusted contacts managed for your account.",
    unknownSenderHint:
      "This sender is not trusted. Verify before clicking links or sharing information.",
    showFolderDescriptions: false,
  },
};

/** Middle school grades refine guidance while sharing the same experience band. */
const MIDDLE_GRADE_COPY: Record<6 | 7 | 8, Partial<StageCopy>> = {
  6: {
    tagline: "Email for middle school",
    composeHint: "Include a greeting, a clear subject, and what you need.",
    bodyPlaceholder:
      "Start with a greeting, then share your update or question.",
    safetyFooter:
      "Grade 6 tip: pause on unknown senders and ask a teacher if something feels off.",
  },
  7: {
    tagline: "Clear school communication",
    composeHint: "Lead with your purpose, then add only the details that matter.",
    bodyPlaceholder: "Write a clear message with a purpose in the first lines…",
    safetyFooter:
      "Grade 7 tip: verify senders before clicking links or sharing personal info.",
  },
  8: {
    tagline: "Independent communication",
    composeHint: "Be specific, polite, and ready to follow up if needed.",
    composeCta: "Compose",
    showFolderDescriptions: false,
    bodyPlaceholder: "Write your message…",
    safetyFooter:
      "Grade 8 tip: treat unknown mail carefully — confirm before you respond.",
    unknownSenderHint:
      "Unknown sender. Confirm with a teacher or parent before interacting.",
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
