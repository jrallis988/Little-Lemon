import { useMemo, useState } from "react";
import {
  AppShell,
  PrimaryButton,
  SecondaryButton,
  SoftCard,
  StepDots,
  TextButton,
} from "./AppShell";
import { EmptyState, ErrorBanner } from "./PrototypePolish";
import { useToast } from "./useToast";

type Meal = {
  id: string;
  name: string;
  time: string;
  tags: string;
};

const basePlan: Record<string, Meal> = {
  mon: { id: "bowl", name: "Chicken burrito bowl", time: "25 min", tags: "Protein · Pathway fit" },
  tue: { id: "salmon", name: "20-minute salmon bowl", time: "20 min", tags: "Omega-3 · Fast" },
  wed: { id: "veg", name: "Vegetarian taco bowl", time: "22 min", tags: "Fiber · Budget" },
  thu: { id: "turkey", name: "Turkey rice bowl", time: "24 min", tags: "High protein" },
  fri: { id: "pasta", name: "Tomato spinach pasta", time: "18 min", tags: "Pantry-friendly" },
};

const swaps: Meal[] = [
  { id: "salmon", name: "20-minute salmon bowl", time: "20 min", tags: "Higher protein" },
  { id: "veg", name: "Vegetarian taco bowl", time: "22 min", tags: "Higher fiber" },
  { id: "turkey", name: "Turkey rice bowl", time: "24 min", tags: "Budget-friendly" },
];

const days = [
  ["mon", "Mon"],
  ["tue", "Tue"],
  ["wed", "Wed"],
  ["thu", "Thu"],
  ["fri", "Fri"],
] as const;

type Step = "home" | "planner" | "swap" | "grocery" | "cook";

type WwKitchenFlowProps = {
  initialStep?: Step;
  pathwayLabel?: string;
  onJourneyComplete?: () => void;
  completeLabel?: string;
};

