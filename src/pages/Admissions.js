import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import useReveal from "../hooks/useReveal";
import { contact, images } from "../data/content";

const steps = [
  {
    title: "Explore your path",
    copy: "Browse programs, compare campuses, and decide whether you want in-person, online, or hybrid classes.",
  },
  {
    title: "Apply online",
    copy: "Complete the RVCC application and share your goals so we can connect you with the right advisors.",
  },
  {
    title: "Secure your funding",
    copy: "Nearly 89% of students receive grants, scholarships, or loans. Start with the FAFSA and RVCC aid options.",
  },
  {
    title: "Get ready to start",
    copy: "Attend orientation, meet your support team, and register for courses that fit your schedule.",
  },
];

const initialForm = {
  name: "",
  email: "",
  interest: "Health Sciences",
  campus: "Claremont",
  message: "",
};

const FORMSPREE_ID = process.env.REACT_APP_FORMSPREE_ID;

export default function Admissions() {
  const revealRef = useReveal();
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

    const payload = {
      ...form,
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

      if (FORMSPREE_ID) {
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
      } else {
        const body = [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Interest: ${form.interest}`,
          `Campus: ${form.campus}`,
          "",
          form.message || "(No additional message)",
        ].join("\n");

        const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
          payload._subject
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        setDelivery("mailto");
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="Admissions"
        title="Your next step starts here"
        summary="Whether you are returning to school, changing careers, or starting fresh, admissions will help you map a clear, affordable path."
        image={images.campus}
        imageAlt="River Valley Community College campus entrance area"
      />

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
          </p>
        </div>

        <div className="reveal" data-reveal>
          <form
            onSubmit={handleSubmit}
            className="border border-river/15 bg-white/80 p-6 backdrop-blur sm:p-8"
          >
            <h2 className="font-display text-2xl font-semibold text-river-deep">
              Request information
            </h2>
            <p className="mt-2 text-granite-muted">
              Tell us a little about yourself and we will follow up with next
              steps
              {FORMSPREE_ID
                ? "."
                : " — this opens an email draft to admissions."}
            </p>

            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-river-deep">
                  Full name
                </span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-river-deep">
                  Email
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
                />
              </label>

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
                    <option>Health Sciences</option>
                    <option>STEM & Technology</option>
                    <option>Business & Accounting</option>
                    <option>Education & Human Services</option>
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
            </div>

            <button
              type="submit"
              className="btn-primary mt-7 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send request"}
            </button>

            {status === "success" ? (
              <p className="mt-4 text-sm font-medium text-valley" role="status">
                {delivery === "formspree"
                  ? "Thanks — your inquiry was sent to admissions."
                  : "Thanks — your email draft should be open, and a local copy was saved in this browser."}
              </p>
            ) : null}

            {status === "error" ? (
              <p className="mt-4 text-sm font-medium text-red-700" role="alert">
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
