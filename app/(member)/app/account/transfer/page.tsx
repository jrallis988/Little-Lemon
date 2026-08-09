"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function HomeGymTransferPage() {
  const [submitted, setSubmitted] = useState(false);
  const [club, setClub] = useState("");

  return (
    <MemberScreen
      eyebrow="Screen 67 · Home gym transfer"
      title="Transfer home club"
      subtitle="Move your home club so dues and Black Card privileges follow you."
    >
      <MemberCard className="space-y-3">
        {submitted ? (
          <>
            <p className="font-display text-2xl text-pf-purple">Request sent</p>
            <p className="text-sm text-pf-ink/65">
              Transfer to <span className="font-semibold">{club}</span> is under
              review.
            </p>
            <Button asChild variant="purple" className="w-full">
              <Link href="/app/account/transfer/status">View transfer status</Link>
            </Button>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="club" className="text-xs font-semibold text-pf-ink/65">
                New home club city or name
              </label>
              <Input
                id="club"
                className="mt-1 border-pf-line"
                value={club}
                onChange={(e) => setClub(e.target.value)}
                placeholder="e.g. Decatur"
                required
              />
            </div>
            <Button
              variant="purple"
              className="w-full"
              disabled={!club.trim()}
              onClick={() => setSubmitted(true)}
            >
              Submit transfer request
            </Button>
          </>
        )}
      </MemberCard>
    </MemberScreen>
  );
}
