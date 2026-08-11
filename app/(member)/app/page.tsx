import Link from "next/link";
import {
  Bell,
  Gift,
  QrCode,
  ScanLine,
  Sparkles,
  Ticket,
  Users,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MemberCard,
  MemberLinkRow,
  MemberScreen,
} from "@/components/member/member-ui";
import { getSession } from "@/lib/auth";
import { HOME_CLUB } from "@/lib/home-club";

export default async function MemberHomePage() {
  const session = await getSession();
  const firstName = session?.firstName || "Member";
  const clubName = session?.clubName || HOME_CLUB.name;
  const plan =
    session?.plan === "classic"
      ? "Classic"
      : session?.plan === "black-card"
        ? "Black Card"
        : "Member";

  return (
    <MemberScreen
      eyebrow="Screen 23 · Home"
      title={`Welcome back, ${firstName}`}
      subtitle="Check in, check Crowd Meter, and jump into workouts — all in the member app."
    >
      <MemberCard className="pf-grad-black-card text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-pf-yellow">
          Home club · {plan}
        </p>
        <p className="mt-1 font-display text-2xl">{clubName}</p>
        <p className="mt-1 text-sm text-white/70">Crowd Meter · Not too busy</p>
        <div className="mt-4 flex gap-2">
          <Button asChild variant="app" className="flex-1">
            <Link href="/app/check-in">Check in</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 border-white/35 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/app/keytag">Digital keytag</Link>
          </Button>
        </div>
      </MemberCard>

      <div className="mt-4 space-y-2">
        <MemberLinkRow
          href="/app/notifications"
          label="Notifications"
          description="Screens 25 & 65 — inbox and alert prefs"
          icon={Bell}
        />
        <MemberLinkRow
          href="/app/crowd"
          label="Crowd Meter"
          description="See how busy your club is right now"
          icon={Activity}
        />
        <MemberLinkRow
          href="/app/streaks"
          label="Fitness streaks"
          description="Screens 68–69 — keep the streak going"
          icon={Sparkles}
        />
        <MemberLinkRow
          href="/app/spa"
          label="Black Card spa"
          description="Screen 76 — book HydroMassage & more"
          icon={Gift}
        />
        <MemberLinkRow
          href="/app/book"
          label="Classes & training"
          description="Screen 77 — orientations and PF+ sessions"
          icon={Ticket}
        />
        <MemberLinkRow
          href="/app/workouts"
          label="PF+ Workouts"
          description="On-demand guides and video hubs"
          icon={QrCode}
        />
        <MemberLinkRow
          href="/app/equipment"
          label="Equipment scanner"
          description="Scan QR codes for machine tutorials"
          icon={ScanLine}
        />
        <MemberLinkRow
          href="/app/guests"
          label="Guest passes"
          description="Black Card guest privileges"
          icon={Users}
        />
        <MemberLinkRow
          href="/app/perks"
          label="Partner perks"
          description="Discounts and member offers"
          icon={Gift}
        />
        <MemberLinkRow
          href="/app/billing"
          label="Billing & membership"
          description="History, freeze, and cancel guides"
          icon={Ticket}
        />
      </div>
    </MemberScreen>
  );
}
