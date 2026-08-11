"use client";

import { RequiredMark, useAccessibleForm } from "@/components/a11y/FormFeedback";
import { demoFormNote, demoFormSuccess } from "@/lib/demo";

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

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const errors: Record<string, string> = {};

    if (!name) errors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (Object.keys(errors).length) {
      reportErrors(errors);
      return;
    }

    reportSuccess(demoFormSuccess.join);
    e.currentTarget.reset();
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
            <div className="section-heading">
              <h6>Get Involved!</h6>
              <h2 id="join-heading">Join Team Varga</h2>
            </div>
            <div className="section-wrapper">
              <div className="become-member">
                <p className="theme-demo-note" role="note">
                  {demoFormNote}
                </p>
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
                    {...fieldProps("email")}
                  />
                  <FieldError name="email" />
                  <p className="mb-0">
                    <input type="submit" className="submit custom-btn" value="Register Now" />
                  </p>
                </form>
                <div className="theme-form-status">
                  <StatusRegion successMessage={demoFormSuccess.join} />
                </div>
              </div>
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
            <div className="col-lg-6">
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
            </div>
            <div className="col-lg-6">
              <div className="news-letter-content">
                <div className="news-letter-content-inner">
                  <p>
                    Prefer email updates? Use the Join Team Varga form above — same list, one
                    signup.
                  </p>
                  <p>
                    <a href="#join" className="submit custom-btn">
                      Join the List
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
