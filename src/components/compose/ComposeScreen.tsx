import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createAttachmentMeta,
  validateAttachment,
} from "@/data/seed";
import { promptsForGrade } from "@/data/prompts";
import { formatBytes, replySubject, wrapSelection } from "@/lib/compose";
import { cn } from "@/lib/utils";
import { useMailStore } from "@/store/mailStore";
import type { AttachmentMeta } from "@/types/mail";
import {
  Bold,
  HeartHandshake,
  Italic,
  MessageCircleQuestion,
  Paperclip,
  Send,
  Underline,
  Users,
  X,
  FolderKanban,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const promptIcons = {
  teacher: MessageCircleQuestion,
  thanks: HeartHandshake,
  peer: Users,
  project: FolderKanban,
} as const;

export function ComposeScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const saveDraft = useMailStore((s) => s.saveDraft);
  const sendMessage = useMailStore((s) => s.sendMessage);
  const grade = useMailStore((s) => s.grade);
  const messages = useMailStore((s) => s.messages);
  const drafts = useMailStore((s) => s.drafts);
  const contacts = useMailStore((s) => s.contacts);
  const requireApproval = useMailStore((s) => s.settings.requireSendApproval);
  const prompts = useMemo(() => promptsForGrade(grade), [grade]);

  const replyToId = params.get("replyTo") ?? undefined;
  const draftIdParam = params.get("draft") ?? undefined;

  const [draftId, setDraftId] = useState<string | undefined>(draftIdParam);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [teacherComment, setTeacherComment] = useState<string | undefined>();
  const [attachments, setAttachments] = useState<AttachmentMeta[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
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
        setTeacherComment(draft.teacherComment);
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
    setActivePrompt(promptId);
    setSubject((current) => current || prompt.subject);
    setBody(prompt.body);
    setStatus(`Using ${prompt.title}`);
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
      teacherComment,
    });
    setDraftId(id);
    setStatus("Saved.");
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
    <div className="doodle-bg flex h-full flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-border/80 bg-card/90 px-6 py-3 backdrop-blur">
        <h1 className="font-display text-xl font-extrabold text-foreground">
          {replyToId ? "Reply" : "New message"}
        </h1>
        <Button variant="ghost" size="icon" asChild aria-label="Close compose">
          <Link to="/">
            <X className="size-5" />
          </Link>
        </Button>
      </header>

      <form
        onSubmit={handleSend}
        className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 overflow-y-auto px-6 py-6 animate-fade-up"
      >
        {teacherComment && (
          <div className="rounded-2xl border border-warn/30 bg-warn-soft px-4 py-3 text-sm font-semibold text-warn">
            <p className="font-extrabold">Teacher comment</p>
            <p className="mt-1 text-foreground/80">{teacherComment}</p>
          </div>
        )}

        {!replyToId && (
          <div>
            <p className="mb-2 text-sm font-extrabold text-foreground">
              What are you writing today?
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {prompts.map((prompt) => {
                const Icon = promptIcons[prompt.icon];
                return (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => applyPrompt(prompt.id)}
                    className={cn(
                      "rounded-2xl border bg-card px-3 py-3 text-left shadow-card transition hover:border-primary/40",
                      activePrompt === prompt.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border",
                    )}
                  >
                    <Icon className="mb-2 size-5 text-primary" />
                    <span className="block text-sm font-extrabold">
                      {prompt.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <label className="space-y-2">
          <span className="text-sm font-extrabold text-foreground">To</span>
          <Input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Recipient"
            list="safe-contact-emails"
            autoComplete="off"
            className="rounded-2xl"
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
          <span className="text-sm font-extrabold text-foreground">Subject</span>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            autoComplete="off"
            className="rounded-2xl"
          />
        </label>

        <label className="flex min-h-0 flex-1 flex-col space-y-2">
          <span className="text-sm font-extrabold text-foreground">Message</span>
          <Textarea
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="min-h-[240px] flex-1 resize-none rounded-2xl text-base font-semibold leading-8"
          />
        </label>

        {attachments.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {attachments.map((file) => (
              <li
                key={file.id}
                className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-extrabold"
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

        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-card">
          <Button type="submit" variant="default">
            <Send className="size-5" />
            {requireApproval ? "Send for review" : "Send"}
          </Button>
          <Button
            type="button"
            variant="outline"
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
          <div className="flex items-center gap-1 rounded-xl bg-muted/80 p-1">
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
            className="ml-auto"
            onClick={() => void handleSave()}
          >
            Save draft
          </Button>
        </div>

        {error && (
          <p className="text-sm font-extrabold text-destructive" role="alert">
            {error}
          </p>
        )}
        {status && (
          <p className="text-sm font-extrabold text-safe" role="status">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
