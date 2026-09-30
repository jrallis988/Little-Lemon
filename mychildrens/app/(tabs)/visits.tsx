import { useRouter } from "expo-router";
import { useState } from "react";
import { echeckinState, formatWhen } from "@/src/domain/format";
import { selectActivePatient, splitVisits } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Button, Card, FamilyHeader, Pill, Screen, SectionLabel, Segment, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function VisitsScreen() {
  const { state } = useChart();
  const router = useRouter();
  const patient = selectActivePatient(state);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  if (!patient) return <Screen><T>Sign in to view visits.</T></Screen>;
  const groups = splitVisits(patient.visits);
  const visits = tab === "upcoming" ? groups.upcoming : groups.past;
  const requests = state.requests.filter((request) => request.patientId === patient.child.id);

  return (
    <Screen>
      <FamilyHeader kicker={patient.child.preferredName} title="Visits" />
      <Segment
        value={tab}
        onChange={setTab}
        options={[
          { value: "upcoming", label: "Upcoming" },
          { value: "past", label: "Past" },
        ]}
      />
      {requests.length > 0 && tab === "upcoming" ? (
        <ViewRequests requests={requests} />
      ) : null}
      {visits.length === 0 ? (
        <Card>
          <T variant="title" style={{ fontSize: 22 }}>{tab === "upcoming" ? "Nothing scheduled" : "No past visits"}</T>
          <T color={theme.muted}>
            {tab === "upcoming" ? `Request a visit for ${patient.child.preferredName}.` : "Finished visits will show the clinic summary."}
          </T>
        </Card>
      ) : (
        visits.map((visit) => {
          const checkin = echeckinState(visit, state.completedCheckins[visit.id]);
          return (
            <Card key={visit.id}>
              <T variant="label" color={theme.tealDark}>{formatWhen(visit.start)}</T>
              <T variant="title" style={{ fontSize: 22 }}>{visit.title}</T>
              <T color={theme.muted}>{visit.provider} · {visit.location}</T>
              {visit.status === "cancelled" ? <Pill tone="danger" label="Canceled" /> : null}
              {checkin === "done" ? <Pill tone="ok" label="eCheck-In complete" /> : null}
              <Button label="View visit" variant="secondary" onPress={() => router.push(`/visit/${visit.id}`)} />
            </Card>
          );
        })
      )}
      <Button label="Request a visit" onPress={() => router.push("/schedule")} />
    </Screen>
  );
}

function ViewRequests({ requests }: { requests: { id: string; reason: string; preferred: string }[] }) {
  return (
    <>
      <SectionLabel>Requests on this device</SectionLabel>
      {requests.map((request) => (
        <Card key={request.id}>
          <T variant="label" style={{ fontSize: 16 }}>{request.reason}</T>
          <T variant="small">{request.preferred || "No preferred time yet"}</T>
        </Card>
      ))}
    </>
  );
}
