import { AppShell } from "@/components/layout/AppShell";
import { ComposePage } from "@/pages/ComposePage";
import { InboxPage } from "@/pages/InboxPage";
import { useMailStore } from "@/store/mailStore";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  const hydrate = useMailStore((s) => s.hydrate);
  const ready = useMailStore((s) => s.ready);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-nest-sky">
        <div className="rounded-3xl bg-card px-8 py-6 shadow-panel animate-fade-up">
          <p className="font-display text-2xl font-extrabold text-primary">
            Mailbox
          </p>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            Loading…
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<InboxPage />} />
      </Route>
      <Route path="compose" element={<ComposePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
