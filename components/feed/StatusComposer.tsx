"use client";

import * as React from "react";
import { Send } from "lucide-react";

import type { Profile, Visibility } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { PrivacySelector } from "@/components/profile/PrivacySelector";

export interface StatusComposerProps {
  currentUser: Profile;
  defaultVisibility?: Visibility;
  maxLength?: number;
  onSubmit: (body: string, visibility: Visibility) => void | Promise<void>;
  onChange?: (body: string, visibility: Visibility) => void;
  className?: string;
}

export function StatusComposer({
  currentUser,
  defaultVisibility = "public",
  maxLength = 280,
  onSubmit,
  onChange,
  className,
}: StatusComposerProps) {
  const [body, setBody] = React.useState("");
  const [visibility, setVisibility] = React.useState<Visibility>(defaultVisibility);
  const [submitting, setSubmitting] = React.useState(false);

  const updateBody = (value: string) => {
    setBody(value);
    onChange?.(value, visibility);
  };

  const updateVisibility = (value: Visibility) => {
    setVisibility(value);
    onChange?.(body, value);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = body.trim();
    if (!trimmed) return;
    setSubmitting(true);
    try {
      await onSubmit(trimmed, visibility);
      setBody("");
      onChange?.("", visibility);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className={className}>
      <CardContent>
        <form onSubmit={submit} className="space-y-3">
          <div className="flex gap-3">
            <Avatar
              name={currentUser.displayName}
              src={currentUser.avatarUrl}
              size="md"
              online={currentUser.onlineStatus === "online"}
              showOnlineIndicator={currentUser.showOnlineStatus}
            />
            <div className="flex-1">
              <Textarea
                label={`Post as ${currentUser.displayName}`}
                value={body}
                onChange={(event) => updateBody(event.target.value)}
                rows={3}
                maxLength={maxLength}
                placeholder="What are you up to?"
              />
            </div>
          </div>
          <PrivacySelector
            value={visibility}
            onChange={updateVisibility}
            label="Who can see this?"
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-navy-500">
              {body.length}/{maxLength}
            </span>
            <Button type="submit" isLoading={submitting} disabled={!body.trim()}>
              <Send className="h-4 w-4" aria-hidden />
              Post Status
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
