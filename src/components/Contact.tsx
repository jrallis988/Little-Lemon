import { FormEvent, useState } from "react";
import { useInView } from "../hooks/useInView";
import { links } from "../data/links";

export function Contact() {
  const { ref, visible } = useInView<HTMLElement>();
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "General");
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Smuttynose inquiry — ${topic}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
    );
    window.location.href = `mailto:hello@smuttynose.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" ref={ref} className="bg-ink text-foam">
      <div className="mx-auto grid max-w-site gap-12 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <div
          className={`transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salt">
            Contact
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
            Parties, rentals & questions
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-foam/75">
            Planning a private event on campus, need catering info, or just
            have a question? Send a note — we’ll get back to you.
          </p>
          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="font-semibold uppercase tracking-[0.16em] text-salt">
                Call
              </dt>
              <dd className="mt-1 text-base">
                <a href={links.phone} className="underline-offset-2 hover:underline">
                  {links.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-[0.16em] text-salt">
                Visit
              </dt>
              <dd className="mt-1 text-base text-foam/85">{links.address}</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={onSubmit}
          className={`space-y-4 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "120ms" : "0ms" }}
        >
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-salt">
              Name
            </span>
            <input
              required
              name="name"
              autoComplete="name"
              className="w-full border border-foam/20 bg-ink px-4 py-3 text-foam outline-none transition-colors focus:border-buoy"
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
              autoComplete="email"
              className="w-full border border-foam/20 bg-ink px-4 py-3 text-foam outline-none transition-colors focus:border-buoy"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-salt">
              Topic
            </span>
            <select
              name="topic"
              className="w-full border border-foam/20 bg-ink px-4 py-3 text-foam outline-none transition-colors focus:border-buoy"
              defaultValue="Private event"
            >
              <option>Private event</option>
              <option>Catering</option>
              <option>Suds Club</option>
              <option>General</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-salt">
              Message
            </span>
            <textarea
              required
              name="message"
              rows={4}
              className="w-full resize-y border border-foam/20 bg-ink px-4 py-3 text-foam outline-none transition-colors focus:border-buoy"
            />
          </label>
          <button
            type="submit"
            className="bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
          >
            {sent ? "Opening email…" : "Send inquiry"}
          </button>
          <p className="text-xs text-foam/55">
            Opens your email app with the details filled in.
          </p>
        </form>
      </div>
    </section>
  );
}
