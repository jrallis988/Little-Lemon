import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { submitInquiry } from "../services/inquiries";

function Contact() {
  const [result, setResult] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      topic: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name"),
      email: Yup.string().email("Enter a valid email").required("Please enter your email"),
      phone: Yup.string(),
      topic: Yup.string().required("Select a topic"),
      message: Yup.string().required("Please include a short message"),
    }),
    onSubmit: async (values, helpers) => {
      setSubmitError("");
      try {
        const inquiry = await submitInquiry({
          ...values,
          form: "contact",
        });
        setResult(inquiry);
        helpers.resetForm({ values });
      } catch (error) {
        setSubmitError(error.message || "Unable to send your message. Please try again.");
      } finally {
        helpers.setSubmitting(false);
      }
    },
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
          <p>Reach admissions, ask a question, or plan a visit to our Portsmouth campus.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-details">
            <h2>Campus location</h2>
            <address>
              <strong>Great Bay Community College</strong>
              <br />320 Corporate Drive
              <br />Portsmouth, NH 03801
            </address>

            <div className="detail-block">
              <h3>Phone</h3>
              <p>
                <a href="tel:6034277600">(603) 427-7600</a>
                <br />
                <a href="tel:8005221194">1-800-522-1194</a>
              </p>
            </div>

            <div className="detail-block">
              <h3>Email</h3>
              <p><a href="mailto:askgreatbay@ccsnh.edu">askgreatbay@ccsnh.edu</a></p>
            </div>

            <div className="detail-block">
              <h3>Building hours</h3>
              <p>
                Monday–Thursday: 7:00am – 9:00pm
                <br />Friday: 7:00am – 4:00pm
                <br />Saturday &amp; Sunday: Closed
              </p>
              <p className="fine-print">Monday to Friday the building closes after the last class is dismissed.</p>
            </div>

            <div className="detail-block">
              <h3>Helpful campus links</h3>
              <ul className="contact-link-list">
                <li><Link to="/directory">Faculty &amp; Staff Directory</Link></li>
                <li><Link to="/academics/calendar">Academic Calendar &amp; Schedule</Link></li>
                <li><Link to="/admissions/visit">Visit Campus</Link></li>
                <li><Link to="/events">Events calendar</Link></li>
              </ul>
            </div>
          </div>

          <div className="contact-form-wrap">
            {result ? (
              <div className="form-success" role="status">
                <h3>Message received.</h3>
                <p>
                  Thanks, {result.name}. Your inquiry was queued for the Great Bay team
                  and assigned reference <strong>{result.id}</strong>.
                </p>
                <div className="submitted-summary">
                  <p><strong>Topic:</strong> {result.topic}</p>
                  <p><strong>Email:</strong> {result.email}</p>
                  <p><strong>Routed to:</strong> {result.destination}</p>
                </div>
                <button
                  className="btn btn-navy"
                  type="button"
                  onClick={() => {
                    setResult(null);
                    formik.resetForm();
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="info-form" onSubmit={formik.handleSubmit} noValidate>
                <h2>Send a message / request info</h2>
                <p className="fine-print">
                  Submissions are validated, stored securely in this demo session, and prepared for CRM handoff.
                </p>
                <label>
                  Full name
                  <input name="name" type="text" autoComplete="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  {formik.touched.name && formik.errors.name ? <span className="field-error">{formik.errors.name}</span> : null}
                </label>
                <label>
                  Email
                  <input name="email" type="email" autoComplete="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  {formik.touched.email && formik.errors.email ? <span className="field-error">{formik.errors.email}</span> : null}
                </label>
                <label>
                  Phone <span className="optional">(optional)</span>
                  <input name="phone" type="tel" autoComplete="tel" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </label>
                <label>
                  Topic
                  <select name="topic" value={formik.values.topic} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    <option value="">Select one</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Request Information">Request Information</option>
                    <option value="Financial Aid">Financial Aid</option>
                    <option value="Academic Programs">Academic Programs</option>
                    <option value="Campus Visit">Campus Visit</option>
                    <option value="Other">Other</option>
                  </select>
                  {formik.touched.topic && formik.errors.topic ? <span className="field-error">{formik.errors.topic}</span> : null}
                </label>
                <label className="full">
                  Message
                  <textarea name="message" rows="5" value={formik.values.message} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  {formik.touched.message && formik.errors.message ? <span className="field-error">{formik.errors.message}</span> : null}
                </label>
                {submitError ? <p className="field-error" role="alert">{submitError}</p> : null}
                <button className="btn btn-gold" type="submit" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? "Sending…" : "Send Message"}
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
