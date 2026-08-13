"use client";

import { FormEvent, useState } from "react";

const inquiryTypes = [
  "Industry Contact",
  "Casting",
  "Project Submission",
  "General Inquiry",
] as const;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border bg-background-elevated"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-12 md:gap-12 md:px-8 md:py-32">
        <div className="md:col-span-5">
          <p className="mb-4 text-xs tracking-[0.22em] text-accent uppercase">
            Contact
          </p>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            Inquiries & submissions.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Industry contacts, casting notes, and project submissions. Keep it
            brief—we read everything that arrives with clarity.
          </p>
          <p className="mt-8 text-sm text-muted">
            Direct line:{" "}
            <a
              href="mailto:inquiries@ecmco.studio"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent"
            >
              inquiries@ecmco.studio
            </a>
          </p>
        </div>

        <div className="md:col-span-7">
          {submitted ? (
            <div
              className="flex min-h-72 items-center border border-border bg-surface p-8"
              role="status"
            >
              <div>
                <p className="font-display text-3xl text-foreground">
                  Received.
                </p>
                <p className="mt-3 max-w-md text-muted">
                  Thank you. Our team will respond if there is a fit. No
                  automated follow-ups—just a human reply when warranted.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid gap-6 border border-border bg-surface p-6 md:p-8"
              noValidate
            >
              <div className="grid gap-6 sm:grid-cols-2">
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
                  rows={6}
                  className="resize-y border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                  placeholder="Logline, role, or reason for reaching out."
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="max-w-sm text-xs leading-relaxed text-muted">
                  Demo form—submissions stay in-browser and are not transmitted.
                </p>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center bg-foreground px-7 text-sm tracking-[0.16em] text-background uppercase transition-opacity hover:opacity-85"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
