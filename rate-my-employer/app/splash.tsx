import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useApp } from '../src/context/AppContext';
import { colors, typography } from '../src/theme';

export default function SplashScreen() {
  const router = useRouter();
  const { hasOnboarded, user, isGuest } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOnboarded) {
        router.replace('/onboarding');
      } else if (!user && !isGuest) {
        router.replace('/auth');
      } else {
        router.replace('/(tabs)/explore');
      }
    }, 1400);
    return () => clearTimeout(timer);
  }, [hasOnboarded, user, isGuest, router]);

  return (
    <View style={styles.root}>
      <Animated.View entering={FadeIn.duration(500)} exiting={FadeOut} style={styles.mark}>
        <Text style={styles.wordmarkTop}>Rate My</Text>
        <Text style={styles.wordmarkBottom}>Employer</Text>
        <Text style={styles.loading}>Loading workplace truth…</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: { alignItems: 'center', gap: 4 },
  wordmarkTop: {
    fontFamily: typography.displaySemi,
    fontSize: 28,
    color: colors.mist,
  },
  wordmarkBottom: {
    fontFamily: typography.display,
    fontSize: 44,
    color: colors.accent,
  },
  loading: {
    marginTop: 24,
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.tabInactive,
  },
});
