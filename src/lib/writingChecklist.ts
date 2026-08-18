export interface WritingCheck {
  id: "recipient" | "subject" | "greeting" | "purpose" | "closing";
  label: string;
  hint: string;
  done: boolean;
}

const GREETING =
  /\b(hi|hello|dear|good morning|good afternoon|greetings)\b/i;
const PURPOSE =
  /\b(i am writing|i'm writing|could you|would you|please|question|request|update|feedback|because|need)\b/i;
const CLOSING =
  /\b(thank you|thanks|sincerely|respectfully|regards|best)\b/i;

export function evaluateWriting(input: {
  to: string;
  subject: string;
  body: string;
}): WritingCheck[] {
  const body = input.body.trim();
  const subject = input.subject.trim();

  return [
    {
      id: "recipient",
      label: "To",
      hint: "",
      done: input.to.trim().length > 2,
    },
    {
      id: "subject",
      label: "Subject",
      hint: "",
      done: subject.length >= 6 && !/^(hi|hello|hey)$/i.test(subject),
    },
    {
      id: "greeting",
      label: "Greeting",
      hint: "",
      done: GREETING.test(body),
    },
    {
      id: "purpose",
      label: "Purpose",
      hint: "",
      done: PURPOSE.test(body) && body.length >= 40,
    },
    {
      id: "closing",
      label: "Closing",
      hint: "",
      done: CLOSING.test(body),
    },
  ];
}
