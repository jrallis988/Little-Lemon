import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { formatDay, interpretationLabel, needsReview } from "@/src/domain/format";
import { selectActivePatient, sortResults } from "@/src/domain/selectors";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { Card, FamilyHeader, Pill, Screen, Segment, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

type ResultFilter = "all" | "labs" | "imaging";

export default function ResultsScreen() {
  const { state } = useChart();
  const router = useRouter();
  const { t } = useI18n();
  const patient = selectActivePatient(state);
  const [filter, setFilter] = useState<ResultFilter>("all");
  if (!patient) return <Screen><T>Sign in to view results.</T></Screen>;
  const results = sortResults(patient.results).filter((result) => {
    const kind = result.kind ?? "lab";
    if (filter === "labs") return kind === "lab";
    if (filter === "imaging") return kind === "imaging";
    return true;
  });

  return (
    <Screen>
      <FamilyHeader kicker={patient.child.preferredName} title={t("results")} />
      <Segment
        value={filter}
        onChange={setFilter}
        options={[
          { value: "all", label: t("all") },
          { value: "labs", label: t("labs") },
          { value: "imaging", label: t("imaging") },
        ]}
      />
      {results.length === 0 ? (
        <Card>
          <T variant="title" style={{ fontSize: 22 }}>{filter === "imaging" ? t("imaging") : t("labs")}</T>
        </Card>
      ) : (
        results.map((result) => {
          const flag = interpretationLabel(result.interpretation);
          const imaging = result.kind === "imaging";
          return (
            <Pressable key={result.id} accessibilityRole="button" accessibilityLabel={result.name} onPress={() => router.push(`/result/${result.id}`)}>
              <Card>
                <T variant="small">{imaging ? t("imaging") : t("labs")} · {formatDay(result.collectedAt)}</T>
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
