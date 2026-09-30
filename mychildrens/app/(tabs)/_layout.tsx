import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { selectActivePatient, selectUnreadCount } from "@/src/domain/selectors";
import { useI18n } from "@/src/i18n/use-i18n";
import { useChart } from "@/src/state/chart-context";
import { fontWeight, fonts, theme } from "@/src/ui/theme";

export default function TabsLayout() {
  const { state } = useChart();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  const patient = selectActivePatient(state);
  if (state.session.kind === "signed_out" || !patient) return <Redirect href="/welcome" />;
  const unread = selectUnreadCount(state, patient.child.id);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.onBlue,
        tabBarInactiveTintColor: theme.onBlueMuted,
        tabBarBadgeStyle: { backgroundColor: theme.pink, color: theme.white, fontFamily: fonts.semibold },
        tabBarStyle: {
          backgroundColor: theme.blue,
          borderTopColor: theme.blue,
          height: 60 + insets.bottom,
          paddingTop: 6,
          paddingBottom: 8 + insets.bottom,
        },
        tabBarLabelStyle: { fontFamily: fonts.semibold, fontWeight: fontWeight.subhead, fontSize: 11 },
        sceneStyle: { backgroundColor: theme.paper },
      }}
    >
      <Tabs.Screen name="home" options={{ title: t("dashboard"), tabBarIcon: ({ color }) => <Ionicons name="home" size={21} color={color} /> }} />
      <Tabs.Screen name="visits" options={{ title: t("visits"), tabBarIcon: ({ color }) => <Ionicons name="calendar" size={21} color={color} /> }} />
      <Tabs.Screen name="inbox" options={{ title: t("inbox"), tabBarBadge: unread > 0 ? unread : undefined, tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses" size={21} color={color} /> }} />
      <Tabs.Screen name="results" options={{ title: t("results"), tabBarIcon: ({ color }) => <Ionicons name="flask" size={21} color={color} /> }} />
      <Tabs.Screen name="family" options={{ title: t("family"), tabBarIcon: ({ color }) => <Ionicons name="people" size={21} color={color} /> }} />
    </Tabs>
  );
}
