import { formatDay } from "@/src/domain/format";
import { selectActivePatient } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Card, FamilyHeader, Pill, Screen, SectionLabel, T } from "@/src/ui/primitives";

export default function SummaryScreen() {
  const { state } = useChart();
  const patient = selectActivePatient(state);
  if (!patient) return <Screen><T>Sign in to view the summary.</T></Screen>;
  return (
    <Screen>
      <FamilyHeader back kicker={patient.child.preferredName} title="Health summary" />
      <SectionLabel>Allergies</SectionLabel>
      {patient.allergies.length === 0 ? <Card><T>No allergies are on file.</T></Card> : patient.allergies.map((allergy) => (
        <Card key={allergy.id}>
          <T variant="label" style={{ fontSize: 17 }}>{allergy.substance}</T>
          <Pill label={allergy.severity === "severe" ? "Severe" : allergy.severity === "moderate" ? "Moderate" : "Mild"} tone={allergy.severity === "severe" ? "danger" : "warn"} />
          <T>{allergy.reaction}</T>
          <T variant="small">{allergy.status === "active" ? "Active" : "Resolved"}</T>
        </Card>
      ))}
      <SectionLabel>Conditions</SectionLabel>
      {patient.conditions.length === 0 ? <Card><T>No conditions are on file.</T></Card> : patient.conditions.map((condition) => (
        <Card key={condition.id}>
          <T variant="label" style={{ fontSize: 17 }}>{condition.name}</T>
          <Pill label={condition.status === "active" ? "Active" : "Resolved"} tone={condition.status === "active" ? "warn" : "ok"} />
          {condition.onset ? <T variant="small">Noted {formatDay(condition.onset)}</T> : null}
        </Card>
      ))}
    </Screen>
  );
}
