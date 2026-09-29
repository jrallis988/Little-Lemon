import { ContactAvatar } from "@/components/mail/ContactAvatar";
import { SafetyBadge } from "@/components/mail/SafetyBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatMessageTime } from "@/lib/utils";
import { getContact, useMailStore } from "@/store/mailStore";
import type { SafetyLevel } from "@/types/mail";
import {
  CheckCircle2,
  Lock,
  LockOpen,
  RotateCcw,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

type TeacherTab = "review" | "contacts" | "classroom";

export function TeacherPanel({ onClose }: { onClose: () => void }) {
  const teacherUnlocked = useMailStore((s) => s.teacherUnlocked);
  const unlockTeacher = useMailStore((s) => s.unlockTeacher);
  const lockTeacher = useMailStore((s) => s.lockTeacher);
  const settings = useMailStore((s) => s.settings);
  const updateSettings = useMailStore((s) => s.updateSettings);
  const contacts = useMailStore((s) => s.contacts);
  const addSafeContact = useMailStore((s) => s.addSafeContact);
  const updateContactSafety = useMailStore((s) => s.updateContactSafety);
  const removeContact = useMailStore((s) => s.removeContact);
  const messages = useMailStore((s) => s.messages);
  const approveMessage = useMailStore((s) => s.approveMessage);
  const rejectMessage = useMailStore((s) => s.rejectMessage);
  const setFolder = useMailStore((s) => s.setFolder);

  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<TeacherTab>("review");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const pending = messages.filter((m) => m.folder === "pending");
  const selected =
    pending.find((m) => m.id === selectedId) ?? pending[0] ?? null;

  useEffect(() => {
    if (!selectedId && pending[0]) setSelectedId(pending[0].id);
    if (selectedId && !pending.some((m) => m.id === selectedId)) {
      setSelectedId(pending[0]?.id ?? null);
      setComment("");
    }
  }, [pending, selectedId]);

  function handleUnlock(event: FormEvent) {
    event.preventDefault();
    const ok = unlockTeacher(pin);
    if (!ok) {
      setError("Incorrect PIN. Demo PIN is 1234.");
      return;
    }
    setError(null);
    setPin("");
  }

  async function handleAddContact(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    await addSafeContact({ name, email, relationship });
    setName("");
    setEmail("");
    setRelationship("");
  }

  async function handleApprove() {
    if (!selected) return;
    await approveMessage(selected.id);
    setComment("");
  }

  async function handleReturn() {
    if (!selected) return;
    await rejectMessage(selected.id, comment);
    setComment("");
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/35 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden
      />
      <aside className="relative z-10 flex h-full w-full max-w-5xl flex-col overflow-hidden border-l-[3px] border-primary/20 bg-card shadow-panel animate-fade-up">
        <header className="flex items-center justify-between gap-3 border-b-2 border-primary/10 bg-[#5850EC] px-5 py-4 text-white">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">
              Teacher review
            </p>
            <p className="text-sm font-bold text-white/80">
              Approve mail, manage contacts, keep the classroom safe
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
            className="text-white hover:bg-white/15 hover:text-white"
          >
            <X className="size-5" />
          </Button>
        </header>

        {!teacherUnlocked ? (
          <form
            onSubmit={handleUnlock}
            className="m-auto w-full max-w-sm space-y-4 p-8"
          >
            <div className="mx-auto flex size-16 items-center justify-center rounded-[1.5rem] bg-primary/10 text-primary">
              <Lock className="size-7" />
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-semibold">Unlock</p>
              <p className="mt-1 text-sm font-bold text-muted-foreground">
                Enter the teacher PIN to review student mail.
              </p>
            </div>
            <Input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN"
              autoFocus
              className="h-12 rounded-3xl border-2 text-center text-lg tracking-[0.35em]"
            />
            {error && (
              <p className="text-center text-sm font-semibold text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full rounded-3xl">
              Unlock
            </Button>
          </form>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-3">
              <div className="flex items-center gap-2 rounded-full bg-safe-soft px-3 py-1.5 text-sm font-extrabold text-safe">
                <LockOpen className="size-4" />
                Unlocked
              </div>
              <nav className="flex flex-wrap gap-1.5">
                {(
                  [
                    ["review", `Review (${pending.length})`],
                    ["contacts", "Contacts"],
                    ["classroom", "Classroom"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-xs font-extrabold transition-colors",
                      tab === id
                        ? "bg-rail text-white shadow-soft"
                        : "bg-secondary text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </nav>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={lockTeacher}
              >
                Lock
              </Button>
            </div>

            {tab === "review" && (
              <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)]">
                <section className="overflow-y-auto border-r border-border/70 bg-secondary/40 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <ShieldCheck className="size-4 text-safe" />
                    <h2 className="font-display text-lg font-semibold">
                      Waiting for you
                    </h2>
                  </div>
                  {pending.length === 0 ? (
                    <div className="rounded-[1.6rem] border-2 border-dashed border-primary/20 bg-card px-4 py-10 text-center">
                      <CheckCircle2 className="mx-auto size-10 text-safe" />
                      <p className="mt-3 font-display text-lg font-semibold">
                        All caught up
                      </p>
                      <p className="mt-1 text-sm font-bold text-muted-foreground">
                        No messages need approval right now.
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {pending.map((message) => {
                        const contact = getContact(
                          contacts,
                          message.fromContactId,
                        );
                        const active = selected?.id === message.id;
                        return (
                          <li key={message.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedId(message.id);
                                setComment("");
                              }}
                              className={cn(
                                "w-full rounded-[1.4rem] border-2 px-3.5 py-3 text-left shadow-card transition",
                                active
                                  ? "border-rail bg-white"
                                  : "border-transparent bg-card hover:border-primary/25",
                              )}
                            >
                              <p className="truncate font-extrabold text-foreground">
                                {message.subject}
                              </p>
                              <p className="mt-1 truncate text-xs font-bold text-muted-foreground">
                                From {contact?.name ?? "Student"} · To{" "}
                                {message.toLabel}
                              </p>
                              <p className="mt-2 line-clamp-2 text-xs font-semibold text-foreground/70">
                                {message.preview}
                              </p>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>

                <section className="flex min-h-0 flex-col overflow-hidden">
                  {selected ? (
                    <>
                      <div className="border-b border-border/70 px-5 py-4">
                        <p className="font-display text-2xl font-semibold">
                          {selected.subject}
                        </p>
                        <p className="mt-1 text-sm font-bold text-muted-foreground">
                          To {selected.toLabel} ·{" "}
                          {formatMessageTime(selected.sentAt)}
                        </p>
                      </div>
                      <div className="flex-1 overflow-y-auto px-5 py-4">
                        <div className="rounded-[1.6rem] border-2 border-border/70 bg-white p-5 shadow-card">
                          <p className="whitespace-pre-wrap text-base font-bold leading-8 text-foreground/90">
                            {selected.body}
                          </p>
                        </div>
                        {(selected.attachments?.length ?? 0) > 0 && (
                          <ul className="mt-3 space-y-2">
                            {selected.attachments?.map((file) => (
                              <li
                                key={file.id}
                                className="rounded-3xl border-2 border-primary/15 bg-primary/5 px-4 py-3 text-sm font-extrabold"
                              >
                                {file.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="space-y-3 border-t-2 border-primary/10 bg-brand-soft/40 px-5 py-4">
                        <label className="block space-y-2">
                          <span className="text-sm font-extrabold">
                            Comment for the student
                          </span>
                          <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a note if you return this for changes…"
                            className="min-h-[96px] rounded-3xl border-2"
                          />
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="safe"
                            onClick={() => void handleApprove()}
                          >
                            <CheckCircle2 className="size-4" />
                            Approve & send
                          </Button>
                          <Button
                            variant="coral"
                            onClick={() => void handleReturn()}
                          >
                            <RotateCcw className="size-4" />
                            Return for changes
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setFolder("pending");
                              onClose();
                            }}
                          >
                            Open in Pending
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-1 items-center justify-center p-8 text-center">
                      <div>
                        <img
                          src="/illust-pending.png"
                          alt=""
                          className="mx-auto h-24 w-24 object-contain"
                          draggable={false}
                        />
                        <p className="mt-3 font-display text-xl font-semibold">
                          Pick a message to review
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            )}

            {tab === "contacts" && (
              <div className="space-y-5 overflow-y-auto p-5">
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-rail" />
                  <h2 className="font-display text-xl font-semibold">
                    Safe Contacts
                  </h2>
                </div>
                <form
                  onSubmit={handleAddContact}
                  className="grid gap-2 rounded-[1.6rem] border-2 border-primary/15 bg-secondary/50 p-4 sm:grid-cols-2"
                >
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="rounded-3xl border-2"
                  />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                    className="rounded-3xl border-2"
                  />
                  <Input
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="Relationship (optional)"
                    className="rounded-3xl border-2 sm:col-span-2"
                  />
                  <Button type="submit" className="rounded-3xl sm:col-span-2">
                    Add contact
                  </Button>
                </form>

                <ul className="space-y-2">
                  {contacts.map((contact) => (
                    <li
                      key={contact.id}
                      className="flex flex-wrap items-center gap-3 rounded-[1.5rem] border-2 border-border/80 bg-card px-3 py-3 shadow-card"
                    >
                      <ContactAvatar contact={contact} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-extrabold">{contact.name}</p>
                        <p className="truncate text-xs font-medium text-muted-foreground">
                          {contact.email}
                        </p>
                      </div>
                      <SafetyBadge level={contact.safety} />
                      <select
                        className="rounded-xl border-2 border-input bg-card px-2 py-1 text-xs font-bold"
                        value={contact.safety}
                        onChange={(e) =>
                          void updateContactSafety(
                            contact.id,
                            e.target.value as SafetyLevel,
                          )
                        }
                      >
                        <option value="verified">Verified</option>
                        <option value="trusted">Safe contact</option>
                        <option value="unknown">Unknown</option>
                      </select>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => void removeContact(contact.id)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "classroom" && (
              <div className="mx-auto w-full max-w-lg space-y-4 overflow-y-auto p-6">
                <h2 className="font-display text-2xl font-semibold">
                  Classroom rules
                </h2>
                <label className="flex items-center justify-between gap-4 rounded-[1.5rem] border-2 border-border bg-card px-4 py-4 shadow-card">
                  <span>
                    <span className="block text-sm font-extrabold text-foreground">
                      Approve before send
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">
                      Student mail waits in Pending until you approve it.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    className="size-5 accent-[hsl(var(--primary))]"
                    checked={settings.requireSendApproval}
                    onChange={(e) =>
                      void updateSettings({
                        requireSendApproval: e.target.checked,
                      })
                    }
                  />
                </label>
                <div className="rounded-[1.5rem] border-2 border-dashed border-primary/20 bg-brand-soft/50 px-4 py-5 text-sm font-bold text-muted-foreground">
                  Demo PIN is <span className="text-foreground">1234</span>.
                  Replace with real teacher auth before classroom rollout.
                </div>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
