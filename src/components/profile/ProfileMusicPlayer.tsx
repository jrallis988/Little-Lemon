"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Music2, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

import type { MusicTrack, ProfileTheme } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";

type ProfileMusicPlayerProps = {
  tracks: MusicTrack[];
  style?: ProfileTheme["music_player_style"];
  className?: string;
  onTrackChange?: (track: MusicTrack) => void;
};

function sortTracks(tracks: MusicTrack[]) {
  return [...tracks].sort((a, b) => {
    if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
    return a.sort_order - b.sort_order;
  });
}

function styleClasses(style: ProfileTheme["music_player_style"]) {
  if (style === "compact") return "sm:grid-cols-[auto_1fr] sm:items-center";
  if (style === "card") return "rounded-xl shadow-lg";
  return "";
}

export function ProfileMusicPlayer({
  tracks,
  style = "classic",
  className,
  onTrackChange,
}: ProfileMusicPlayerProps) {
  const orderedTracks = useMemo(() => sortTracks(tracks), [tracks]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [autoplayAfterInteraction, setAutoplayAfterInteraction] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAfterLoadRef = useRef(false);

  const currentTrack = orderedTracks[currentIndex];

  useEffect(() => {
    if (currentIndex >= orderedTracks.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, orderedTracks.length]);

  useEffect(() => {
    if (!currentTrack) return;
    onTrackChange?.(currentTrack);
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (playAfterLoadRef.current) {
      playAfterLoadRef.current = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setError(null);
        })
        .catch(() => {
          setIsPlaying(false);
          setError("Unable to play this track. Try again or choose another song.");
        });
    }
  }, [currentTrack, onTrackChange]);

  if (orderedTracks.length === 0 || !currentTrack) {
    return (
      <section className={cn("profile-module", className)}>
        <h2 className="profile-heading text-xl font-black">Music</h2>
        <p className="mt-3 text-sm opacity-75">No songs on this profile yet.</p>
      </section>
    );
  }

  const playCurrent = () => {
    setHasInteracted(true);
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setError(null);
      })
      .catch(() => {
        setIsPlaying(false);
        setError("Unable to play this track. Try again or choose another song.");
      });
  };

  const chooseTrack = (index: number, shouldPlay = false) => {
    setHasInteracted(true);
    playAfterLoadRef.current = shouldPlay;
    setIsPlaying(false);
    setCurrentIndex(index);
  };

  const goToRelativeTrack = (offset: number, shouldPlay = isPlaying) => {
    const nextIndex = (currentIndex + offset + orderedTracks.length) % orderedTracks.length;
    chooseTrack(nextIndex, shouldPlay);
  };

  const handleEnded = () => {
    if (autoplayAfterInteraction && hasInteracted && orderedTracks.length > 1) {
      goToRelativeTrack(1, true);
      return;
    }
    setIsPlaying(false);
  };

  return (
    <section
      className={cn("profile-module", styleClasses(style), className)}
      aria-label="Profile music player"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="profile-heading flex items-center gap-2 text-xl font-black">
          <Music2 className="h-5 w-5" aria-hidden="true" />
          Music
        </h2>
        <span className="rounded-full border border-current px-2 py-0.5 text-xs font-bold uppercase opacity-70">
          {style}
        </span>
      </div>

      <div
        className={cn(
          "mt-4 grid gap-4",
          style === "compact" ? "sm:grid-cols-[96px_1fr]" : "sm:grid-cols-[144px_1fr]"
        )}
      >
        <div
          className={cn(
            "aspect-square overflow-hidden rounded border bg-[color-mix(in_srgb,var(--mp-secondary,#7B61FF)_15%,white)]",
            style === "compact" ? "max-w-24" : "max-w-40"
          )}
        >
          {currentTrack.cover_url ? (
            <img
              src={currentTrack.cover_url}
              alt={`${currentTrack.title} cover art`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Music2 className="h-12 w-12 opacity-55" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide opacity-60">
            {currentTrack.is_featured ? "Featured song" : "Now selected"}
          </p>
          <h3 className="profile-heading mt-1 truncate text-2xl font-black">
            {currentTrack.title}
          </h3>
          <p className="truncate text-sm font-semibold opacity-80">{currentTrack.artist}</p>

          <audio
            ref={audioRef}
            preload="metadata"
            onEnded={handleEnded}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          >
            <source src={currentTrack.audio_url} />
            Your browser does not support the audio element.
          </audio>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--mp-primary,#FF7A18)] bg-white text-[color:var(--mp-primary,#FF7A18)] hover:bg-[color-mix(in_srgb,var(--mp-secondary,#7B61FF)_12%,white)]"
              onClick={() => goToRelativeTrack(-1)}
              aria-label="Previous track"
            >
              <SkipBack className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--mp-primary,#FF7A18)] text-white shadow hover:brightness-110"
              onClick={playCurrent}
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Play className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--mp-primary,#FF7A18)] bg-white text-[color:var(--mp-primary,#FF7A18)] hover:bg-[color-mix(in_srgb,var(--mp-secondary,#7B61FF)_12%,white)]"
              onClick={() => goToRelativeTrack(1)}
              aria-label="Next track"
            >
              <SkipForward className="h-4 w-4" aria-hidden="true" />
            </button>
            <label className="ml-0 inline-flex cursor-pointer items-center gap-2 rounded-full border border-current px-3 py-2 text-xs font-semibold opacity-85 sm:ml-2">
              <input
                type="checkbox"
                checked={autoplayAfterInteraction}
                onChange={(event) => {
                  setHasInteracted(true);
                  setAutoplayAfterInteraction(event.target.checked);
                }}
              />
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              Autoplay after interaction
            </label>
          </div>

          {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}

          <ol className="mt-4 divide-y divide-[color-mix(in_srgb,var(--mp-primary,#FF7A18)_15%,transparent)] overflow-hidden rounded border border-[color-mix(in_srgb,var(--mp-primary,#FF7A18)_18%,transparent)] bg-white/55">
            {orderedTracks.map((track, index) => (
              <li key={track.id}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-white/80",
                    index === currentIndex && "bg-[color-mix(in_srgb,var(--mp-secondary,#7B61FF)_16%,white)]"
                  )}
                  onClick={() => chooseTrack(index, isPlaying)}
                  aria-current={index === currentIndex ? "true" : undefined}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-bold">{track.title}</span>
                    <span className="block truncate text-xs opacity-70">{track.artist}</span>
                  </span>
                  {track.is_featured ? (
                    <span className="rounded-full border border-current px-2 py-0.5 text-[10px] font-black uppercase opacity-70">
                      featured
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default ProfileMusicPlayer;
