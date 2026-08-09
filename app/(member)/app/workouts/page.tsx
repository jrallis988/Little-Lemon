import Link from "next/link";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";
import { WORKOUTS } from "@/lib/workouts";

export default function WorkoutsPage() {
  return (
    <MemberScreen
      eyebrow="Screen 40–48 · PF+ Workouts"
      title="Workout library"
      subtitle="On-demand guides and video hubs live in the member app — not the acquisition site."
    >
      <div className="space-y-2">
        {WORKOUTS.map((guide) => (
          <Link key={guide.id} href={`/app/workouts/${guide.id}`}>
            <MemberCard className="mb-2 transition hover:border-pf-purple">
              <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
                {guide.collection} · {guide.minutes} min
              </p>
              <p className="mt-1 font-semibold text-pf-ink">{guide.title}</p>
              <p className="mt-1 text-xs text-pf-ink/55">{guide.summary}</p>
            </MemberCard>
          </Link>
        ))}
      </div>
    </MemberScreen>
  );
}
