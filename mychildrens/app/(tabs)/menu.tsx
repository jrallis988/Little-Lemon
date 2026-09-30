import { Ionicons } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import { Pressable, View } from "react-native";
import { ageLabel, hostOf } from "@/src/domain/format";
import { selectActivePatient } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { Avatar, FamilyHeader, PrototypeNote, Screen, T } from "@/src/ui/primitives";
import { fonts, theme } from "@/src/ui/theme";

const items: { label: string; detail: string; icon: keyof typeof Ionicons.glyphMap; href: Href }[] = [
  { label: "Medicines", detail: "Active and completed", icon: "medkit-outline", href: "/medications" },
  { label: "Vaccines", detail: "Due and recorded doses", icon: "bandage-outline", href: "/vaccines" },
  { label: "Growth", detail: "Height and weight", icon: "analytics-outline", href: "/growth" },
  { label: "Allergies and conditions", detail: "What the chart lists", icon: "alert-circle-outline", href: "/summary" },
  { label: "Billing", detail: "Statements for this child", icon: "card-outline", href: "/billing" },
  { label: "Care team", detail: "Clinicians on the chart", icon: "people-outline", href: "/care-team" },
  { label: "Request a visit", detail: "Saved on this device", icon: "calendar-outline", href: "/schedule" },
  { label: "Account", detail: "Connection and sign out", icon: "person-outline", href: "/account" },
];

export default function MenuScreen() {
  const { state } = useChart();
  const router = useRouter();
  const patient = selectActivePatient(state);
  if (!patient || !state.chart) return <Screen><T>Sign in to view the menu.</T></Screen>;
  const source = state.session.kind === "fhir" ? hostOf(state.session.iss) : "Sample family on this device";

  return (
    <Screen>
      <FamilyHeader kicker="Chart" title="Menu" />
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <Avatar initials={patient.child.initials} color={patient.child.color} size={48} />
        <View style={{ flex: 1 }}>
          <T variant="label" style={{ fontSize: 18 }}>{patient.child.name}</T>
          <T variant="small">{ageLabel(patient.child.birthDate)} · {source}</T>
        </View>
      </View>
      {items.map((item) => (
        <Pressable key={item.label} accessibilityRole="button" onPress={() => router.push(item.href)}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: theme.card, borderRadius: 16, borderWidth: 1, borderColor: theme.line, padding: 14 }}>
            <Ionicons name={item.icon} size={22} color={theme.tealDark} />
            <View style={{ flex: 1 }}>
              <T style={{ fontFamily: fonts.semibold }}>{item.label}</T>
              <T variant="small">{item.detail}</T>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.soft} />
          </View>
        </Pressable>
      ))}
      <PrototypeNote />
    </Screen>
  );
}
