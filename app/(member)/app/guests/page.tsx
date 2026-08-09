import {
  ComingSoonNote,
  MemberCard,
  MemberScreen,
} from "@/components/member/member-ui";

export default function GuestsPage() {
  return (
    <MemberScreen
      eyebrow="Screen 36–39 · Guest passes"
      title="Guest passes"
      subtitle="Black Card members can bring a guest. Managed here in the app."
    >
      <MemberCard>
        <p className="font-semibold text-pf-ink">Bring a guest today</p>
        <p className="mt-1 text-sm text-pf-ink/65">
          Generate a same-day guest pass for your home or visited club.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-pf-btn text-sm font-semibold text-white"
        >
          Create guest pass
        </button>
      </MemberCard>
      <div className="mt-4">
        <ComingSoonNote screen="pass QR + history + limits" />
      </div>
    </MemberScreen>
  );
}
