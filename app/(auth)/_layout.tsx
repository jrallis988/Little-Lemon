import { Stack } from 'expo-router';

import { colors, fonts } from '@/constants/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: colors.headerText,
        headerTitleStyle: {
          fontFamily: fonts.sansBold,
          fontSize: 14,
        },
        contentStyle: { backgroundColor: colors.backgroundElevated },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Sign In' }} />
      <Stack.Screen name="signup" options={{ title: 'Join' }} />
    </Stack>
  );
}
