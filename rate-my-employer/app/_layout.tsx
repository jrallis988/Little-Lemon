import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppProvider } from '../src/context/AppContext';
import { colors } from '../src/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    Fraunces_600SemiBold,
    Fraunces_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AppProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.ink },
          headerTintColor: colors.surface,
          headerTitleStyle: {
            fontFamily: 'DMSans_600SemiBold',
            fontSize: 16,
          },
          contentStyle: { backgroundColor: colors.surface },
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Rate My Employer' }} />
        <Stack.Screen name="company/[id]" options={{ title: 'Employer' }} />
        <Stack.Screen name="review/[id]" options={{ title: 'Write a review' }} />
        <Stack.Screen name="auth" options={{ title: 'Account', presentation: 'modal' }} />
        <Stack.Screen name="profile" options={{ title: 'Your reviews' }} />
      </Stack>
    </AppProvider>
  );
}
