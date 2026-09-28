import { Redirect, Tabs } from 'expo-router';
import { Platform, Text } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { fonts, palette } from '@/constants/theme';

export default function TabLayout() {
  const { user, isLoading } = useAuth();

  if (!isLoading && !user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.ink,
        tabBarInactiveTintColor: palette.inkFaint,
        tabBarStyle: {
          backgroundColor: palette.paper,
          borderTopColor: 'rgba(11, 31, 42, 0.1)',
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.bodyMedium,
          fontSize: 11,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontSize: focused ? 18 : 16, fontFamily: fonts.bodyBold }}>☰</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: 'Log',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontSize: focused ? 22 : 20, fontFamily: fonts.bodyBold }}>+</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontSize: focused ? 18 : 16, fontFamily: fonts.bodyBold }}>◎</Text>
          ),
        }}
      />
    </Tabs>
  );
}
