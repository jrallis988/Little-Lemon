import { useState } from "react";
import { pathwayOptions } from "../../data/futureProducts";

const lifeModules = [
  { id: "nutrition", label: "Nutrition", detail: "Protein ✓ · Fiber ↑ · Water 6/8" },
  { id: "movement", label: "Movement", detail: "7,842 steps · Strength 2/3" },
  { id: "recovery", label: "Recovery", detail: "Sleep 7h 12m · Energy steady" },
  { id: "habits", label: "Habits", detail: "3 of 4 weekly routines" },
  { id: "progress", label: "Progress", detail: "NSVs · Strength PR · Consistency" },
  { id: "support", label: "Support", detail: "Coach check-in Thursday" },
] as const;

export function WwLifeMock() {
  const [active, setActive] = useState<string[]>(["nutrition", "movement", "recovery", "habits"]);

  const toggle = (id: string) => {
    setActive((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-ink/10 bg-white p-4 shadow-glow">
      <div className="rounded-[1.5rem] bg-ink px-4 py-5 text-white">
        <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-tide">
          WW Life
        </p>
        <p className="mt-2 font-display text-2xl font-bold" style={{ fontWeight: 700 }}>
          Your week, your priorities
        </p>
        <p className="mt-2 font-sans text-sm text-white/70">Customize what shows up first.</p>
      </div>
      <div className="mt-4 space-y-2">
        {lifeModules.map((module) => {
          const on = active.includes(module.id);
          return (
            <button
              key={module.id}
              type="button"
              onClick={() => toggle(module.id)}
              className={`flex w-full items-start justify-between rounded-2xl border px-4 py-3 text-left transition ${
                on ? "border-cobalt-300 bg-mist/80" : "border-ink/8 bg-paper opacity-55"
              }`}
              aria-pressed={on}
            >
              <span>
                <span className="block font-display text-base font-bold text-ink" style={{ fontWeight: 700 }}>
                  {module.label}
                </span>
                <span className="mt-1 block font-sans text-xs text-ink/60">{module.detail}</span>
              </span>
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cobalt-700">
                {on ? "Pinned" : "Add"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function WwPathwaysMock() {
  const [selected, setSelected] = useState<(typeof pathwayOptions)[number]["id"]>("strength");

  return (
    <div className="rounded-[1.75rem] border border-ink/10 bg-white p-5 sm:p-6">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
        Choose your Pathway
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {pathwayOptions.map((path) => (
          <button
            key={path.id}
            type="button"
            onClick={() => setSelected(path.id)}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              selected === path.id
                ? "border-cobalt-500 bg-cobalt-600 text-white"
                : "border-ink/10 bg-paper hover:border-cobalt-300"
            }`}
            aria-pressed={selected === path.id}
          >
            <span className="block font-display text-lg font-bold" style={{ fontWeight: 700 }}>
              {path.name}
            </span>
            <span
              className={`mt-2 block font-sans text-sm leading-relaxed ${
                selected === path.id ? "text-white/80" : "text-ink/60"
              }`}
            >
              {path.copy}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-4 font-serif text-base text-ink/70">
        Selected:{" "}
        <span className="font-semibold text-ink">
          {pathwayOptions.find((item) => item.id === selected)?.name}
        </span>
        . Change anytime as your life changes.
      </p>
    </div>
  );
}

const team = [
  { role: "Your Coach", name: "Jordan", note: "Accountability · habits" },
  { role: "Your Dietitian", name: "Priya", note: "Nutrition guidance" },
  { role: "Your Care Team", name: "Clinical", note: "When eligible" },
  { role: "Your Community", name: "Workshop", note: "Thu 7 PM" },
  { role: "Your Circle", name: "Opt-in", note: "You control sharing" },
];

export function MyWwTeamMock() {
  return (
    <div className="rounded-[1.75rem] border border-ink/10 bg-white p-5 sm:p-6">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
        Your Team
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {team.map((member) => (
          <div key={member.role} className="rounded-2xl bg-mist/70 px-4 py-4">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/45">
              {member.role}
            </p>
            <p className="mt-1 font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
              {member.name}
            </p>
            <p className="mt-1 font-sans text-sm text-ink/60">{member.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 font-sans text-xs leading-relaxed text-ink/50">
        Private health details stay private. Circle sharing is always explicit and optional.
      </p>
    </div>
  );
}

export function WwKitchenMock() {
  const [ingredients, setIngredients] = useState("chicken, spinach, rice, tomatoes");
  const ideas = [
    "Skillet chicken with spinach rice",
    "Tomato-spinach chicken bowls",
    "Simple chicken fried rice remix",
  ];

  return (
    <div className="rounded-[1.75rem] border border-ink/10 bg-white p-5 sm:p-6">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
        Cook with what you have
      </p>
      <label htmlFor="ingredients" className="mt-4 block font-sans text-sm font-semibold text-ink">
        Ingredients on hand
      </label>
      <input
        id="ingredients"
        value={ingredients}
        onChange={(event) => setIngredients(event.target.value)}
        className="mt-2 h-11 w-full rounded-2xl border border-ink/10 px-4 font-sans text-sm outline-none ring-cobalt-600 focus:ring-2"
      />
      <ul className="mt-4 space-y-2">
        {ideas.map((idea) => (
          <li key={idea} className="rounded-2xl bg-mist/70 px-4 py-3 font-sans text-sm text-ink/75">
            {idea}
          </li>
        ))}
      </ul>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {["Produce", "Protein", "Pantry"].map((aisle) => (
          <div key={aisle} className="rounded-xl border border-ink/8 px-2 py-3">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink/45">
              Grocery
            </p>
            <p className="mt-1 font-display text-sm font-bold text-ink" style={{ fontWeight: 700 }}>
              {aisle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LifeAfterGlp1Mock() {
  const chapters = [
    { title: "Using medication", copy: "Nutrition + protein + strength beside clinical care." },
    { title: "Transitioning", copy: "Habits and coaching while goals adjust." },
    { title: "Maintenance", copy: "Long-term routines for the life after this chapter." },
  ];

  return (
    <div className="rounded-[1.75rem] border border-ink/10 bg-white p-5 sm:p-6">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
        Life After GLP-1
      </p>
      <p className="mt-3 font-serif text-lg text-ink/75">
        Medication can be one chapter—not your entire identity.
      </p>
      <div className="mt-5 space-y-3">
        {chapters.map((chapter, index) => (
          <div key={chapter.title} className="flex gap-4 rounded-2xl bg-mist/70 px-4 py-4">
            <span className="font-display text-xl font-bold text-tide" style={{ fontWeight: 700 }}>
              0{index + 1}
            </span>
            <div>
              <p className="font-display text-lg font-bold text-ink" style={{ fontWeight: 700 }}>
                {chapter.title}
              </p>
              <p className="mt-1 font-sans text-sm text-ink/65">{chapter.copy}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 font-sans text-xs leading-relaxed text-ink/50">
        Educational concept only. Never change medication without your healthcare professional.
      </p>
    </div>
  );
}

export function WwMomentumMock() {
  const signals = [
    { label: "Movement", value: "↑" },
    { label: "Protein goal", value: "✓" },
    { label: "Sleep", value: "improving ↑" },
    { label: "Strength", value: "3/3 ✓" },
  ];

  return (
    <div className="rounded-[1.75rem] border border-ink/10 bg-ink p-5 text-white sm:p-6">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-tide">
        WW Momentum
      </p>
      <p className="mt-3 font-display text-2xl font-bold" style={{ fontWeight: 700 }}>
        Weight changed this week—your routine stayed consistent.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {signals.map((signal) => (
          <div key={signal.label} className="rounded-2xl bg-white/5 px-4 py-3">
            <p className="font-sans text-xs text-white/55">{signal.label}</p>
            <p className="mt-1 font-display text-lg font-bold text-tide" style={{ fontWeight: 700 }}>
              {signal.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
