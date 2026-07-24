"use client";

import { ExternalLink } from "lucide-react";

import type { ProfileDetails as ProfileDetailsData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export interface ProfileDetailsProps {
  details: ProfileDetailsData;
  interests?: string[];
  favoriteMusic?: string[];
  className?: string;
}

const textFields: Array<{
  key: keyof ProfileDetailsData;
  label: string;
  long?: boolean;
}> = [
  { key: "aboutMe", label: "About Me", long: true },
  { key: "whoIdLikeToMeet", label: "Who I'd Like to Meet", long: true },
  { key: "generalInterests", label: "General Interests", long: true },
  { key: "music", label: "Music" },
  { key: "movies", label: "Movies" },
  { key: "television", label: "Television" },
  { key: "books", label: "Books" },
  { key: "heroes", label: "Heroes" },
  { key: "occupation", label: "Occupation" },
  { key: "education", label: "Education" },
  { key: "relationshipStatus", label: "Relationship" },
];

export function ProfileDetails({
  details,
  interests = [],
  favoriteMusic = [],
  className,
}: ProfileDetailsProps) {
  const isHidden = (field: string) => details.hiddenFields.includes(field);
  const visibleFields = textFields.filter(
    (field) => !isHidden(field.key) && details[field.key]
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {visibleFields.length > 0 ? (
          <dl className="grid gap-3">
            {visibleFields.map((field) => (
              <div
                key={field.key}
                className={cn(
                  "rounded-card border border-surface-border bg-surface-muted p-3",
                  !field.long && "sm:grid sm:grid-cols-[150px_1fr] sm:gap-3"
                )}
              >
                <dt className="text-xs font-bold uppercase tracking-wide text-brand-dark">
                  {field.label}
                </dt>
                <dd className="mt-1 whitespace-pre-wrap text-sm leading-6 text-navy-800 sm:mt-0">
                  {String(details[field.key])}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-sm text-navy-500">No public details shared yet.</p>
        )}

        {!isHidden("interests") && interests.length > 0 ? (
          <section>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-navy-700">
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge key={interest} variant="info">
                  {interest}
                </Badge>
              ))}
            </div>
          </section>
        ) : null}

        {!isHidden("favoriteMusic") && favoriteMusic.length > 0 ? (
          <section>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-navy-700">
              Favorite Music
            </h3>
            <div className="flex flex-wrap gap-2">
              {favoriteMusic.map((artist) => (
                <Badge key={artist}>{artist}</Badge>
              ))}
            </div>
          </section>
        ) : null}

        {!isHidden("website") && details.website ? (
          <a
            href={details.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-dark"
          >
            Visit website
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}
