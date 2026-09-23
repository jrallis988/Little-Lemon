import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageMeta } from "../components/PageMeta";
import { links } from "../data/links";
import { mailtoContact, submitContact } from "../lib/forms";

export function BeKindPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      topic: "Be KIND donation request",
      message: [
        `Organization: ${String(data.get("organization") || "")}`,
        `Focus: ${String(data.get("focus") || "")}`,
        "",
        String(data.get("message") || ""),
      ].join("\n"),
    };
    setStatus("sending");
    try {
      const result = await submitContact(payload);
      if (result === "mailto") {
        mailtoContact(payload);
      }
      setStatus("sent");
      form.reset();
    } catch {
      mailtoContact(payload);
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-foam">
      <PageMeta
        title="Be KIND donations"
        description="Request a Smuttynose Be KIND donation for veterans, animals, or local community nonprofits."
        path="/be-kind"
      />
      <Header solid />
      <CartDrawer />
      <main className="px-5 pb-20 pt-28 md:px-8 md:pb-28">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Be KIND
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
            Nonprofit donation requests
          </h1>
          <p className="mt-4 max-w-2xl text-steel">
            The Smuttynose Be KIND initiative supports nonprofits offering
            services to veterans, animals, and the local community. Use this
            form to inquire about donations — or submit through the{" "}
            <a
              href={links.contactOfficial}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-tide underline-offset-2 hover:underline"
            >
              official contact page
            </a>
            .
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-12 max-w-xl space-y-4 border border-ink/10 bg-foam p-6 md:p-8"
          >
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-tide">
                Your name
              </span>
              <input
                required
                name="name"
                autoComplete="name"
                className="w-full border border-ink/20 bg-foam px-4 py-3 outline-none focus:border-buoy"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-tide">
                Email
              </span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="w-full border border-ink/20 bg-foam px-4 py-3 outline-none focus:border-buoy"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-tide">
                Organization
              </span>
              <input
                required
                name="organization"
                className="w-full border border-ink/20 bg-foam px-4 py-3 outline-none focus:border-buoy"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-tide">
                Focus area
              </span>
              <select
                name="focus"
                className="w-full border border-ink/20 bg-foam px-4 py-3 outline-none focus:border-buoy"
                defaultValue="Veterans"
              >
                <option>Veterans</option>
                <option>Animals</option>
                <option>Local community</option>
                <option>Other nonprofit</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-tide">
                Tell us about your request
              </span>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full resize-y border border-ink/20 bg-foam px-4 py-3 outline-none focus:border-buoy"
              />
            </label>
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam disabled:opacity-70"
            >
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Request sent"
                  : "Submit request"}
            </button>
            <p className="text-xs text-steel" role="status">
              {status === "sent"
                ? "Thanks — we’ll review your request."
                : status === "error"
                  ? "Couldn’t reach the form service — opened your email app instead."
                  : "Matches the Be KIND flow on smuttynose.com/contact."}
            </p>
          </form>

          <p className="mt-8 text-sm text-steel">
            <Link to="/#contact" className="font-semibold text-tide hover:underline">
              ← General contact
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
