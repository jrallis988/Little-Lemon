import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const reasons = [
  {
    title: "Career-focused programs",
    copy: "Designed with employers to prepare students for in-demand careers across 50+ degrees and certificates.",
  },
  {
    title: "Short-term training",
    copy: "6, 8, and 12-week direct-to-career programs in healthcare and Culinary Arts & Sustainable Foodways.",
  },
  {
    title: "Affordable & flexible",
    copy: "Save thousands compared to many four-year colleges. Choose online, hybrid, evening, or daytime classes.",
  },
  {
    title: "Transfer opportunities",
    copy: "Seamless pathways to UNH and many public and private colleges across New England and beyond.",
  },
];

const steps = [
  {
    number: "01",
    title: "Explore",
    copy: "Browse programs, costs, and transfer options — or meet with admissions to build a plan.",
  },
  {
    number: "02",
    title: "Apply",
    copy: "Complete a free application for most students. Rolling admissions for the majority of programs.",
  },
  {
    number: "03",
    title: "Register",
    copy: "Connect with advising, complete placement if needed, and choose your classes.",
  },
  {
    number: "04",
    title: "Begin",
    copy: "Attend orientation, set up your student accounts, and start your first semester.",
  },
];

function Admissions() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Please enter your email"),
      phone: Yup.string(),
      interest: Yup.string().required("Select an area of interest"),
      message: Yup.string(),
    }),
    onSubmit: () => {
      setSubmitted(true);
    },
  });

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-media" aria-hidden="true">
          <img src="/images/campus-lobby.jpg" alt="" />
          <div className="hero-veil" />
        </div>
        <div className="container page-hero-content">
          <p className="hero-brand">Admissions &amp; Aid</p>
          <h1>Begin the process.</h1>
          <p>
            Whether you&apos;re starting college for the first time, returning to
            finish, transferring credits, or preparing for a new career — Great
            Bay can help you take the next step.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Why Great Bay</p>
            <h2>A Seacoast college built around your goals.</h2>
          </div>
          <div className="area-grid">
            {reasons.map((item) => (
              <article key={item.title} className="area-item">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">How it works</p>
            <h2>Applying is easier than you think.</h2>
          </div>
          <ol className="steps">
            {steps.map((step) => (
              <li key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container split reverse">
          <div className="split-copy">
            <p className="eyebrow">Cost &amp; aid</p>
            <h2>An education that fits your budget.</h2>
            <p>
              Great Bay charges by the credit. The 2026–2027 tuition rate for New
              Hampshire residents (and non-residents living within 50 miles of
              campus) is <strong>$263 per credit hour</strong>, including a
              $25/credit comprehensive fee.
            </p>
            <ul className="check-list">
              <li>Most full-time students receive financial aid</li>
              <li>Scholarships and other aid available</li>
              <li>No application fee for most applicants</li>
              <li>Part-time enrollment welcomed</li>
            </ul>
            <p className="fine-print">
              Full-time students (30 credits per year) who qualify for in-state
              tuition pay roughly $8,000 per year in tuition and fees.
            </p>
          </div>
          <div className="info-panel">
            <h3>Need a hand getting started?</h3>
            <p>
              An admissions counselor can help you explore programs, compare
              pathways, understand costs, and map next steps.
            </p>
            <ul>
              <li>
                <a href="tel:6034277632">(603) 427-7632</a>
              </li>
              <li>
                <a href="mailto:greatbayadmissions@ccsnh.edu">
                  greatbayadmissions@ccsnh.edu
                </a>
              </li>
            </ul>
            <Link className="btn btn-gold" to="/contact">
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-tint" id="request-info">
        <div className="container form-layout">
          <div>
            <p className="eyebrow">Request information</p>
            <h2>Tell us where you want to go.</h2>
            <p>
              Share a few details and our admissions team will reach out with
              information tailored to your interests.
            </p>
          </div>

          {submitted ? (
            <div className="form-success" role="status">
              <h3>Thank you — we received your request.</h3>
              <p>
                An admissions counselor will follow up soon. In the meantime,
                explore programs or learn more about campus life.
              </p>
              <Link className="btn btn-navy" to="/academics">
                Browse Programs
              </Link>
            </div>
          ) : (
            <form className="info-form" onSubmit={formik.handleSubmit} noValidate>
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
                Phone <span className="optional">(optional)</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </label>
              <label>
                Area of interest
                <select
                  name="interest"
                  value={formik.values.interest}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select one</option>
                  <option value="health">Health Sciences</option>
                  <option value="stem">STEM &amp; Manufacturing</option>
                  <option value="business">Business &amp; Technology</option>
                  <option value="liberal-arts">Liberal Arts &amp; Transfer</option>
                  <option value="career">Career &amp; Technical</option>
                  <option value="unsure">Not sure yet</option>
                </select>
                {formik.touched.interest && formik.errors.interest ? (
                  <span className="field-error">{formik.errors.interest}</span>
                ) : null}
              </label>
              <label className="full">
                Message <span className="optional">(optional)</span>
                <textarea
                  name="message"
                  rows="4"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
              </label>
              <button className="btn btn-gold" type="submit">
                Submit Request
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default Admissions;
