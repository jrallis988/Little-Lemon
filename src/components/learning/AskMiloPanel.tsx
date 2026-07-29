import { FormEvent, useMemo, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MILO_NAME,
  MILO_SHORT_NAME,
  MILO_TAGLINE,
} from "@/brand/identity";
import { useNavigationStore } from "@/stores/navigationStore";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  className?: string;
};

/**
 * Ask Milo — Surf’s AI learning aide (formerly “AI Tutor”).
 * Helps students understand topics; never presented as a homework machine.
 */
export function AskMiloPanel({ open, onClose, className }: Props) {
  const query = useNavigationStore((s) => s.query);
  const academic = useNavigationStore((s) => s.academicResponse);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState<string | null>(null);

  const starter = useMemo(() => {
    if (academic?.keyVocabulary?.length) {
      return `Explain “${academic.keyVocabulary[0]}” in simpler words`;
    }
    if (query) return `Help me understand ${query}`;
    return "";
  }, [academic, query]);

  if (!open) return null;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const question = (prompt.trim() || starter).trim();
    if (!question) return;

    const vocab = academic?.keyVocabulary?.slice(0, 5) ?? [];
    const grades = academic?.recommendedGradeLevels?.join(", ") || "your grade band";
    const top = academic?.results?.[0];

    const explanation = [
      `${MILO_SHORT_NAME} here — I’ll help you learn, not just finish the work.`,
      "",
      academic?.abstractSummary
        ? `Here’s the research idea in plain language: ${academic.abstractSummary}`
        : `You’re asking about “${question}”. Start with one clear question, then check a trusted source.`,
      vocab.length
        ? `Key vocabulary to notice: ${vocab.join(", ")}.`
        : null,
      top
        ? `A strong next read is “${top.title}” (${top.recommendedGrades}). Citation: ${top.citation}`
        : `Recommended level for this topic set: ${grades}.`,
      "",
      "Try this: write one sentence in your own words, then list two facts you can cite.",
    ]
      .filter(Boolean)
      .join("\n");

    setReply(explanation);
    setPrompt("");
  };

  return (
    <aside
      className={cn(
        "fixed bottom-20 right-4 z-40 flex w-[22rem] max-w-[calc(100vw-2rem)] flex-col rounded-3xl border border-white/70 bg-white/95 p-4 shadow-glass md:bottom-6 md:top-28",
        className,
      )}
      aria-label={MILO_NAME}
    >
      <header className="flex items-start justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-navy text-foam">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-navy">
              {MILO_NAME}
            </h2>
            <p className="text-xs text-slate">{MILO_TAGLINE}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Close ${MILO_NAME}`}
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </header>

      <form className="mt-4 space-y-2" onSubmit={onSubmit}>
        <Input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={starter || "Ask Milo about this topic…"}
          aria-label={`${MILO_NAME} prompt`}
        />
        <Button type="submit" className="w-full">
          {MILO_NAME}
        </Button>
      </form>

      <div className="mt-4 flex-1 overflow-auto rounded-2xl bg-cream/70 p-3 text-sm leading-relaxed text-slate whitespace-pre-wrap">
        {reply ??
          (academic
            ? `I can explain “${academic.query}”, unpack vocabulary, or help you compare the sources on this page.`
            : "Search a topic first, then ask me to explain it, define a word, or point you to the best citation.")}
      </div>
    </aside>
  );
}
