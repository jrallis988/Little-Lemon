import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CAMPAIGN_PRESENT_YEAR,
  eraForYear,
  snapshotForYear,
  yearsAlongside,
} from "../data/campaign";
import { campaignHash } from "../lib/routing";
import { AnniversaryBadge } from "./Logo";

type Mode = "birth" | "journey";

function clampYear(value: number) {
  return Math.min(CAMPAIGN_PRESENT_YEAR, Math.max(1961, value));
}

export function FindYourYear() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "birth" ? "birth" : "journey";
  const initialYear = searchParams.get("year");
  const [mode, setMode] = useState<Mode>(initialMode);
  const [year, setYear] = useState(initialYear ?? "1998");
  const [submitted, setSubmitted] = useState<number | null>(
    initialYear && !Number.isNaN(Number(initialYear)) ? clampYear(Number(initialYear)) : null
  );
  const [error, setError] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const paramYear = searchParams.get("year");
    const paramMode = searchParams.get("mode");
    if (paramMode === "birth" || paramMode === "journey") setMode(paramMode);
    if (paramYear && !Number.isNaN(Number(paramYear))) {
      const next = clampYear(Number(paramYear));
      setYear(String(next));
      setSubmitted(next);
    }
  }, [searchParams]);

  const snapshot = useMemo(
    () => (submitted ? snapshotForYear(submitted) : null),
    [submitted]
  );
  const era = useMemo(
    () => (submitted ? eraForYear(submitted) : null),
    [submitted]
  );
  const alongside = submitted ? yearsAlongside(submitted) : 0;

  const shareText = useMemo(() => {
    if (!submitted || !era) {
      return "63 years of people, progress and change. Explore Weight Watchers 63.";
    }
    if (mode === "birth") {
      return `My year is ${submitted}. Weight Watchers has been evolving alongside my generation for ${alongside} years. Find yours in Weight Watchers 63 — 63 Years of You.`;
    }
    return `My Weight Watchers journey began in ${submitted}. Your journey changed. So did we. Explore Weight Watchers 63 — 63 Years of You.`;
  }, [alongside, era, mode, submitted]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "https://www.weightwatchers.com/find-your-year";
    const url = new URL(window.location.href);
    if (submitted) {
      url.searchParams.set("year", String(submitted));
      url.searchParams.set("mode", mode);
    }
    return url.toString();
  }, [mode, submitted]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = Number(year);
    if (Number.isNaN(value) || value < 1961 || value > CAMPAIGN_PRESENT_YEAR) {
      setError(`Enter a year between 1961 and ${CAMPAIGN_PRESENT_YEAR}.`);
      setSubmitted(null);
      return;
    }
    setError(null);
    const next = clampYear(value);
    setSubmitted(next);
    setSearchParams({ year: String(next), mode });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("failed");
    }
  };

  const nativeShare = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }
    try {
      await navigator.share({ title: "My Weight Watchers Year", text: shareText, url: shareUrl });
    } catch {
      /* user cancelled */
    }
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx || !submitted || !era) return;
    ctx.fillStyle = "#0b1220";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1bb8a8";
    ctx.fillRect(0, 0, 18, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 28px Figtree, sans-serif";
    ctx.fillText("My Weight Watchers Year", 64, 120);
    ctx.font = "800 140px Syne, sans-serif";
    ctx.fillText(String(submitted), 64, 280);
    ctx.fillStyle = "#1bb8a8";
    ctx.font = "500 36px Newsreader, serif";
    ctx.fillText("Weight Watchers 63 · 63 Years of You", 64, 360);
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    ctx.font = "400 30px Figtree, sans-serif";
    const line =
      mode === "birth"
        ? `Weight Watchers has been evolving alongside my generation for ${alongside} years.`
        : "Your journey changed. So did we.";
    wrapText(ctx, line, 64, 430, 1040, 40);
    const anchor = document.createElement("a");
    anchor.download = `weight-watchers-63-year-${submitted}.png`;
    anchor.href = canvas.toDataURL("image/png");
    anchor.click();
  };

  return (
    <section className="pb-20 pt-28 sm:pb-28 sm:pt-32" aria-labelledby="fyy-heading">
      <div className="section-shell">
        <AnniversaryBadge />
        <h1
          id="fyy-heading"
          className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl"
          style={{ fontWeight: 700 }}
        >
          Find Your Year
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
          Birth year and journey year tell different stories inside Weight Watchers 63. Choose one,
          then step into the timeline that matches your chapter.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-10 max-w-xl rounded-[1.75rem] border border-ink/8 bg-white p-6 sm:p-8"
          noValidate
        >
          <div className="flex gap-2" role="group" aria-label="Year type">
            {(
              [
                { id: "birth", label: "Birth year" },
                { id: "journey", label: "Journey year" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setMode(option.id);
                  setSubmitted(null);
                  setError(null);
                }}
                className={`rounded-2xl px-4 py-2.5 font-sans text-sm font-semibold transition ${
                  mode === option.id
                    ? "bg-cobalt-600 text-white"
                    : "bg-mist text-ink/70 hover:bg-cobalt-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <label
            className="mt-6 block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink/45"
            htmlFor="year"
          >
            {mode === "birth" ? "What year were you born?" : "When did your wellness journey begin?"}
          </label>
          <input
            id="year"
            type="number"
            min={1961}
            max={CAMPAIGN_PRESENT_YEAR}
            value={year}
            onChange={(event) => setYear(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "year-error" : undefined}
            className="mt-2 h-12 w-full rounded-2xl border border-ink/10 px-4 font-sans text-base outline-none ring-cobalt-600 focus:ring-2"
            required
          />
          {error && (
            <p id="year-error" className="mt-2 font-sans text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-5 h-12 w-full rounded-2xl bg-cobalt-600 font-sans text-sm font-semibold text-white transition hover:bg-cobalt-700 sm:w-auto sm:px-8"
          >
            Reveal my chapter
          </button>
        </form>

        {snapshot && era && submitted !== null && (
          <div className="mt-10 space-y-8">
            <div className="overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white">
              <div className="grid lg:grid-cols-2">
                <img
                  src={era.image}
                  alt={era.imageAlt}
                  className={`h-64 w-full object-cover lg:h-full ${submitted < 2000 ? "grayscale" : ""}`}
                />
                <div className="p-6 sm:p-8">
                  {mode === "birth" ? (
                    <>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
                        Birth year experience
                      </p>
                      <h2
                        className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl"
                        style={{ fontWeight: 700 }}
                      >
                        Your story began in {submitted}.
                      </h2>
                      <p className="mt-3 font-serif text-lg text-ink/70">
                        Decade identity: {era.decade}. {era.visualTone}.
                      </p>
                      <p className="mt-4 font-sans text-sm leading-relaxed text-ink/65">
                        Near that period, Weight Watchers looked like this: {era.milestone}
                      </p>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-ink/65">
                        Wellness culture then: {era.culture}
                      </p>
                      <p className="mt-6 rounded-2xl bg-mist/80 p-4 font-serif text-base text-ink/80">
                        Weight Watchers has been evolving alongside you for {alongside} years.
                      </p>
                      <Link
                        to={campaignHash("evolution")}
                        className="mt-6 inline-flex rounded-2xl bg-cobalt-600 px-5 py-3 font-sans text-sm font-semibold text-white"
                      >
                        Explore your era
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
                        Journey year experience
                      </p>
                      <h2
                        className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl"
                        style={{ fontWeight: 700 }}
                      >
                        Your journey began in {submitted}.
                      </h2>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl bg-mist/80 p-4">
                          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/45">
                            Then · {submitted}
                          </p>
                          <p className="mt-2 font-serif text-base text-ink/80">{era.thenTools}</p>
                          <p className="mt-2 font-sans text-sm text-ink/60">{snapshot.look}</p>
                        </div>
                        <div className="rounded-2xl bg-cobalt-600 p-4 text-white">
                          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                            Now · {CAMPAIGN_PRESENT_YEAR}
                          </p>
                          <p className="mt-2 font-serif text-base">{era.nowTools}</p>
                          <p className="mt-2 font-sans text-sm text-white/75">{snapshot.evolved}</p>
                        </div>
                      </div>
                      <p className="mt-6 font-serif text-xl text-ink/80">Your journey changed. So did we.</p>
                      <Link
                        to={campaignHash("innovation")}
                        className="mt-6 inline-flex rounded-2xl bg-cobalt-600 px-5 py-3 font-sans text-sm font-semibold text-white"
                      >
                        See what’s changed
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div
              ref={cardRef}
              className="overflow-hidden rounded-[1.75rem] border border-ink/8 bg-ink p-6 text-white sm:p-8"
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-tide">
                My Weight Watchers Year
              </p>
              <p className="mt-3 font-display text-6xl font-extrabold tracking-tight" style={{ fontWeight: 800 }}>
                {submitted}
              </p>
              <p className="mt-4 max-w-2xl font-serif text-lg text-white/80">{shareText}</p>
              <p className="mt-6 font-display text-xl font-bold text-tide" style={{ fontWeight: 700 }}>
                Weight Watchers 63 · 63 Years of You
              </p>
                <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyLink}
                  className="rounded-2xl bg-white px-5 py-3 font-sans text-sm font-semibold text-ink"
                >
                  {copyState === "copied" ? "Link copied" : copyState === "failed" ? "Copy failed" : "Copy link"}
                </button>
                <button
                  type="button"
                  onClick={nativeShare}
                  className="rounded-2xl border border-white/30 px-5 py-3 font-sans text-sm font-semibold text-white"
                >
                  Share
                </button>
                <button
                  type="button"
                  onClick={downloadCard}
                  className="rounded-2xl border border-white/30 px-5 py-3 font-sans text-sm font-semibold text-white"
                >
                  Download visual
                </button>
                <Link
                  to={`/?era=${era.id}#evolution`}
                  className="rounded-2xl border border-white/30 px-5 py-3 font-sans text-sm font-semibold text-white"
                >
                  Explore {submitted}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let cursorY = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cursorY);
}
