import { useMemo, useState } from "react";
import {
  AppShell,
  PrimaryButton,
  SecondaryButton,
  SoftCard,
  StepDots,
  TextButton,
} from "./AppShell";

const focusOptions = [
  "Lose weight",
  "Maintain weight",
  "Build strength",
  "Eat better",
  "Improve energy",
  "Build healthier habits",
  "GLP-1 support",
  "General wellness",
];

const trackOptions = [
  { id: "nutrition", label: "Nutrition" },
  { id: "movement", label: "Movement" },
  { id: "strength", label: "Strength" },
  { id: "sleep", label: "Sleep" },
  { id: "water", label: "Water" },
  { id: "weight", label: "Weight" },
  { id: "energy", label: "Mood / Energy" },
  { id: "habits", label: "Habits" },
  { id: "med", label: "Medication support" },
];

const feelingOptions = ["Great", "Good", "Okay", "Low energy", "Need support"];
const winOptions = [
  "I cooked at home",
  "I got outside",
  "I drank more water",
  "I hit my protein goal",
  "I made time for myself",
];

type Step = 0 | 1 | 2 | 3 | 4 | 5;

export function WwLifeFlow() {
  const [step, setStep] = useState<Step>(0);
  const [focus, setFocus] = useState<string[]>(["Build strength", "Eat better"]);
  const [tracks, setTracks] = useState<string[]>(["nutrition", "movement", "strength", "sleep"]);
  const [feeling, setFeeling] = useState("Good");
  const [wins, setWins] = useState<string[]>(["I cooked at home", "I hit my protein goal"]);

  const toggleFocus = (item: string) => {
    setFocus((current) => {
      if (current.includes(item)) return current.filter((value) => value !== item);
      if (current.length >= 3) return current;
      return [...current, item];
    });
  };

  const toggleTrack = (id: string) => {
    setTracks((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    );
  };

  const toggleWin = (item: string) => {
    setWins((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item]
    );
  };

  const todayCards = useMemo(() => {
    const cards = [
      tracks.includes("nutrition") && {
        label: "Nutrition",
        value: "Protein 82 / 100g",
        note: "On track for dinner",
      },
      tracks.includes("movement") && {
        label: "Movement",
        value: "6,240 steps",
        note: "Evening walk still open",
      },
      tracks.includes("strength") && {
        label: "Strength",
        value: "1 of 3 sessions",
        note: "Tuesday session logged",
      },
      tracks.includes("sleep") && {
        label: "Sleep",
        value: "7h 18m",
        note: "Slightly better than last week",
      },
      {
        label: "Momentum",
        value: "Steady this week",
        note: "Habits stayed consistent",
      },
      {
        label: "My WW Team",
        value: "Coach message waiting",
        note: "Alex checked in yesterday",
      },
    ].filter(Boolean) as { label: string; value: string; note: string }[];
    return cards.slice(0, 5);
  }, [tracks]);

  return (
    <AppShell
      title="WW Life"
      activeNav={step >= 3 ? "today" : "profile"}
      onNav={(id) => {
        if (id === "today") setStep(3);
        if (id === "progress") setStep(5);
      }}
    >
      <StepDots step={step} total={6} />

      {step === 0 && (
        <div className="space-y-4">
          <SoftCard className="bg-ink text-white">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-tide">
              Welcome
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold" style={{ fontWeight: 700 }}>
              Your health is bigger than a number.
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-white/75">
              WW Life helps you focus on the areas that matter most right now—then adapt as life
              changes.
            </p>
          </SoftCard>
          <PrimaryButton onClick={() => setStep(1)}>Build My WW Life</PrimaryButton>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
              Choose your focus
            </h3>
            <p className="mt-1 font-sans text-sm text-ink/60">Pick up to 3. You can change anytime.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {focusOptions.map((item) => {
              const on = focus.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleFocus(item)}
                  className={`rounded-2xl border px-3 py-3 text-left font-sans text-xs font-semibold transition ${
                    on
                      ? "border-cobalt-500 bg-cobalt-600 text-white"
                      : "border-ink/10 bg-white text-ink/75"
                  }`}
                  aria-pressed={on}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <PrimaryButton disabled={focus.length === 0} onClick={() => setStep(2)}>
            Continue
          </PrimaryButton>
          <SecondaryButton onClick={() => setStep(0)}>Back</SecondaryButton>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
              Choose what you want to track
            </h3>
            <p className="mt-1 font-sans text-sm text-ink/60">You can change this anytime.</p>
          </div>
          <div className="space-y-2">
            {trackOptions.map((item) => {
              const on = tracks.includes(item.id);
              return (
                <label
                  key={item.id}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 ${
                    on ? "border-cobalt-300 bg-mist/80" : "border-ink/8 bg-white"
                  }`}
                >
                  <span className="font-sans text-sm font-semibold text-ink">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggleTrack(item.id)}
                    className="h-4 w-4 accent-cobalt-600"
                  />
                </label>
              );
            })}
          </div>
          <PrimaryButton disabled={tracks.length === 0} onClick={() => setStep(3)}>
            See My Today Screen
          </PrimaryButton>
          <SecondaryButton onClick={() => setStep(1)}>Back</SecondaryButton>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <p className="font-sans text-xs text-ink/45">Good morning, Jamie</p>
            <h3 className="mt-1 font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
              Today’s focus
            </h3>
            <p className="mt-1 font-sans text-sm text-ink/60">{focus.slice(0, 3).join(" · ")}</p>
          </div>
          <div className="space-y-2">
            {todayCards.map((card) => (
              <SoftCard key={card.label}>
                <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
                  {card.label}
                </p>
                <p className="mt-1 font-display text-lg font-bold text-ink" style={{ fontWeight: 700 }}>
                  {card.value}
                </p>
                <p className="mt-1 font-sans text-xs text-ink/55">{card.note}</p>
              </SoftCard>
            ))}
          </div>
          <PrimaryButton onClick={() => setStep(4)}>Daily Check-In</PrimaryButton>
          <TextButton onClick={() => setStep(5)}>Jump to weekly reflection</TextButton>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
              How are you feeling today?
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {feelingOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFeeling(option)}
                className={`rounded-full px-3 py-2 font-sans text-xs font-semibold ${
                  feeling === option ? "bg-cobalt-600 text-white" : "bg-white text-ink/70 border border-ink/10"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div>
            <p className="font-sans text-sm font-semibold text-ink">What went well today?</p>
            <div className="mt-2 space-y-2">
              {winOptions.map((option) => {
                const on = wins.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleWin(option)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left font-sans text-sm ${
                      on ? "border-tide bg-tide/10 text-ink" : "border-ink/8 bg-white text-ink/70"
                    }`}
                    aria-pressed={on}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
          <PrimaryButton onClick={() => setStep(5)}>See My Week</PrimaryButton>
          <SecondaryButton onClick={() => setStep(3)}>Back to Today</SecondaryButton>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4">
          <SoftCard className="bg-ink text-white">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-tide">
              Your Week in WW Life
            </p>
            <p className="mt-3 font-serif text-lg leading-snug text-white/90">
              Your weight changed slightly this week, but your habits stayed consistent.
            </p>
          </SoftCard>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Nutrition", "4/5 days"],
              ["Movement", "↑"],
              ["Strength", "3/3"],
              ["Sleep", "improving"],
              ["Weight trend", "−0.4"],
              ["Personal wins", String(wins.length || 2)],
            ].map(([label, value]) => (
              <SoftCard key={label}>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.12em] text-ink/40">{label}</p>
                <p className="mt-1 font-display text-lg font-bold text-ink" style={{ fontWeight: 700 }}>
                  {value}
                </p>
              </SoftCard>
            ))}
          </div>
          <p className="font-sans text-xs text-ink/55">Feeling today: {feeling}</p>
          <PrimaryButton onClick={() => setStep(3)}>Plan Next Week</PrimaryButton>
          <SecondaryButton onClick={() => setStep(0)}>Restart demo</SecondaryButton>
        </div>
      )}
    </AppShell>
  );
}
