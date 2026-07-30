"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { Notice } from "@/components/ui/Callout";
import { Badge } from "@/components/ui/Badge";

type InboxRecord = {
  referenceId: string;
  channel: string;
  createdAt: string;
  delivery: {
    stored: boolean;
    emailed: boolean;
    webhook: boolean;
    errors: string[];
  };
  payload: Record<string, unknown>;
};

export function IntakeInbox() {
  const [secret, setSecret] = useState("");
  const [records, setRecords] = useState<InboxRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadInbox() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ops/intake", {
        headers: { Authorization: `Bearer ${secret}` },
      });
      const data = (await res.json()) as {
        ok: boolean;
        records?: InboxRecord[];
        errors?: string[];
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.errors?.join(" ") || "Unable to load inbox.");
      }
      setRecords(data.records || []);
    } catch (err) {
      setRecords([]);
      setError(err instanceof Error ? err.message : "Unable to load inbox.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wrap py-s7 pb-s10">
      <div className="mb-s6 max-w-[720px]">
        <h1 className="mb-s2 text-3xl font-bold text-blue">Intake inbox</h1>
        <p className="mb-s4 text-md font-light text-text-body">
          Staff view of locally stored appointment and referral submissions.
          Requires <code>INTAKE_OPS_SECRET</code>. Not indexed by search engines.
        </p>
        <Notice>
          <p>
            On Vercel, local disk is ephemeral — configure webhook or Resend for
            durable delivery, and use this inbox mainly in local/staging.
          </p>
        </Notice>
      </div>

      <div className="mb-s6 flex max-w-[520px] flex-col gap-s3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <Label htmlFor="ops-secret">Ops secret</Label>
          <Input
            id="ops-secret"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            autoComplete="off"
          />
        </div>
        <Button
          type="button"
          variant="ocean"
          disabled={!secret || loading}
          onClick={() => void loadInbox()}
        >
          {loading ? "Loading…" : "Load inbox"}
        </Button>
      </div>

      {error ? (
        <p className="mb-s4 text-sm text-emergency" role="alert">
          {error}
        </p>
      ) : null}

      {records.length === 0 && !error ? (
        <p className="text-sm text-text-meta">No records loaded yet.</p>
      ) : (
        <ul className="flex flex-col gap-s4">
          {records.map((record) => (
            <li
              key={record.referenceId}
              className="rounded-md border border-border bg-white p-s5"
            >
              <div className="mb-s3 flex flex-wrap items-center gap-s2">
                <span className="font-mono text-lg font-bold text-blue">
                  {record.referenceId}
                </span>
                <Badge variant="ocean">{record.channel}</Badge>
                <span className="text-xs text-text-meta">
                  {new Date(record.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mb-s3 flex flex-wrap gap-s2 text-xs">
                <Badge variant={record.delivery.stored ? "green" : "gray"}>
                  stored
                </Badge>
                <Badge variant={record.delivery.emailed ? "green" : "gray"}>
                  emailed
                </Badge>
                <Badge variant={record.delivery.webhook ? "green" : "gray"}>
                  webhook
                </Badge>
              </div>
              <pre className="overflow-x-auto rounded-sm bg-surface p-s3 text-xs text-text-body">
                {JSON.stringify(record.payload, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
