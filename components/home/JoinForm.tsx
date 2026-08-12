"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { RequiredMark, useAccessibleForm } from "@/components/a11y/FormFeedback";
import { Reveal } from "@/components/motion/Reveal";

const SUCCESS_MESSAGE = "You're on the list. Welcome to Team Varga.";

export function JoinForm() {
  const {
    statusId,
    status,
    fieldProps,
    FieldError,
    StatusRegion,
    reportErrors,
    reportSuccess,
  } = useAccessibleForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const errors: Record<string, string> = {};

    if (!name) errors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (Object.keys(errors).length) {
      reportErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company }),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!res.ok) {
        if (payload.fieldErrors && Object.keys(payload.fieldErrors).length) {
          reportErrors(payload.fieldErrors, payload.error);
        } else {
          reportErrors({}, payload.error || "Something went wrong. Please try again.");
        }
        return;
      }

      form.reset();
      setSubmitted(true);
      reportSuccess(SUCCESS_MESSAGE);
    } catch {
      reportErrors({}, "Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section
        id="join"
        className="become-member-section"
        aria-labelledby="join-heading"
      >
        <div className="section-overlay section-padding-140">
          <div className="container">
            <Reveal>
              <div className="section-heading">
                <h6>Get Involved!</h6>
                <h2 id="join-heading">Join Team Varga</h2>
              </div>
            </Reveal>
            <div className="section-wrapper">
              <Reveal delayMs={100}>
                <div className="become-member">
                  {submitted ? (
                    <div className="join-success" role="status" aria-live="polite">
                      <CheckCircle2 className="join-success__icon" aria-hidden />
                      <p className="join-success__title">Registration complete</p>
                      <p className="join-success__body">{SUCCESS_MESSAGE}</p>
                    </div>
                  ) : (
                    <>
                      <p className="mb-3 text-center text-white" style={{ opacity: 0.85, fontSize: 13 }}>
                        Required fields are marked with an asterisk (*).
                      </p>
                      <form
                        onSubmit={onSubmit}
                        noValidate
                        aria-describedby={status !== "idle" ? statusId : undefined}
                      >
                        <label className="sr-only" htmlFor="join-name">
                          Name
                          <RequiredMark />
                        </label>
                        <input
                          id="join-name"
                          type="text"
                          name="name"
                          placeholder="Name"
                          autoComplete="name"
                          disabled={submitting}
                          {...fieldProps("name")}
                        />
                        <FieldError name="name" />
                        <label className="sr-only" htmlFor="join-email">
                          Email
                          <RequiredMark />
                        </label>
                        <input
                          id="join-email"
                          type="email"
                          name="email"
                          placeholder="E-Mail"
                          autoComplete="email"
                          inputMode="email"
                          disabled={submitting}
                          {...fieldProps("email")}
                        />
                        <FieldError name="email" />
                        {/* Honeypot — leave empty */}
                        <div className="join-hp" aria-hidden="true">
                          <label htmlFor="join-company">Company</label>
                          <input
                            id="join-company"
                            type="text"
                            name="company"
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>
                        <p className="mb-0">
                          <button
                            type="submit"
                            className="submit custom-btn varga-btn-motion"
                            disabled={submitting}
                          >
                            {submitting ? "Registering…" : "Register Now"}
                          </button>
                        </p>
                      </form>
                      <div className="theme-form-status">
                        <StatusRegion successMessage={SUCCESS_MESSAGE} />
                      </div>
                    </>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section
        className="newsletter-section section-padding-140 section-bg-color"
        aria-labelledby="newsletter-heading"
      >
        <div className="container">
          <div className="row justify-content-center no-gutters">
            <Reveal className="col-lg-6">
              <div className="section-heading">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/theme/assets/images/homepage1/newsletter/heading-img.png"
                  alt=""
                />
                <h2 id="newsletter-heading">Stay in the Loop</h2>
                <p>
                  Get write-in reminders, town-hall dates, and volunteer calls — never spam.
                </p>
              </div>
            </Reveal>
            <Reveal className="col-lg-6" delayMs={120}>
              <div className="news-letter-content">
                <div className="news-letter-content-inner">
                  <p>
                    Prefer email updates? Use the Join Team Varga form above — same list, one
                    signup.
                  </p>
                  <p>
                    <a href="#join" className="submit custom-btn varga-btn-motion">
                      Join the List
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
