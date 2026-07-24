import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Prose } from "@/components/PageChrome";
import { candidate } from "@/lib/candidate";

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
          <h2 className="font-serif text-2xl font-bold text-granite-800">
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
          <h2 className="font-serif text-2xl font-bold text-granite-800">
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
                className="font-semibold text-pine-700 underline-offset-2 hover:underline"
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
          <h2 className="font-serif text-2xl font-bold text-granite-800">
            What We Will Never Do
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-lg text-granite-600">
            <li>Accept corporate PAC money</li>
            <li>Hide behind dark-money groups</li>
            <li>Sell access to lobbyists</li>
            <li>Treat public office like a business opportunity</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-granite-800">
            FEC Filings
          </h2>
          <Prose>
            <p>
              Public filings for {candidate.committee} will be linked here as they
              are submitted. Until then, search committee filings at{" "}
              <a
                href="https://www.fec.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-pine-700 underline-offset-2 hover:underline"
              >
                fec.gov
              </a>
              .
            </p>
          </Prose>
          <p className="mt-6 text-sm text-granite-500">
            Paid for by {candidate.committee}.
          </p>
          <p className="mt-4">
            <Link href="/contact" className="font-semibold text-pine-700 underline-offset-2 hover:underline">
              Questions about funding? Contact us →
            </Link>
          </p>
        </section>
      </article>
    </>
  );
}
