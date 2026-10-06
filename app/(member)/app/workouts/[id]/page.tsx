"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MemberCard, MemberScreen } from "@/components/member/member-ui";
import { WORKOUTS } from "@/lib/workouts";

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const workout = useMemo(
    () => WORKOUTS.find((item) => item.id === params.id) ?? null,
    [params.id]
  );
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (!workout) return;
    const key = `pf_fav_${workout.id}`;
    setFavorite(localStorage.getItem(key) === "1");
  }, [workout]);

  if (!workout) {
    return (
      <MemberScreen title="Workout not found">
        <Button asChild variant="outline">
          <Link href="/app/workouts">Back to library</Link>
        </Button>
      </MemberScreen>
    );
  }

  const current = workout.steps[step];

  return (
    <MemberScreen
      eyebrow="Screens 41–48 · Detail"
      title={workout.title}
      subtitle={`${workout.level} · ${workout.minutes} min · ${workout.collection}`}
    >
      <MemberCard className="overflow-hidden p-0">
        <div className="aspect-video bg-black">
          <iframe
            title={workout.title}
            src={workout.videoUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </MemberCard>

      <div className="mt-3 flex gap-2">
        <Button
          type="button"
          variant={favorite ? "purple" : "outline"}
          className="flex-1"
          onClick={() => {
            const next = !favorite;
            setFavorite(next);
            localStorage.setItem(`pf_fav_${workout.id}`, next ? "1" : "0");
          }}
        >
          {favorite ? "Favorited" : "Favorite"}
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/app/workouts">Library</Link>
        </Button>
      </div>

      <MemberCard className="mt-3 space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-pf-purple">
          Guide step-through
        </p>
        {done ? (
          <div className="space-y-2">
            <p className="font-display text-2xl text-emerald-700">Workout complete</p>
            <p className="text-sm text-pf-ink/65">
              Nice work. Your session history is saved for this account.
            </p>
            <Button
              type="button"
              variant="purple"
              className="w-full"
              onClick={() => {
                const hist = JSON.parse(
                  localStorage.getItem("pf_workout_history") || "[]"
                ) as string[];
                hist.unshift(`${workout.title} · ${new Date().toLocaleString()}`);
                localStorage.setItem(
                  "pf_workout_history",
                  JSON.stringify(hist.slice(0, 20))
                );
                setDone(false);
                setStep(0);
              }}
            >
              Save & restart
            </Button>
          </div>
        ) : (
          <>
            <p className="font-semibold text-pf-ink">
              Step {step + 1}/{workout.steps.length}: {current.name}
            </p>
            <p className="text-sm text-pf-ink/65">{current.detail}</p>
            <p className="text-xs text-pf-ink/45">
              Form tip: keep reps controlled — this is your form tutorial beat.
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </Button>
              <Button
                type="button"
                variant="purple"
                className="flex-1"
                onClick={() => {
                  if (step >= workout.steps.length - 1) setDone(true);
                  else setStep((s) => s + 1);
                }}
              >
                {step >= workout.steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </>
        )}
      </MemberCard>
    </MemberScreen>
  );
}
