import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Compass, Home, Shield, UserRound } from "lucide-react";
import { SurfLogo } from "@/components/brand/SurfLogo";
import { LearningModeOverlay } from "@/components/learning/LearningModeOverlay";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useSessionTimer } from "@/hooks/useSessionTimer";
import { useUrlInterceptor } from "@/hooks/useUrlInterceptor";
import { formatClock } from "@/lib/utils";
import { ROUTES } from "@/routes/paths";
import { useSessionStore } from "@/stores/sessionStore";
import { useParentStore } from "@/stores/profileStore";
import { cn } from "@/lib/utils";

const NAV = [
  { to: ROUTES.home, label: "Home", icon: Home },
  { to: ROUTES.explore, label: "Explore", icon: Compass },
  { to: ROUTES.profile, label: "Profile", icon: UserRound },
  { to: ROUTES.parent, label: "Parent", icon: Shield },
];

export function AppShell() {
  useAccessibility();
  useSessionTimer();
  const { goBack } = useUrlInterceptor();
  const location = useLocation();
  const dailyLimitMinutes = useParentStore((s) => s.controls.dailyLimitMinutes);
  const elapsedSeconds = useSessionStore((s) => s.elapsedSeconds);
  const remainingSeconds = Math.max(0, dailyLimitMinutes * 60 - elapsedSeconds);
  const limitReached = useSessionStore((s) => s.limitReached);
  const isImmersive =
    location.pathname === ROUTES.break ||
    location.pathname === ROUTES.blocked;

  return (
    <div className="relative min-h-screen">
      {!isImmersive && (
        <header className="sticky top-0 z-30 border-b border-white/40 bg-cream/75 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
            <SurfLogo />
            <nav className="hidden items-center gap-1 md:flex">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-slate transition hover:bg-white/70 hover:text-navy",
                      isActive && "bg-white text-navy shadow-soft",
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <div className="rounded-2xl bg-white/70 px-3 py-2 text-xs font-medium text-slate-deep shadow-soft">
                Time left · {formatClock(remainingSeconds)}
              </div>
              <Button variant="ghost" size="sm" onClick={goBack}>
                Back
              </Button>
            </div>
          </div>
        </header>
      )}

      <main
        className={cn(
          "mx-auto min-h-[calc(100vh-4.5rem)] w-full",
          !isImmersive && "max-w-6xl px-5 py-8",
        )}
      >
        {limitReached && location.pathname !== ROUTES.break ? null : (
          <Outlet />
        )}
      </main>

      {!isImmersive && (
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/50 bg-cream/90 backdrop-blur-xl md:hidden">
          <div className="mx-auto grid max-w-lg grid-cols-4 gap-1 px-3 py-2">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium text-slate",
                    isActive && "bg-white text-navy shadow-soft",
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}

      <LearningModeOverlay />
    </div>
  );
}
