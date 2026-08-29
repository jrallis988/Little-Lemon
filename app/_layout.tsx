import React, { useRef } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BioCrossProvider } from '../src/state/BioCrossContext';
import { AuthProvider } from '../src/state/AuthContext';
import { ThemeProvider, useTheme } from '../src/state/ThemeContext';

function ThemedStack() {
  const { colors, isDark } = useTheme();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.surface.background },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}

export default function RootLayout() {
  const refreshRef = useRef<(() => Promise<void>) | null>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BioCrossProvider registerRefresh={(fn) => { refreshRef.current = fn; }}>
          <AuthProvider
            onSessionChange={async () => {
              await refreshRef.current?.();
            }}
          >
            <ThemeProvider>
              <ThemedStack />
            </ThemeProvider>
          </AuthProvider>
        </BioCrossProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
