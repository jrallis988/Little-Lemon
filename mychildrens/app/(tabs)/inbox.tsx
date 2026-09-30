import { useRouter } from "expo-router";
import { formatWhen } from "@/src/domain/format";
import { selectActivePatient, selectThreads } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Card, FamilyHeader, Pill, Row, Screen, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function InboxScreen() {
  const { state } = useChart();
  const router = useRouter();
  const patient = selectActivePatient(state);
  if (!patient) return <Screen><T>Sign in to view messages.</T></Screen>;
  const threads = selectThreads(state, patient.child.id);

  return (
    <Screen>
      <FamilyHeader kicker={patient.child.preferredName} title="Inbox" />
      <T variant="small">Replies stay on this device. They are not sent to the clinic.</T>
      {threads.length === 0 ? (
        <Card>
          <T variant="title" style={{ fontSize: 22 }}>No messages</T>
          <T color={theme.muted}>Notes from the care team will land here.</T>
        </Card>
      ) : (
        threads.map((thread) => (
          <Row
            key={thread.threadId}
            title={thread.subject}
            detail={`${thread.fromName} · ${formatWhen(thread.sentAt)}\n${thread.preview}`}
            onPress={() => router.push(`/thread/${encodeURIComponent(thread.threadId)}`)}
            trailing={thread.unreadCount > 0 ? <Pill tone="warn" label="New" /> : undefined}
          />
        ))
      )}
    </Screen>
  );
}
