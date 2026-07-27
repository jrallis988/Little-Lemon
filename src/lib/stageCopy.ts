import type { LearningStage } from "@/types/mail";

interface StageCopy {
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
