import { formatDay } from "@/src/domain/format";
import { selectActivePatient, sortVaccines } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Card, FamilyHeader, Pill, Screen, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function VaccinesScreen() {
  const { state } = useChart();
  const patient = selectActivePatient(state);
  if (!patient) return <Screen><T>Sign in to view vaccines.</T></Screen>;
  const vaccines = sortVaccines(patient.vaccines);
  return (
    <Screen>
      <FamilyHeader back kicker={patient.child.preferredName} title="Vaccines" />
      <T variant="small">
        Due and overdue items are part of the sample chart. A hospital connection shows the immunizations that server returns.
      </T>
      {vaccines.length === 0 ? <Card><T>No vaccines are on file.</T></Card> : vaccines.map((vaccine) => (
        <Card key={vaccine.id}>
          <T variant="label" style={{ fontSize: 17 }}>{vaccine.name}</T>
          <Pill
            label={vaccine.status === "completed" ? "Recorded" : vaccine.status === "overdue" ? "Overdue" : "Due"}
            tone={vaccine.status === "completed" ? "ok" : vaccine.status === "overdue" ? "danger" : "warn"}
          />
          <T variant="small" color={theme.muted}>
            {[vaccine.doseLabel, vaccine.date ? formatDay(vaccine.date) : undefined].filter(Boolean).join(" · ") || "No date recorded"}
          </T>
        </Card>
      ))}
    </Screen>
  );
}
