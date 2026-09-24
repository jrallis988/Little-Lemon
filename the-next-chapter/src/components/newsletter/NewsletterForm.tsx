"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

interface NewsletterFormProps {
  source?: string;
  dark?: boolean;
}

export function NewsletterForm({
  source = "site",
  dark = false,
}: NewsletterFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p
        className={`font-display text-sm font-bold ${dark ? "text-amber" : "text-forest"}`}
        role="status"
      >
        Thank you for subscribing{source ? ` via ${source}` : ""}!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor={`newsletter-email-${source}`} className="sr-only">
        Email address
      </label>
      <input
        id={`newsletter-email-${source}`}
        type="email"
        required
        placeholder="your@email.com"
        className={`min-w-0 flex-1 border px-4 py-3 text-sm focus:outline-none sm:max-w-xs ${
          dark
            ? "border-cream/30 bg-burgundy-dark/40 text-cream placeholder:text-cream/40 focus:border-amber"
            : "border-line bg-paper text-ink placeholder:text-ink-muted/50 focus:border-burgundy"
        }`}
      />
      <Button type="submit" variant={dark ? "outline" : "primary"} size="md" className={dark ? "border-cream text-cream hover:bg-cream hover:text-burgundy" : ""}>
        Subscribe
      </Button>
    </form>
  );
}
