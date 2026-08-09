import {
  ComingSoonNote,
  MemberCard,
  MemberScreen,
} from "@/components/member/member-ui";

const GUIDES = [
  "Beginner Lower Body Strength",
  "30-Minute Full Body Circuit",
  "Cardio Endurance Starter",
];

export default function WorkoutsPage() {
  return (
    <MemberScreen
      eyebrow="Screen 40–48 · PF+ Workouts"
      title="Workout library"
      subtitle="On-demand guides and video hubs live in the member app — not the acquisition site."
    >
      <div className="space-y-2">
        {GUIDES.map((guide) => (
          <MemberCard key={guide}>
            <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
              PF+ Guide
            </p>
            <p className="mt-1 font-semibold text-pf-ink">{guide}</p>
            <p className="mt-1 text-xs text-pf-ink/55">
              Reps, sets, and form tutorials
            </p>
          </MemberCard>
        ))}
      </div>
      <div className="mt-4">
        <ComingSoonNote screen="video hub + favorites + history" />
      </div>
    </MemberScreen>
  );
}
