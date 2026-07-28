"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Notice } from "@/components/ui/Callout";
import { usePortalStore } from "@/store";
import { cn } from "@/lib/cn";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "results", label: "Test results" },
  { id: "messages", label: "Messages" },
  { id: "visits", label: "Visits" },
  { id: "refills", label: "Refills" },
] as const;

export function PortalSandbox() {
  const {
    signedIn,
    activeTab,
    messages,
    results,
    visits,
    refillRequested,
    signIn,
    signOut,
    setTab,
    markMessageRead,
    requestRefill,
  } = usePortalStore();

  if (!signedIn) {
    return (
      <div className="wrap py-s7 pb-s10">
        <div className="mx-auto max-w-[520px] rounded-md border border-border bg-white p-s6">
          <h2 className="mb-s2 text-xl font-bold text-ocean">
            MyChildren&apos;s sandbox
          </h2>
          <p className="mb-s5 text-md font-light text-text-body">
            Demo patient portal inspired by MyChildren&apos;s — results,
            messaging, visits, and refill requests. No real PHI is stored.
          </p>
          <Notice className="mb-s5">
            <p>
              Sign in uses local mock state only (Zustand + browser storage).
            </p>
          </Notice>
          <Button type="button" variant="ocean" fullWidth onClick={signIn}>
            Sign in to Portal
          </Button>
        </div>
      </div>
    );
  }

  const unread = messages.filter((m) => m.unread).length;

  return (
    <div className="wrap py-s7 pb-s10">
      <div className="mb-s5 flex flex-wrap items-center justify-between gap-s3">
        <div>
          <h2 className="text-xl font-bold text-ocean">Welcome back</h2>
          <p className="text-sm font-light text-text-meta">
            Demo family account · Boston Children&apos;s sandbox
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={signOut}>
          Sign out
        </Button>
      </div>

      <div
        className="mb-s5 flex flex-wrap gap-s2"
        role="tablist"
        aria-label="Portal sections"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-sm font-bold",
              activeTab === tab.id
                ? "border-ocean bg-ocean text-white"
                : "border-border bg-white text-blue",
            )}
            onClick={() => setTab(tab.id)}
          >
            {tab.label}
            {tab.id === "messages" && unread > 0 ? ` (${unread})` : ""}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-border bg-white p-s5" role="tabpanel">
        {activeTab === "overview" ? (
          <div className="grid grid-cols-1 gap-s4 md:grid-cols-3">
            <div className="rounded-md bg-surface p-s4">
              <div className="text-xs font-extrabold uppercase tracking-wide text-text-meta">
                Upcoming
              </div>
              <div className="mt-2 text-base font-bold text-text">
                {visits[0]?.title}
              </div>
              <div className="text-sm font-light text-text-body">
                {visits[0]?.when}
              </div>
            </div>
            <div className="rounded-md bg-surface p-s4">
              <div className="text-xs font-extrabold uppercase tracking-wide text-text-meta">
                Unread messages
              </div>
              <div className="mt-2 text-3xl font-black text-ocean">{unread}</div>
            </div>
            <div className="rounded-md bg-surface p-s4">
              <div className="text-xs font-extrabold uppercase tracking-wide text-text-meta">
                Latest result
              </div>
              <div className="mt-2 text-base font-bold text-text">
                {results[0]?.name}
              </div>
              <Badge variant="green" className="mt-2">
                {results[0]?.status}
              </Badge>
            </div>
          </div>
        ) : null}

        {activeTab === "results" ? (
          <ul className="flex flex-col gap-s3">
            {results.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-s3 border-b border-border pb-s3"
              >
                <div>
                  <div className="font-bold text-text">{r.name}</div>
                  <div className="text-sm font-light text-text-meta">{r.date}</div>
                </div>
                <Badge variant={r.status === "final" ? "green" : "gray"}>
                  {r.status}
                </Badge>
              </li>
            ))}
          </ul>
        ) : null}

        {activeTab === "messages" ? (
          <ul className="flex flex-col gap-s3">
            {messages.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  className="w-full rounded-sm border border-border p-s4 text-left hover:bg-surface"
                  onClick={() => markMessageRead(m.id)}
                >
                  <div className="mb-1 flex items-center gap-s2">
                    {m.unread ? <Badge variant="ocean">Unread</Badge> : null}
                    <span className="text-xs text-text-meta">{m.date}</span>
                  </div>
                  <div className="font-bold text-text">{m.subject}</div>
                  <div className="text-sm font-light text-text-body">
                    {m.from} — {m.preview}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {activeTab === "visits" ? (
          <ul className="flex flex-col gap-s3">
            {visits.map((v) => (
              <li
                key={v.id}
                className="rounded-sm border border-border bg-surface p-s4"
              >
                <div className="font-bold text-text">{v.title}</div>
                <div className="text-sm font-light text-text-body">{v.when}</div>
                <div className="text-sm font-light text-text-meta">
                  {v.location}
                </div>
              </li>
            ))}
            <li>
              <Button href="/appointments/request" variant="outline">
                Request a new appointment
              </Button>
            </li>
          </ul>
        ) : null}

        {activeTab === "refills" ? (
          <div>
            <p className="mb-s4 text-md font-light text-text-body">
              Request a medication refill for your child&apos;s care team to
              review.
            </p>
            {refillRequested ? (
              <Notice>
                <p>
                  Refill request submitted (mock). Your pharmacy would be
                  notified in a real portal.
                </p>
              </Notice>
            ) : (
              <Button type="button" variant="ocean" onClick={requestRefill}>
                Request refill
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
