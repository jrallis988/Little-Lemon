import { useEffect, useState, type ReactNode } from 'react';

type DeviceShellProps = {
  activeAppTitle: string;
  children: ReactNode;
};

function StatusBar() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
    }, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 text-[11px] font-mono text-slate-300 bg-slate-950/90 border-b border-slate-800">
      <span className="tracking-wide">RF LINK</span>
      <span className="text-slate-400">{time}</span>
      <div className="flex items-center gap-2">
        <span className="text-emerald-400">LTE</span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-4 rounded-[2px] border border-slate-400 relative">
            <span className="absolute inset-y-0.5 left-0.5 right-1 bg-emerald-400 rounded-[1px]" />
          </span>
          84%
        </span>
      </div>
    </div>
  );
}

export function DeviceShell({ activeAppTitle, children }: DeviceShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[420px]">
        <div className="mb-3 flex items-center justify-between text-xs font-mono text-slate-500 uppercase tracking-[0.2em]">
          <span>SwiftScan Handset</span>
          <span className="text-amber-500/80">Model X7</span>
        </div>

        <div className="relative rounded-[2rem] border-[10px] border-slate-950 bg-slate-950 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
          {/* Rugged bezel rivets */}
          <span className="absolute -left-1 top-16 h-10 w-1.5 rounded-r bg-slate-700" />
          <span className="absolute -left-1 bottom-28 h-16 w-1.5 rounded-r bg-slate-700" />
          <span className="absolute -right-1 top-24 h-14 w-1.5 rounded-l bg-slate-700" />

          <div className="overflow-hidden rounded-[1.35rem] bg-slate-900 border border-slate-800">
            <StatusBar />

            <header className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800">
              <div className="h-9 w-9 rounded-md bg-amber-500/15 border border-amber-500/40 flex items-center justify-center">
                <span className="scan-pulse h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
                  Active application
                </p>
                <h1 className="text-sm font-semibold text-slate-100 truncate">
                  {activeAppTitle}
                </h1>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded">
                ONLINE
              </span>
            </header>

            <main className="p-4 bg-slate-950/40 min-h-[560px] max-h-[70vh] overflow-y-auto">
              {children}
            </main>

            <footer className="px-4 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>WH-FLOOR · AISLE 4</span>
              <span>SCANNER READY</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
