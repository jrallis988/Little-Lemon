import {
  DoodleBackdrop,
  EmptyStateArt,
  TipCard,
} from "@/components/brand/MailboxBrand";
import { ContactAvatar } from "@/components/mail/ContactAvatar";
import { SafetyBadge } from "@/components/mail/SafetyBadge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { formatBytes } from "@/lib/compose";
import { cn, formatMessageTime } from "@/lib/utils";
import { getContact, useMailStore } from "@/store/mailStore";
import {
  Download,
  Flag,
  Paperclip,
  PenLine,
  Reply,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function draftIdFromMessage(messageId: string): string | null {
  if (messageId.startsWith("draft-msg-")) {
    return messageId.replace("draft-msg-", "");
  }
  return null;
}

export function MessagePreview() {
  const messages = useMailStore((s) => s.messages);
  const contacts = useMailStore((s) => s.contacts);
  const selectedMessageId = useMailStore((s) => s.selectedMessageId);
  const folder = useMailStore((s) => s.folder);
  const teacherUnlocked = useMailStore((s) => s.teacherUnlocked);
  const approveMessage = useMailStore((s) => s.approveMessage);
  const rejectMessage = useMailStore((s) => s.rejectMessage);
  const reportUnknownSender = useMailStore((s) => s.reportUnknownSender);
  const searchQuery = useMailStore((s) => s.searchQuery);
  const [teacherComment, setTeacherComment] = useState("");
  const [previewAttachment, setPreviewAttachment] = useState<{
    name: string;
    type: string;
  } | null>(null);

  if (folder === "safe-contacts") {
    return <SafeContactsPane />;
  }

  if (folder === "settings") {
    return <SettingsPane />;
  }

  const message = messages.find((m) => m.id === selectedMessageId);
  const contact = message
    ? getContact(contacts, message.fromContactId)
    : undefined;

  if (searchQuery.trim() && !message) {
    return <SearchResultsPane />;
  }

  if (!message || !contact) {
    return <FolderEmptyState folder={folder} />;
  }

  const linkedDraftId = draftIdFromMessage(message.id);
  const showApprovalActions =
    message.folder === "pending" && teacherUnlocked;
  const returned =
    message.approvalStatus === "rejected" && message.teacherComment;

  return (
    <section className="relative flex h-full min-w-0 flex-col bg-card/50">
      <header className="border-b border-border/70 px-6 py-5">
        <div className="flex flex-wrap items-start gap-4">
          <ContactAvatar contact={contact} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                {message.subject}
              </h2>
              {message.folder === "pending" ? (
                <span className="rounded-full bg-pending-soft px-2.5 py-1 text-xs font-extrabold text-amber-800">
                  Pending
                </span>
              ) : returned ? (
                <span className="rounded-full bg-warn-soft px-2.5 py-1 text-xs font-extrabold text-warn">
                  Returned
                </span>
              ) : (
                <SafetyBadge level={contact.safety} />
              )}
            </div>
            <p className="mt-1 text-sm font-bold text-foreground/85">
              {message.folder === "sent" ||
              message.folder === "pending" ||
              message.folder === "drafts" ? (
                <>
                  To <span className="text-primary">{message.toLabel}</span>
                </>
              ) : (
                <>
                  From <span className="text-primary">{contact.name}</span>
                  {contact.relationship ? (
                    <span className="text-muted-foreground">
                      {" "}
                      · {contact.relationship}
                    </span>
                  ) : null}
                </>
              )}
            </p>
            <p className="text-xs font-bold text-muted-foreground">
              {formatMessageTime(message.sentAt)}
              {contact.email ? ` · ${contact.email}` : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {linkedDraftId ? (
              <Button variant="coral" size="sm" asChild>
                <Link to={`/compose?draft=${linkedDraftId}`}>
                  <PenLine className="size-4" />
                  Edit message
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to={`/compose?replyTo=${message.id}`}>
                  <Reply className="size-4" />
                  Reply
                </Link>
              </Button>
            )}
          </div>
        </div>

        {returned && (
          <div className="mt-4 rounded-3xl border-2 border-warn/35 bg-warn-soft px-4 py-3 text-sm font-bold text-warn animate-fade-up">
            <p className="font-display text-base font-semibold">
              Teacher comment
            </p>
            <p className="mt-1 text-foreground/85">{message.teacherComment}</p>
          </div>
        )}

        {contact.safety === "unknown" && message.folder === "inbox" && (
          <div className="mt-4 space-y-3 rounded-3xl border-2 border-warn/35 bg-warn-soft px-4 py-3 text-sm font-bold text-warn animate-fade-up">
            <p>Unknown sender — ask a grown-up before you reply.</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => void reportUnknownSender(message.id)}
            >
              <Flag className="size-4" />
              Report
            </Button>
          </div>
        )}
      </header>

      <ScrollArea className="flex-1">
        <article className="space-y-4 px-6 py-6">
          <div className="rounded-[1.75rem] border-2 border-border/70 bg-card p-6 shadow-card animate-fade-up">
            <p className="whitespace-pre-wrap text-base font-bold leading-8 text-foreground/90">
              {message.body}
            </p>
          </div>

          {(message.attachments?.length ?? 0) > 0 && (
            <ul className="space-y-2">
              {message.attachments?.map((file) => (
                <li key={file.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewAttachment({ name: file.name, type: file.type })
                    }
                    className="flex w-full items-center gap-3 rounded-3xl border-2 border-primary/15 bg-primary/5 px-4 py-3.5 text-left shadow-card transition hover:border-primary/35"
                  >
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <Paperclip className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-extrabold">
                        {file.name}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground">
                        {formatBytes(file.size)}
                      </span>
                    </span>
                    <Download className="size-4 text-primary" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {showApprovalActions && (
            <div className="rounded-[1.75rem] border-2 border-brand/20 bg-brand-soft/50 p-4 shadow-card">
              <p className="font-display text-lg font-semibold text-foreground">
                Review message
              </p>
              <Textarea
                value={teacherComment}
                onChange={(e) => setTeacherComment(e.target.value)}
                placeholder="Add a comment for the student…"
                className="mt-3 min-h-[96px] rounded-3xl border-2"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="safe"
                  onClick={() => void approveMessage(message.id)}
                >
                  Download & send
                </Button>
                <Button
                  variant="coral"
                  onClick={() =>
                    void rejectMessage(message.id, teacherComment)
                  }
                >
                  Return for changes
                </Button>
              </div>
            </div>
          )}

          {message.folder === "pending" && !teacherUnlocked && (
            <TipCard title="Almost there!">
              Once your teacher reviews your message, it will be sent!
            </TipCard>
          )}
        </article>
      </ScrollArea>

      {previewAttachment && (
        <AttachmentPreviewModal
          name={previewAttachment.name}
          type={previewAttachment.type}
          onClose={() => setPreviewAttachment(null)}
        />
      )}
    </section>
  );
}

function FolderEmptyState({ folder }: { folder: string }) {
  if (folder === "pending") {
    return (
      <section className="relative flex h-full items-center justify-center p-6">
        <DoodleBackdrop className="opacity-60" />
        <EmptyStateArt
          src="/illust-pending.png"
          title="Waiting for approval"
          body="Hang tight — your teacher is checking this message."
          tip="Once your teacher reviews your message, it will be sent!"
        />
      </section>
    );
  }

  if (folder === "drafts") {
    return (
      <section className="relative flex h-full items-center justify-center p-6">
        <DoodleBackdrop className="opacity-60" />
        <EmptyStateArt
          src="/illust-notebook.png"
          title="Pick a draft"
          tip="Save your work anytime — drafts keep your ideas safe."
        />
      </section>
    );
  }

  if (folder === "sent") {
    return (
      <section className="relative flex h-full items-center justify-center p-6">
        <DoodleBackdrop className="opacity-60" />
        <EmptyStateArt
          src="/illust-airplane.png"
          title="Messages fly from here"
          tip="After a teacher approves your mail, it shows up in Sent."
        />
      </section>
    );
  }

  return (
    <section className="relative flex h-full items-center justify-center p-8">
      <DoodleBackdrop className="opacity-50" />
      <EmptyStateArt
        src="/mailbox-mascot.png"
        title="Select a message"
        body="Choose one from the list to read it here."
      />
    </section>
  );
}

function AttachmentPreviewModal({
  name,
  type,
  onClose,
}: {
  name: string;
  type: string;
  onClose: () => void;
}) {
  const isImage = type.startsWith("image/");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] border-[3px] border-primary/20 bg-card shadow-panel animate-fade-up">
        <header className="flex items-center justify-between border-b border-border px-5 py-3">
          <p className="truncate font-display text-lg font-semibold">{name}</p>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="size-5" />
          </Button>
        </header>
        <div className="flex min-h-[300px] items-center justify-center bg-secondary/60 p-8">
          {isImage ? (
            <div className="rotate-1 rounded-2xl border-4 border-white bg-pending-soft px-10 py-16 text-center shadow-card">
              <p className="font-display text-xl font-semibold text-primary">
                {name}
              </p>
              <p className="mt-2 text-sm font-bold text-muted-foreground">
                Taped-up attachment preview
              </p>
            </div>
          ) : (
            <div className="text-center">
              <Paperclip className="mx-auto size-12 text-primary" />
              <p className="mt-3 font-display text-xl font-semibold">{name}</p>
              <p className="text-sm font-bold text-muted-foreground">
                File ready to download
              </p>
            </div>
          )}
        </div>
        <footer className="flex justify-end gap-2 border-t border-border px-5 py-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Download className="size-4" />
            Download
          </Button>
        </footer>
      </div>
    </div>
  );
}

function SearchResultsPane() {
  const searchQuery = useMailStore((s) => s.searchQuery);
  const messages = useMailStore((s) => s.messages);
  const contacts = useMailStore((s) => s.contacts);
  const selectMessage = useMailStore((s) => s.selectMessage);
  const setFolder = useMailStore((s) => s.setFolder);
  const q = searchQuery.trim().toLowerCase();

  const messageHits = messages.filter((m) =>
    [m.subject, m.preview, m.body, m.toLabel].join(" ").toLowerCase().includes(q),
  );
  const peopleHits = contacts.filter((c) =>
    [c.name, c.email, c.relationship ?? ""].join(" ").toLowerCase().includes(q),
  );
  const attachmentHits = messages.flatMap((m) =>
    (m.attachments ?? [])
      .filter((a) => a.name.toLowerCase().includes(q))
      .map((a) => ({ message: m, attachment: a })),
  );

  const [tab, setTab] = useState<"messages" | "people" | "attachments">(
    "messages",
  );

  return (
    <section className="flex h-full flex-col bg-card/60">
      <header className="border-b border-border/70 px-6 py-5">
        <h2 className="font-display text-2xl font-semibold">
          Search results for “{searchQuery.trim()}”
        </h2>
        <div className="mt-4 flex gap-2">
          {(
            [
              ["messages", `Messages (${messageHits.length})`],
              ["people", `People (${peopleHits.length})`],
              ["attachments", `Attachments (${attachmentHits.length})`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "rounded-full px-3.5 py-2 text-xs font-extrabold",
                tab === id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </header>
      <ScrollArea className="flex-1">
        <ul className="space-y-2 p-6">
          {tab === "messages" &&
            messageHits.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  className="w-full rounded-3xl border-2 border-border/70 bg-card px-4 py-3 text-left shadow-card"
                  onClick={() => {
                    setFolder(m.folder);
                    selectMessage(m.id);
                  }}
                >
                  <p className="font-extrabold">{m.subject}</p>
                  <p className="text-sm font-bold text-muted-foreground">
                    {m.preview}
                  </p>
                </button>
              </li>
            ))}
          {tab === "people" &&
            peopleHits.map((c) => (
              <li
                key={c.id}
                className="flex items-center gap-3 rounded-3xl border-2 border-border/70 bg-card px-4 py-3 shadow-card"
              >
                <ContactAvatar contact={c} />
                <div>
                  <p className="font-extrabold">{c.name}</p>
                  <p className="text-sm font-bold text-muted-foreground">
                    {c.relationship ?? c.email}
                  </p>
                </div>
              </li>
            ))}
          {tab === "attachments" &&
            attachmentHits.map(({ message, attachment }) => (
              <li key={`${message.id}-${attachment.id}`}>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-3xl border-2 border-border/70 bg-card px-4 py-3 text-left shadow-card"
                  onClick={() => {
                    setFolder(message.folder);
                    selectMessage(message.id);
                  }}
                >
                  <Paperclip className="size-4 text-primary" />
                  <span className="font-extrabold">{attachment.name}</span>
                </button>
              </li>
            ))}
        </ul>
      </ScrollArea>
    </section>
  );
}

function SafeContactsPane() {
  const contacts = useMailStore((s) => s.contacts);
  const groups = [
    {
      label: "Teachers",
      items: contacts.filter((c) => c.category === "teacher"),
    },
    {
      label: "Classmates",
      items: contacts.filter((c) => c.category === "classmate"),
    },
    {
      label: "Family",
      items: contacts.filter((c) => c.category === "family"),
    },
    {
      label: "School",
      items: contacts.filter((c) => c.category === "school"),
    },
  ];

  return (
    <section className="relative flex h-full flex-col">
      <DoodleBackdrop className="opacity-45" />
      <header className="relative z-10 flex items-center justify-between border-b border-border/70 px-6 py-5">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Safe Contacts
        </h2>
        <img
          src="/illust-shield.png"
          alt=""
          className="h-14 w-14 object-contain"
          draggable={false}
        />
      </header>
      <ScrollArea className="relative z-10 flex-1">
        <div className="space-y-6 p-6">
          {groups.map((group) =>
            group.items.length === 0 ? null : (
              <div key={group.label}>
                <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.label}
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {group.items.map((contact) => (
                    <li
                      key={contact.id}
                      className="flex items-center gap-3 rounded-[1.75rem] border-2 border-safe/20 bg-card p-4 shadow-card animate-fade-up"
                    >
                      <ContactAvatar contact={contact} size="lg" />
                      <div className="min-w-0">
                        <p className="truncate font-extrabold text-foreground">
                          {contact.name}
                        </p>
                        <p className="truncate text-sm font-bold text-muted-foreground">
                          {contact.relationship ?? contact.email}
                        </p>
                        <div className="mt-2">
                          <SafetyBadge level={contact.safety} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </ScrollArea>
    </section>
  );
}

function SettingsPane() {
  const settings = useMailStore((s) => s.settings);
  const grade = useMailStore((s) => s.grade);
  const setGrade = useMailStore((s) => s.setGrade);
  const updateSettings = useMailStore((s) => s.updateSettings);
  const [name, setName] = useState(settings.studentName);
  const [school, setSchool] = useState(settings.schoolName);
  const [section, setSection] = useState("account");

  const nav = [
    "account",
    "notifications",
    "appearance",
    "accessibility",
    "privacy",
    "help",
  ] as const;

  const labels: Record<(typeof nav)[number], string> = {
    account: "Account",
    notifications: "Notifications",
    appearance: "Appearance",
    accessibility: "Accessibility",
    privacy: "Privacy & Safety",
    help: "Help",
  };

  return (
    <section className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
      <aside className="border-r border-border/70 bg-card/80 p-4">
        <nav className="space-y-1.5">
          {nav.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              className={cn(
                "w-full rounded-3xl px-3.5 py-3 text-left text-sm font-extrabold",
                section === id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:bg-secondary",
              )}
            >
              {labels[id]}
            </button>
          ))}
        </nav>
      </aside>

      <div className="overflow-y-auto p-6">
        {section === "account" ? (
          <div className="mx-auto max-w-lg space-y-4 animate-fade-up">
            <h2 className="font-display text-3xl font-semibold">Account</h2>
            <label className="block space-y-2">
              <span className="text-sm font-extrabold">Name</span>
              <input
                className="flex h-12 w-full rounded-3xl border-2 border-input bg-card px-4 text-sm font-bold"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-extrabold">Grade</span>
              <select
                className="flex h-12 w-full rounded-3xl border-2 border-input bg-card px-4 text-sm font-bold"
                value={grade}
                onChange={(e) =>
                  setGrade(Number(e.target.value) as typeof grade)
                }
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>
                    Grade {g}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-extrabold">School</span>
              <input
                className="flex h-12 w-full rounded-3xl border-2 border-input bg-card px-4 text-sm font-bold"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </label>
            <Button
              onClick={() =>
                void updateSettings({
                  studentName: name,
                  schoolName: school,
                  defaultGrade: grade,
                })
              }
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="mx-auto max-w-lg rounded-[2rem] border-2 border-border bg-card p-8 text-center shadow-card">
            <p className="font-display text-2xl font-semibold">
              {labels[section as (typeof nav)[number]]}
            </p>
            <p className="mt-2 text-sm font-bold text-muted-foreground">
              Coming soon in classroom rollout.
            </p>
          </div>
        )}
      </div>

      <aside className="hidden border-l border-border/70 bg-brand-soft/40 p-5 lg:block">
        <div className="rounded-[2rem] border-2 border-brand/20 bg-card p-5 text-center shadow-card">
          <img
            src="/mailbox-mascot.png"
            alt=""
            className="mx-auto h-24 w-24 object-contain animate-float"
          />
          <p className="mt-3 font-display text-xl font-semibold text-brand">
            You’re all set!
          </p>
          <p className="mt-1 text-sm font-bold text-muted-foreground">
            Your account is secure and ready for school mail.
          </p>
        </div>
      </aside>
    </section>
  );
}
