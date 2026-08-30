"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";

export default function ProfileEditPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    void fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data: { user?: { firstName?: string; lastName?: string } }) => {
        if (!data.user) return;
        setFirstName(data.user.firstName ?? "");
        setLastName(data.user.lastName ?? "");
      })
      .catch(() => undefined);
  }, []);

  return (
    <MemberScreen
      eyebrow="Screen 64 · Profile"
      title="Edit profile"
      subtitle="Keep your contact details current for club notices."
    >
      <MemberCard>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-pf-ink/65" htmlFor="fn">
                First name
              </label>
              <Input
                id="fn"
                className="mt-1 border-pf-line"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-pf-ink/65" htmlFor="ln">
                Last name
              </label>
              <Input
                id="ln"
                className="mt-1 border-pf-line"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-pf-ink/65" htmlFor="phone">
              Mobile phone
            </label>
            <Input
              id="phone"
              className="mt-1 border-pf-line"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {saved ? (
            <p className="text-sm font-semibold text-emerald-700">Profile saved.</p>
          ) : null}
          <Button type="submit" variant="purple" className="w-full">
            Save changes
          </Button>
        </form>
      </MemberCard>
    </MemberScreen>
  );
}
