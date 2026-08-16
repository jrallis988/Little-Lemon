"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar } from "@/components/ui/Avatar";
import { getComic, threads } from "@/lib/mock/data";

export default function MessagesPage() {
  return (
    <RequireAuth>
      <AppShell title="Messages">
        <p className="mb-4 text-sm text-smoke">
          Trade sets, book guests, send notes after the show.
        </p>
        <ul className="space-y-2">
          {threads.map((t) => {
            const peer = getComic(t.peerId);
            if (!peer) return null;
            return (
              <li key={t.id}>
                <Link
                  href={`/messages`}
                  className="flex items-center gap-3 rounded-xl bg-velvet/70 p-3 hairline"
                >
                  <Avatar initials={peer.avatarInitials} hue={peer.avatarHue} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">{peer.displayName}</p>
                      <time className="text-[11px] text-smoke">
                        {formatDistanceToNow(new Date(t.updatedAt), {
                          addSuffix: true,
                        })}
                      </time>
                    </div>
                    <p className="truncate text-sm text-mic">{t.preview}</p>
                  </div>
                  {t.unread ? (
                    <span className="rounded-full bg-marquee px-2 py-0.5 text-[10px] font-semibold text-foam">
                      {t.unread}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </AppShell>
    </RequireAuth>
  );
}
