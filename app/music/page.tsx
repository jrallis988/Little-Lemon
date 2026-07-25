"use client";

import { useMemo, useState } from "react";
import { Heart, ListMusic, Music2, PlayCircle } from "lucide-react";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { fictionalTracks, vibePlaylists } from "@/lib/mock/vibe-social";
import { cn } from "@/lib/utils";

type MusicTab = "trending" | "playlists" | "liked";

function MusicContent() {
  const [tab, setTab] = useState<MusicTab>("trending");
  const [likedIds, setLikedIds] = useState<string[]>([
    "track-golden-hour",
    "track-midnight-pass",
  ]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const likedTracks = useMemo(
    () => fictionalTracks.filter((track) => likedIds.includes(track.id)),
    [likedIds]
  );

  const toggleLike = (trackId: string) => {
    const track = fictionalTracks.find((item) => item.id === trackId);
    setLikedIds((ids) =>
      ids.includes(trackId) ? ids.filter((id) => id !== trackId) : [...ids, trackId]
    );
    setNotice(`${track?.title ?? "Track"} ${likedIds.includes(trackId) ? "unliked" : "liked"}.`);
  };

  const playTrack = (trackId: string) => {
    const track = fictionalTracks.find((item) => item.id === trackId);
    setPlayingId(trackId);
    setNotice(`Playing ${track?.title ?? "track"}.`);
  };

  return (
    <AuthenticatedShell mainClassName="max-w-6xl">
      <div className="space-y-6">
        <section className="rounded-[28px] bg-zinc-950 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:p-7">
          <Badge className="border-[#FF6A1A]/40 bg-[#FF5C00]/15 text-[#FFB68A]">
            <Music2 className="h-3 w-3" aria-hidden />
            Music discovery
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl">
            What is your school playing?
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Fictional teen-safe tracks, playlist swaps, and profile music signals
            for discovering friends through sound.
          </p>
        </section>

        {notice ? (
          <div className="rounded-[18px] border border-[#FF6A1A]/30 bg-[#FF5C00] px-4 py-3 text-sm font-black text-white">
            {notice}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2 rounded-[24px] border border-surface-border bg-white p-2 shadow-soft">
          {(["trending", "playlists", "liked"] as MusicTab[]).map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "rounded-full px-4 py-2 text-sm font-black capitalize transition",
                tab === item
                  ? "bg-[#FF5C00] text-white"
                  : "text-navy-600 hover:bg-surface-muted"
              )}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === "playlists" ? (
          <section className="grid gap-4 md:grid-cols-3">
            {vibePlaylists.map((playlist) => {
              const tracks = fictionalTracks.filter((track) =>
                playlist.trackIds.includes(track.id)
              );
              return (
                <article
                  key={playlist.id}
                  className="rounded-[24px] border border-surface-border bg-white p-5 shadow-card"
                >
                  <Badge className="border-[#FF6A1A]/30 bg-[#FF5C00]/10 text-[#C24700]">
                    <ListMusic className="h-3 w-3" aria-hidden />
                    Playlist
                  </Badge>
                  <h2 className="mt-3 font-display text-2xl font-black text-navy-900">
                    {playlist.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-navy-600">
                    {playlist.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    {tracks.map((track) => (
                      <button
                        key={track.id}
                        type="button"
                        className="flex w-full items-center justify-between gap-3 rounded-[16px] bg-surface-muted p-3 text-left hover:bg-brand-soft"
                        onClick={() => playTrack(track.id)}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-black text-navy-900">
                            {track.title}
                          </span>
                          <span className="text-xs text-navy-500">{track.artist}</span>
                        </span>
                        <PlayCircle className="h-5 w-5 text-[#FF5C00]" aria-hidden />
                      </button>
                    ))}
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="grid gap-4">
            {(tab === "liked" ? likedTracks : fictionalTracks).map((track, index) => (
              <article
                key={track.id}
                className="rounded-[24px] border border-surface-border bg-white p-4 shadow-card sm:p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="grid h-16 w-16 place-items-center rounded-[20px] bg-zinc-950 text-[#FF8D4D]">
                    <span className="font-display text-2xl font-black">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="border-[#FF6A1A]/30 bg-[#FF5C00]/10 text-[#C24700]">
                        {track.mood}
                      </Badge>
                      {playingId === track.id ? <Badge variant="success">Playing</Badge> : null}
                    </div>
                    <h2 className="mt-2 font-display text-2xl font-black text-navy-900">
                      {track.title}
                    </h2>
                    <p className="text-sm text-navy-500">{track.artist}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      className="rounded-full border-[#FF6A1A] bg-[#FF5C00] text-white hover:bg-[#FF6A1A]"
                      onClick={() => playTrack(track.id)}
                    >
                      <PlayCircle className="h-4 w-4" aria-hidden />
                      Play
                    </Button>
                    <Button
                      variant="secondary"
                      className="rounded-full"
                      onClick={() => toggleLike(track.id)}
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          likedIds.includes(track.id) && "fill-[#FF5C00] text-[#FF5C00]"
                        )}
                        aria-hidden
                      />
                      {likedIds.includes(track.id) ? "Liked" : "Like"}
                    </Button>
                  </div>
                </div>
                {playingId === track.id ? (
                  <audio className="mt-4 w-full" src={track.url} controls autoPlay />
                ) : null}
              </article>
            ))}
          </section>
        )}

        {tab === "liked" && likedTracks.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-surface-border bg-white p-8 text-center">
            <Heart className="mx-auto h-10 w-10 text-[#FF5C00]" aria-hidden />
            <h2 className="mt-3 font-display text-2xl font-black text-navy-900">
              No liked tracks yet
            </h2>
            <p className="mt-2 text-navy-600">
              Like tracks from Trending and they will appear here.
            </p>
          </div>
        ) : null}
      </div>
    </AuthenticatedShell>
  );
}

export default function MusicPage() {
  return (
    <RequireAuth>
      <MusicContent />
    </RequireAuth>
  );
}
