"use client";

import * as React from "react";
import { Music, Pause, Play, SkipBack, SkipForward } from "lucide-react";

import type { MusicTrack, Playlist } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export interface ProfileMusicPlayerProps {
  tracks: MusicTrack[];
  playlist?: Playlist;
  onTrackChange?: (track: MusicTrack) => void;
  onPlayStateChange?: (isPlaying: boolean, track: MusicTrack) => void;
  className?: string;
}

export function ProfileMusicPlayer({
  tracks,
  playlist,
  onTrackChange,
  onPlayStateChange,
  className,
}: ProfileMusicPlayerProps) {
  const orderedTracks = React.useMemo(() => {
    const sorted = [...tracks].sort((a, b) => a.position - b.position);
    if (!playlist) return sorted;
    const byId = new Map(sorted.map((track) => [track.id, track]));
    return playlist.trackIds
      .map((trackId) => byId.get(trackId))
      .filter((track): track is MusicTrack => Boolean(track));
  }, [playlist, tracks]);

  const featuredIndex = Math.max(
    0,
    orderedTracks.findIndex((track) => track.isFeatured)
  );
  const [currentIndex, setCurrentIndex] = React.useState(featuredIndex);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const currentTrack = orderedTracks[currentIndex];

  React.useEffect(() => {
    if (!currentTrack) return;
    onTrackChange?.(currentTrack);
  }, [currentTrack, onTrackChange]);

  React.useEffect(() => {
    if (!isPlaying || !audioRef.current || !currentTrack) return;
    audioRef.current.play().catch(() => {
      setIsPlaying(false);
      onPlayStateChange?.(false, currentTrack);
    });
  }, [currentTrack, isPlaying, onPlayStateChange]);

  const playCurrent = async () => {
    if (!audioRef.current || !currentTrack) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      onPlayStateChange?.(true, currentTrack);
    } catch {
      setIsPlaying(false);
      onPlayStateChange?.(false, currentTrack);
    }
  };

  const pauseCurrent = () => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.pause();
    setIsPlaying(false);
    onPlayStateChange?.(false, currentTrack);
  };

  const selectTrack = (index: number, shouldPlay = false) => {
    setCurrentIndex(index);
    setProgress(0);
    if (!shouldPlay) pauseCurrent();
  };

  const moveTrack = (direction: -1 | 1) => {
    if (!orderedTracks.length) return;
    const nextIndex =
      (currentIndex + direction + orderedTracks.length) % orderedTracks.length;
    selectTrack(nextIndex, isPlaying);
  };

  if (!orderedTracks.length) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Profile Music</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Music}
            title="No tracks posted"
            description="This profile has not added a song to their player yet."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{playlist?.title ?? "Profile Music"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-card border border-surface-border bg-brand-soft text-brand">
            {currentTrack.coverUrl ? (
              <img
                src={currentTrack.coverUrl}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <Music className="h-8 w-8" aria-hidden />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-navy-900">
              {currentTrack.title}
            </p>
            <p className="truncate text-sm text-navy-600">{currentTrack.artist}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy-100">
              <div
                className="h-full bg-brand"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <audio
              ref={audioRef}
              src={currentTrack.audioUrl}
              preload="metadata"
              onPause={() => setIsPlaying(false)}
              onEnded={() => moveTrack(1)}
              onTimeUpdate={(event) => {
                const audio = event.currentTarget;
                if (audio.duration) {
                  setProgress((audio.currentTime / audio.duration) * 100);
                }
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => moveTrack(-1)}
            aria-label="Previous track"
          >
            <SkipBack className="h-4 w-4" aria-hidden />
          </Button>
          <Button
            onClick={() => {
              if (isPlaying) pauseCurrent();
              else void playCurrent();
            }}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" aria-hidden />
            ) : (
              <Play className="h-4 w-4" aria-hidden />
            )}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => moveTrack(1)}
            aria-label="Next track"
          >
            <SkipForward className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        <div className="divide-y divide-surface-border rounded-card border border-surface-border">
          {orderedTracks.map((track, index) => (
            <button
              key={track.id}
              type="button"
              className={cn(
                "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition hover:bg-brand-soft",
                index === currentIndex && "bg-brand-soft"
              )}
              onClick={() => selectTrack(index, isPlaying)}
            >
              <span className="min-w-0">
                <span className="block truncate font-bold text-navy-900">
                  {track.title}
                </span>
                <span className="block truncate text-xs text-navy-500">
                  {track.artist}
                </span>
              </span>
              {track.isFeatured ? (
                <span className="text-[10px] font-bold uppercase text-brand">
                  Featured
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
