import { Redirect, Tabs } from 'expo-router';
import { Platform, Text, type ColorValue } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { fonts, palette } from '@/constants/theme';

export default function TabLayout() {
  const { user, isLoading } = useAuth();

  if (!isLoading && !user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      // Keep inactive scenes from eating clicks on web (absolute-positioned stacks).
      detachInactiveScreens
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
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
            <TabGlyph color={color} focused={focused} glyph="☰" />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: 'Log',
          tabBarIcon: ({ color, focused }) => (
            <TabGlyph color={color} focused={focused} glyph="+" focusedSize={22} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabGlyph color={color} focused={focused} glyph="◎" />
          ),
        }}
      />
    </Tabs>
  );
}

function TabGlyph({
  color,
  focused,
  glyph,
  focusedSize = 18,
  size = 16,
}: {
  color: ColorValue;
  focused: boolean;
  glyph: string;
  focusedSize?: number;
  size?: number;
}) {
  return (
    <Text
      style={{
        color,
        fontSize: focused ? focusedSize : size,
        fontFamily: fonts.bodyBold,
      }}>
      {glyph}
    </Text>
  );
}
