import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { STAGE_COPY } from "@/lib/stageCopy";
import { cn } from "@/lib/utils";
import { useMailStore } from "@/store/mailStore";
import { Bold, Italic, Paperclip, Send, Underline, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export function ComposeScreen() {
  const navigate = useNavigate();
  const saveDraft = useMailStore((s) => s.saveDraft);
  const sendDraft = useMailStore((s) => s.sendDraft);
  const learningStage = useMailStore((s) => s.learningStage);
  const copy = STAGE_COPY[learningStage];

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function handleSave() {
    await saveDraft({ to, subject, body });
    setStatus("Draft saved on this device.");
  }

  async function handleSend(event: FormEvent) {
    event.preventDefault();
    await sendDraft({ to, subject, body });
    navigate("/");
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col",
        learningStage === "high"
          ? "bg-background"
          : "bg-gradient-to-br from-white/70 via-nest-mist/50 to-nest-sky",
      )}
    >
      <header className="flex items-center justify-between gap-4 border-b border-border/70 px-6 py-4">
        <div>
          <p className="font-display text-2xl font-extrabold tracking-tight text-primary">
            Mailbox
          </p>
          <h1 className="mt-1 font-display text-xl font-extrabold text-foreground">
            {copy.composeTitle}
          </h1>
          {copy.composeHint && (
            <p className="text-sm font-medium text-muted-foreground">
              {copy.composeHint}
            </p>
          )}
        </div>
        <Button variant="ghost" size="icon" asChild aria-label="Close compose">
          <Link to="/">
            <X className="size-5" />
          </Link>
        </Button>
      </header>

      <form
        onSubmit={handleSend}
        className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-6 animate-fade-up"
      >
        <label className="space-y-2">
          <span className="text-sm font-bold text-foreground">To</span>
          <Input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder={copy.toPlaceholder}
            autoComplete="off"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-bold text-foreground">Subject</span>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={copy.subjectPlaceholder}
            autoComplete="off"
          />
        </label>

        <label className="flex min-h-0 flex-1 flex-col space-y-2">
          <span className="text-sm font-bold text-foreground">Message</span>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={copy.bodyPlaceholder}
            className={cn(
              "min-h-[280px] flex-1 resize-none leading-8",
              learningStage === "elementary" ? "text-lg" : "text-base",
            )}
          />
        </label>

        <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-card/90 p-3 shadow-panel">
          <Button
            type="submit"
            variant={learningStage === "high" ? "default" : "coral"}
            size={learningStage === "elementary" ? "lg" : "default"}
          >
            <Send className="size-5" />
            Send
          </Button>
          <Button
            type="button"
            variant="outline"
            size={learningStage === "elementary" ? "lg" : "default"}
          >
            <Paperclip className="size-5" />
            Attach
          </Button>
          <div className="flex items-center gap-1 rounded-2xl bg-muted/80 p-1">
            <Button type="button" variant="ghost" size="icon" aria-label="Bold">
              <Bold className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" aria-label="Italic">
              <Italic className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Underline"
            >
              <Underline className="size-4" />
            </Button>
          </div>
          <Button
            type="button"
            variant="secondary"
            size={learningStage === "elementary" ? "lg" : "default"}
            className="ml-auto"
            onClick={() => void handleSave()}
          >
            Save draft
          </Button>
        </div>

        {status && (
          <p className="text-sm font-semibold text-safe" role="status">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
