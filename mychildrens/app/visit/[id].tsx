import { useLocalSearchParams, useRouter } from "expo-router";
import { echeckinState, formatWhen, oneParam } from "@/src/domain/format";
import { findVisit } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Button, Card, Pill, Screen, StackHeader, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function VisitScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = oneParam(params.id);
  const { state } = useChart();
  const router = useRouter();
  const match = id ? findVisit(state, id) : null;
  if (!match) {
    return (
      <Screen>
        <StackHeader title="Visit" />
        <T>This visit is not on the open chart.</T>
      </Screen>
    );
  }
  const { visit, patient } = match;
  const checkin = echeckinState(visit, state.completedCheckins[visit.id]);

  return (
    <Screen
      footer={
        checkin === "open" ? <Button label="Start eCheck-In" onPress={() => router.push(`/echeckin/${visit.id}`)} /> : undefined
      }
    >
      <StackHeader title={visit.title} subtitle={patient.child.preferredName} />
      <Card>
        <T variant="label" color={theme.tealDark}>{formatWhen(visit.start)}</T>
        <T>{visit.reason}</T>
        <T color={theme.muted}>{visit.provider}</T>
        <T color={theme.muted}>{visit.specialty}</T>
        <T>{visit.location}</T>
        {visit.address ? <T variant="small">{visit.address}</T> : null}
        {visit.status === "cancelled" ? <Pill tone="danger" label="Canceled" /> : null}
        {checkin === "done" ? <Pill tone="ok" label="eCheck-In complete" /> : null}
        {checkin === "closed" ? <T variant="small">eCheck-In opens 7 days before this visit.</T> : null}
      </Card>
      {visit.instructions.length > 0 ? (
        <Card>
          <T variant="label" style={{ fontSize: 16 }}>Before you arrive</T>
          {visit.instructions.map((instruction) => (
            <T key={instruction}>{instruction}</T>
          ))}
        </Card>
      ) : null}
      {visit.summary ? (
        <Card>
          <T variant="label" style={{ fontSize: 16 }}>After-visit summary</T>
          <T>{visit.summary}</T>
          <T variant="small">Copied from the sample clinic note. A hospital connection shows the document the server returns.</T>
        </Card>
      ) : null}
    </Screen>
  );
}
