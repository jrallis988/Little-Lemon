import { useId, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import useReveal from "../hooks/useReveal";
import {
  admissionsTeam,
  contact,
  filterOptions,
  formspreeClaimUrl,
  images,
  portalLinks,
} from "../data/content";
import Seo from "../components/Seo";

const steps = [
  {
    title: "Explore your path",
    copy: "Browse programs, compare campuses, and decide whether you want in-person, online, or hybrid classes.",
  },
  {
    title: "Apply online",
    copy: "Complete the free RVCC application and send official transcripts to Admissions (mail or admissions@rivervalley.edu).",
  },
  {
    title: "Secure your funding",
    copy: "Nearly 89% of students receive grants, scholarships, or loans. Start with FAFSA school code 007560.",
  },
  {
    title: "Get ready to start",
    copy: "Set up EasyLogin, meet advising, register for courses, and attend orientation.",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  interest: "Health Sciences",
  campus: "Claremont",
  startTerm: "Fall",
  message: "",
  company: "",
};

const FORMSPREE_ID = process.env.REACT_APP_FORMSPREE_ID;

export default function Admissions() {
  const revealRef = useReveal();
  const statusId = useId();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [delivery, setDelivery] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    setDelivery("");

    if (form.company) {
      setStatus("success");
      setDelivery("spam");
      setForm(initialForm);
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      interest: form.interest,
      campus: form.campus,
      startTerm: form.startTerm,
      message: form.message,
      _subject: `RVCC admissions inquiry from ${form.name}`,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        window.localStorage.getItem("rvcc-admissions-inquiries") || "[]"
      );
      existing.push(payload);
      window.localStorage.setItem(
        "rvcc-admissions-inquiries",
        JSON.stringify(existing)
      );

      if (!FORMSPREE_ID) {
        throw new Error(
          `Form delivery is not connected yet. Email ${contact.email} or call ${contact.phone} and we will follow up.`
        );
      }

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to send right now. Please try again.");
      }

      setDelivery("formspree");
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  const applyLink = portalLinks.find((link) => link.label === "Apply online");

  return (
    <div ref={revealRef}>
      <Seo
        title="Admissions"
        description="Apply to River Valley Community College, request information, and meet the admissions team serving Claremont, Keene, and Lebanon."
        path="/admissions"
      />
      <PageHero
        eyebrow="Admissions"
        title="Your next step starts here"
        summary="Whether you are returning to school, changing careers, or starting fresh, admissions will help you map a clear, affordable path."
        image={images.campus}
        imageAlt="River Valley Community College campus entrance area"
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={applyLink.href}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Start free application
          </a>
          <a href="#request-info" className="btn-secondary">
            Request information
          </a>
        </div>
      </PageHero>

      <section className="section-shell grid gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="reveal" data-reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="display-title mt-3">Four simple moves</h2>
          </div>
          <ol className="mt-10 space-y-8">
            {steps.map((step, index) => (
              <li key={step.title} className="reveal flex gap-4" data-reveal>
                <span className="font-display text-sm font-semibold text-sunrise">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-river-deep">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-granite-muted">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="reveal mt-10 text-granite-muted" data-reveal>
            Need aid details first?{" "}
            <Link
              to="/financial-aid"
              className="font-semibold text-river underline-offset-2 hover:underline"
            >
              Visit Financial Aid
            </Link>
            .
          </p>
          <p className="mt-4 text-sm text-granite-muted">
            Or email{" "}
            <a
              href={`mailto:${contact.email}`}
              className="font-semibold text-river underline-offset-2 hover:underline"
            >
              {contact.email}
            </a>{" "}
            · {contact.phone}
            {contact.tollFree ? ` · Toll-free ${contact.tollFree}` : null}
          </p>
        </div>

        <div className="reveal" data-reveal id="request-info">
          <form
            onSubmit={handleSubmit}
            className="border border-river/15 bg-white/80 p-6 backdrop-blur sm:p-8"
            noValidate={false}
            aria-describedby={statusId}
          >
            <h2 className="font-display text-2xl font-semibold text-river-deep">
              Request information
            </h2>
            <p className="mt-2 text-granite-muted">
              Tell us a little about yourself and we will follow up with next
              steps over email.
            </p>
            {!FORMSPREE_ID && process.env.NODE_ENV === "development" ? (
              <p className="mt-3 rounded-md border border-sunrise/40 bg-sunrise/10 px-3 py-2 text-sm text-river-deep">
                Dev: claim Formspree, then set{" "}
                <code className="font-mono text-xs">REACT_APP_FORMSPREE_ID</code>.{" "}
                <a
                  href={formspreeClaimUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline underline-offset-2"
                >
                  Open claim link
                </a>
                .
              </p>
            ) : null}

            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-river-deep">
                  Full name
                </span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-river-deep">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-river-deep">
                    Phone{" "}
                    <span className="font-normal text-granite-muted">(optional)</span>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-river-deep">
                    Area of interest
                  </span>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                  >
                    {filterOptions.areas.map((area) => (
                      <option key={area}>{area}</option>
                    ))}
                    <option>Not sure yet</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-river-deep">
                    Preferred campus
                  </span>
                  <select
                    name="campus"
                    value={form.campus}
                    onChange={handleChange}
                    className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                  >
                    <option>Claremont</option>
                    <option>Keene</option>
                    <option>Lebanon</option>
                    <option>Online / flexible</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-river-deep">
                  Preferred start term
                </span>
                <select
                  name="startTerm"
                  value={form.startTerm}
                  onChange={handleChange}
                  className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                >
                  <option>Fall</option>
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Not sure yet</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-river-deep">
                  Anything else we should know?
                </span>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                />
              </label>

              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label>
                  Company
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary mt-7 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send request"}
            </button>

            <div id={statusId} aria-live="polite" className="mt-4 min-h-[1.25rem]">
              {status === "success" ? (
                <p className="text-sm font-medium text-valley" role="status">
                  {delivery === "spam"
                    ? "Thanks — we received your request."
                    : "Thanks — your inquiry was sent to admissions."}
                </p>
              ) : null}

              {status === "error" ? (
                <p className="text-sm font-medium text-red-700" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,rgba(231,242,245,0.85),rgba(246,251,252,0.25))] py-16 sm:py-20">
        <div className="section-shell">
          <div className="reveal max-w-2xl" data-reveal>
            <p className="eyebrow">Admissions team</p>
            <h2 className="display-title mt-3">People ready to help you start</h2>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {admissionsTeam.map((person) => (
              <li
                key={person.name}
                className="reveal border-t border-river/15 pt-5"
                data-reveal
              >
                <h3 className="font-display text-lg font-semibold text-river-deep">
                  {person.name}
                </h3>
                <p className="mt-2 text-sm text-granite-muted">{person.role}</p>
                <a
                  href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}
                  className="mt-3 inline-flex text-sm font-semibold text-river underline-offset-2 hover:underline"
                >
                  {person.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="reveal max-w-2xl" data-reveal>
          <p className="eyebrow">Official next steps</p>
          <h2 className="display-title mt-3">Apply, log in, and register</h2>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portalLinks.slice(0, 6).map((link) => (
            <li key={link.label} className="reveal border-t border-river/15 pt-5" data-reveal>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-display text-lg font-semibold text-river-deep transition hover:text-river"
              >
                {link.label} →
              </a>
              <p className="mt-2 text-sm leading-relaxed text-granite-muted">
                {link.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
