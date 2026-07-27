import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "@/components/system/ErrorBoundary";
import { AppRouter } from "@/routes";
import { useParentStore, useProfileStore } from "@/stores/profileStore";
import { useSessionStore } from "@/stores/sessionStore";
import { hashPin } from "@/services/parentGate";
import "@/index.css";

function Bootstrap() {
  const activeProfileId = useProfileStore((s) => s.activeProfileId);
  const startSession = useSessionStore((s) => s.startSession);
  const profileId = useSessionStore((s) => s.profileId);
  const showLearningMode = useSessionStore((s) => s.showLearningMode);

  useEffect(() => {
    if (activeProfileId && !profileId) {
      startSession(activeProfileId);
      showLearningMode();
    }
  }, [activeProfileId, profileId, showLearningMode, startSession]);

  useEffect(() => {
    const { controls } = useParentStore.getState();
    if (controls.pinHash) return;
    void hashPin("0000", "surf-default-salt").then(({ hash, salt }) => {
      useParentStore.setState((state) => ({
        controls: { ...state.controls, pinHash: hash, pinSalt: salt },
      }));
    });
  }, []);

  return <AppRouter />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Bootstrap />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
