import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { selectActivePatient, selectUnreadCount } from "@/src/domain/selectors";
import { useChart } from "@/src/state/chart-context";
import { fonts, theme } from "@/src/ui/theme";

export default function TabsLayout() {
  const { state } = useChart();
  const insets = useSafeAreaInsets();
  const patient = selectActivePatient(state);
  if (state.session.kind === "signed_out" || !patient) return <Redirect href="/login" />;
  const unread = selectUnreadCount(state, patient.child.id);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tealDark,
        tabBarInactiveTintColor: theme.soft,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.line,
          height: 60 + insets.bottom,
          paddingTop: 6,
          paddingBottom: 8 + insets.bottom,
        },
        tabBarLabelStyle: { fontFamily: fonts.semibold, fontSize: 11 },
        sceneStyle: { backgroundColor: theme.paper },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={21} color={color} />,
        }}
      />
      <Tabs.Screen
        name="visits"
        options={{
          title: "Visits",
          tabBarIcon: ({ color }) => <Ionicons name="calendar" size={21} color={color} />,
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: "Results",
          tabBarIcon: ({ color }) => <Ionicons name="flask" size={21} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarBadge: unread > 0 ? unread : undefined,
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses" size={21} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => <Ionicons name="grid" size={21} color={color} />,
        }}
      />
    </Tabs>
  );
}
