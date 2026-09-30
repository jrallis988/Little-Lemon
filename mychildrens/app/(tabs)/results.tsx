import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { formatDay, interpretationLabel, needsReview } from "@/src/domain/format";
import { selectActivePatient, sortResults } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Card, FamilyHeader, Pill, Screen, Segment, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function ResultsScreen() {
  const { state } = useChart();
  const router = useRouter();
  const patient = selectActivePatient(state);
  const [filter, setFilter] = useState<"all" | "review">("all");
  if (!patient) return <Screen><T>Sign in to view results.</T></Screen>;
  const results = sortResults(patient.results).filter((result) => filter === "all" || needsReview(result.interpretation));

  return (
    <Screen>
      <FamilyHeader kicker={patient.child.preferredName} title="Results" />
      <Segment
        value={filter}
        onChange={setFilter}
        options={[
          { value: "all", label: "All" },
          { value: "review", label: "Needs review" },
        ]}
      />
      {results.length === 0 ? (
        <Card>
          <T variant="title" style={{ fontSize: 22 }}>{filter === "review" ? "Nothing flagged" : "No results yet"}</T>
          <T color={theme.muted}>
            {filter === "review" ? "High, low, and critical values will collect here." : "Lab results returned by the chart will show up here."}
          </T>
        </Card>
      ) : (
        results.map((result) => {
          const flag = interpretationLabel(result.interpretation);
          return (
            <Pressable key={result.id} accessibilityRole="button" onPress={() => router.push(`/result/${result.id}`)}>
              <Card>
                <T variant="small">{result.panel ? `${result.panel} · ` : ""}{formatDay(result.collectedAt)}</T>
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                  <T variant="label" style={{ fontSize: 16, flex: 1 }}>{result.name}</T>
                  <T variant="title" style={{ fontSize: 22 }} color={needsReview(result.interpretation) ? theme.danger : theme.ink}>{result.value}</T>
                </View>
                {flag ? <Pill tone={needsReview(result.interpretation) ? "danger" : "ok"} label={flag} /> : null}
              </Card>
            </Pressable>
          );
        })
      )}
    </Screen>
  );
}
