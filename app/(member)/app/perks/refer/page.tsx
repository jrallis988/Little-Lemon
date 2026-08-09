"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function ReferFriendPage() {
  const [code, setCode] = useState("PF-JOIN");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    void fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data: { user?: { membershipId?: string | null } }) => {
        const id = data.user?.membershipId;
        if (id) setCode(`PF-${id.replace("PF-", "").slice(0, 6)}`);
      })
      .catch(() => undefined);
  }, []);

  return (
    <MemberScreen
      eyebrow="Screen 63 · Refer"
      title="Refer a friend"
      subtitle="Share your code. New joins that use it can be attributed in a live CRM."
    >
      <MemberCard className="space-y-3 text-center">
        <p className="text-xs text-pf-ink/55">Your referral code</p>
        <p className="font-display text-4xl text-pf-purple">{code}</p>
        <Button
          type="button"
          variant="purple"
          className="w-full"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
            } catch {
              setCopied(true);
            }
          }}
        >
          {copied ? "Copied" : "Copy code"}
        </Button>
      </MemberCard>
    </MemberScreen>
  );
}
