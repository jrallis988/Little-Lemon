"use client";

import { FormEvent, useState } from "react";
import { writer } from "@/data/scripts";

const inquiryTypes = [
  "Representation",
  "Producer / Executive",
  "Request Pages",
  "General Inquiry",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim();

function buildMailto(name: string, email: string, type: string, message: string) {
  const subject = encodeURIComponent(`ECMCo inquiry — ${type}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nInquiry: ${type}\n\n${message}`,
  );
  return `mailto:${writer.email}?subject=${subject}&body=${body}`;
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !type || !message) {
      setStatus("error");
      setErrorMessage("Please fill in every field.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: data,
        });

        if (!response.ok) {
          throw new Error("Form service rejected the submission.");
        }

        setStatus("success");
        form.reset();
        return;
      } catch {
        setStatus("error");
        setErrorMessage(
          "Could not send just now. Email me directly and I will get back to you.",
        );
        return;
      }
    }

    window.location.href = buildMailto(name, email, type, message);
    setStatus("success");
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border bg-background-elevated"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-12 md:gap-10 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <p className="mb-3 font-[family-name:var(--font-script)] text-sm text-accent">
            CONTACT
          </p>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            For reps, producers, and serious reads.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Tell me who you are and which pages you want. Industry inquiries
            only—no unsolicited rewrites.
          </p>
          <p className="mt-8 text-sm text-muted">
            Direct:{" "}
            <a
              href={`mailto:${writer.email}`}
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent"
            >
              {writer.email}
            </a>
          </p>
        </div>

        <div className="md:col-span-7">
          {status === "success" ? (
            <div
              className="flex min-h-72 items-center border border-border bg-surface p-8"
              role="status"
            >
              <div>
                <p className="font-[family-name:var(--font-script)] text-sm text-accent">
                  CUT TO:
                </p>
                <p className="mt-3 font-display text-3xl text-foreground">
                  {formspreeId ? "Message received." : "Opening your email."}
                </p>
                <p className="mt-3 max-w-md text-muted">
                  {formspreeId
                    ? "Thank you. I will respond if there is a fit."
                    : "Your mail app should open with the inquiry filled in. If nothing opens, use the address on the left."}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-sm tracking-[0.14em] text-accent uppercase transition-colors hover:text-foreground"
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 border border-border bg-surface p-5 md:gap-6 md:p-8"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="tracking-[0.12em] text-muted uppercase">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="h-12 border border-border bg-background px-4 text-foreground outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="tracking-[0.12em] text-muted uppercase">
                    Email
                  </span>
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="h-12 border border-border bg-background px-4 text-foreground outline-none transition-colors focus:border-accent"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm">
                <span className="tracking-[0.12em] text-muted uppercase">
                  Inquiry Type
                </span>
                <select
                  required
                  name="type"
                  defaultValue=""
                  className="h-12 border border-border bg-background px-4 text-foreground outline-none transition-colors focus:border-accent"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="tracking-[0.12em] text-muted uppercase">
                  Message
                </span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="resize-y border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                  placeholder="Which title, and why you're reaching out."
                />
              </label>

              {status === "error" ? (
                <p className="text-sm text-neon-pink" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <p className="max-w-sm text-xs leading-relaxed text-muted">
                  {formspreeId
                    ? "Submissions go to my inbox."
                    : "Opens your email app with this inquiry ready to send."}
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-12 items-center justify-center bg-foreground px-7 text-sm tracking-[0.16em] text-background uppercase transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send Inquiry"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
