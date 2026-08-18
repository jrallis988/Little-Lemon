import { ClassroomBar } from "@/components/layout/ClassroomBar";
import { Sidebar } from "@/components/layout/Sidebar";
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
      <div className="flex h-screen min-h-[640px] overflow-hidden bg-background text-foreground">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <ClassroomBar />
          <main className="min-h-0 min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
