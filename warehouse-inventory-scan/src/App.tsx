import { useEffect, useState } from 'react';
import { DeviceShell } from './components/DeviceShell';

type ScanEntry = {
  id: string;
  label: string;
  capturedAt: number;
};

function formatRelative(capturedAt: number, now: number): string {
  const seconds = Math.max(0, Math.floor((now - capturedAt) / 1000));
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

function createSeedScans(): ScanEntry[] {
  const now = Date.now();
  return [
    {
      id: 'seed-1',
      label: 'SKU-9082-BK (Pallet A)',
      capturedAt: now - 12_000,
    },
    {
      id: 'seed-2',
      label: 'SKU-4411-RD (Bin 12)',
      capturedAt: now - 45_000,
    },
  ];
}

export default function App() {
  const [scannedItems, setScannedItems] = useState<ScanEntry[]>(createSeedScans);
  const [inputValue, setInputValue] = useState('');
  const [now, setNow] = useState(() => Date.now());
  const [highlightId, setHighlightId] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(Date.now());
    }, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!highlightId) return;
    const id = window.setTimeout(() => setHighlightId(null), 700);
    return () => window.clearTimeout(id);
  }, [highlightId]);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputValue.trim();
    if (!value) return;
    const entry: ScanEntry = {
      id: `scan-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      label: value,
      capturedAt: Date.now(),
    };
    setScannedItems((prev) => [entry, ...prev]);
    setHighlightId(entry.id);
    setNow(Date.now());
    setInputValue('');
  };

  return (
    <DeviceShell activeAppTitle="Warehouse Inventory Scan">
      <div className="space-y-6">
        {/* Quick Action Trigger Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 shadow-lg">
          <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-3">
            Active Barcode / RFID Input
          </h2>
          <form onSubmit={handleScanSubmit} className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Scan item or enter SKU..."
              className="flex-1 min-w-0 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono text-lg"
              autoFocus
              aria-label="Barcode or RFID scan input"
            />
            <button
              type="submit"
              className="shrink-0 bg-amber-600 hover:bg-amber-500 active:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-lg transition-colors cursor-pointer"
            >
              CAPTURE
            </button>
          </form>
        </div>

        {/* Scan Log Feed */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3 gap-2">
            <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
              Recent Scans ({scannedItems.length})
            </h3>
            <span className="text-xs text-emerald-400 font-mono whitespace-nowrap">
              ● Synced to Local DB
            </span>
          </div>
          <div className="space-y-2 font-mono text-sm">
            {scannedItems.map((item) => {
              const isHighlighted = item.id === highlightId;
              return (
                <div
                  key={item.id}
                  className={`bg-slate-900 border px-4 py-3 rounded flex items-center justify-between gap-3 ${
                    isHighlighted
                      ? 'slide-in border-amber-500/40'
                      : 'border-slate-800'
                  }`}
                >
                  <span className="text-slate-200 break-all">{item.label}</span>
                  <span className="text-xs text-slate-500 shrink-0">
                    {formatRelative(item.capturedAt, now)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DeviceShell>
  );
}
