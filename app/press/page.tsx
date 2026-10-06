import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Prose, CtaRow } from "@/components/PageChrome";
import { PortfolioDisclaimer } from "@/components/PortfolioDisclaimer";
import {
  candidate,
  hasFecCommitteeId,
  hasMailAddress,
  hasPublicPhone,
  publicSocials,
  fecCommitteeUrl,
} from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Press / Media Kit",
  description: "Press contacts and media resources for the Nick Varga campaign.",
};

type KitItem = {
  label: string;
  status: "ready" | "sample";
  detail: string;
  href?: string;
};

export default function PressPage() {
  const socials = publicSocials();
  const kit: KitItem[] = [
    {
      label: "Press email",
      status: "ready",
      detail: candidate.email,
      href: `mailto:${candidate.email}`,
    },
    {
      label: "Public phone",
      status: "sample",
      detail: hasPublicPhone()
        ? `${candidate.phone} (sample)`
        : "Sample number on Contact",
    },
    {
      label: "Mailing address",
      status: "sample",
      detail: hasMailAddress()
        ? `${candidate.mailAddress} (sample)`
        : "Sample address on Contact",
    },
    {
      label: "Social profiles",
      status: socials.length > 0 ? "ready" : "sample",
      detail:
        socials.length > 0
          ? socials.map((s) => s.label).join(" · ")
          : "Facebook / Instagram as available",
    },
    {
      label: "Headshot",
      status: "sample",
      detail: "Illustrated portrait on Meet Nick",
      href: "/meet-nick",
    },
    {
      label: "Bio",
      status: "sample",
      detail: "Narrative bio on Meet Nick (no separate PDF)",
      href: "/meet-nick",
    },
    {
      label: "Logo pack",
      status: "ready",
      detail: "Campaign lockup",
      href: "/images/logo.png",
    },
    {
      label: "FEC filings",
      status: hasFecCommitteeId() ? "ready" : "sample",
      detail: hasFecCommitteeId()
        ? `Committee ${candidate.fecCommitteeId}`
        : "Transparency page demonstrates disclosure UI (no live committee ID)",
      href: fecCommitteeUrl() ?? "/transparency",
    },
  ];

  return (
    <>
      <PageHero
        overline="Media"
        title="Press / Media Kit"
        subtitle="Resources for journalists covering the 2026 New Hampshire U.S. Senate race."
      />
      <article className="mx-auto max-w-3xl section-pad">
        <Prose>
          <p>
            Nick Varga is an independent write-in candidate for U.S. Senate from
            New Hampshire and founder of the Violet Party. Election Day is{" "}
            {candidate.electionLabel}.
          </p>
          <h2 className="font-display text-2xl font-bold text-ink">
            Press contact
          </h2>
          <p>
            Email{" "}
            <a
              href={`mailto:${candidate.email}`}
              className="font-semibold text-red underline-offset-2 hover:underline"
            >
              {candidate.email}
            </a>{" "}
            with interview requests, fact checks, and photo needs.
          </p>
          <h2 className="font-display text-2xl font-bold text-ink">
            Quick facts
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Hometown: {candidate.hometown}, NH ({candidate.county})
            </li>
            <li>Ballot: Independent write-in (General Election only)</li>
            <li>Tagline: {candidate.tagline}</li>
            <li>
              Movement: Violet Party — Not Red. Not Blue. Something New.
            </li>
            <li>No corporate PAC money</li>
            <li>Paid for by {candidate.committee}</li>
          </ul>
        </Prose>

        <h2 className="mt-10 font-display text-2xl font-bold text-ink">
          Media kit status
        </h2>
        <p className="mt-2 text-base text-slate-muted">
          Items marked sample are case-study stand-ins, not a live press room.
        </p>
        <ul className="mt-6 divide-y divide-slate-line border-y border-slate-line">
          {kit.map((item) => (
            <li
              key={item.label}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
            >
              <div>
                <p className="font-semibold text-ink">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-red underline-offset-2 hover:underline"
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.detail}
                  </a>
                ) : (
                  <p className="text-sm text-slate-muted">{item.detail}</p>
                )}
              </div>
              <span
                className={`mt-1 shrink-0 text-xs font-bold uppercase tracking-[0.14em] ${
                  item.status === "ready" ? "text-red" : "text-slate-muted"
                }`}
              >
                {item.status === "ready" ? "Ready" : "Sample"}
              </span>
            </li>
          ))}
        </ul>

        {socials.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-4 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red underline-offset-2 hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <PortfolioDisclaimer className="mt-8 text-sm text-slate-muted" />
        <CtaRow
          primary={{ href: "/meet-nick", label: "Meet Nick" }}
          secondary={{ href: "/transparency", label: "Transparency" }}
        />
        <p className="mt-6">
          <Link
            href="/contact"
            className="font-semibold text-red underline-offset-2 hover:underline"
          >
            Contact the campaign →
          </Link>
        </p>
      </article>
    </>
  );
}
