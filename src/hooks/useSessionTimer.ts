import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LEARNING_MODE_OVERLAY_MS } from "@/lib/constants";
import { sessionTimerWorker } from "@/services/sessionTimer";
import { useSessionStore } from "@/stores/sessionStore";
import { ROUTES } from "@/routes/paths";

export function useSessionTimer() {
  const navigate = useNavigate();
  const limitReached = useSessionStore((s) => s.limitReached);
  const learningModeVisible = useSessionStore((s) => s.learningModeVisible);
  const learningModeSettled = useSessionStore((s) => s.learningModeSettled);
  const settleLearningMode = useSessionStore((s) => s.settleLearningMode);

  useEffect(() => {
    sessionTimerWorker.start();
    return () => sessionTimerWorker.stop();
  }, []);

  useEffect(() => {
    if (limitReached) {
      navigate(ROUTES.break, { replace: true });
    }
  }, [limitReached, navigate]);

  useEffect(() => {
    if (!learningModeVisible || learningModeSettled) return;
    const timer = window.setTimeout(() => {
      settleLearningMode();
    }, LEARNING_MODE_OVERLAY_MS);
    return () => window.clearTimeout(timer);
  }, [learningModeVisible, learningModeSettled, settleLearningMode]);
}
