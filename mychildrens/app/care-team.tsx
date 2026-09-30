import { selectActivePatient } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Card, FamilyHeader, Screen, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function CareTeamScreen() {
  const { state } = useChart();
  const patient = selectActivePatient(state);
  if (!patient) return <Screen><T>Sign in to view the care team.</T></Screen>;
  return (
    <Screen>
      <FamilyHeader kicker={patient.child.preferredName} title="Care team" />
      {patient.careTeam.length === 0 ? <Card><T>No care team is on file.</T></Card> : patient.careTeam.map((member) => (
        <Card key={member.id}>
          <T variant="label" style={{ fontSize: 17 }}>{member.name}</T>
          <T color={theme.muted}>{member.role}</T>
          <T variant="small">{member.clinic}</T>
        </Card>
      ))}
    </Screen>
  );
}
