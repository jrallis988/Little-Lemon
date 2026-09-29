import { useNavigation } from '../navigation/NavigationContext';
import { Button, Panel, SectionLabel, SliderControl } from '../components/ui';

export function DarknessLevelControl() {
  const { settings, updateSettings, goTo } = useNavigation();
  const level = settings.darkness;

  return (
    <div className="space-y-4">
      <Panel>
        <SectionLabel>Thermal intensity</SectionLabel>
        <div className="mb-5 rounded-[var(--radius-control)] border border-border-subtle overflow-hidden">
          <div
            className="h-24 flex items-end justify-center pb-3 font-metric text-xs tracking-[0.3em] uppercase"
            style={{
              background: `linear-gradient(90deg, #1e293b 0%, #0f172a ${100 - level * 3}%, #020617 100%)`,
              color: `rgba(226,232,240,${0.35 + level / 40})`,
            }}
          >
            SAMPLE · SWFT
          </div>
        </div>
        <SliderControl
          label="Darkness level"
          value={level}
          min={0}
          max={30}
          onChange={(darkness) => updateSettings({ darkness })}
        />
        <p className="mt-3 text-xs text-ink-faint leading-relaxed">
          Higher values increase burn energy. Typical warehouse labels: 15–22.
        </p>
      </Panel>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="ghost" onClick={() => updateSettings({ darkness: 18 })}>
          Default 18
        </Button>
        <Button variant="primary" onClick={() => goTo('home')}>
          Apply
        </Button>
      </div>
    </div>
  );
}
