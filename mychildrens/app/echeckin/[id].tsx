import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { echeckinState, formatWhen, oneParam } from "@/src/domain/format";
import { findVisit } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Banner, Button, Card, Screen, StackHeader, T, TextField } from "@/src/ui/primitives";
import { fonts, theme } from "@/src/ui/theme";

export default function EcheckinScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = oneParam(params.id);
  const { state, dispatch } = useChart();
  const router = useRouter();
  const match = id ? findVisit(state, id) : null;
  const existing = id ? state.completedCheckins[id] : undefined;
  const [step, setStep] = useState(0);
  const [allergiesConfirmed, setAllergiesConfirmed] = useState(false);
  const [medicationsConfirmed, setMedicationsConfirmed] = useState(false);
  const [fever, setFever] = useState<"yes" | "no">("no");
  const [pharmacy, setPharmacy] = useState("Harbor Pharmacy, Brookline");

  if (!match) {
    return (
      <Screen>
        <StackHeader title="eCheck-In" />
        <T>This visit is not on the open chart.</T>
      </Screen>
    );
  }

  const { visit, patient } = match;
  const availability = echeckinState(visit, existing);
  if (existing || availability === "done") {
    return (
      <Screen footer={<Button label="Back to the visit" onPress={() => router.replace(`/visit/${visit.id}`)} />}>
        <StackHeader title="eCheck-In" subtitle={patient.child.preferredName} />
        <Banner tone="ok" text="eCheck-In is saved on this device for this visit." />
        <Card>
          <T>Fever in the last 48 hours: {existing?.fever === "yes" ? "Yes" : "No"}</T>
          <T>Pharmacy: {existing?.pharmacy}</T>
        </Card>
      </Screen>
    );
  }
  if (availability !== "open") {
    return (
      <Screen>
        <StackHeader title="eCheck-In" subtitle={patient.child.preferredName} />
        <T>eCheck-In opens 7 days before {formatWhen(visit.start)}.</T>
      </Screen>
    );
  }

  function finish() {
    dispatch({
      type: "complete_checkin",
      record: {
        visitId: visit.id,
        fever,
        pharmacy: pharmacy.trim() || "Not specified",
        completedAt: new Date().toISOString(),
      },
    });
    setStep(4);
  }

  return (
    <Screen
      footer={
        step < 4 ? (
          <Button
            label={step === 3 ? "Finish eCheck-In" : "Continue"}
            disabled={(step === 1 && !allergiesConfirmed) || (step === 2 && !medicationsConfirmed)}
            onPress={() => (step === 3 ? finish() : setStep((value) => value + 1))}
          />
        ) : (
          <Button label="Done" onPress={() => router.replace(`/visit/${visit.id}`)} />
        )
      }
    >
      <StackHeader title="eCheck-In" subtitle={`${patient.child.preferredName} · step ${Math.min(step + 1, 4)} of 4`} />
      <T variant="small">{visit.title} · {formatWhen(visit.start)}</T>
      {step === 0 ? (
        <Card>
          <T variant="title" style={{ fontSize: 22 }}>Confirm the visit</T>
          <T>{patient.child.name}</T>
          <T color={theme.muted}>{visit.provider} · {visit.location}</T>
          <T variant="small">Answers stay on this device. They are not sent to a clinic.</T>
        </Card>
      ) : null}
      {step === 1 ? (
        <Card>
          <T variant="title" style={{ fontSize: 22 }}>Allergies</T>
          {patient.allergies.length === 0 ? <T>No allergies are on file.</T> : patient.allergies.map((allergy) => (
            <T key={allergy.id}>{allergy.substance} · {allergy.reaction}</T>
          ))}
          <CheckRow label="I reviewed this list" checked={allergiesConfirmed} onPress={() => setAllergiesConfirmed((value) => !value)} />
        </Card>
      ) : null}
      {step === 2 ? (
        <Card>
          <T variant="title" style={{ fontSize: 22 }}>Medicines</T>
          {patient.medications.filter((med) => med.status === "active").length === 0 ? <T>No active medicines are on file.</T> : patient.medications.filter((med) => med.status === "active").map((med) => (
            <View key={med.id}>
              <T>{med.name}</T>
              <T variant="small">{med.instructions}</T>
            </View>
          ))}
          <CheckRow label="I reviewed this list" checked={medicationsConfirmed} onPress={() => setMedicationsConfirmed((value) => !value)} />
        </Card>
      ) : null}
      {step === 3 ? (
        <View style={{ gap: 12 }}>
          <Card>
            <T variant="title" style={{ fontSize: 22 }}>Two questions</T>
            <T>Has {patient.child.preferredName} had a fever in the last 48 hours?</T>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Button label="No" variant={fever === "no" ? "primary" : "secondary"} onPress={() => setFever("no")} />
              <Button label="Yes" variant={fever === "yes" ? "primary" : "secondary"} onPress={() => setFever("yes")} />
            </View>
            {fever === "yes" ? <Banner text="Tell the front desk when you arrive. This answer is not sent anywhere." /> : null}
          </Card>
          <TextField label="Preferred pharmacy" value={pharmacy} onChangeText={setPharmacy} />
        </View>
      ) : null}
      {step === 4 ? (
        <Card>
          <T variant="title" style={{ fontSize: 22 }}>You're checked in</T>
          <T>The front desk can see that you finished the sample questions on this device.</T>
        </Card>
      ) : null}
    </Screen>
  );
}

function CheckRow({ label, checked, onPress }: { label: string; checked: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={onPress} style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 }}>
      <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: checked ? theme.tealDark : theme.line, backgroundColor: checked ? theme.tealDark : theme.white }} />
      <T style={{ fontFamily: fonts.semibold }}>{label}</T>
    </Pressable>
  );
}
