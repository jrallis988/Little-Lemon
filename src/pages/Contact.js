import { useFormik } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import PageHero from "../components/PageHero";
import { campuses } from "../data/campuses";
import { APPLY_URL } from "../data/links";

const topicLabels = {
  admissions: "Admissions",
  "financial-aid": "Financial Aid",
  programs: "Academic Programs",
  visit: "Campus Visit",
  other: "Other",
};

function Contact() {
  const [status, setStatus] = useState("idle");
  const formId = useId();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Please enter your email"),
      topic: Yup.string().required("Select a topic"),
      message: Yup.string().required("Please include a short message"),
    }),
    onSubmit: (values) => {
      const topic = topicLabels[values.topic] || values.topic;
      const subject = encodeURIComponent(`WMCC website inquiry: ${topic}`);
      const body = encodeURIComponent(
        [
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          `Topic: ${topic}`,
          "",
          values.message,
          "",
          "— Sent from the WMCC website contact form",
        ].join("\n")
      );

      window.location.href = `mailto:wmcc@ccsnh.edu?subject=${subject}&body=${body}`;
      setStatus("mailto");
    },
  });

  const fieldErrorId = (name) => `${formId}-${name}-error`;

  return (
    <>
      <PageHero
        brand="Contact"
        title="Hours, directions, and next steps."
        copy="Reach Admissions, plan a visit to Berlin, Littleton, or North Conway, or send a question to the WMCC team."
        image="/images/campus-lobby.jpg"
        compact
        actions={[
          {
            label: "Apply Now",
            to: APPLY_URL,
            external: true,
            className: "btn btn-gold",
          },
          {
            label: "Call Berlin",
            to: "tel:6037521113",
            external: true,
            className: "btn btn-ghost-light",
          },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Campus locations</p>
            <h2>Three North Country locations — plus online options.</h2>
            <p>
              White Mountains Community College serves students from the Berlin
              main campus and academic centers in Littleton and North Conway.
            </p>
          </div>
          <div className="campus-grid">
            {campuses.map((campus) => (
              <article key={campus.id} className="campus-card">
                <p className="campus-role">{campus.role}</p>
                <h3>{campus.name}</h3>
                <address>
                  {campus.addressLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </address>
                <p>
                  <a href={campus.phoneHref}>{campus.phone}</a>
                </p>
                <p className="campus-hours">
                  <strong>Hours:</strong> {campus.hours}
                </p>
                <p className="campus-note">{campus.hoursNote}</p>
                <p className="campus-directions">{campus.directions}</p>
                <div className="campus-links">
                  <a
                    className="text-link"
                    href={campus.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get directions
                  </a>
                  <a
                    className="text-link"
                    href={campus.pageUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Location details
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container contact-grid">
          <div className="contact-details">
            <h2>General contact</h2>
            <div className="detail-block">
              <h3>Email</h3>
              <p>
                <a href="mailto:wmcc@ccsnh.edu">wmcc@ccsnh.edu</a>
              </p>
            </div>
            <div className="detail-block">
              <h3>Toll-free</h3>
              <p>
                <a href="tel:8004454525">800-445-4525</a>
              </p>
            </div>
            <div className="detail-block">
              <h3>Admissions</h3>
              <p>
                Start with{" "}
                <a href="mailto:wmcc@ccsnh.edu">wmcc@ccsnh.edu</a> or call the
                campus closest to you. For applications, use the official CCSNH
                portal.
              </p>
              <a
                className="btn btn-primary"
                href={APPLY_URL}
                target="_blank"
                rel="noreferrer"
              >
                Open Application Portal
              </a>
            </div>
          </div>

          <div className="contact-form-wrap">
            {status === "mailto" ? (
              <div className="form-success" role="status">
                <h3>Opening your email app…</h3>
                <p>
                  This form prepares a message to{" "}
                  <a href="mailto:wmcc@ccsnh.edu">wmcc@ccsnh.edu</a>. If your
                  email app did not open, send your question there directly — or
                  call the campus nearest you.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setStatus("idle");
                    formik.resetForm();
                  }}
                >
                  Write another message
                </button>
              </div>
            ) : (
              <form
                className="info-form"
                onSubmit={formik.handleSubmit}
                noValidate
              >
                <h2>Send a message</h2>
                <p className="form-note">
                  Submitting opens your email app with a draft to wmcc@ccsnh.edu.
                  Nothing is stored on this website.
                </p>
                <label>
                  Full name
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(
                      formik.touched.name && formik.errors.name
                    )}
                    aria-describedby={
                      formik.touched.name && formik.errors.name
                        ? fieldErrorId("name")
                        : undefined
                    }
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <span className="field-error" id={fieldErrorId("name")}>
                      {formik.errors.name}
                    </span>
                  ) : null}
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(
                      formik.touched.email && formik.errors.email
                    )}
                    aria-describedby={
                      formik.touched.email && formik.errors.email
                        ? fieldErrorId("email")
                        : undefined
                    }
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span className="field-error" id={fieldErrorId("email")}>
                      {formik.errors.email}
                    </span>
                  ) : null}
                </label>
                <label>
                  Topic
                  <select
                    name="topic"
                    value={formik.values.topic}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(
                      formik.touched.topic && formik.errors.topic
                    )}
                    aria-describedby={
                      formik.touched.topic && formik.errors.topic
                        ? fieldErrorId("topic")
                        : undefined
                    }
                  >
                    <option value="">Select one</option>
                    <option value="admissions">Admissions</option>
                    <option value="financial-aid">Financial Aid</option>
                    <option value="programs">Academic Programs</option>
                    <option value="visit">Campus Visit</option>
                    <option value="other">Other</option>
                  </select>
                  {formik.touched.topic && formik.errors.topic ? (
                    <span className="field-error" id={fieldErrorId("topic")}>
                      {formik.errors.topic}
                    </span>
                  ) : null}
                </label>
                <label className="full">
                  Message
                  <textarea
                    name="message"
                    rows="5"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(
                      formik.touched.message && formik.errors.message
                    )}
                    aria-describedby={
                      formik.touched.message && formik.errors.message
                        ? fieldErrorId("message")
                        : undefined
                    }
                  />
                  {formik.touched.message && formik.errors.message ? (
                    <span className="field-error" id={fieldErrorId("message")}>
                      {formik.errors.message}
                    </span>
                  ) : null}
                </label>
                <button className="btn btn-gold" type="submit">
                  Open Email Draft
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
