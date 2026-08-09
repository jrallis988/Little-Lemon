import {
  ComingSoonNote,
  MemberCard,
  MemberScreen,
} from "@/components/member/member-ui";

export default function EquipmentPage() {
  return (
    <MemberScreen
      eyebrow="Screen 49–52 · Equipment QR"
      title="Equipment scanner"
      subtitle="Scan machine QR codes for PF tutorials and proper form tips."
    >
      <MemberCard className="text-center">
        <div className="mx-auto grid h-40 w-40 place-items-center rounded-full border-4 border-pf-purple/30 bg-pf-mist font-display text-xl text-pf-purple">
          Scan
        </div>
        <p className="mt-4 text-sm text-pf-ink/65">
          Point your camera at a club equipment QR code.
        </p>
      </MemberCard>
      <div className="mt-4">
        <ComingSoonNote screen="camera permission + tutorial detail" />
      </div>
    </MemberScreen>
  );
}
