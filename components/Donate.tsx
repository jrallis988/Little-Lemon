"use client";

import { FormEvent, useId, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { candidate } from "@/lib/candidate";

const amounts = [25, 50, 100, 250] as const;

export function Donate() {
  const statusId = useId();
  const [amount, setAmount] = useState<number | "other">(50);
  const [custom, setCustom] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const resolved =
      amount === "other" ? Number(custom) : amount;

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Please provide your name and a valid email.");
      return;
    }
    if (!resolved || resolved < 1 || Number.isNaN(resolved)) {
      setStatus("error");
      setError("Enter a contribution amount of at least $1.");
      return;
    }
    setStatus("success");
    setError("");
    e.currentTarget.reset();
  }

  return (
    <section
      id="donate"
      aria-labelledby="donate-heading"
      className="relative scroll-mt-28 overflow-hidden bg-granite-800"
    >
      <div
        className="absolute inset-0 opacity-25"
        aria-hidden
        style={{
          backgroundImage: "url('/images/nh-landscape.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-granite-900/75" aria-hidden />
      <div className="relative mx-auto max-w-content section-pad">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
              Contribute
            </p>
            <h2
              id="donate-heading"
              className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl"
            >
              Donate Today
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-granite-200">
              Chip in to keep this campaign local—town halls, lawn signs, and
              listening across all ten counties, not TV ad machines.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-granite-400">
              Paid for by {candidate.committee}. Contributions are not
              tax-deductible. By contributing, you confirm you are a U.S. citizen
              or lawfully admitted permanent resident, and that this contribution
              is made from your own funds.
            </p>
            <p className="mt-6 text-sm text-granite-300">
              <span className="font-semibold text-white">Donate by mail:</span>
              <br />
              {candidate.committee}
              <br />
              {candidate.mailAddress}
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-5 border border-granite-600 bg-granite-900/50 p-6 sm:p-8"
            aria-describedby={status !== "idle" ? statusId : undefined}
          >
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-granite-200">
                Amount
              </legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {amounts.map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={`rounded-sm border px-3 py-3 text-sm font-semibold transition-colors ${
                      amount === a
                        ? "border-amber-500 bg-amber-600 text-white"
                        : "border-granite-500 bg-transparent text-granite-100 hover:border-amber-400"
                    }`}
                    aria-pressed={amount === a}
                    onClick={() => setAmount(a)}
                  >
                    ${a}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <label htmlFor="other-amount" className="sr-only">
                  Other amount
                </label>
                <div className="relative">
                  <span
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-granite-400"
                    aria-hidden
                  >
                    $
                  </span>
                  <input
                    id="other-amount"
                    type="number"
                    min="1"
                    step="1"
                    inputMode="decimal"
                    placeholder="Other"
                    className="w-full rounded-sm border border-granite-500 bg-granite-800 py-3 pl-7 pr-4 text-white placeholder:text-granite-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    value={amount === "other" ? custom : ""}
                    onFocus={() => setAmount("other")}
                    onChange={(e) => {
                      setAmount("other");
                      setCustom(e.target.value);
                    }}
                  />
                </div>
              </div>
            </fieldset>

            <div>
              <label htmlFor="don-name" className="mb-1.5 block text-sm font-semibold text-granite-200">
                Full name
              </label>
              <input
                id="don-name"
                name="name"
                type="text"
                autoComplete="name"
                className="w-full rounded-sm border border-granite-500 bg-granite-800 px-4 py-3 text-white placeholder:text-granite-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
            <div>
              <label htmlFor="don-email" className="mb-1.5 block text-sm font-semibold text-granite-200">
                Email
              </label>
              <input
                id="don-email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-sm border border-granite-500 bg-granite-800 px-4 py-3 text-white placeholder:text-granite-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <button type="submit" className="btn-accent w-full">
              Contribute
              {amount !== "other" ? ` $${amount}` : custom ? ` $${custom}` : ""}
            </button>

            {status !== "idle" && (
              <div
                id={statusId}
                role="status"
                aria-live="polite"
                className={`flex items-start gap-2 rounded-sm px-4 py-3 text-sm ${
                  status === "success"
                    ? "bg-pine-900 text-pine-100"
                    : "bg-amber-950 text-amber-100"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                )}
                <span>
                  {status === "success"
                    ? "Thank you — this demo confirms your intent. Connect a payment processor for live contributions."
                    : error}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
