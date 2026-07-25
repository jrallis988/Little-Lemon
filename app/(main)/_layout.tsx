import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';
import { useAudioStore } from '@/store/useAudioStore';

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
  );
}

/**
 * Main tab shell. Global player lives in the root layout so it persists
 * across artist / track detail routes as well.
 */
export default function MainLayout() {
  const hasTrack = useAudioStore((s) => s.currentTrack != null);

  return (
    <View style={styles.root}>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: colors.backgroundElevated },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: 'SpaceMono',
            fontSize: 13,
            color: colors.phosphor,
          },
          headerShadowVisible: false,
          sceneStyle: { backgroundColor: colors.background },
          tabBarStyle: {
            backgroundColor: colors.backgroundElevated,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: spacing.tabBar + 12,
            paddingBottom: 8,
            paddingTop: 6,
            // Reserve space above the root-level GlobalAudioBar
            marginBottom: hasTrack ? spacing.audioBar : 0,
          },
          tabBarActiveTintColor: colors.phosphor,
          tabBarInactiveTintColor: colors.textDim,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'EDITORIAL',
            headerShown: false,
            tabBarLabel: ({ focused }) => <TabLabel label="HOME" focused={focused} />,
            tabBarIcon: () => null,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'SCENE',
            tabBarLabel: ({ focused }) => <TabLabel label="EXPLORE" focused={focused} />,
            tabBarIcon: () => null,
          }}
        />
        <Tabs.Screen
          name="following"
          options={{
            title: 'FOLLOWING',
            tabBarLabel: ({ focused }) => <TabLabel label="FEED" focused={focused} />,
            tabBarIcon: () => null,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'PROFILE',
            tabBarLabel: ({ focused }) => <TabLabel label="YOU" focused={focused} />,
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
    backgroundColor: colors.background,
  },
  tabLabel: {
    ...typography.monoTiny,
    color: colors.textDim,
  },
  tabLabelFocused: {
    color: colors.phosphor,
  },
});
