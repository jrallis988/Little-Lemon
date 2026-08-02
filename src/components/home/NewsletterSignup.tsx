"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      className="border-y border-border bg-surface py-s9"
      aria-labelledby="newsletter-heading"
    >
      <div className="wrap grid grid-cols-1 items-start gap-s7 lg:grid-cols-2">
        <div>
          <h2
            id="newsletter-heading"
            className="mb-s3 text-2xl font-bold text-text sm:text-3xl"
          >
            Subscribe to Our Newsletter
          </h2>
          <p className="max-w-[420px] text-md font-light leading-relaxed text-text-body">
            Want expert information for your family delivered right to your
            inbox? Sign up for our weekly newsletter.
          </p>
        </div>

        {submitted ? (
          <div
            className="rounded-md border border-ocean/25 bg-white px-s5 py-s5"
            role="status"
          >
            <p className="text-base font-bold text-blue">
              Thanks for subscribing.
            </p>
            <p className="mt-s2 text-sm font-light text-text-body">
              This preview form confirms locally — connect your ESP before
              production go-live.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-s4 rounded-md bg-white p-s5 shadow-sm"
          >
            {(
              [
                ["email", "Email Address *", "email", true],
                ["firstName", "First Name", "text", false],
                ["lastName", "Last Name", "text", false],
                ["state", "State", "text", false],
                ["country", "Country", "text", false],
              ] as const
            ).map(([name, label, type, required]) => (
              <label key={name} className="block">
                <span className="mb-1 block text-sm font-bold text-text">
                  {label}
                </span>
                <input
                  name={name}
                  type={type}
                  required={required}
                  className="h-11 w-full rounded-sm border border-border bg-white px-s3 text-base text-text outline-none focus:border-ocean"
                />
              </label>
            ))}
            <div>
              <Button type="submit" variant="ocean">
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
