import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Prose } from "@/components/PageChrome";
import {
  candidate,
  fecCommitteeUrl,
  fecFilingsUrl,
  hasFecCommitteeId,
} from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Transparency",
  description:
    "How the Nick Varga campaign is funded — no corporate PACs, no dark money, FEC filings.",
};

export default function TransparencyPage() {
  return (
    <>
      <PageHero
        overline="Accountability"
        title="Transparency"
        subtitle="Radical transparency isn’t a slogan. It’s how this campaign operates."
      />
      <article className="mx-auto max-w-3xl section-pad space-y-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">
            Our Commitment to Transparency
          </h2>
          <Prose>
            <p>
              Every meeting logged. Every donation disclosed. Every vote explained
              in plain English. If we can’t defend it in public, we shouldn’t be
              doing it.
            </p>
          </Prose>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">
            How This Campaign Is Funded
          </h2>
          <Prose>
            <p>
              This campaign accepts no corporate PAC money, no dark money, and no
              lobbyist contributions. Every dollar comes from individual
              supporters — most from Granite Staters. Full itemized donor and
              expenditure reports are filed with the FEC on the standard
              quarterly and pre-election schedule, and are available for public
              review at{" "}
              <a
                href="https://www.fec.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red underline-offset-2 hover:underline"
              >
                fec.gov
              </a>
              . If Nick is elected, he’ll continue publishing every quarterly
              report on this page in plain-English summary form — not just raw
              filings.
            </p>
          </Prose>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">
            What We Will Never Do
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-lg text-slate-text">
            <li>Accept corporate PAC money</li>
            <li>Hide behind dark-money groups</li>
            <li>Sell access to lobbyists</li>
            <li>Treat public office like a business opportunity</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">
            FEC Filings
          </h2>
          <Prose>
            {hasFecCommitteeId() ? (
              <p>
                Public filings for {candidate.committee} (
                {candidate.fecCommitteeId}) are available on the Federal Election
                Commission website:
              </p>
            ) : (
              <p>
                Public filings for {candidate.committee} will be linked here as they
                are submitted. A Federal Election Commission committee ID has not
                been posted yet. Until then, search committee filings at{" "}
                <a
                  href="https://www.fec.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red underline-offset-2 hover:underline"
                >
                  fec.gov
                </a>
                .
              </p>
            )}
          </Prose>
          {hasFecCommitteeId() ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-lg text-slate-text">
              {fecCommitteeUrl() ? (
                <li>
                  <a
                    href={fecCommitteeUrl()!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-red underline-offset-2 hover:underline"
                  >
                    FEC committee profile ({candidate.fecCommitteeId})
                  </a>
                </li>
              ) : null}
              {fecFilingsUrl() ? (
                <li>
                  <a
                    href={fecFilingsUrl()!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-red underline-offset-2 hover:underline"
                  >
                    FEC financial reports &amp; filings
                  </a>
                </li>
              ) : null}
            </ul>
          ) : null}
          <p className="mt-6 text-sm text-slate-muted">
            Paid for by {candidate.committee}.
          </p>
          <p className="mt-4">
            <Link href="/contact" className="font-semibold text-red underline-offset-2 hover:underline">
              Questions about funding? Contact us →
            </Link>
          </p>
        </section>
      </article>
    </>
  );
}
