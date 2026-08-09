import { FormEvent, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LockKeyhole, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { isValidPinFormat } from "@/services/parentGate";
import { useParentStore, useProfileStore } from "@/stores/profileStore";
import { useSessionStore } from "@/stores/sessionStore";
import {
  buildUsageReport,
  useSchoolStore,
} from "@/stores/schoolStore";
import { extractDomain, formatMinutes } from "@/lib/utils";

/** Screen 10 — Parent Control Dashboard (PIN-protected) */
export function ParentDashboardScreen() {
  const unlockedUntil = useParentStore((s) => s.unlockedUntil);
  const unlocked = Boolean(unlockedUntil && unlockedUntil > Date.now());
  const unlock = useParentStore((s) => s.unlock);
  const lock = useParentStore((s) => s.lock);
  const controls = useParentStore((s) => s.controls);
  const history = useParentStore((s) => s.history);
  const usage = useParentStore((s) => s.usage);
  const setDailyLimit = useParentStore((s) => s.setDailyLimit);
  const addWhitelistDomain = useParentStore((s) => s.addWhitelistDomain);
  const removeWhitelistDomain = useParentStore((s) => s.removeWhitelistDomain);
  const addBlocklistDomain = useParentStore((s) => s.addBlocklistDomain);
  const removeBlocklistDomain = useParentStore((s) => s.removeBlocklistDomain);
  const clearHistory = useParentStore((s) => s.clearHistory);
  const setLearningModeEnabled = useParentStore((s) => s.setLearningModeEnabled);
  const setAllowlistOnly = useParentStore((s) => s.setAllowlistOnly);
  const setPin = useParentStore((s) => s.setPin);
  const resetForNewDay = useSessionStore((s) => s.resetForNewDay);
  const profiles = useProfileStore((s) => s.profiles);
  const classes = useSchoolStore((s) => s.classes);
  const createClass = useSchoolStore((s) => s.createClass);
  const joinClass = useSchoolStore((s) => s.joinClass);
  const removeClass = useSchoolStore((s) => s.removeClass);

  const [pin, setPinInput] = useState("");
  const [newPin, setNewPin] = useState("");
  const [domain, setDomain] = useState("");
  const [blockedDomain, setBlockedDomain] = useState("");
  const [error, setError] = useState("");
  const [className, setClassName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [joinProfileId, setJoinProfileId] = useState("");
  const [schoolMessage, setSchoolMessage] = useState("");

  const chartData = useMemo(() => usage.slice(-7), [usage]);
  const blocklist = controls.blocklist ?? [];

  const onUnlock = async (event: FormEvent) => {
    event.preventDefault();
    const ok = await unlock(pin);
    if (!ok) {
      setError("Incorrect PIN. Default demo PIN is 0000.");
      return;
    }
    setError("");
    setPinInput("");
  };

  if (!unlocked) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center animate-fade-in">
        <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-soft">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-foam">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-navy">
            Parent Controls
          </h1>
          <p className="mt-2 text-sm text-slate">
            Enter your PIN to manage whitelist, time limits, and history.
          </p>
          <form onSubmit={onUnlock} className="mt-6 space-y-3">
            <Label htmlFor="parent-pin">PIN</Label>
            <Input
              id="parent-pin"
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="4–8 digits"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-fade-in space-y-8 pb-20">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-ocean">
            Parent dashboard
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
            Stay in the loop
          </h1>
          <p className="mt-2 max-w-xl text-slate">
            Real usage, allowlist/blocklist, session limits, and history —
            all behind the parent gate.
          </p>
        </div>
        <Button variant="outline" onClick={lock}>
          Lock dashboard
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-navy">
            Weekly usage
          </h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="minutes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#288CC1" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#288CC1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#D7DEE7" />
                <XAxis dataKey="date" tick={{ fill: "#6B7C93", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6B7C93", fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke="#234197"
                  fill="url(#minutes)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-navy">
            Daily time limit
          </h2>
          <p className="mt-2 text-sm text-slate">
            Current quota:{" "}
            <span className="font-semibold text-navy">
              {formatMinutes(controls.dailyLimitMinutes)}
            </span>
          </p>
          <div className="mt-6">
            <Slider
              min={15}
              max={180}
              step={5}
              value={[controls.dailyLimitMinutes]}
              onValueChange={(value) => setDailyLimit(value[0] ?? 60)}
            />
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <Label>Learning Mode</Label>
                <p className="text-sm text-slate">Show safety confirmation</p>
              </div>
              <Switch
                checked={controls.learningModeEnabled}
                onCheckedChange={setLearningModeEnabled}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <Label>Allowlist only</Label>
                <p className="text-sm text-slate">Block non-approved domains</p>
              </div>
              <Switch
                checked={controls.allowlistOnly}
                onCheckedChange={setAllowlistOnly}
              />
            </div>
          </div>
          <Button className="mt-6" variant="secondary" onClick={resetForNewDay}>
            Reset today’s session timer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-navy">
            Domain whitelist
          </h2>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!domain.trim()) return;
              addWhitelistDomain(extractDomain(domain));
              setDomain("");
            }}
          >
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="kids.example.edu"
            />
            <Button type="submit" size="icon" aria-label="Add domain">
              <Plus className="h-4 w-4" />
            </Button>
          </form>
          <ul className="mt-4 max-h-64 space-y-2 overflow-auto">
            {controls.whitelist.map((entry) => (
              <li
                key={entry}
                className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-3 py-2 text-sm"
              >
                <span className="truncate text-navy">{entry}</span>
                <button
                  type="button"
                  className="text-slate hover:text-destructive"
                  onClick={() => removeWhitelistDomain(entry)}
                  aria-label={`Remove ${entry}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-navy">
              Recent history
            </h2>
            {history.length > 0 && (
              <Button size="sm" variant="ghost" onClick={clearHistory}>
                Clear
              </Button>
            )}
          </div>
          <ul className="mt-4 max-h-72 space-y-3 overflow-auto">
            {history.length === 0 && (
              <li className="text-sm text-slate">
                No visits yet. Searches and opens will appear here.
              </li>
            )}
            {history.slice(0, 12).map((entry) => (
              <li
                key={entry.id}
                className="rounded-2xl border border-border/70 bg-cream/60 px-3 py-3"
              >
                <p className="truncate text-sm font-semibold text-navy">
                  {entry.title}
                </p>
                <p className="truncate text-xs text-slate">
                  {entry.domain}
                  {entry.blocked ? " · blocked" : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft">
        <h2 className="font-display text-xl font-semibold text-navy">
          Blocked domains
        </h2>
        <p className="mt-1 text-sm text-slate">
          Always blocked, even if somehow listed elsewhere.
        </p>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            if (!blockedDomain.trim()) return;
            addBlocklistDomain(extractDomain(blockedDomain));
            setBlockedDomain("");
          }}
        >
          <Input
            value={blockedDomain}
            onChange={(e) => setBlockedDomain(e.target.value)}
            placeholder="example-spam.com"
          />
          <Button type="submit" size="icon" aria-label="Block domain">
            <Plus className="h-4 w-4" />
          </Button>
        </form>
        <ul className="mt-4 max-h-48 space-y-2 overflow-auto">
          {blocklist.length === 0 && (
            <li className="text-sm text-slate">No custom blocks yet.</li>
          )}
          {blocklist.map((entry) => (
            <li
              key={entry}
              className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-3 py-2 text-sm"
            >
              <span className="truncate text-navy">{entry}</span>
              <button
                type="button"
                className="text-slate hover:text-destructive"
                onClick={() => removeBlocklistDomain(entry)}
                aria-label={`Unblock ${entry}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-navy">
            Change PIN
          </h2>
          <form
            className="mt-4 space-y-3"
            onSubmit={async (event) => {
              event.preventDefault();
              if (!isValidPinFormat(newPin)) {
                setError("PIN must be 4–8 digits.");
                return;
              }
              await setPin(newPin);
              setNewPin("");
              setError("");
            }}
          >
            <Label htmlFor="new-pin">New PIN</Label>
            <Input
              id="new-pin"
              type="password"
              inputMode="numeric"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit">Update PIN</Button>
          </form>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-navy">
            Printable child reports
          </h2>
          <p className="mt-1 text-sm text-slate">
            Download a simple usage summary per student profile.
          </p>
          <ul className="mt-4 space-y-2">
            {profiles.map((profile) => {
              const today = usage[usage.length - 1];
              return (
                <li
                  key={profile.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-3 py-2"
                >
                  <span className="text-sm font-medium text-navy">
                    {profile.displayName} · Grade {profile.grade}
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const body = buildUsageReport({
                        childName: profile.displayName,
                        grade: profile.grade,
                        searches: today?.searches ?? 0,
                        minutes: today?.minutes ?? 0,
                        blockedAttempts: today?.blockedAttempts ?? 0,
                        recentTitles: history
                          .filter((entry) => entry.profileId === profile.id)
                          .slice(0, 8)
                          .map((entry) => entry.title),
                      });
                      const blob = new Blob([body], {
                        type: "text/plain;charset=utf-8",
                      });
                      const url = URL.createObjectURL(blob);
                      const anchor = document.createElement("a");
                      anchor.href = url;
                      anchor.download = `${profile.displayName.toLowerCase()}-surf-report.txt`;
                      anchor.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    Download
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-soft">
        <h2 className="font-display text-xl font-semibold text-navy">
          Classroom codes
        </h2>
        <p className="mt-1 text-sm text-slate">
          Create a class code teachers/families can share, then join a child
          profile to the roster.
        </p>
        <form
          className="mt-4 grid gap-2 md:grid-cols-[1fr_1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            const roster = createClass({
              name: className,
              teacherName,
              sharedAllowlist: controls.whitelist.slice(0, 12),
            });
            setClassName("");
            setTeacherName("");
            setSchoolMessage(`Created class code ${roster.code}`);
          }}
        >
          <Input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Class name"
          />
          <Input
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Teacher / adult name"
          />
          <Button type="submit">Create</Button>
        </form>

        <form
          className="mt-4 grid gap-2 md:grid-cols-[1fr_1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            if (!joinProfileId) {
              setSchoolMessage("Choose a student profile to join.");
              return;
            }
            const ok = joinClass(joinCode, joinProfileId);
            setSchoolMessage(
              ok
                ? `Joined profile to class ${joinCode.toUpperCase()}`
                : "Class code not found.",
            );
          }}
        >
          <Input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="Class code"
          />
          <select
            className="rounded-xl border border-border bg-white px-3 py-2 text-sm"
            value={joinProfileId}
            onChange={(e) => setJoinProfileId(e.target.value)}
          >
            <option value="">Student profile</option>
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.displayName}
              </option>
            ))}
          </select>
          <Button type="submit" variant="secondary">
            Join
          </Button>
        </form>
        {schoolMessage && (
          <p className="mt-3 text-sm font-medium text-ocean">{schoolMessage}</p>
        )}
        <ul className="mt-4 space-y-2">
          {classes.map((roster) => (
            <li
              key={roster.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-cream px-3 py-3 text-sm"
            >
              <div>
                <p className="font-semibold text-navy">
                  {roster.name} · code {roster.code}
                </p>
                <p className="text-xs text-slate">
                  {roster.teacherName} · {roster.memberProfileIds.length}{" "}
                  student(s)
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeClass(roster.id)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
