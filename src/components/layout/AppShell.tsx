import { Sidebar } from "@/components/layout/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet } from "react-router-dom";

export function AppShell() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="relative flex h-screen min-h-[640px] overflow-hidden bg-nest-sky text-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.72),transparent_42%),radial-gradient(circle_at_88%_8%,rgba(63,174,127,0.16),transparent_36%),radial-gradient(circle_at_70%_90%,rgba(244,162,97,0.14),transparent_40%)]"
        />
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
