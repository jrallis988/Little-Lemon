import { WritingCoach } from "@/components/compose/WritingCoach";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createAttachmentMeta,
  validateAttachment,
} from "@/data/seed";
import { promptsForGrade } from "@/data/prompts";
import { formatBytes, replySubject, wrapSelection } from "@/lib/compose";
import { copyForGrade } from "@/lib/stageCopy";
import { cn } from "@/lib/utils";
import { useMailStore } from "@/store/mailStore";
import type { AttachmentMeta } from "@/types/mail";
import {
  Bold,
  Italic,
  Paperclip,
  Send,
  Underline,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export function ComposeScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const saveDraft = useMailStore((s) => s.saveDraft);
  const sendMessage = useMailStore((s) => s.sendMessage);
  const grade = useMailStore((s) => s.grade);
  const learningStage = useMailStore((s) => s.learningStage);
  const messages = useMailStore((s) => s.messages);
  const drafts = useMailStore((s) => s.drafts);
  const contacts = useMailStore((s) => s.contacts);
  const requireApproval = useMailStore((s) => s.settings.requireSendApproval);
  const copy = copyForGrade(grade);
  const prompts = useMemo(() => promptsForGrade(grade), [grade]);

  const replyToId = params.get("replyTo") ?? undefined;
  const draftIdParam = params.get("draft") ?? undefined;

  const [draftId, setDraftId] = useState<string | undefined>(draftIdParam);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState<AttachmentMeta[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (draftIdParam) {
      const draft = drafts.find((d) => d.id === draftIdParam);
      if (draft) {
        setDraftId(draft.id);
        setTo(draft.to);
        setSubject(draft.subject);
        setBody(draft.body);
        setAttachments(draft.attachments ?? []);
        return;
      }
    }

    if (replyToId) {
      const original = messages.find((m) => m.id === replyToId);
      if (original) {
        const contact = contacts.find((c) => c.id === original.fromContactId);
        setTo(
          original.folder === "sent"
            ? original.toLabel
            : contact?.email || contact?.name || "",
        );
        setSubject(replySubject(original.subject));
        setBody(
          `\n\n---\nOn ${new Date(original.sentAt).toLocaleString()}, ${
            contact?.name ?? "sender"
          } wrote:\n${original.body}`,
        );
      }
    }
  }, [draftIdParam, replyToId, drafts, messages, contacts]);

  function applyPrompt(promptId: string) {
    const prompt = prompts.find((p) => p.id === promptId);
    if (!prompt) return;
    setSubject((current) => current || prompt.subject);
    setBody(prompt.body);
    setStatus(`Prompt applied: ${prompt.title}`);
  }

  function applyFormat(before: string, after: string) {
    const el = bodyRef.current;
    if (!el) return;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const next = wrapSelection(body, start, end, before, after);
    setBody(next.value);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(next.selectionStart, next.selectionEnd);
    });
  }

  function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    const next = [...attachments];
    for (const file of Array.from(fileList)) {
      const problem = validateAttachment(file);
      if (problem) {
        setError(problem);
        continue;
      }
      next.push(createAttachmentMeta(file));
      setError(null);
    }
    setAttachments(next);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSave() {
    const id = await saveDraft({
      id: draftId,
      to,
      subject,
      body,
      attachments,
      replyToId,
    });
    setDraftId(id);
    setStatus("Draft saved on this device.");
  }

  async function handleSend(event: FormEvent) {
    event.preventDefault();
    if (!to.trim()) {
      setError("Add a recipient before sending.");
      return;
    }
    const result = await sendMessage({
      id: draftId,
      to,
      subject,
      body,
      attachments,
      replyToId,
    });
    navigate(result === "pending" ? "/?folder=pending" : "/?folder=sent");
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex items-center justify-between gap-4 border-b border-border/80 bg-card px-6 py-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {copy.course}
          </p>
          <h1 className="mt-1 font-serif text-2xl font-semibold text-foreground">
            {replyToId ? "Reply" : copy.composeTitle}
          </h1>
          {copy.composeHint && (
            <p className="mt-1 text-sm font-medium text-muted-foreground">
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

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <form
          onSubmit={handleSend}
          className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 overflow-y-auto px-6 py-6 animate-fade-up"
        >
          {prompts.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">
                {copy.genreLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {prompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => applyPrompt(prompt.id)}
                    className="rounded-xl border border-border bg-card px-3 py-2 text-left transition hover:border-primary/40"
                  >
                    <span className="block text-sm font-semibold">
                      {prompt.title}
                    </span>
                    <span className="block text-xs font-medium text-muted-foreground">
                      {prompt.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <label className="space-y-2">
            <span className="text-sm font-semibold text-foreground">To</span>
            <Input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder={copy.toPlaceholder}
              list="safe-contact-emails"
              autoComplete="off"
            />
            <datalist id="safe-contact-emails">
              {contacts
                .filter((c) => c.safety !== "unknown")
                .map((c) => (
                  <option key={c.id} value={c.email}>
                    {c.name}
                  </option>
                ))}
            </datalist>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-foreground">Subject</span>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={copy.subjectPlaceholder}
              autoComplete="off"
            />
          </label>

          <label className="flex min-h-0 flex-1 flex-col space-y-2">
            <span className="text-sm font-semibold text-foreground">Body</span>
            <Textarea
              ref={bodyRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={copy.bodyPlaceholder}
              className={cn(
                "min-h-[240px] flex-1 resize-none font-serif leading-8",
                learningStage === "elementary" ? "text-lg" : "text-base",
              )}
            />
          </label>

          {attachments.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {attachments.map((file) => (
                <li
                  key={file.id}
                  className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold"
                >
                  <Paperclip className="size-3.5" />
                  {file.name}
                  <span className="text-muted-foreground">
                    {formatBytes(file.size)}
                  </span>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() =>
                      setAttachments((current) =>
                        current.filter((item) => item.id !== file.id),
                      )
                    }
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-3">
            <Button
              type="submit"
              variant="default"
              size={learningStage === "elementary" ? "lg" : "default"}
            >
              <Send className="size-5" />
              {requireApproval ? "Submit for review" : "Send"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size={learningStage === "elementary" ? "lg" : "default"}
              onClick={() => fileRef.current?.click()}
            >
              <Paperclip className="size-5" />
              Attach
            </Button>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg,.txt,.docx,application/pdf,image/png,image/jpeg,text/plain"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="flex items-center gap-1 rounded-lg bg-muted/80 p-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Bold"
                onClick={() => applyFormat("**", "**")}
              >
                <Bold className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Italic"
                onClick={() => applyFormat("_", "_")}
              >
                <Italic className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Underline"
                onClick={() => applyFormat("__", "__")}
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

          {requireApproval && (
            <p className="text-sm font-medium text-muted-foreground">
              Messages are reviewed by a teacher before they leave the classroom.
            </p>
          )}
          {error && (
            <p className="text-sm font-semibold text-destructive" role="alert">
              {error}
            </p>
          )}
          {status && (
            <p className="text-sm font-semibold text-safe" role="status">
              {status}
            </p>
          )}
        </form>
        <WritingCoach to={to} subject={subject} body={body} />
      </div>
    </div>
  );
}
