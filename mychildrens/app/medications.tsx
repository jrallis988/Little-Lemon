import { formatDay } from "@/src/domain/format";
import { selectActivePatient } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Card, FamilyHeader, Pill, Screen, SectionLabel, T } from "@/src/ui/primitives";

export default function MedicationsScreen() {
  const { state } = useChart();
  const patient = selectActivePatient(state);
  if (!patient) return <Screen><T>Sign in to view medicines.</T></Screen>;
  const active = patient.medications.filter((med) => med.status === "active");
  const past = patient.medications.filter((med) => med.status !== "active");

  return (
    <Screen>
      <FamilyHeader kicker={patient.child.preferredName} title="Medicines" />
      <SectionLabel>Active</SectionLabel>
      {active.length === 0 ? <Card><T>No active medicines are on file.</T></Card> : active.map((med) => (
        <Card key={med.id}>
          <T variant="label" style={{ fontSize: 17 }}>{med.name}</T>
          <T>{med.instructions}</T>
          <T variant="small">{med.prescriber}{med.startedOn ? ` · started ${formatDay(med.startedOn)}` : ""}</T>
        </Card>
      ))}
      {past.length > 0 ? <SectionLabel>Completed or stopped</SectionLabel> : null}
      {past.map((med) => (
        <Card key={med.id}>
          <ViewRow name={med.name} status={med.status === "stopped" ? "Stopped" : "Completed"} />
          <T>{med.instructions}</T>
          <T variant="small">{med.prescriber}</T>
        </Card>
      ))}
    </Screen>
  );
}

function ViewRow({ name, status }: { name: string; status: string }) {
  return (
    <>
      <T variant="label" style={{ fontSize: 17 }}>{name}</T>
      <Pill label={status} />
    </>
  );
}
