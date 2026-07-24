"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Users } from "lucide-react";

import { CARE_PROFILES } from "@/lib/data/catalog";
import type { CareProfile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RELATIONSHIP_LABEL: Record<CareProfile["relationship"], string> = {
  self: "You",
  spouse: "Spouse",
  child: "Child",
  parent: "Parent",
  other: "Care recipient",
};

interface ProfileSwitcherProps {
  value?: string;
  onChange?: (profileId: string) => void;
  className?: string;
}

export function ProfileSwitcher({
  value,
  onChange,
  className,
}: ProfileSwitcherProps) {
  const defaultId =
    CARE_PROFILES.find((profile) => profile.isActive)?.id ?? CARE_PROFILES[0].id;
  const [selectedId, setSelectedId] = useState(value ?? defaultId);

  const selected = useMemo(
    () => CARE_PROFILES.find((profile) => profile.id === selectedId) ?? CARE_PROFILES[0],
    [selectedId],
  );

  function selectProfile(profileId: string) {
    setSelectedId(profileId);
    onChange?.(profileId);
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
        <Users className="size-4" aria-hidden />
        Care profile
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              className="h-11 gap-2 border-border bg-surface-elevated px-3"
              aria-label={`Care profile: ${selected.displayName}`}
            />
          }
        >
          <Avatar size="sm">
            <AvatarFallback className="bg-health/15 text-health">
              {selected.avatarInitials}
            </AvatarFallback>
          </Avatar>
          <span className="text-left">
            <span className="block text-sm font-medium text-foreground">
              {selected.displayName}
            </span>
            <span className="block text-xs text-muted-foreground">
              {RELATIONSHIP_LABEL[selected.relationship]}
            </span>
          </span>
          <ChevronDown className="size-4 opacity-60" aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Switch profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {CARE_PROFILES.map((profile) => {
            const isSelected = profile.id === selected.id;
            return (
              <DropdownMenuItem
                key={profile.id}
                onClick={() => selectProfile(profile.id)}
                className="flex items-center gap-3 py-2.5"
              >
                <Avatar size="sm">
                  <AvatarFallback className="bg-muted text-foreground">
                    {profile.avatarInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1">
                  <span className="block text-sm font-medium">
                    {profile.displayName}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {RELATIONSHIP_LABEL[profile.relationship]}
                  </span>
                </span>
                {isSelected ? (
                  <Check className="size-4 text-health" aria-hidden />
                ) : null}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
