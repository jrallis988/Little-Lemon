import { Ionicons } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import { Pressable, View } from "react-native";
import { echeckinState, formatMoney, formatWhen, greeting, interpretationLabel, needsReview } from "@/src/domain/format";
import { selectActivePatient, selectBalanceCents, selectBills, selectThreads, selectUnreadCount, sortResults, splitVisits } from "@/src/domain/selectors";
import { buildTodos } from "@/src/domain/todos";
import { useChart } from "@/src/state/chart-context";
import { Banner, Button, Card, FamilyHeader, Pill, Row, Screen, SectionLabel, T } from "@/src/ui/primitives";
import { fonts, theme } from "@/src/ui/theme";

const links: { label: string; icon: keyof typeof Ionicons.glyphMap; href: Href }[] = [
  { label: "Medicines", icon: "medkit", href: "/medications" },
  { label: "Vaccines", icon: "bandage", href: "/vaccines" },
  { label: "Growth", icon: "analytics", href: "/growth" },
  { label: "Billing", icon: "card", href: "/billing" },
];

export default function HomeScreen() {
  const { state } = useChart();
  const router = useRouter();
  const patient = selectActivePatient(state);
  const now = new Date();
  if (!patient || !state.chart) return <Screen><T>Sign in to view this chart.</T></Screen>;

  const bills = selectBills(state, patient);
  const unread = selectUnreadCount(state, patient.child.id);
  const todos = buildTodos({ patient, completedCheckins: state.completedCheckins, bills, unreadCount: unread, now });
  const next = splitVisits(patient.visits, now).upcoming[0];
  const checkin = next ? echeckinState(next, state.completedCheckins[next.id], now) : null;
  const latestResult = sortResults(patient.results)[0];
  const latestThread = selectThreads(state, patient.child.id)[0];
  const balance = selectBalanceCents(bills);
  const firstName = state.chart.guardian.name.split(" ")[0] ?? state.chart.guardian.name;

  return (
    <Screen>
      <FamilyHeader kicker={greeting(now)} title={firstName ?? "Hello"} />
      {state.warnings.length > 0 ? <Banner text="Some sections did not load from the health system. The list is on Account." /> : null}
      {next ? (
        <Card>
          <T variant="label" color={theme.tealDark}>Next visit</T>
          <T variant="title">{next.title}</T>
          <T>{formatWhen(next.start)}</T>
          <T color={theme.muted}>{next.provider} · {next.location}</T>
          {checkin === "open" ? <Button label="Start eCheck-In" onPress={() => router.push(`/echeckin/${next.id}`)} /> : null}
          {checkin === "done" ? <Pill tone="ok" label="eCheck-In complete" /> : null}
          {checkin === "closed" ? <T variant="small">eCheck-In opens 7 days before this visit.</T> : null}
          <Button label="Visit details" variant="secondary" onPress={() => router.push(`/visit/${next.id}`)} />
        </Card>
      ) : (
        <Card>
          <T variant="title">No upcoming visits</T>
          <T color={theme.muted}>Request a time and keep it with this chart.</T>
          <Button label="Request a visit" onPress={() => router.push("/schedule")} />
        </Card>
      )}

      <SectionLabel>To do</SectionLabel>
      {todos.length === 0 ? (
        <Card><T>Nothing is waiting for {patient.child.preferredName}.</T></Card>
      ) : (
        todos.map((todo) => (
          <Row
            key={todo.id}
            title={todo.title}
            detail={todo.detail}
            onPress={() => router.push(todo.href as Href)}
            trailing={todo.tone === "attention" ? <Pill tone="warn" label="Soon" /> : undefined}
          />
        ))
      )}

      {latestResult ? (
        <Card>
          <T variant="label" color={theme.tealDark}>Latest result</T>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <T variant="label" style={{ fontSize: 16 }}>{latestResult.name}</T>
              <T variant="small">{formatWhen(latestResult.collectedAt)}</T>
            </View>
            <T variant="title" style={{ fontSize: 22 }} color={needsReview(latestResult.interpretation) ? theme.danger : theme.ink}>
              {latestResult.value}
            </T>
          </View>
          {interpretationLabel(latestResult.interpretation) ? <Pill tone={needsReview(latestResult.interpretation) ? "danger" : "ok"} label={interpretationLabel(latestResult.interpretation) ?? ""} /> : null}
          <Button label="Open result" variant="secondary" onPress={() => router.push(`/result/${latestResult.id}`)} />
        </Card>
      ) : null}

      {latestThread ? (
        <Row
          title={latestThread.subject}
          detail={`${latestThread.fromName} · ${latestThread.preview}`}
          onPress={() => router.push(`/thread/${latestThread.threadId}`)}
          trailing={latestThread.unreadCount > 0 ? <Pill tone="warn" label="New" /> : undefined}
        />
      ) : null}

      {balance > 0 ? <T variant="small">Balance on file: {formatMoney(balance)}</T> : null}

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {links.map((link) => (
          <Pressable
            key={link.label}
            accessibilityRole="button"
            onPress={() => router.push(link.href)}
            style={{ flexGrow: 1, flexBasis: "46%", backgroundColor: theme.card, borderRadius: 16, borderWidth: 1, borderColor: theme.line, padding: 14, gap: 8 }}
          >
            <Ionicons name={link.icon} size={20} color={theme.tealDark} />
            <T style={{ fontFamily: fonts.semibold }}>{link.label}</T>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
