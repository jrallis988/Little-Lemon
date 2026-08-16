"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import type { PostKind } from "@/lib/types";
import { cn } from "@/lib/utils";

const kinds: Array<{ id: PostKind; label: string }> = [
  { id: "bit", label: "Bit" },
  { id: "workshop", label: "Workshop" },
  { id: "setlist", label: "Setlist" },
  { id: "show", label: "Show" },
  { id: "clip", label: "Clip" },
];

export default function NewPostPage() {
  const router = useRouter();
  const [kind, setKind] = useState<PostKind>("bit");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saved, setSaved] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => router.push("/lineup"), 700);
  }

  return (
    <RequireAuth>
      <AppShell title="Drop a bit">
        <p className="mb-4 text-sm text-smoke">
          Share a premise, setlist, or show call. Workshop posts invite notes.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {kinds.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setKind(k.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.14em]",
                  kind === k.id
                    ? "bg-spotlight text-stage"
                    : "bg-foam/5 text-smoke",
                )}
              >
                {k.label}
              </button>
            ))}
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-smoke">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Moving home at 32"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-smoke">
              Setup · punch · tags
            </label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write the bit like you’d pitch it to a friend after the show…"
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={saved}>
            {saved ? "Posted to the lineup" : "Post to lineup"}
          </Button>
        </form>
      </AppShell>
    </RequireAuth>
  );
}
