import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

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
    onSubmit: () => setSubmitted(true),
  });

  return (
    <>
      <section className="page-hero compact">
        <div className="page-hero-media" aria-hidden="true">
          <img src="/images/campus-lobby.jpg" alt="" />
          <div className="hero-veil" />
        </div>
        <div className="container page-hero-content">
          <p className="hero-brand">Contact</p>
          <h1>We&apos;re here to help.</h1>
          <p>
            Reach admissions, ask a question, or plan a visit to Berlin or
            Littleton.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-details">
            <h2>Campus locations</h2>
            <address>
              <strong>Berlin Campus</strong>
              <br />
              2020 Riverside Drive
              <br />
              Berlin, NH 03570
            </address>
            <address>
              <strong>Littleton Academic Center</strong>
              <br />
              646 Union Street
              <br />
              Littleton, NH 03561
            </address>

            <div className="detail-block">
              <h3>Phone</h3>
              <p>
                Berlin: <a href="tel:6037521113">(603) 752-1113</a>
                <br />
                Littleton: <a href="tel:6034441326">(603) 444-1326</a>
                <br />
                Toll-free: <a href="tel:8004454525">800-445-4525</a>
              </p>
            </div>

            <div className="detail-block">
              <h3>Email</h3>
              <p>
                <a href="mailto:wmcc@ccsnh.edu">wmcc@ccsnh.edu</a>
              </p>
            </div>

            <div className="detail-block">
              <h3>Visit online</h3>
              <p>
                <a href="https://www.wmcc.edu/" target="_blank" rel="noreferrer">
                  wmcc.edu
                </a>
              </p>
            </div>
          </div>

          <div className="contact-form-wrap">
            {submitted ? (
              <div className="form-success" role="status">
                <h3>Message sent.</h3>
                <p>
                  Thanks for reaching out. A member of the WMCC team will get
                  back to you shortly.
                </p>
              </div>
            ) : (
              <form className="info-form" onSubmit={formik.handleSubmit} noValidate>
                <h2>Send a message</h2>
                <label>
                  Full name
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <span className="field-error">{formik.errors.name}</span>
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
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span className="field-error">{formik.errors.email}</span>
                  ) : null}
                </label>
                <label>
                  Topic
                  <select
                    name="topic"
                    value={formik.values.topic}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select one</option>
                    <option value="admissions">Admissions</option>
                    <option value="financial-aid">Financial Aid</option>
                    <option value="programs">Academic Programs</option>
                    <option value="visit">Campus Visit</option>
                    <option value="other">Other</option>
                  </select>
                  {formik.touched.topic && formik.errors.topic ? (
                    <span className="field-error">{formik.errors.topic}</span>
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
                  />
                  {formik.touched.message && formik.errors.message ? (
                    <span className="field-error">{formik.errors.message}</span>
                  ) : null}
                </label>
                <button className="btn btn-gold" type="submit">
                  Send Message
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
