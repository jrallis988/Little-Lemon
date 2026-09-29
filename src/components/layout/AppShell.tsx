import { DoodleBackdrop } from "@/components/brand/MailboxBrand";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useMailStore } from "@/store/mailStore";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export function AppShell() {
  const grade = useMailStore((s) => s.grade);
  const learningStage = useMailStore((s) => s.learningStage);
  const settings = useMailStore((s) => s.settings);

  useEffect(() => {
    document.documentElement.dataset.stage = learningStage;
    document.documentElement.dataset.grade = String(grade);
  }, [grade, learningStage]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("mailbox-large-text", settings.largeText);
    root.classList.toggle("mailbox-high-contrast", settings.highContrast);
    root.classList.toggle("mailbox-reduce-motion", settings.reduceMotion);
    root.classList.toggle("mailbox-hide-doodles", !settings.showDoodles);
  }, [
    settings.largeText,
    settings.highContrast,
    settings.reduceMotion,
    settings.showDoodles,
  ]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="doodle-bg relative flex h-screen min-h-[640px] overflow-hidden text-foreground">
        {!settings.showDoodles ? null : (
          <DoodleBackdrop className="opacity-70" />
        )}
        <Sidebar />
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="min-h-0 min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
