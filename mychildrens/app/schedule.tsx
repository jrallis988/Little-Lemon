import { useState } from "react";
import { Pressable, View } from "react-native";
import { OPENINGS, SYMPTOMS, routeSymptom, type Symptom } from "@/src/domain/schedule";
import { selectActivePatient } from "@/src/domain/selectors";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { Banner, Button, Card, Screen, StackHeader, T } from "@/src/ui/primitives";
import { fontWeight, fonts, theme } from "@/src/ui/theme";

const symptomKey = {
  fever: "symptomFever",
  ear: "symptomEar",
  breathing: "symptomBreathing",
  rash: "symptomRash",
  well: "symptomWell",
  other: "symptomOther",
} as const;

export default function ScheduleScreen() {
  const { state, dispatch } = useChart();
  const { t } = useI18n();
  const patient = selectActivePatient(state);
  const [mode, setMode] = useState<"choose" | "symptom" | "time">("choose");
  const [symptom, setSymptom] = useState<Symptom | null>(null);
  const [slotId, setSlotId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  if (!patient) return <Screen><StackHeader title={t("schedule")} /><T>Sign in to schedule.</T></Screen>;

  const route = symptom ? routeSymptom(symptom) : null;
  const slot = OPENINGS.find((opening) => opening.id === slotId);
  const reason = route ? `${route.visitTitle}: ${t(symptomKey[route.symptom])}` : t("directPath");

  return (
    <Screen
      footer={
        mode === "time" ? (
          <Button
            label={t("confirmRequest")}
            disabled={!slot}
            onPress={() => {
              if (!slot) return;
              dispatch({
                type: "request_visit",
                request: {
                  id: `request-${new Date().toISOString()}`,
                  patientId: patient.child.id,
                  reason,
                  preferred: `${slot.label} · ${slot.clinic}`,
                  notes: route?.urgent ? "Breathing concern" : "",
                  createdAt: new Date().toISOString(),
                },
              });
              setSaved(true);
            }}
          />
        ) : undefined
      }
    >
      <StackHeader title={t("schedule")} subtitle={patient.child.preferredName} />
      <T variant="small">Requests stay on this device until the hospital books them.</T>
      {saved ? <Banner tone="ok" text={t("saved")} /> : null}
      {mode === "choose" ? (
        <View style={{ gap: 10 }}>
          <Button label={t("symptomPath")} onPress={() => setMode("symptom")} />
          <Button label={t("directPath")} variant="secondary" onPress={() => { setSymptom(null); setMode("time"); }} />
        </View>
      ) : null}
      {mode === "symptom" ? (
        <View style={{ gap: 10 }}>
          {SYMPTOMS.map((item) => (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected: symptom === item }}
              onPress={() => setSymptom(item)}
            >
              <Card style={symptom === item ? { borderColor: theme.ocean, borderWidth: 2 } : undefined}>
                <T style={{ fontFamily: fonts.semibold, fontWeight: fontWeight.subhead }}>{t(symptomKey[item])}</T>
                <T variant="small">{routeSymptom(item).visitTitle} · {routeSymptom(item).clinic}</T>
              </Card>
            </Pressable>
          ))}
          {route?.urgent ? <Banner text={t("breathingWarning")} /> : null}
          <Button label={t("chooseTime")} disabled={!symptom} onPress={() => setMode("time")} />
        </View>
      ) : null}
      {mode === "time" ? (
        <View style={{ gap: 10 }}>
          {route?.urgent ? <Banner text={t("breathingWarning")} /> : null}
          <T variant="label" style={{ fontSize: 16 }}>{reason}</T>
          {OPENINGS.map((opening) => (
            <Pressable key={opening.id} accessibilityRole="button" accessibilityState={{ selected: slotId === opening.id }} onPress={() => setSlotId(opening.id)}>
              <Card style={slotId === opening.id ? { borderColor: theme.ocean, borderWidth: 2 } : undefined}>
                <T style={{ fontFamily: fonts.semibold, fontWeight: fontWeight.subhead }}>{opening.label}</T>
                <T variant="small">{opening.clinic}</T>
              </Card>
            </Pressable>
          ))}
        </View>
      ) : null}
    </Screen>
  );
}
