import { ContactAvatar } from "@/components/mail/ContactAvatar";
import { SafetyBadge } from "@/components/mail/SafetyBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useMailStore } from "@/store/mailStore";
import type { SafetyLevel } from "@/types/mail";
import { Lock, LockOpen, ShieldCheck, X } from "lucide-react";
import { useState, type FormEvent } from "react";

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

  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState("");

  const pending = messages.filter((m) => m.folder === "pending");

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-panel animate-fade-up">
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <p className="font-serif text-xl font-semibold text-foreground">
              Teacher
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="size-5" />
          </Button>
        </header>

        <div className="space-y-6 overflow-y-auto px-6 py-5">
          {!teacherUnlocked ? (
            <form onSubmit={handleUnlock} className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Lock className="size-4" />
                PIN
              </div>
              <Input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN"
                autoFocus
              />
              {error && (
                <p className="text-sm font-semibold text-destructive">{error}</p>
              )}
              <Button type="submit">Unlock</Button>
            </form>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-safe-soft/70 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-safe">
                  <LockOpen className="size-4" />
                  Unlocked
                </div>
                <Button type="button" variant="outline" size="sm" onClick={lockTeacher}>
                  Lock
                </Button>
              </div>

              <section className="space-y-3">
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
                  Settings
                </h2>
                <label className="flex items-center justify-between gap-4 rounded-2xl border border-border px-4 py-3">
                  <span className="text-sm font-semibold text-foreground">
                    Approve before send
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
              </section>

              <Separator />

              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-safe" />
                  <h2 className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
                    Pending ({pending.length})
                  </h2>
                </div>
                {pending.length === 0 ? (
                  <p className="text-sm font-medium text-muted-foreground">
                    None
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {pending.map((message) => (
                      <li
                        key={message.id}
                        className="rounded-2xl border border-border px-4 py-3"
                      >
                        <p className="font-bold text-foreground">
                          {message.subject}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground">
                          To {message.toLabel}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => void approveMessage(message.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => void rejectMessage(message.id)}
                          >
                            Return
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <Separator />

              <section className="space-y-3">
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
                  Safe Contacts
                </h2>
                <form
                  onSubmit={handleAddContact}
                  className="grid gap-2 sm:grid-cols-2"
                >
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                  />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                  />
                  <Input
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="Relationship (optional)"
                    className="sm:col-span-2"
                  />
                  <Button type="submit" className="sm:col-span-2">
                    Add
                  </Button>
                </form>

                <ul className="space-y-2">
                  {contacts.map((contact) => (
                    <li
                      key={contact.id}
                      className="flex flex-wrap items-center gap-3 rounded-2xl border border-border px-3 py-3"
                    >
                      <ContactAvatar contact={contact} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold">{contact.name}</p>
                        <p className="truncate text-xs font-medium text-muted-foreground">
                          {contact.email}
                        </p>
                      </div>
                      <SafetyBadge level={contact.safety} />
                      <select
                        className="rounded-xl border border-input bg-card px-2 py-1 text-xs font-bold"
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
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
