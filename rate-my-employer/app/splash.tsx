import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { useApp } from '../src/context/AppContext';
import { colors, typography } from '../src/theme';

export default function SplashScreen() {
  const router = useRouter();
  const { hasOnboarded, user, isGuest } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOnboarded) router.replace('/onboarding');
      else if (!user && !isGuest) router.replace('/auth');
      else router.replace('/(tabs)/home');
    }, 1200);
    return () => clearTimeout(timer);
  }, [hasOnboarded, user, isGuest, router]);

  return (
    <View style={styles.root}>
      <Animated.View entering={FadeIn.duration(450)} style={styles.mark}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>RME</Text>
        </View>
        <Text style={styles.wordmark}>RATE MY EMPLOYER</Text>
        <Text style={styles.tagline}>Real experiences. Better decisions.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: { alignItems: 'center', gap: 10 },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeText: {
    fontFamily: typography.bodyBold,
    fontSize: 22,
    color: '#FFFFFF',
  },
  wordmark: {
    fontFamily: typography.bodyBold,
    fontSize: 18,
    letterSpacing: 1.2,
    color: '#FFFFFF',
  },
  tagline: {
    fontFamily: typography.body,
    fontSize: 14,
    color: '#B8C7E0',
  },
});
