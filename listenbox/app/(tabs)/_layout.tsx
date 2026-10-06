import { Redirect, Tabs } from 'expo-router';
import { Platform, Text, View, type ColorValue } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { fonts, palette } from '@/constants/theme';

export default function TabLayout() {
  const { user, isLoading } = useAuth();

  if (!isLoading && !user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      detachInactiveScreens
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
        tabBarActiveTintColor: palette.ink,
        tabBarInactiveTintColor: palette.inkFaint,
        tabBarStyle: {
          backgroundColor: 'rgba(244,247,250,0.96)',
          borderTopColor: palette.rule,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.bodyBold,
          fontSize: 11,
          letterSpacing: 0.3,
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
            <TabGlyph color={color} focused={focused} glyph="+" focusedSize={24} size={20} accent />
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
  accent = false,
}: {
  color: ColorValue;
  focused: boolean;
  glyph: string;
  focusedSize?: number;
  size?: number;
  accent?: boolean;
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: accent ? 34 : 28,
        height: accent ? 34 : 28,
        borderRadius: accent ? 17 : 8,
        backgroundColor: focused && accent ? palette.accent : 'transparent',
      }}>
      <Text
        style={{
          color: focused && accent ? palette.accentInk : color,
          fontSize: focused ? focusedSize : size,
          fontFamily: fonts.bodyBold,
        }}>
        {glyph}
      </Text>
    </View>
  );
}
