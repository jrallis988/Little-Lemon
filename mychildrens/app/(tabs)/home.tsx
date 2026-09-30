import { Ionicons } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import { Pressable, View } from "react-native";
import { formatMoney, formatWhen } from "@/src/domain/format";
import { selectActivePatient, selectBalanceCents, selectBills, selectUnreadCount, splitVisits } from "@/src/domain/selectors";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { greeting } from "@/src/domain/format";
import { Button, Card, FamilyHeader, Screen, T } from "@/src/ui/primitives";
import { fonts, theme } from "@/src/ui/theme";

export default function HomeScreen() {
  const { state } = useChart();
  const router = useRouter();
  const { t } = useI18n();
  const patient = selectActivePatient(state);
  const now = new Date();
  if (!patient || !state.chart || !state.profile) return <Screen><T>Sign in to view this chart.</T></Screen>;

  const bills = selectBills(state, patient);
  const balance = selectBalanceCents(bills);
  const unread = selectUnreadCount(state, patient.child.id);
  const upcoming = splitVisits(patient.visits, now).upcoming;
  const video = upcoming.find((visit) => visit.kind === "telehealth");
  const firstName = state.profile.name.split(" ")[0] ?? state.profile.name;

  const actions: { label: string; icon: keyof typeof Ionicons.glyphMap; href: Href; badge?: string }[] = [
    { label: t("schedule"), icon: "calendar", href: "/schedule" },
    { label: t("messages"), icon: "chatbubble-ellipses", href: "/inbox", badge: unread > 0 ? String(unread) : undefined },
    { label: t("visits"), icon: "medkit", href: "/visits" },
    { label: t("results"), icon: "flask", href: "/results" },
    { label: t("medications"), icon: "bandage", href: "/medications" },
    { label: t("billing"), icon: "card", href: "/billing" },
  ];

  return (
    <Screen>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <FamilyHeader kicker={greeting(now)} title={firstName} />
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel={t("settings")} onPress={() => router.push("/settings")} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.line, alignItems: "center", justifyContent: "center", marginTop: 8 }}>
          <Ionicons name="settings-outline" size={20} color={theme.ink} />
        </Pressable>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel={t("family")} onPress={() => router.push("/family")}>
        <Card>
          <T variant="small">{patient.child.name}</T>
          <T variant="label" style={{ fontSize: 16 }}>{t("family")}</T>
        </Card>
      </Pressable>

      {video ? (
        <Card>
          <T variant="label" color={theme.tealDark}>{t("telehealth")}</T>
          <T variant="title" style={{ fontSize: 22 }}>{video.title}</T>
          <T>{formatWhen(video.start)}</T>
          <T color={theme.muted}>{video.provider} · {t("hospitalVideo")}</T>
          <Button label={t("viewVisit")} variant="secondary" onPress={() => router.push(`/visit/${video.id}`)} />
        </Card>
      ) : null}

      {balance > 0 ? (
        <Card>
          <T variant="label" color={theme.warn}>{t("billingAlert")}</T>
          <T variant="title" style={{ fontSize: 28 }}>{formatMoney(balance)}</T>
          <T variant="small">{patient.child.preferredName}</T>
          <Button label={t("billing")} variant="secondary" onPress={() => router.push("/billing")} />
        </Card>
      ) : null}

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {actions.map((action) => (
          <Pressable
            key={action.label}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            onPress={() => router.push(action.href)}
            style={{ flexGrow: 1, flexBasis: "46%", minHeight: 104, backgroundColor: theme.card, borderRadius: 16, borderWidth: 1, borderColor: theme.line, padding: 14, justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Ionicons name={action.icon} size={22} color={theme.tealDark} />
              {action.badge ? (
                <View style={{ minWidth: 22, height: 22, borderRadius: 11, backgroundColor: theme.apricot, alignItems: "center", justifyContent: "center", paddingHorizontal: 6 }}>
                  <TextBadge value={action.badge} />
                </View>
              ) : null}
            </View>
            <T style={{ fontFamily: fonts.semibold }}>{action.label}</T>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

function TextBadge({ value }: { value: string }) {
  return <T variant="label" color={theme.white} style={{ fontSize: 12 }}>{value}</T>;
}
