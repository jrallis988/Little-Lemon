export type ContactPayload = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;

/** True when FormSubmit can deliver to a configured inbox. */
export function formsConfigured() {
  return Boolean(contactEmail && contactEmail.includes("@"));
}

/**
 * Submit via FormSubmit.co (free, no backend).
 * Set VITE_CONTACT_EMAIL in .env / GitHub Actions secrets.
 */
export async function submitContact(payload: ContactPayload): Promise<"sent" | "mailto"> {
  if (!formsConfigured()) {
    return "mailto";
  }

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contactEmail!)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `Smuttynose inquiry — ${payload.topic}`,
      name: payload.name,
      email: payload.email,
      topic: payload.topic,
      message: payload.message,
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!res.ok) {
    throw new Error("Contact form failed");
  }
  return "sent";
}

export async function submitNewsletter(email: string): Promise<"sent" | "local"> {
  if (!formsConfigured()) {
    try {
      const key = "smuttynose-newsletter";
      const prev = JSON.parse(localStorage.getItem(key) || "[]") as string[];
      if (!prev.includes(email)) {
        localStorage.setItem(key, JSON.stringify([...prev, email]));
      }
    } catch {
      /* ignore */
    }
    return "local";
  }

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contactEmail!)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: "Smuttynose newsletter signup",
      email,
      form: "newsletter",
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!res.ok) {
    throw new Error("Newsletter signup failed");
  }
  return "sent";
}

export function mailtoContact(payload: ContactPayload) {
  const subject = encodeURIComponent(`Smuttynose inquiry — ${payload.topic}`);
  const body = encodeURIComponent(
    `Name: ${payload.name}\nEmail: ${payload.email}\nTopic: ${payload.topic}\n\n${payload.message}`,
  );
  window.location.href = `mailto:${contactEmail || "hello@smuttynose.com"}?subject=${subject}&body=${body}`;
}
