import {
  MemberLinkRow,
  MemberScreen,
} from "@/components/member/member-ui";
import { SignOutButton } from "@/components/member/sign-out-button";
import { getSession } from "@/lib/auth";
import {
  Accessibility,
  Globe2,
  HeartPulse,
  Languages,
  MapPin,
  MessageCircle,
  UserRound,
} from "lucide-react";

export default async function AccountPage() {
  const session = await getSession();
  const name = session
    ? [session.firstName, session.lastName].filter(Boolean).join(" ")
    : "Member";

  return (
    <MemberScreen
      eyebrow="Screen 59–65 · Account"
      title="Account"
      subtitle={`${name} · ${session?.email ?? "signed in"}`}
    >
      <div className="space-y-2">
        <MemberLinkRow
          href="/app/account/profile"
          label="Edit profile"
          description="Screen 64 — name, phone, and contact email"
          icon={UserRound}
        />
        <MemberLinkRow
          href="/app/account/transfer"
          label="Home gym transfer"
          description="Screens 67 & 75 — request a new home club"
          icon={MapPin}
        />
        <MemberLinkRow
          href="/app/account/language"
          label="Language"
          description="Screen 70 — preferred app language"
          icon={Languages}
        />
        <MemberLinkRow
          href="/app/account/accessibility"
          label="Accessibility"
          description="Screens 71–74 — text, contrast, motion, reader"
          icon={Accessibility}
        />
        <MemberLinkRow
          href="/app/account/health"
          label="Wearables & HealthKit"
          description="Screens 80–83 — Apple Health / wearables"
          icon={HeartPulse}
        />
        <MemberLinkRow
          href="/app/account/support"
          label="Support chat"
          description="Screen 78 — talk to member support"
          icon={MessageCircle}
        />
        <MemberLinkRow
          href="/"
          label="Back to website"
          description="Acquisition, pricing, and join"
          icon={Globe2}
        />
      </div>
      <div className="mt-5">
        <SignOutButton className="w-full" />
      </div>
    </MemberScreen>
  );
}
