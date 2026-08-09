import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function MemberLoginPage() {
  return (
    <MemberScreen
      eyebrow="Screen 21–22 · Auth"
      title="Sign in"
      subtitle="Member utility login. Acquisition and join stay on the public website."
    >
      <MemberCard className="space-y-3">
        <div>
          <label htmlFor="email" className="text-xs font-semibold text-pf-ink/65">
            Email
          </label>
          <Input
            id="email"
            type="email"
            className="mt-1 border-pf-line"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-xs font-semibold text-pf-ink/65"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            className="mt-1 border-pf-line"
            autoComplete="current-password"
          />
        </div>
        <Button asChild variant="purple" className="w-full">
          <Link href="/app">Continue to app</Link>
        </Button>
        <p className="text-center text-xs text-pf-ink/55">
          New here?{" "}
          <Link href="/join" className="font-semibold text-pf-purple underline">
            Join on the website
          </Link>
        </p>
      </MemberCard>
    </MemberScreen>
  );
}
