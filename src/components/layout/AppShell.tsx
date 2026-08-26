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

  useEffect(() => {
    document.documentElement.dataset.stage = learningStage;
    document.documentElement.dataset.grade = String(grade);
  }, [grade, learningStage]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="doodle-bg relative flex h-screen min-h-[640px] overflow-hidden text-foreground">
        <DoodleBackdrop className="opacity-70" />
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
