import type { GradeLevel, WritingPrompt } from "@/types/mail";

export const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: "ask-teacher",
    title: "Ask a Teacher",
    description: "Ask for help or clarification.",
    subject: "Question about class",
    body: "Hi,\n\nI have a question about ____________________.\nCould you please help me understand ____________________?\n\nThank you,\n",
    minGrade: 1,
    maxGrade: 12,
    icon: "teacher",
  },
  {
    id: "thank-you",
    title: "Thank You Note",
    description: "Say thanks with a specific reason.",
    subject: "Thank you",
    body: "Hi,\n\nThank you for ____________________.\nIt helped me ____________________.\n\nSincerely,\n",
    minGrade: 1,
    maxGrade: 12,
    icon: "thanks",
  },
  {
    id: "peer-feedback",
    title: "Peer Feedback",
    description: "One strength and one suggestion.",
    subject: "Feedback on your draft",
    body: "Hi,\n\nI liked ____________________ because ____________________.\nOne suggestion is ____________________.\n\nThanks,\n",
    minGrade: 3,
    maxGrade: 12,
    icon: "peer",
  },
  {
    id: "project-update",
    title: "Project Update",
    description: "Progress and next steps.",
    subject: "Project update",
    body: "Hi,\n\nHere is my update:\n- Finished: ____________________\n- Working on: ____________________\n- Need help with: ____________________\n\nThank you,\n",
    minGrade: 4,
    maxGrade: 12,
    icon: "project",
  },
];

export function promptsForGrade(grade: GradeLevel): WritingPrompt[] {
  return WRITING_PROMPTS.filter(
    (p) => grade >= p.minGrade && grade <= p.maxGrade,
  ).slice(0, 4);
}
