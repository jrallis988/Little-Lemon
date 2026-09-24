import { useState } from "react";
import { Link } from "react-router-dom";
import { APPLY_URL } from "../data/content";
import { submitInquiry } from "../lib/submitInquiry";
import usePageMeta from "../hooks/usePageMeta";
import { VIRTUAL_TOUR } from "../components/Header";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  interest: "General question",
  startTerm: "Not sure yet",
  studentType: "Prospective student",
  housingInterest: "Not sure yet",
  visitInterest: "Not sure yet",
  message: "",
  company: "",
};

function Contact() {
  usePageMeta({
    title: "Contact",
    description:
      "Contact NHTI – Concord's Community College admissions, departments, and campus offices.",
  });

  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function validate(next) {
    const nextErrors = {};
    if (!next.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!next.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!next.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!next.message.trim()) nextErrors.message = "Add a short message.";
    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    try {
      await submitInquiry({
        ...values,
        interest: values.interest || "General question",
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error.message ||
          "We couldn’t send your message. Email NHTIinfo@ccsnh.edu or call 603-230-4001."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>We’re here to help</h1>
        <p className="page-hero__lede">
          Reach Admissions, departments, and campus offices — or explore NHTI
          from anywhere with the virtual tour.
        </p>
      </section>

      <section className="section">
        <div className="highlight-grid">
          <article className="highlight-card">
            <h2>Main campus</h2>
            <p>
              31 College Drive
              <br />
              Concord, NH 03301
            </p>
            <p>
              <a href="tel:6032304001">603-230-4001</a>
              <br />
              <a href="mailto:NHTIinfo@ccsnh.edu">NHTIinfo@ccsnh.edu</a>
            </p>
          </article>
          <article className="highlight-card">
            <h2>Admissions</h2>
            <p>Questions about applying, visiting, or choosing a program.</p>
            <p>
              <a href="tel:6032304011">603-230-4011</a>
              <br />
              <a href="mailto:NHTIadmissions@ccsnh.edu">
                NHTIadmissions@ccsnh.edu
              </a>
            </p>
            <p>
              <a
                className="text-link"
                href={APPLY_URL}
                target="_blank"
                rel="noreferrer"
              >
                Apply online
              </a>
            </p>
          </article>
          <article className="highlight-card">
            <h2>Take a Virtual Tour</h2>
            <p>
              Walk the riverside campus online — academic buildings, residence
              halls, and student spaces.
            </p>
            <a
              className="text-link"
              href={VIRTUAL_TOUR}
              target="_blank"
              rel="noreferrer"
            >
              Launch virtual tour
            </a>
          </article>
        </div>
      </section>

      <section className="section" id="contact-form">
        <div className="form-layout">
          <div>
            <h2>Send a message</h2>
            <p>
              Share a quick question and we&apos;ll route it to the right office.
              For program interest and housing questions, the Admissions inquiry
              form collects a few extra details.
            </p>
            <Link className="text-link" to="/admissions#inquiry-form">
              Go to Admissions inquiry
            </Link>
          </div>

          {submitted ? (
            <div className="form-success" role="status">
              <h3>Message sent</h3>
              <p>
                Thanks, {values.firstName}. Someone from campus will follow up at{" "}
                {values.email}.
              </p>
              <button
                type="button"
                className="btn btn--solid"
                onClick={() => {
                  setSubmitted(false);
                  setValues(initialForm);
                  setErrors({});
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
              <div className="hp-field" aria-hidden="true">
                <label>
                  Company
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    name="company"
                    value={values.company}
                    onChange={handleChange}
                  />
                </label>
              </div>
              {submitError ? (
                <p className="form-error" role="alert">
                  {submitError}
                </p>
              ) : null}
              <div className="form-row">
                <label>
                  <span>First name</span>
                  <input
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    aria-invalid={Boolean(errors.firstName)}
                  />
                  {errors.firstName ? <em>{errors.firstName}</em> : null}
                </label>
                <label>
                  <span>Last name</span>
                  <input
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    aria-invalid={Boolean(errors.lastName)}
                  />
                  {errors.lastName ? <em>{errors.lastName}</em> : null}
                </label>
              </div>
              <div className="form-row">
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email ? <em>{errors.email}</em> : null}
                </label>
                <label>
                  <span>Phone (optional)</span>
                  <input
                    type="tel"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </label>
              </div>
              <label>
                <span>How can we help?</span>
                <textarea
                  name="message"
                  rows="4"
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message ? <em>{errors.message}</em> : null}
              </label>
              <button
                type="submit"
                className="btn btn--solid"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="section section--muted">
        <div className="news-head">
          <h2>More ways to connect</h2>
        </div>
        <ul className="checklist">
          <li>
            <a
              href="https://www.nhti.edu/contact-us/departments/"
              target="_blank"
              rel="noreferrer"
            >
              Departments directory
            </a>
          </li>
          <li>
            <a
              href="https://www.nhti.edu/directory/"
              target="_blank"
              rel="noreferrer"
            >
              Faculty &amp; staff directory
            </a>
          </li>
          <li>
            <a
              href="https://www.nhti.edu/contact-us/"
              target="_blank"
              rel="noreferrer"
            >
              Official contact page
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Contact;
