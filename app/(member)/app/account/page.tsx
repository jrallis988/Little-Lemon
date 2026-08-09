import Link from "next/link";
import {
  ComingSoonNote,
  MemberLinkRow,
  MemberScreen,
} from "@/components/member/member-ui";
import { Globe2, HeartPulse, Languages, MapPin } from "lucide-react";

export default function AccountPage() {
  return (
    <MemberScreen
      eyebrow="Screen 59–65 · Account"
      title="Account"
      subtitle="Profile, preferences, transfers, and integrations."
    >
      <div className="space-y-2">
        <MemberLinkRow
          href="/app/account"
          label="Home gym transfer"
          description="Screen 67 — request a new home club"
          icon={MapPin}
        />
        <MemberLinkRow
          href="/app/account"
          label="Language & accessibility"
          description="Screens 70–74 — multi-language + a11y suite"
          icon={Languages}
        />
        <MemberLinkRow
          href="/app/account"
          label="Wearables & HealthKit"
          description="Screens 80–85 — Apple Health / wearables"
          icon={HeartPulse}
        />
        <MemberLinkRow
          href="/"
          label="Back to website"
          description="Acquisition, pricing, and join"
          icon={Globe2}
        />
      </div>
      <div className="mt-4">
        <ComingSoonNote screen="profile edit + notification prefs" />
      </div>
      <p className="mt-4 text-center text-xs text-pf-ink/50">
        <Link href="/app/login" className="font-semibold text-pf-purple underline">
          Sign out (stub)
        </Link>
      </p>
    </MemberScreen>
  );
}
