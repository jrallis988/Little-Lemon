import {
  Barlow_400Regular,
  Barlow_700Bold,
} from '@expo-google-fonts/barlow';
import {
  BarlowCondensed_600SemiBold,
  BarlowCondensed_700Bold,
} from '@expo-google-fonts/barlow-condensed';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import { colors, fonts } from '@/constants/theme';
import { useUserStore } from '@/store/useUserStore';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(main)',
};

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

export default function RootLayout() {
  const hydrate = useUserStore((s) => s.hydrate);
  const [loaded, error] = useFonts({
    [fonts.sans]: Barlow_400Regular,
    [fonts.sansBold]: Barlow_700Bold,
    [fonts.condensed]: BarlowCondensed_600SemiBold,
    [fonts.condensedBold]: BarlowCondensed_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <View style={styles.root}>
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
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="artist/[id]"
            options={{ title: 'Artist', presentation: 'card' }}
          />
          <Stack.Screen
            name="track/[id]"
            options={{ title: 'Track', presentation: 'card' }}
          />
        </Stack>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.backgroundElevated,
  },
});
