import { useRouter } from "expo-router";
import { useState } from "react";
import { formatWhen } from "@/src/domain/format";
import { selectActivePatient, selectThreads } from "@/src/domain/selectors";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { Banner, Button, Card, FamilyHeader, Pill, Row, Screen, T, TextField } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function InboxScreen() {
  const { state, dispatch } = useChart();
  const router = useRouter();
  const { t } = useI18n();
  const patient = selectActivePatient(state);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [saved, setSaved] = useState(false);
  if (!patient) return <Screen><T>Sign in to view messages.</T></Screen>;
  const threads = selectThreads(state, patient.child.id);

  return (
    <Screen>
      <FamilyHeader kicker={patient.child.preferredName} title={t("inbox")} />
      <T variant="small">{t("saved")}</T>
      <Button label={t("newMessage")} variant="secondary" onPress={() => setOpen((value) => !value)} />
      {open ? (
        <Card>
          <TextField label={t("messageSubject")} value={subject} onChangeText={setSubject} />
          <TextField label={t("messageBody")} value={body} onChangeText={setBody} multiline placeholder={t("messageBody")} />
          <Button
            label={t("saveMessage")}
            disabled={!body.trim()}
            onPress={() => {
              const now = new Date().toISOString();
              dispatch({
                type: "send_reply",
                patientId: patient.child.id,
                threadId: `local-${now}`,
                subject: subject.trim() || t("newMessage"),
                body,
                now,
              });
              setSubject("");
              setBody("");
              setOpen(false);
              setSaved(true);
            }}
          />
        </Card>
      ) : null}
      {saved ? <Banner tone="ok" text={t("saved")} /> : null}
      {threads.length === 0 ? (
        <Card>
          <T variant="title" style={{ fontSize: 22 }}>{t("messages")}</T>
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
