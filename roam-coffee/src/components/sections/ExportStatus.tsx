import { useMemo } from 'react';
import { exportSlots, exportUrl } from '../../data/exports';
import { useExportMap } from '../../hooks/useExportAsset';

export function ExportStatusPanel() {
  const urls = useMemo(
    () => Object.fromEntries(exportSlots.map((s) => [s.id, exportUrl(s.folder, s.file)])),
    [],
  );
  const status = useExportMap(urls);

  const ready = exportSlots.filter((s) => status[s.id] === 'ready').length;
  const total = exportSlots.length;
  const loading = Object.values(status).some((s) => s === 'loading');

  const byCategory = exportSlots.reduce<Record<string, typeof exportSlots>>((acc, slot) => {
    (acc[slot.category] ??= []).push(slot);
    return acc;
  }, {});

  return (
    <div className="export-status panel-dark">
      <div className="panel-pad" style={{ borderBottom: '1px solid rgba(232,228,220,0.08)' }}>
        <p className="kicker" style={{ color: '#5A9A97' }}>
          Export status
        </p>
        <h3 style={{ margin: '0 0 0.35rem', color: '#F3EFE8' }}>
          {loading ? 'Checking exports…' : `${ready} of ${total} finals in place`}
        </h3>
        <p style={{ margin: 0, color: '#9AA6AE', fontSize: '0.92rem' }}>
          Drop PNG/PDF files into <code style={{ color: '#5A9A97' }}>public/exports/</code> using the names
          below. Viewers switch from SVG scaffolds automatically when a file is found.
        </p>
      </div>

      <div className="export-status-grid">
        {Object.entries(byCategory).map(([category, slots]) => (
          <div key={category} className="export-status-cat">
            <p className="export-status-cat-title">{category}</p>
            <ul>
              {slots.map((slot) => {
                const state = status[slot.id] ?? 'loading';
                return (
                  <li key={slot.id} data-state={state}>
                    <span className="export-dot" aria-hidden />
                    <span>
                      <strong>{slot.label}</strong>
                      <code>
                        {slot.folder}/{slot.file}
                      </code>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
