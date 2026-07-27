import { Sidebar } from "@/components/layout/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
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
      <div
        className={cn(
          "relative flex h-screen min-h-[640px] overflow-hidden text-foreground",
          learningStage === "high" ? "bg-background" : "bg-nest-sky",
        )}
      >
        {learningStage !== "high" && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.72),transparent_42%),radial-gradient(circle_at_88%_8%,rgba(63,174,127,0.14),transparent_36%),radial-gradient(circle_at_70%_90%,rgba(244,162,97,0.10),transparent_40%)]"
          />
        )}
        <div className="relative z-10 flex h-full w-full">
          <Sidebar />
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
