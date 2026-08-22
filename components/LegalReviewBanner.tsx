import { candidate } from "@/lib/candidate";

export function LegalReviewBanner() {
  if (candidate.legalReviewApproved) return null;

  return (
    <div
      role="status"
      className="mb-8 border-2 border-red bg-paper px-4 py-3 text-sm leading-relaxed text-ink"
    >
      <p className="font-display text-cta font-normal uppercase tracking-[0.14em] text-red">
        LEGAL REVIEW REQUIRED
      </p>
      <p className="mt-1 font-display text-[0.7rem] font-normal uppercase tracking-[0.12em] text-red/90">
        Before production launch
      </p>
      <p className="mt-2 text-slate-text">
        This page contains draft language for layout and development only. It is
        not final legal advice and must be reviewed by qualified counsel before
        public launch — including the “Paid for by {candidate.committee}”
        disclaimer and any FEC committee details. Do not remove this flag until
        approved legal copy has been supplied.
      </p>
    </div>
  );
}
