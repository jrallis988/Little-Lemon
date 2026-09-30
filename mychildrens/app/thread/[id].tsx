import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { formatWhen, oneParam } from "@/src/domain/format";
import { selectActivePatient, selectMessages } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Button, Screen, StackHeader, T, TextField } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

function decodeId(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default function ThreadScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const threadId = decodeId(oneParam(params.id));
  const { state, dispatch } = useChart();
  const patient = selectActivePatient(state);
  const [draft, setDraft] = useState("");
  const patientId = patient?.child.id;
  const messages = patientId && threadId ? selectMessages(state, patientId).filter((message) => message.threadId === threadId) : [];
  const subject = messages[0]?.subject ?? "Message";

  useEffect(() => {
    if (!patientId || !threadId) return;
    dispatch({ type: "mark_thread_read", patientId, threadId });
  }, [dispatch, patientId, threadId]);

  if (!patient || !threadId || messages.length === 0) {
    return (
      <Screen>
        <StackHeader title="Message" />
        <T>This conversation is not on the open chart.</T>
      </Screen>
    );
  }

  return (
    <Screen
      footer={
        <View style={{ gap: 8 }}>
          <TextField label="Reply" value={draft} onChangeText={setDraft} multiline placeholder="Write a note for this device" />
          <Button
            label="Save reply"
            onPress={() => {
              dispatch({
                type: "send_reply",
                patientId: patient.child.id,
                threadId,
                subject,
                body: draft,
                now: new Date().toISOString(),
              });
              setDraft("");
            }}
          />
          <T variant="small">Saved on this device only. Not sent to the clinic.</T>
        </View>
      }
    >
      <StackHeader title={subject} subtitle={patient.child.preferredName} />
      <View style={{ gap: 10 }}>
        {messages.map((message) => {
          const outbound = message.direction === "out";
          return (
            <View
              key={message.id}
              style={{
                alignSelf: outbound ? "flex-end" : "flex-start",
                maxWidth: "88%",
                backgroundColor: outbound ? theme.tealDark : theme.card,
                borderRadius: 16,
                padding: 12,
                gap: 4,
                borderWidth: outbound ? 0 : 1,
                borderColor: theme.line,
              }}
            >
              <T variant="label" color={outbound ? "#D5EEF2" : theme.tealDark}>{message.fromName}</T>
              <T color={outbound ? theme.white : theme.ink}>{message.body}</T>
              <T variant="small" color={outbound ? "#D5EEF2" : theme.soft}>{formatWhen(message.sentAt)}</T>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}
