import { useEffect, useState, type ReactNode } from 'react';
import { useNavigation } from '../navigation/NavigationContext';
import { SCREENS } from '../navigation/screens';
import { Button, StatusPill } from './ui';

function StatusBar() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      );
    }, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 text-[11px] font-mono text-slate-300 bg-oled/90 border-b border-border-subtle">
      <span className="tracking-wide text-ready">RF LINK</span>
      <span className="text-ink-muted">{time}</span>
      <div className="flex items-center gap-2">
        <span className="text-ready">WLAN</span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-4 rounded-[2px] border border-slate-400 relative">
            <span className="absolute inset-y-0.5 left-0.5 right-1 bg-ready rounded-[1px]" />
          </span>
          84%
        </span>
      </div>
    </div>
  );
}

export function DeviceShell({ children }: { children: ReactNode }) {
  const { title, goBack, goHome, canGoBack, screenId, goTo, settings } =
    useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  const statusTone =
    settings.printStatus === 'printing'
      ? 'accent'
      : settings.printStatus === 'error'
        ? 'danger'
        : 'ready';

  const statusLabel =
    settings.printStatus === 'printing'
      ? 'PRINTING'
      : settings.printStatus === 'paused'
        ? 'PAUSED'
        : settings.printStatus === 'error'
          ? 'FAULT'
          : 'READY';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[430px]">
        <div className="mb-3 flex items-center justify-between text-xs font-mono text-ink-faint uppercase tracking-[0.2em]">
          <span>SwiftScan OS</span>
          <span className="text-accent/80">ZT411 · Handset</span>
        </div>

        <div className="relative rounded-[2rem] border-[10px] border-oled bg-oled shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
          <span className="absolute -left-1 top-16 h-10 w-1.5 rounded-r bg-slate-700" />
          <span className="absolute -left-1 bottom-28 h-16 w-1.5 rounded-r bg-slate-700" />
          <span className="absolute -right-1 top-24 h-14 w-1.5 rounded-l bg-slate-700" />

          <div className="overflow-hidden rounded-[1.35rem] bg-surface border border-border-subtle relative">
            <StatusBar />

            <header className="flex items-center gap-2 px-3 py-2.5 border-b border-border-subtle bg-gradient-to-r from-surface via-surface to-panel/40">
              {canGoBack && screenId !== 'home' ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="!min-h-9 !px-2.5 shrink-0"
                  onClick={goBack}
                  aria-label="Go back"
                >
                  ←
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={goHome}
                  className="h-9 w-9 shrink-0 rounded-md bg-accent/15 border border-accent/40 flex items-center justify-center cursor-pointer"
                  aria-label="Home"
                >
                  <span className="pulse-ready h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                </button>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.18em] text-ink-faint font-semibold">
                  Device OS
                </p>
                <h1 className="text-sm font-semibold text-ink truncate">{title}</h1>
              </div>
              <StatusPill tone={statusTone}>
                <span className="pulse-ready h-1.5 w-1.5 rounded-full bg-current" />
                {statusLabel}
              </StatusPill>
              <Button
                variant="ghost"
                size="sm"
                className="!min-h-9 !px-2.5 shrink-0 font-semibold"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Open screen menu"
                aria-expanded={menuOpen}
              >
                Menu
              </Button>
            </header>

            {menuOpen && (
              <div className="absolute inset-x-0 top-[6.5rem] bottom-12 z-20 bg-oled/95 backdrop-blur-sm border-b border-border-subtle overflow-y-auto device-scroll p-3 space-y-1">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-faint px-2 mb-2">
                  All screens ({SCREENS.length})
                </p>
                {SCREENS.map((screen) => (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => {
                      goTo(screen.id);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left rounded-[var(--radius-control)] px-3 py-3 border transition-colors cursor-pointer ${
                      screen.id === screenId
                        ? 'bg-accent/15 border-accent/40 text-ink'
                        : 'bg-panel/60 border-border-subtle text-ink-muted hover:border-border-strong hover:text-ink'
                    }`}
                  >
                    <span className="block text-sm font-medium">{screen.shortTitle}</span>
                    <span className="block text-[11px] text-ink-faint mt-0.5">
                      {screen.description}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <main className="p-4 bg-oled/50 min-h-[580px] max-h-[72vh] overflow-y-auto device-scroll slide-in">
              {children}
            </main>

            <footer className="px-4 py-2.5 border-t border-border-subtle bg-oled flex items-center justify-between text-[10px] font-mono text-ink-faint">
              <button
                type="button"
                onClick={goHome}
                className="hover:text-accent transition-colors cursor-pointer uppercase tracking-wider"
              >
                Home
              </button>
              <span className="truncate mx-2">
                {SCREENS.findIndex((s) => s.id === screenId) + 1}/{SCREENS.length}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="hover:text-accent transition-colors cursor-pointer uppercase tracking-wider"
              >
                Menu
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
