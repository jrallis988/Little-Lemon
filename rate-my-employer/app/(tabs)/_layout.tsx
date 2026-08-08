import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { TABS } from '../../src/navigation/tabs';
import { colors, typography } from '../../src/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.ink },
        headerTintColor: colors.surface,
        headerTitleStyle: {
          fontFamily: typography.bodySemi,
          fontSize: 16,
        },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.key}
          name={tab.key}
          options={{
            title: tab.title,
            tabBarLabel: tab.prominent ? '' : tab.title,
            tabBarIcon: ({ color, focused, size }) => {
              if (tab.prominent) {
                return (
                  <View style={styles.contributeWrap}>
                    <View style={styles.contributeButton}>
                      <Ionicons name="add" size={28} color={colors.ink} />
                    </View>
                  </View>
                );
              }

              return (
                <Ionicons
                  name={(focused ? tab.iconFocused : tab.icon) as keyof typeof Ionicons.glyphMap}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBar,
    borderTopColor: colors.ink,
    height: 64,
    paddingTop: 6,
    paddingBottom: 8,
  },
  tabLabel: {
    fontFamily: typography.bodyMedium,
    fontSize: 11,
  },
  contributeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
  },
  contributeButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.tabBar,
  },
});
