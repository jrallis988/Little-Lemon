import { useRouter } from "expo-router";
import { useState } from "react";
import { echeckinState, formatWhen } from "@/src/domain/format";
import { selectActivePatient, splitVisits } from "@/src/domain/selectors";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { Button, Card, FamilyHeader, Pill, Screen, SectionLabel, Segment, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function VisitsScreen() {
  const { state } = useChart();
  const router = useRouter();
  const { t } = useI18n();
  const patient = selectActivePatient(state);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  if (!patient) return <Screen><T>Sign in to view visits.</T></Screen>;
  const groups = splitVisits(patient.visits);
  const visits = tab === "upcoming" ? groups.upcoming : groups.past;
  const requests = state.requests.filter((request) => request.patientId === patient.child.id);

  return (
    <Screen>
      <FamilyHeader kicker={patient.child.preferredName} title={t("visits")} />
      <Segment
        value={tab}
        onChange={setTab}
        options={[
          { value: "upcoming", label: t("upcoming") },
          { value: "past", label: t("past") },
        ]}
      />
      {requests.length > 0 && tab === "upcoming" ? (
        <>
          <SectionLabel>{t("deviceRequests")}</SectionLabel>
          {requests.map((request) => (
            <Card key={request.id}>
              <T variant="label" style={{ fontSize: 16 }}>{request.reason}</T>
              <T variant="small">{request.preferred || t("chooseTime")}</T>
            </Card>
          ))}
        </>
      ) : null}
      {visits.length === 0 ? (
        <Card>
          <T variant="title" style={{ fontSize: 22 }}>{tab === "upcoming" ? t("nothingUpcoming") : t("nothingPast")}</T>
        </Card>
      ) : (
        visits.map((visit) => {
          const checkin = echeckinState(visit, state.completedCheckins[visit.id]);
          return (
            <Card key={visit.id}>
              <T variant="label" color={theme.tealDark}>{formatWhen(visit.start)}</T>
              <T variant="title" style={{ fontSize: 22 }}>{visit.title}</T>
              <T color={theme.muted}>{visit.provider} · {visit.kind === "telehealth" ? t("hospitalVideo") : visit.location}</T>
              {visit.kind === "telehealth" ? <Pill label={t("telehealth")} /> : null}
              {visit.status === "cancelled" ? <Pill tone="danger" label="Canceled" /> : null}
              {checkin === "done" ? <Pill tone="ok" label={t("echeckinDone")} /> : null}
              {checkin === "open" ? <Button label={t("echeckin")} onPress={() => router.push(`/echeckin/${visit.id}`)} /> : null}
              <Button
                label={visit.kind === "telehealth" ? t("telehealth") : t("viewVisit")}
                variant="secondary"
                onPress={() => router.push(`/visit/${visit.id}`)}
              />
            </Card>
          );
        })
      )}
      <Button label={t("requestVisit")} onPress={() => router.push("/schedule")} />
    </Screen>
  );
}
