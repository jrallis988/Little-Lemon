import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { CampusImage } from "../components/CampusImage";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { venues } from "../data/venues";
import { mailtoContact, submitContact } from "../lib/forms";

export function PrivateEventsPage() {
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
      topic: `Private event — ${String(data.get("space") || "General")}`,
      message: [
        `Guests: ${String(data.get("guests") || "")}`,
        `Date: ${String(data.get("date") || "")}`,
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
      <Header solid />
      <CartDrawer />
      <main>
        <section className="bg-ink px-5 pb-16 pt-28 text-foam md:px-8 md:pb-20 md:pt-32">
          <div className="mx-auto max-w-site">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salt">
              Private events
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase tracking-wide md:text-6xl">
              Book a space on Towle Farm
            </h1>
            <p className="mt-4 max-w-2xl text-foam/75">
              From intimate dinners in the Heritage Room to tented celebrations
              on the Field — host your next gathering where the beer is brewed.
            </p>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-site gap-10 lg:gap-14">
            {venues.map((venue, index) => (
              <article
                key={venue.id}
                className={`grid gap-0 overflow-hidden border border-ink/10 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-[16rem] lg:min-h-[22rem]">
                  <CampusImage
                    name={venue.image}
                    alt={venue.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center bg-foam p-6 md:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
                    {venue.setting}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">
                    {venue.name}
                  </h2>
                  <p className="mt-2 font-display text-xl font-bold text-buoy">
                    {venue.capacity}
                  </p>
                  <p className="mt-4 text-steel">{venue.note}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {venue.bestFor.map((item) => (
                      <li
                        key={item}
                        className="border border-ink/15 px-3 py-1 text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-tide-deep px-5 py-16 text-foam md:px-8 md:py-24">
          <div className="mx-auto grid max-w-site gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salt">
                Inquiry
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide">
                Tell us about your event
              </h2>
              <p className="mt-4 text-foam/75">
                Share a few details and we’ll follow up with availability,
                catering options, and next steps.
              </p>
              <Link
                to="/#contact"
                className="mt-6 inline-flex border border-foam/40 px-5 py-3 text-sm font-semibold"
              >
                General contact
              </Link>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-salt">
                  Name
                </span>
                <input
                  required
                  name="name"
                  className="w-full border border-foam/20 bg-tide-deep px-4 py-3 outline-none focus:border-buoy"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-salt">
                  Email
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  className="w-full border border-foam/20 bg-tide-deep px-4 py-3 outline-none focus:border-buoy"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-salt">
                    Space
                  </span>
                  <select
                    name="space"
                    className="w-full border border-foam/20 bg-tide-deep px-4 py-3 outline-none focus:border-buoy"
                    defaultValue="Heritage Room"
                  >
                    {venues.map((v) => (
                      <option key={v.id}>{v.name}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-salt">
                    Guests
                  </span>
                  <input
                    name="guests"
                    type="number"
                    min={1}
                    placeholder="30"
                    className="w-full border border-foam/20 bg-tide-deep px-4 py-3 outline-none focus:border-buoy"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-salt">
                  Preferred date
                </span>
                <input
                  name="date"
                  type="date"
                  className="w-full border border-foam/20 bg-tide-deep px-4 py-3 outline-none focus:border-buoy"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-salt">
                  Message
                </span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="w-full resize-y border border-foam/20 bg-tide-deep px-4 py-3 outline-none focus:border-buoy"
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
                    ? "Inquiry sent"
                    : "Request a date"}
              </button>
              <p className="text-xs text-foam/55" role="status">
                {status === "sent"
                  ? "Thanks — we’ll be in touch."
                  : status === "error"
                    ? "Opened your email app as a backup."
                    : "Sent to the project inbox."}
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
