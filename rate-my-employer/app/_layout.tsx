import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppProvider } from '../src/context/AppContext';
import { colors, typography } from '../src/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AppProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.navy },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontFamily: typography.bodySemi, fontSize: 16 },
          contentStyle: { backgroundColor: colors.surface },
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="company/[id]/index" options={{ title: 'Employer' }} />
        <Stack.Screen name="company/[id]/workplaces" options={{ title: 'Choose workplace' }} />
        <Stack.Screen name="workplace/[id]/index" options={{ title: 'Workplace' }} />
        <Stack.Screen name="review/[id]" options={{ title: 'Review' }} />
        <Stack.Screen name="interview/[id]" options={{ title: 'Interview' }} />
        <Stack.Screen name="saved" options={{ title: 'Saved employers' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="guidelines" options={{ title: 'Community guidelines' }} />
      </Stack>
    </AppProvider>
  );
}
