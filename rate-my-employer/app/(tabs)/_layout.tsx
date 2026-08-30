import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { TABS } from '../../src/navigation/tabs';
import { colors, typography } from '../../src/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.navy },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontFamily: typography.bodySemi, fontSize: 16 },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.tabActive,
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
                  <View style={styles.writeWrap}>
                    <View style={styles.writeButton}>
                      <Ionicons name="add" size={28} color="#FFFFFF" />
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
    borderTopColor: colors.border,
    height: 64,
    paddingTop: 6,
    paddingBottom: 8,
  },
  tabLabel: {
    fontFamily: typography.bodyMedium,
    fontSize: 11,
  },
  writeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
  },
  writeButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.tabBar,
  },
});
