import { useLocalSearchParams, useRouter } from "expo-router";
import { echeckinState, formatWhen, oneParam } from "@/src/domain/format";
import { findVisit } from "@/src/domain/selectors";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { Button, Card, Pill, Screen, StackHeader, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function VisitScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = oneParam(params.id);
  const { state } = useChart();
  const { t } = useI18n();
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
        checkin === "open" ? <Button label={t("echeckin")} onPress={() => router.push(`/echeckin/${visit.id}`)} /> : undefined
      }
    >
      <StackHeader title={visit.title} subtitle={patient.child.preferredName} />
      <Card>
        <T variant="label" color={theme.ocean}>{formatWhen(visit.start)}</T>
        <T>{visit.reason}</T>
        <T color={theme.muted}>{visit.provider}</T>
        <T color={theme.muted}>{visit.specialty}</T>
        <T>{visit.location}</T>
        {visit.address ? <T variant="small">{visit.address}</T> : null}
        {visit.status === "cancelled" ? <Pill tone="danger" label="Canceled" /> : null}
        {visit.kind === "telehealth" ? <Pill label={t("telehealth")} /> : null}
        {checkin === "done" ? <Pill tone="ok" label={t("echeckinDone")} /> : null}
        {checkin === "closed" ? <T variant="small">eCheck-In opens 7 days before this visit.</T> : null}
      </Card>
      {visit.kind === "telehealth" ? (
        <Card>
          <T variant="label" color={theme.ocean}>{t("hospitalVideo")}</T>
          <T>{t("videoRoomNote")}</T>
          <T variant="small">{formatWhen(visit.start)} · {visit.provider}</T>
        </Card>
      ) : null}
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
