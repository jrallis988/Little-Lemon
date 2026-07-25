import { Stack } from 'expo-router';

import { colors } from '@/constants/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundElevated },
        headerTintColor: colors.phosphor,
        headerTitleStyle: {
          fontFamily: 'SpaceMono',
          fontSize: 13,
        },
        contentStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="login" options={{ title: 'SIGN IN' }} />
      <Stack.Screen name="signup" options={{ title: 'JOIN' }} />
    </Stack>
  );
}
