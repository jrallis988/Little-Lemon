import type { Metadata } from "next";
import { PageHero } from "@/components/PageChrome";
import { VolunteerSignup } from "@/components/VolunteerSignup";
import { volunteerRoles } from "@/lib/volunteers";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Phone banking, canvassing, events, and more — volunteer with Nick Varga for U.S. Senate.",
};

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        overline="Take action"
        title="Volunteer"
        subtitle="Phone banks, canvassing, events, and ops — pick a role and we’ll put you to work."
      />
      <div className="mx-auto max-w-content section-pad">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {volunteerRoles.map((item) => (
            <li
              key={item.id}
              className="flex flex-col border border-granite-200 bg-white p-6"
            >
              <h2 className="font-serif text-xl font-bold text-granite-800">
                {item.title}
              </h2>
              <p className="mt-1 text-sm font-semibold text-pine-700">
                {item.location}
              </p>
              <p className="mt-3 flex-1 text-base text-granite-600">
                {item.summary}
              </p>
              <dl className="mt-4 space-y-1 text-sm text-granite-500">
                <div>
                  <dt className="inline font-semibold text-granite-700">
                    Time:{" "}
                  </dt>
                  <dd className="inline">{item.timeCommitment}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-granite-700">
                    Skills:{" "}
                  </dt>
                  <dd className="inline">{item.skills}</dd>
                </div>
              </dl>
              <a href="#volunteer-form" className="btn-ghost mt-5 w-full text-sm text-center">
                Sign up for this role
              </a>
            </li>
          ))}
        </ul>
        <VolunteerSignup />
      </div>
    </>
  );
}
