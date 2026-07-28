"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Notice } from "@/components/ui/Callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { usePortalStore } from "@/store";

export function PortalSandbox() {
  const {
    signedIn,
    activeTab,
    messages,
    results,
    visits,
    medications,
    refillRequested,
    selectedMessageId,
    signIn,
    signOut,
    setTab,
    markMessageRead,
    selectMessage,
    replyToMessage,
    requestRefill,
    cancelVisit,
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
            messaging threads, visits, and refill requests. No real PHI is
            stored.
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
  const selectedMessage =
    messages.find((m) => m.id === selectedMessageId) ?? null;

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

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setTab(value as typeof activeTab)
        }
      >
        <TabsList aria-label="Portal sections">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="results">Test results</TabsTrigger>
          <TabsTrigger value="messages">
            Messages{unread > 0 ? ` (${unread})` : ""}
          </TabsTrigger>
          <TabsTrigger value="visits">Visits</TabsTrigger>
          <TabsTrigger value="refills">Refills</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-s4 md:grid-cols-3">
            <div className="rounded-md bg-surface p-s4">
              <div className="text-xs font-extrabold uppercase tracking-wide text-text-meta">
                Upcoming
              </div>
              <div className="mt-2 text-base font-bold text-text">
                {visits.find((v) => v.status === "scheduled")?.title ??
                  "No upcoming visits"}
              </div>
              <div className="text-sm font-light text-text-body">
                {visits.find((v) => v.status === "scheduled")?.when}
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
        </TabsContent>

        <TabsContent value="results">
          <ul className="flex flex-col gap-s3">
            {results.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-start justify-between gap-s3 border-b border-border pb-s3"
              >
                <div>
                  <div className="font-bold text-text">{r.name}</div>
                  <div className="text-sm font-light text-text-meta">{r.date}</div>
                  {r.detail ? (
                    <p className="mt-1 max-w-xl text-sm font-light text-text-body">
                      {r.detail}
                    </p>
                  ) : null}
                </div>
                <Badge variant={r.status === "final" ? "green" : "gray"}>
                  {r.status}
                </Badge>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="messages">
          <div className="grid grid-cols-1 gap-s4 md:grid-cols-[1fr_1.2fr]">
            <ul className="flex flex-col gap-s2">
              {messages.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    className="w-full rounded-sm border border-border p-s4 text-left hover:bg-surface"
                    onClick={() => {
                      markMessageRead(m.id);
                      selectMessage(m.id);
                    }}
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
            <div className="rounded-sm border border-border bg-surface p-s4">
              {selectedMessage ? (
                <>
                  <h3 className="mb-1 text-lg font-bold text-blue">
                    {selectedMessage.subject}
                  </h3>
                  <p className="mb-s3 text-sm text-text-meta">
                    {selectedMessage.from} · {selectedMessage.date}
                  </p>
                  <div className="mb-s4 flex flex-col gap-s3">
                    {selectedMessage.thread.map((t) => (
                      <div
                        key={t.id}
                        className="rounded-sm border border-border bg-white p-s3"
                      >
                        <div className="mb-1 text-xs font-bold text-text-meta">
                          {t.from} · {t.date}
                        </div>
                        <p className="text-sm font-light text-text-body">
                          {t.body}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      replyToMessage(
                        selectedMessage.id,
                        "Thanks — we’ll review and follow up before the visit.",
                      )
                    }
                  >
                    Send mock reply
                  </Button>
                </>
              ) : (
                <p className="text-sm font-light text-text-meta">
                  Select a message to view the thread.
                </p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="visits">
          <ul className="flex flex-col gap-s3">
            {visits.map((v) => (
              <li
                key={v.id}
                className="rounded-sm border border-border bg-surface p-s4"
              >
                <div className="flex flex-wrap items-start justify-between gap-s3">
                  <div>
                    <div className="font-bold text-text">{v.title}</div>
                    <div className="text-sm font-light text-text-body">
                      {v.when}
                    </div>
                    <div className="text-sm font-light text-text-meta">
                      {v.location}
                    </div>
                  </div>
                  <Badge
                    variant={v.status === "scheduled" ? "ocean" : "gray"}
                  >
                    {v.status}
                  </Badge>
                </div>
                {v.status === "scheduled" ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-s3"
                    onClick={() => cancelVisit(v.id)}
                  >
                    Cancel visit (mock)
                  </Button>
                ) : null}
              </li>
            ))}
            <li>
              <Button href="/appointments/request" variant="outline">
                Request a new appointment
              </Button>
            </li>
          </ul>
        </TabsContent>

        <TabsContent value="refills">
          <ul className="mb-s5 flex flex-col gap-s3">
            {medications.map((med) => (
              <li
                key={med.id}
                className="flex flex-wrap items-center justify-between gap-s3 rounded-sm border border-border p-s4"
              >
                <div>
                  <div className="font-bold text-text">{med.name}</div>
                  <div className="text-sm font-light text-text-body">
                    {med.dose} · {med.instructions}
                  </div>
                  <div className="text-sm font-light text-text-meta">
                    Refills left: {med.refillsLeft}
                  </div>
                </div>
                <Badge variant={med.refillsLeft > 0 ? "green" : "gray"}>
                  {med.refillsLeft > 0 ? "Available" : "None left"}
                </Badge>
              </li>
            ))}
          </ul>
          {refillRequested ? (
            <Notice>
              <p>
                Refill request submitted (mock). Status: pending pharmacy
                review. Your care team would confirm in a real portal.
              </p>
            </Notice>
          ) : (
            <Button type="button" variant="ocean" onClick={requestRefill}>
              Request refill for active medications
            </Button>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
