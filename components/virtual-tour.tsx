"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/** Official Planet Fitness virtual club tour with Teddy (YouTube). */
const TOUR_VIDEO_ID = "gDWxswQ-h_o";
const TOUR_EMBED = `https://www.youtube-nocookie.com/embed/${TOUR_VIDEO_ID}?autoplay=1&rel=0`;
const TOUR_POSTER = `https://i.ytimg.com/vi/${TOUR_VIDEO_ID}/hqdefault.jpg`;
const TOUR_WATCH = `https://www.youtube.com/watch?v=${TOUR_VIDEO_ID}`;

export function VirtualTour() {
  const [playing, setPlaying] = useState(false);

  const startTour = (source: string) => {
    setPlaying(true);
    track("virtual_tour_play", { source });
  };

  return (
    <section
      id="tour"
      aria-labelledby="tour-heading"
      className="scroll-mt-14 bg-pf-mist"
    >
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 md:grid-cols-2 md:items-center md:px-6 md:py-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
            Inside the club
          </p>
          <h2
            id="tour-heading"
            className="mt-2 font-display text-3xl tracking-tight text-pf-ink md:text-4xl"
          >
            Take a virtual club tour
          </h2>
          <p className="mt-2 text-sm text-pf-ink/65 md:text-base">
            Join Teddy for a walk through check-in, cardio, strength, the
            30-minute circuit, and Black Card Spa areas—so you know the floor
            before you pick a club.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="purple"
              onClick={() => startTour("cta")}
            >
              Watch the Club Tour
            </Button>
            <Button asChild variant="outline">
              <a href="#clubs">Find a Club Near You</a>
            </Button>
          </div>
        </div>

        <div
          id="tour-player"
          className="relative aspect-video overflow-hidden rounded-3xl bg-pf-purple-ink shadow-[0_12px_32px_-16px_rgba(61,9,88,0.45)]"
        >
          {playing ? (
            <iframe
              title="Take a Virtual Tour of Planet Fitness with Teddy"
              src={TOUR_EMBED}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => startTour("poster")}
              className="group absolute inset-0 text-left"
              aria-label="Play virtual club tour video"
            >
              <Image
                src={TOUR_POSTER}
                alt="Preview of the Planet Fitness virtual club tour with Teddy"
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pf-purple-ink/80 via-pf-purple/35 to-transparent" />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-pf-purple shadow-lg transition group-hover:scale-105">
                  <Play className="h-7 w-7 fill-current" aria-hidden />
                </span>
                <span className="text-sm font-semibold">
                  Watch the Club Tour
                </span>
              </span>
            </button>
          )}
        </div>

        <p className="text-xs text-pf-ink/50 md:col-span-2">
          Official tour video from Planet Fitness.{" "}
          <a
            href={TOUR_WATCH}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-pf-purple underline-offset-2 hover:underline"
          >
            Open on YouTube
          </a>
          .
        </p>
      </div>
    </section>
  );
}
