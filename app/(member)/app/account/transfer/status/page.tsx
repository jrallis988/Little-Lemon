import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function TransferStatusPage() {
  return (
    <MemberScreen
      eyebrow="Screen 75 · Transfer status"
      title="Transfer status"
      subtitle="Track home-club move progress from request to activation."
    >
      <MemberCard className="space-y-3">
        <ol className="space-y-3 text-sm">
          {[
            ["Requested", "done"],
            ["Home club review", "active"],
            ["New club accepts", "pending"],
            ["Active at new home", "pending"],
          ].map(([label, state]) => (
            <li key={label} className="flex items-center justify-between gap-3">
              <span className="font-semibold text-pf-ink">{label}</span>
              <span
                className={
                  state === "done"
                    ? "text-emerald-700"
                    : state === "active"
                      ? "text-pf-purple"
                      : "text-pf-ink/40"
                }
              >
                {state === "done" ? "Complete" : state === "active" ? "In review" : "Queued"}
              </span>
            </li>
          ))}
        </ol>
      </MemberCard>
    </MemberScreen>
  );
}
