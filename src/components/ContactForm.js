import { useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "civic-bound-leads";

function saveLead(payload) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push({ ...payload, savedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // ignore quota / private mode
  }
}

function ContactForm({
  heading = "Leave a note — we’ll follow up",
  context = "general",
  className = "",
}) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    interest: context === "support" ? "Get support" : "Learn more",
    message: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    saveLead({
      name: form.name.trim(),
      email: form.email.trim(),
      interest: form.interest,
      message: form.message.trim(),
      context,
    });
    setStatus("success");
    setForm({
      name: "",
      email: "",
      interest: context === "support" ? "Get support" : "Learn more",
      message: "",
    });
  };

  return (
    <div className={`surface-card p-8 ${className}`}>
      <h3 className="font-display text-2xl font-semibold text-charcoal-deep">
        {heading}
      </h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-charcoal">
        Demo form — submissions stay in your browser only. In production this
        would route to email or a CRM. See our{" "}
        <Link to="/privacy" className="text-violet hover:underline">
          Privacy
        </Link>{" "}
        note.
      </p>

      {status === "success" ? (
        <div
          className="mt-6 border border-chartreuse/40 bg-chartreuse-soft/40 p-4 font-body text-sm text-charcoal-deep"
          role="status"
        >
          Thanks — you’re on the list. When this goes live, a real follow-up
          email will land here.
        </div>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block font-body text-sm font-semibold text-charcoal-deep">
              Name
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                autoComplete="name"
                className="mt-1.5 w-full border border-paper-line bg-paper px-4 py-3 font-normal outline-none focus:border-violet"
              />
            </label>
            <label className="block font-body text-sm font-semibold text-charcoal-deep">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                autoComplete="email"
                className="mt-1.5 w-full border border-paper-line bg-paper px-4 py-3 font-normal outline-none focus:border-violet"
              />
            </label>
          </div>
          <label className="block font-body text-sm font-semibold text-charcoal-deep">
            I’m interested in
            <select
              name="interest"
              value={form.interest}
              onChange={onChange}
              className="mt-1.5 w-full border border-paper-line bg-paper px-4 py-3 font-normal outline-none focus:border-violet"
            >
              <option>Get support</option>
              <option>Volunteer / serve</option>
              <option>Partner with a hub</option>
              <option>Donate / give</option>
              <option>Learn more</option>
            </select>
          </label>
          <label className="block font-body text-sm font-semibold text-charcoal-deep">
            Message <span className="font-normal text-charcoal-soft">(optional)</span>
            <textarea
              name="message"
              rows={3}
              value={form.message}
              onChange={onChange}
              className="mt-1.5 w-full border border-paper-line bg-paper px-4 py-3 font-normal outline-none focus:border-violet"
            />
          </label>
          <button type="submit" className="btn-primary">
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
