import { useEffect, useState } from "react";

const STORAGE_KEY = "smuttynose-age-ok";

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/80 p-5 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="w-full max-w-md border border-foam/15 bg-ink p-6 text-foam shadow-lg shadow-ink/40 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salt">
          Smuttynose Brewing
        </p>
        <h2
          id="age-gate-title"
          className="mt-3 font-display text-3xl font-bold uppercase tracking-wide"
        >
          Are you 21 or older?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foam/75">
          You must be of legal drinking age to enter this site.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={accept}
            className="bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
          >
            Yes, I’m 21+
          </button>
          <a
            href="https://www.responsibility.org/"
            className="border border-foam/40 px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-colors hover:bg-foam/10"
          >
            No, take me back
          </a>
        </div>
      </div>
    </div>
  );
}
