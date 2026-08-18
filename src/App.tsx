import { AppShell } from "@/components/layout/AppShell";
import { OnboardingScreen } from "@/components/onboarding/OnboardingScreen";
import { ComposePage } from "@/pages/ComposePage";
import { InboxPage } from "@/pages/InboxPage";
import { useMailStore } from "@/store/mailStore";
import type { FolderId } from "@/types/mail";
import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";

function InboxRoute() {
  const setFolder = useMailStore((s) => s.setFolder);
  const [params] = useSearchParams();

  useEffect(() => {
    const folder = params.get("folder");
    if (
      folder === "inbox" ||
      folder === "drafts" ||
      folder === "sent" ||
      folder === "pending" ||
      folder === "safe-contacts"
    ) {
      setFolder(folder as FolderId);
    }
  }, [params, setFolder]);

  return <InboxPage />;
}

export default function App() {
  const hydrate = useMailStore((s) => s.hydrate);
  const ready = useMailStore((s) => s.ready);
  const onboardingComplete = useMailStore(
    (s) => s.settings.onboardingComplete,
  );

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="rounded-2xl border border-border bg-card px-8 py-6 shadow-panel animate-fade-up">
          <p className="font-serif text-2xl font-semibold text-primary">
            Mailbox
          </p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Opening classroom mail…
          </p>
        </div>
      </div>
    );
  }

  if (!onboardingComplete) {
    return <OnboardingScreen />;
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<InboxRoute />} />
      </Route>
      <Route path="compose" element={<ComposePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
