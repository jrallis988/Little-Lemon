import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '@/constants/theme';

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
  );
}

export default function MainLayout() {
  return (
    <View style={styles.root}>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: colors.header },
          headerTintColor: colors.headerText,
          headerTitleStyle: {
            fontFamily: fonts.sansBold,
            fontSize: 14,
            color: colors.headerText,
          },
          headerShadowVisible: false,
          sceneStyle: { backgroundColor: colors.backgroundElevated },
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: spacing.tabBar + 12,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarActiveTintColor: colors.link,
          tabBarInactiveTintColor: colors.textDim,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Featured',
            headerShown: false,
            tabBarLabel: ({ focused }) => <TabLabel label="Home" focused={focused} />,
            tabBarIcon: () => null,
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: 'Artists',
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <TabLabel label="Artists" focused={focused} />
            ),
            tabBarIcon: () => null,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Find',
            tabBarLabel: ({ focused }) => <TabLabel label="Find" focused={focused} />,
            tabBarIcon: () => null,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            href: null,
            headerShown: true,
          }}
        />
        <Tabs.Screen
          name="following"
          options={{
            title: 'Activity',
            tabBarLabel: ({ focused }) => <TabLabel label="Activity" focused={focused} />,
            tabBarIcon: () => null,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'You',
            tabBarLabel: ({ focused }) => <TabLabel label="You" focused={focused} />,
            tabBarIcon: () => null,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.backgroundElevated,
  },
  tabLabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
  },
  tabLabelFocused: {
    color: colors.link,
    fontFamily: fonts.sansBold,
  },
});
