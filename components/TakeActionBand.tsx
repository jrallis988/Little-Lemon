import Link from "next/link";
import { HeartHandshake, HandCoins } from "lucide-react";

export function TakeActionBand() {
  return (
    <section
      aria-labelledby="take-action-heading"
      className="bg-mist"
    >
      <div className="mx-auto max-w-content section-pad !py-14 md:!py-16">
        <h2 id="take-action-heading" className="section-title text-center">
          Take Action
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-granite-500">
          We are building a grassroots campaign powered by Granite Staters. Get
          involved with our team today.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link
            href="/#action"
            className="group flex flex-col justify-between border border-granite-200 bg-white p-8 transition-colors hover:border-pine-500"
          >
            <div>
              <HeartHandshake
                className="h-8 w-8 text-pine-700"
                strokeWidth={1.5}
                aria-hidden
              />
              <h3 className="mt-4 font-serif text-2xl font-bold text-granite-800">
                Join Our Team
              </h3>
              <p className="mt-2 text-base text-granite-500">
                Volunteer, request a lawn sign, or join the email list—start in
                under a minute.
              </p>
            </div>
            <span className="mt-6 text-sm font-bold uppercase tracking-wide text-pine-700 group-hover:underline">
              Sign Up →
            </span>
          </Link>
          <Link
            href="/#donate"
            className="group flex flex-col justify-between border border-amber-700/30 bg-amber-600 p-8 text-white transition-colors hover:bg-amber-700"
          >
            <div>
              <HandCoins className="h-8 w-8" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 font-serif text-2xl font-bold">
                Contribute Today
              </h3>
              <p className="mt-2 text-base text-amber-50">
                Fuel town halls, lawn signs, and the unglamorous work of listening
                in all ten counties.
              </p>
            </div>
            <span className="mt-6 text-sm font-bold uppercase tracking-wide group-hover:underline">
              Donate →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
