import { View } from "react-native";
import { formatDay, formatMeasure, ordinal } from "@/src/domain/format";
import { selectActivePatient } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Card, FamilyHeader, Screen, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function GrowthScreen() {
  const { state } = useChart();
  const patient = selectActivePatient(state);
  if (!patient) return <Screen><T>Sign in to view growth.</T></Screen>;
  const points = [...patient.growth].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Screen>
      <FamilyHeader back kicker={patient.child.preferredName} title="Growth" />
      <T variant="small">Percentiles are the values recorded in the chart. This device does not calculate them.</T>
      {points.length === 0 ? <Card><T>No height or weight measurements are on file.</T></Card> : points.map((point) => (
        <Card key={point.id}>
          <T variant="label" color={theme.ocean}>{formatDay(point.date)}</T>
          <Measure label="Height" value={point.heightCm} unit="cm" percentile={point.heightPercentile} />
          <Measure label="Weight" value={point.weightKg} unit="kg" percentile={point.weightPercentile} />
        </Card>
      ))}
    </Screen>
  );
}

function Measure({ label, value, unit, percentile }: { label: string; value?: number; unit: string; percentile?: number }) {
  if (value === undefined && percentile === undefined) return null;
  return (
    <View style={{ gap: 4 }}>
      <T>{label}{value !== undefined ? ` · ${formatMeasure(value, unit)}` : ""}{percentile !== undefined ? ` · ${ordinal(percentile)} percentile` : ""}</T>
      {percentile !== undefined ? (
        <View style={{ height: 8, borderRadius: 99, backgroundColor: theme.foam, overflow: "hidden" }}>
          <View style={{ width: `${Math.max(0, Math.min(100, percentile))}%`, height: 8, backgroundColor: theme.ocean }} />
        </View>
      ) : null}
    </View>
  );
}
