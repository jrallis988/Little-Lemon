import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { ageLabel } from "@/src/domain/format";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { Avatar, Button, Card, FamilyHeader, Screen, T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function FamilyScreen() {
  const { state, dispatch } = useChart();
  const router = useRouter();
  const { t } = useI18n();
  if (!state.chart || !state.profile) return <Screen><T>Sign in to choose a chart.</T></Screen>;

  return (
    <Screen>
      <FamilyHeader kicker={state.profile.name} title={t("family")} />
      <T variant="small">{state.chart.guardian.relationship}</T>
      {state.chart.children.map(({ child }) => {
        const selected = child.id === state.activeChildId;
        return (
          <Pressable
            key={child.id}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={`${t("useThisChart")} ${child.preferredName}`}
            onPress={() => dispatch({ type: "select_child", id: child.id })}
          >
            <Card style={selected ? { borderColor: theme.ocean, borderWidth: 2 } : undefined}>
              <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                <Avatar initials={child.initials} color={child.color} size={48} />
                <View style={{ flex: 1 }}>
                  <T variant="label" style={{ fontSize: 18 }}>{child.name}</T>
                  <T variant="small">{ageLabel(child.birthDate)} · MRN {child.mrn}</T>
                  {selected ? <T variant="small" color={theme.ocean}>{t("switchChild")}</T> : null}
                </View>
              </View>
            </Card>
          </Pressable>
        );
      })}
      <Button label={t("dashboard")} onPress={() => router.push("/home")} />
      <Button label={t("settings")} variant="secondary" onPress={() => router.push("/settings")} />
      <Button label="Vaccines, growth, and allergies" variant="ghost" onPress={() => router.push("/summary")} />
    </Screen>
  );
}
