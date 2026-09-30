import { useState } from "react";
import { selectActivePatient } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Banner, Button, Card, Screen, StackHeader, T, TextField } from "@/src/ui/primitives";

export default function ScheduleScreen() {
  const { state, dispatch } = useChart();
  const patient = selectActivePatient(state);
  const [reason, setReason] = useState("");
  const [preferred, setPreferred] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  if (!patient) return <Screen><StackHeader title="Request a visit" /><T>Sign in to request a visit.</T></Screen>;
  const requests = state.requests.filter((request) => request.patientId === patient.child.id);

  return (
    <Screen
      footer={
        <Button
          label="Save request"
          disabled={!reason.trim()}
          onPress={() => {
            dispatch({
              type: "request_visit",
              request: {
                id: `request-${new Date().toISOString()}`,
                patientId: patient.child.id,
                reason: reason.trim(),
                preferred: preferred.trim(),
                notes: notes.trim(),
                createdAt: new Date().toISOString(),
              },
            });
            setReason("");
            setPreferred("");
            setNotes("");
            setSaved(true);
          }}
        />
      }
    >
      <StackHeader title="Request a visit" subtitle={patient.child.preferredName} />
      <T variant="small">Requests stay on this device. They are not booked with a clinic.</T>
      {saved ? <Banner tone="ok" text="Request saved on this device." /> : null}
      <TextField label="Reason" value={reason} onChangeText={setReason} placeholder="Well visit, rash, follow-up…" />
      <TextField label="Preferred time" value={preferred} onChangeText={setPreferred} placeholder="Weekday mornings" />
      <TextField label="Notes" value={notes} onChangeText={setNotes} multiline placeholder="Optional" />
      {requests.map((request) => (
        <Card key={request.id}>
          <T variant="label" style={{ fontSize: 16 }}>{request.reason}</T>
          <T variant="small">{request.preferred || "No preferred time"}</T>
          {request.notes ? <T variant="small">{request.notes}</T> : null}
        </Card>
      ))}
    </Screen>
  );
}
