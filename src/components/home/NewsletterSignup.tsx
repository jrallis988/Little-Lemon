"use client";

import Image from "next/image";
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
      <div className="wrap grid grid-cols-1 items-stretch gap-s6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-s7">
        <div className="relative min-h-[280px] overflow-hidden rounded-md lg:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80"
            alt="A clinician reviews care information with a parent and child"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-nav-dark/55 via-nav-dark/10 to-transparent"
            aria-hidden="true"
          />
          <p className="absolute bottom-0 left-0 right-0 m-0 p-s5 text-sm font-semibold leading-snug text-white sm:text-base">
            Expert guidance for families — delivered to your inbox each week.
          </p>
        </div>

        <div className="flex flex-col gap-s5">
          <div>
            <h2
              id="newsletter-heading"
              className="mb-s3 text-2xl font-bold text-text sm:text-3xl"
            >
              Subscribe to Our Newsletter
            </h2>
            <p className="max-w-[480px] text-md font-light leading-relaxed text-text-body">
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
              className="grid grid-cols-1 gap-s4 rounded-md bg-white p-s5 shadow-sm sm:grid-cols-2"
            >
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-sm font-bold text-text">
                  Email Address *
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="h-11 w-full rounded-sm border border-border bg-white px-s3 text-base text-text outline-none focus:border-ocean"
                />
              </label>
              {(
                [
                  ["firstName", "First Name", "text"],
                  ["lastName", "Last Name", "text"],
                  ["state", "State", "text"],
                  ["country", "Country", "text"],
                ] as const
              ).map(([name, label, type]) => (
                <label key={name} className="block">
                  <span className="mb-1 block text-sm font-bold text-text">
                    {label}
                  </span>
                  <input
                    name={name}
                    type={type}
                    className="h-11 w-full rounded-sm border border-border bg-white px-s3 text-base text-text outline-none focus:border-ocean"
                  />
                </label>
              ))}
              <div className="sm:col-span-2">
                <Button type="submit" variant="ocean" className="min-w-[140px]">
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
