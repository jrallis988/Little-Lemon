import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/routes";
import { ParentSetupScreen } from "@/screens/ParentSetupScreen";
import { useParentStore, useProfileStore } from "@/stores/profileStore";
import { useSessionStore } from "@/stores/sessionStore";
import "@/index.css";

function Bootstrap() {
  const pinConfigured = useParentStore((s) => s.controls.pinConfigured);
  const activeProfileId = useProfileStore((s) => s.activeProfileId);
  const startSession = useSessionStore((s) => s.startSession);
  const profileId = useSessionStore((s) => s.profileId);
  const showLearningMode = useSessionStore((s) => s.showLearningMode);

  useEffect(() => {
    if (!pinConfigured) return;
    if (activeProfileId && !profileId) {
      startSession(activeProfileId);
      showLearningMode();
    }
  }, [
    pinConfigured,
    activeProfileId,
    profileId,
    showLearningMode,
    startSession,
  ]);

  if (!pinConfigured) {
    return <ParentSetupScreen />;
  }

  return <AppRouter />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Bootstrap />
    </BrowserRouter>
  </StrictMode>,
);
