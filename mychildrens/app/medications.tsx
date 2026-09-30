import { formatDay } from "@/src/domain/format";
import { selectActivePatient } from "@/src/domain/selectors";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { Banner, Button, Card, FamilyHeader, Pill, Screen, SectionLabel, T } from "@/src/ui/primitives";

export default function MedicationsScreen() {
  const { state, dispatch } = useChart();
  const { t } = useI18n();
  const patient = selectActivePatient(state);
  if (!patient) return <Screen><T>Sign in to view medicines.</T></Screen>;
  const active = patient.medications.filter((med) => med.status === "active");
  const past = patient.medications.filter((med) => med.status !== "active");

  return (
    <Screen>
      <FamilyHeader back kicker={patient.child.preferredName} title={t("medications")} />
      <SectionLabel>{t("activeMeds")}</SectionLabel>
      {active.length === 0 ? <Card><T>{t("medications")}</T></Card> : active.map((med) => {
        const requested = state.refills.some((refill) => refill.medicationId === med.id);
        return (
          <Card key={med.id}>
            <T variant="label" style={{ fontSize: 17 }}>{med.name}</T>
            <T>{med.instructions}</T>
            <T variant="small">{med.prescriber}{med.startedOn ? ` · ${formatDay(med.startedOn)}` : ""}</T>
            {med.pharmacy ? <T variant="small">{med.pharmacy}</T> : null}
            {requested ? <Banner tone="ok" text={t("refillSaved")} /> : (
              <Button
                label={t("requestRefill")}
                variant="secondary"
                onPress={() => dispatch({
                  type: "request_refill",
                  request: {
                    id: `refill-${med.id}-${new Date().toISOString()}`,
                    patientId: patient.child.id,
                    medicationId: med.id,
                    medicationName: med.name,
                    pharmacy: med.pharmacy ?? "",
                    createdAt: new Date().toISOString(),
                  },
                })}
              />
            )}
          </Card>
        );
      })}
      {past.length > 0 ? <SectionLabel>{t("past")}</SectionLabel> : null}
      {past.map((med) => (
        <Card key={med.id}>
          <T variant="label" style={{ fontSize: 17 }}>{med.name}</T>
          <Pill label={med.status === "stopped" ? "Stopped" : "Completed"} />
          <T>{med.instructions}</T>
          <T variant="small">{med.prescriber}</T>
        </Card>
      ))}
    </Screen>
  );
}
