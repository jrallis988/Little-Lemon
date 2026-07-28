export function LegalReviewBanner() {
  return (
    <div
      role="status"
      className="mb-8 border-2 border-red bg-paper px-4 py-3 text-sm leading-relaxed text-ink"
    >
      <p className="font-display text-cta font-normal uppercase tracking-[0.12em] text-red">
        LEGAL REVIEW REQUIRED BEFORE PRODUCTION LAUNCH
      </p>
      <p className="mt-2 text-slate-text">
        This page contains draft language for layout and development only. It is
        not final legal advice and must be reviewed by qualified counsel before
        public launch. Do not remove this flag until approved legal copy has been
        supplied.
      </p>
    </div>
  );
}