export function WwKitchenFlow({
  initialStep = "home",
  pathwayLabel,
  onJourneyComplete,
  completeLabel = "Finish journey",
}: WwKitchenFlowProps = {}) {
  const [step, setStep] = useState<Step>(initialStep);
  const [plan, setPlan] = useState(basePlan);
  const [swapDay, setSwapDay] = useState<keyof typeof basePlan>("mon");
  const [checked, setChecked] = useState<string[]>(["Spinach", "Rice"]);
  const [ingredients, setIngredients] = useState("chicken, spinach, rice, tomatoes");
  const [cookError, setCookError] = useState<string | null>(null);
  const { showToast, toastNode } = useToast();

  const grocery = useMemo(
    () => [
      { aisle: "Produce", items: ["Spinach", "Tomatoes", "Lime", "Cilantro"] },
      { aisle: "Protein", items: ["Chicken thighs", "Salmon", "Turkey"] },
      { aisle: "Pantry", items: ["Rice", "Black beans", "Olive oil"] },
      { aisle: "Dairy", items: ["Greek yogurt", "Feta"] },
      { aisle: "Frozen", items: ["Corn", "Edamame"] },
    ],
    []
  );

  const allItems = useMemo(() => grocery.flatMap((group) => group.items), [grocery]);
  const remaining = allItems.filter((item) => !checked.includes(item));

  const cookIdeas = [
    {
      name: "Skillet chicken with spinach rice",
      time: "25 min",
      missing: "None",
      fit: pathwayLabel ?? "Build Strength",
    },
    {
      name: "Tomato-spinach chicken bowls",
      time: "20 min",
      missing: "Feta optional",
      fit: "Eat Better",
    },
    {
      name: "Simple chicken fried rice remix",
      time: "18 min",
      missing: "Egg optional",
      fit: "Healthy Living",
    },
  ];

  const toggleChecked = (item: string) => {
    setChecked((current) => {
      const next = current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item];
      if (next.length === allItems.length) {
        showToast("List complete — ready to cook");
      }
      return next;
    });
  };

  const stepIndex = ["home", "planner", "swap", "grocery", "cook"].indexOf(step);

  return (
    <AppShell
      title="WW Kitchen"
      activeNav="kitchen"
      overlay={toastNode}
      banner={
        pathwayLabel ? (
          <div className="border-b border-ink/5 bg-mist px-4 py-2">
            <p className="font-sans text-[0.65rem] font-semibold text-cobalt-700">
              Meals tuned to {pathwayLabel}
            </p>
          </div>
        ) : null
      }
      onNav={(id) => {
        if (id === "kitchen") setStep("home");
        if (id === "today") setStep("planner");
      }}
    >
      <StepDots step={Math.max(0, stepIndex)} total={5} />

      {step === "home" && (
        <div className="space-y-4 animate-rise">
          <SoftCard className="bg-ink text-white">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-tide">
              Kitchen Home
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold" style={{ fontWeight: 700 }}>
              What are we eating this week?
            </h3>
          </SoftCard>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Plan My Week", "planner"],
              ["Cook With What I Have", "cook"],
              ["Find a Recipe", "planner"],
              ["Build Grocery List", "grocery"],
            ].map(([label, next]) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(next as Step)}
                className="rounded-2xl border border-ink/10 bg-white px-3 py-4 text-left font-sans text-sm font-semibold text-ink transition hover:border-cobalt-300 hover:-translate-y-0.5"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "planner" && (
        <div className="space-y-3 animate-rise">
          <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
            Weekly Planner
          </h3>
          {days.map(([key, label]) => {
            const meal = plan[key];
            return (
              <SoftCard key={key} className="transition hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-sans text-[0.65rem] uppercase tracking-[0.14em] text-ink/40">
                      {label} · Dinner
                    </p>
                    <p className="mt-1 font-display text-base font-bold text-ink" style={{ fontWeight: 700 }}>
                      {meal.name}
                    </p>
                    <p className="mt-1 font-sans text-xs text-ink/55">
                      {meal.time} · {meal.tags}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSwapDay(key);
                      setStep("swap");
                    }}
                    className="rounded-full bg-mist px-3 py-1.5 font-sans text-[0.65rem] font-semibold text-cobalt-700 transition hover:bg-cobalt-100"
                  >
                    Swap
                  </button>
                </div>
              </SoftCard>
            );
          })}
          <PrimaryButton onClick={() => setStep("grocery")}>Build Grocery List</PrimaryButton>
          {onJourneyComplete ? (
            <SecondaryButton
              onClick={() => {
                showToast("Week plan locked in");
                onJourneyComplete();
              }}
            >
              {completeLabel}
            </SecondaryButton>
          ) : (
            <SecondaryButton onClick={() => setStep("home")}>Kitchen Home</SecondaryButton>
          )}
        </div>
      )}

      {step === "swap" && (
        <div className="space-y-4 animate-rise">
          <div>
            <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
              Smart Swap
            </h3>
            <p className="mt-1 font-sans text-sm text-ink/60">
              Replacing {plan[swapDay].name} based on pathway, time, and preferences.
            </p>
          </div>
          <div className="space-y-2">
            {swaps.map((meal) => (
              <button
                key={meal.id}
                type="button"
                onClick={() => {
                  setPlan((current) => ({ ...current, [swapDay]: meal }));
                  showToast(`Swapped in ${meal.name}`);
                  setStep("planner");
                }}
                className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-left transition hover:border-cobalt-300"
              >
                <span className="block font-display text-base font-bold text-ink" style={{ fontWeight: 700 }}>
                  {meal.name}
                </span>
                <span className="mt-1 block font-sans text-xs text-ink/55">
                  {meal.time} · {meal.tags}
                </span>
              </button>
            ))}
          </div>
          <SecondaryButton onClick={() => setStep("planner")}>Keep original</SecondaryButton>
        </div>
      )}

      {step === "grocery" && (
        <div className="space-y-4 animate-rise">
          <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
            Grocery List
          </h3>
          {remaining.length === 0 ? (
            <EmptyState
              title="Everything’s checked off"
              copy="Your cart is clear. Cook with what you have, or uncheck items you still need."
              action={<TextButton onClick={() => setStep("cook")}>Cook now</TextButton>}
            />
          ) : null}
          {grocery.map((group) => (
            <div key={group.aisle}>
              <p className="mb-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cobalt-600">
                {group.aisle}
              </p>
              <div className="space-y-2">
                {group.items.map((item) => {
                  const on = checked.includes(item);
                  return (
                    <label
                      key={item}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
                        on ? "border-tide/40 bg-tide/10" : "border-ink/8 bg-white"
                      }`}
                    >
                      <span className={`font-sans text-sm ${on ? "text-ink/45 line-through" : "text-ink"}`}>
                        {item}
                      </span>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggleChecked(item)}
                        className="accent-cobalt-600"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
          <p className="font-sans text-xs text-ink/50">
            Already have this: mark items to reduce duplicate shopping.
          </p>
          <PrimaryButton onClick={() => setStep("cook")}>Cook With What I Have</PrimaryButton>
          <SecondaryButton onClick={() => setStep("planner")}>Back to Planner</SecondaryButton>
        </div>
      )}

      {step === "cook" && (
        <div className="space-y-4 animate-rise">
          <div>
            <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
              Cook with what you have
            </h3>
            <label
              htmlFor="have"
              className="mt-3 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/45"
            >
              Ingredients
            </label>
            <input
              id="have"
              value={ingredients}
              onChange={(event) => {
                setIngredients(event.target.value);
                setCookError(null);
              }}
              className="mt-2 h-11 w-full rounded-2xl border border-ink/10 px-4 font-sans text-sm outline-none ring-cobalt-600 focus:ring-2"
            />
          </div>
          {cookError ? <ErrorBanner message={cookError} /> : null}
          <p className="font-sans text-sm font-semibold text-ink">3 meals you can make tonight</p>
          <div className="space-y-2">
            {cookIdeas.map((idea) => (
              <SoftCard key={idea.name} className="transition hover:-translate-y-0.5">
                <p className="font-display text-base font-bold text-ink" style={{ fontWeight: 700 }}>
                  {idea.name}
                </p>
                <p className="mt-1 font-sans text-xs text-ink/55">
                  {idea.time} · Missing: {idea.missing} · Pathway fit: {idea.fit}
                </p>
              </SoftCard>
            ))}
          </div>
          <PrimaryButton
            onClick={() => {
              if (!ingredients.trim()) {
                setCookError("Add a few ingredients so we can suggest a meal.");
                return;
              }
              showToast("Cooking mode started");
              if (onJourneyComplete) {
                onJourneyComplete();
                return;
              }
              setStep("home");
            }}
          >
            {onJourneyComplete ? completeLabel : "Start Cooking"}
          </PrimaryButton>
          <TextButton onClick={() => setStep("grocery")}>Update grocery list</TextButton>
        </div>
      )}
    </AppShell>
  );
}
