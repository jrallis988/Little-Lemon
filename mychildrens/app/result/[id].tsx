import { useLocalSearchParams } from "expo-router";
import { formatWhen, interpretationLabel, needsReview, oneParam } from "@/src/domain/format";
import { findResult } from "@/src/domain/selectors";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { Card, Pill, Screen, StackHeader, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function ResultScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = oneParam(params.id);
  const { state } = useChart();
  const { t } = useI18n();
  const match = id ? findResult(state, id) : null;
  if (!match) {
    return (
      <Screen>
        <StackHeader title="Result" />
        <T>This result is not on the open chart.</T>
      </Screen>
    );
  }
  const { result, patient } = match;
  const flag = interpretationLabel(result.interpretation);
  return (
    <Screen>
      <StackHeader title={result.name} subtitle={patient.child.preferredName} />
      <Card>
        <T variant="display" color={needsReview(result.interpretation) ? theme.danger : theme.ink}>
          {result.value}{result.unit ? ` ${result.unit}` : ""}
        </T>
        {flag ? <Pill tone={needsReview(result.interpretation) ? "danger" : "ok"} label={flag} /> : null}
        {result.referenceRange ? <T>Reference range {result.referenceRange}</T> : null}
        <T variant="small">Collected {formatWhen(result.collectedAt)}</T>
        <T variant="small">Reported {formatWhen(result.reportedAt)} · {result.status === "preliminary" ? "Preliminary" : "Final"}</T>
        {result.panel ? <T variant="small">{result.panel}</T> : null}
      </Card>
      {result.note ? (
        <Card>
          <T variant="label" style={{ fontSize: 16 }}>{result.kind === "imaging" ? t("providerInterpretation") : t("noteLabel")}</T>
          <T>{result.note}</T>
        </Card>
      ) : null}
    </Screen>
  );
}
