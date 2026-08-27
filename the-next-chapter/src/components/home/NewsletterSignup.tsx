"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      className="border-t border-line py-16 md:py-24"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader
            eyebrow="Stay Connected"
            title="The Next Chapter Newsletter"
            description="Receive new-release recommendations, author news, reading activities, and Fall Reading Week updates — delivered seasonally."
            align="center"
          />

          {submitted ? (
            <p
              className="mt-8 font-display text-lg font-bold text-forest"
              role="status"
            >
              Thank you for subscribing! Check your inbox for a welcome message.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="your@email.com"
                className="min-w-0 flex-1 border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-burgundy focus:outline-none sm:max-w-xs"
              />
              <Button type="submit" variant="primary" size="md">
                Subscribe
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-ink-muted">
            Three editions this fall: September, October, and November.{" "}
            <a href="/newsletter" className="text-burgundy underline-offset-2 hover:underline">
              View past editions
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
