import { useNavigation } from '../navigation/NavigationContext';
import { Button, Panel, SectionLabel, SliderControl } from '../components/ui';

export function LabelOffsetAdjustment() {
  const { settings, updateSettings, goTo } = useNavigation();

  return (
    <div className="space-y-4">
      <Panel>
        <SectionLabel>Print alignment</SectionLabel>
        <div className="mb-5 h-36 rounded-[var(--radius-control)] border border-border-subtle bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-size-[16px_16px]" />
          <div
            className="absolute h-16 w-24 border-2 border-accent rounded-sm bg-accent/10 transition-transform duration-150"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${settings.offsetX * 2}px), calc(-50% + ${settings.offsetY * 2}px))`,
            }}
          />
          <span className="absolute bottom-2 right-2 font-metric text-[10px] text-ink-faint">
            X {settings.offsetX > 0 ? '+' : ''}
            {settings.offsetX} · Y {settings.offsetY > 0 ? '+' : ''}
            {settings.offsetY}
          </span>
        </div>
        <div className="space-y-5">
          <SliderControl
            label="X-axis offset (dots)"
            value={settings.offsetX}
            min={-20}
            max={20}
            onChange={(offsetX) => updateSettings({ offsetX })}
          />
          <SliderControl
            label="Y-axis offset (dots)"
            value={settings.offsetY}
            min={-20}
            max={20}
            onChange={(offsetY) => updateSettings({ offsetY })}
          />
        </div>
      </Panel>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="ghost"
          onClick={() => updateSettings({ offsetX: 0, offsetY: 0 })}
        >
          Reset
        </Button>
        <Button variant="primary" onClick={() => goTo('home')}>
          Save offset
        </Button>
      </div>
    </div>
  );
}
