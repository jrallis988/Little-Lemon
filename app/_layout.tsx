import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import 'react-native-reanimated';

import { GlobalAudioBar } from '@/components/audio/GlobalAudioBar';
import { colors } from '@/constants/theme';
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

async function configureAudioSession() {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  } catch {
    // Audio mode may be unavailable on web during scaffolding.
  }
}

export default function RootLayout() {
  const hydrate = useUserStore((s) => s.hydrate);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    void hydrate();
    void configureAudioSession();
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
      <StatusBar style="light" />
      <View style={styles.root}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.backgroundElevated },
            headerTintColor: colors.phosphor,
            headerTitleStyle: {
              fontFamily: 'SpaceMono',
              fontSize: 14,
            },
            contentStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="artist/[id]"
            options={{ title: 'ARTIST', presentation: 'card' }}
          />
          <Stack.Screen
            name="track/[id]"
            options={{ title: 'TRACK', presentation: 'card' }}
          />
        </Stack>
        <GlobalAudioBar />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
