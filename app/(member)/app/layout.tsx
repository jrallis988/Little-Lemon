import type { Metadata } from "next";
import { MemberShell } from "@/components/member/member-shell";

export const metadata: Metadata = {
  title: {
    default: "PF App",
    template: "%s · PF App",
  },
  description:
    "Planet Fitness member utility — check-in, digital keytag, Crowd Meter, workouts, and account tools.",
  robots: { index: false, follow: false },
};

/**
 * Member utility chrome (Screens 21–85).
 * Mobile-first app shell. Acquisition stays on the public web segment.
 */
export default function MemberAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MemberShell>{children}</MemberShell>;
}
