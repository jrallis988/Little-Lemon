import { Link } from "react-router-dom";

export default function ContactStatus({ status, onReset }) {
  if (status === "sending") {
    return (
      <div
        className="flex items-center gap-3 text-sm text-foam-soft"
        role="status"
        aria-live="polite"
      >
        <span className="status-pulse h-2.5 w-2.5 rounded-full bg-foam" aria-hidden="true" />
        Sending…
      </div>
    );
  }

  if (status === "success") {
    return (
      <div
        className="border border-foam/40 bg-ink/40 p-5"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-xl font-bold text-foam-soft">Message sent.</p>
        <p className="mt-2 text-base text-sand/85">
          Thanks for reaching out. I’ll get back to you soon.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/" className="btn-primary">
            Return to portfolio
          </Link>
          {onReset ? (
            <button type="button" className="btn-ghost" onClick={onReset}>
              Send another
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        className="border border-[#ffb4a8]/40 bg-ink/40 p-5"
        role="alert"
        aria-live="assertive"
      >
        <p className="font-display text-xl font-bold text-[#ffb4a8]">Something went wrong.</p>
        <p className="mt-2 text-base text-sand/85">
          Your message wasn’t sent. Please try again, or email me directly.
        </p>
      </div>
    );
  }

  return null;
}
