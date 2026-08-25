import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ErrorState, LogoMark } from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';
import { SUPPLEMENT_CATALOG } from '../../src/domain/fixtures';
import { useBioCross } from '../../src/state/BioCrossContext';

const STEPS = [
  'Identifying ingredients…',
  'Checking medication interactions…',
  'Reviewing your health profile…',
  'Matching evidence sources…',
  'Preparing your safety report…',
];

export default function AnalyzingScreen() {
  const router = useRouter();
  const { supplementId } = useLocalSearchParams<{ supplementId: string }>();
  const { runCheck } = useBioCross();
  const pulse = useRef(new Animated.Value(1)).current;
  const stepIndex = useRef(0);
  const [stepLabel, setStepLabel] = React.useState(STEPS[0]);

  const supplement = SUPPLEMENT_CATALOG.find((s) => s.id === supplementId);

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    pulseLoop.start();

    const stepTimer = setInterval(() => {
      stepIndex.current = Math.min(stepIndex.current + 1, STEPS.length - 1);
      setStepLabel(STEPS[stepIndex.current]);
    }, 700);

    return () => {
      pulseLoop.stop();
      clearInterval(stepTimer);
    };
  }, [pulse]);

  useEffect(() => {
    if (!supplement) return;

    let cancelled = false;

    (async () => {
      try {
        const check = await runCheck(supplement);
        if (!cancelled) {
          router.replace(`/result/${check.id}`);
        }
      } catch {
        if (!cancelled) {
          router.replace({
            pathname: '/check/issue',
            params: { kind: 'offline', supplementId: supplement.id },
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [supplement, runCheck, router]);

  if (!supplement) {
    return (
      <SafeAreaView style={styles.safe}>
        <ErrorState
          title="Unable to analyze"
          body="The supplement could not be found. Please go back and try again."
          actionLabel="Go back"
          onAction={() => router.back()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} accessibilityLabel="Analyzing supplement">
      <View style={styles.content}>
        <Animated.View style={[styles.logoWrap, { transform: [{ scale: pulse }] }]}>
          <LogoMark size={64} />
          <View style={styles.scanRing}>
            <Ionicons name="scan" size={28} color={colors.brand.blue} />
          </View>
        </Animated.View>

        <Text style={styles.title}>Analyzing Supplement</Text>
        <Text style={styles.product}>{supplement.name}</Text>
        <Text style={styles.subtitle}>
          BioCross is checking this product against your health profile and trusted evidence
          sources.
        </Text>

        <View style={styles.stepBox}>
          <ActivityDots />
          <Text style={styles.stepLabel}>{stepLabel}</Text>
        </View>

        <Text style={styles.note}>This usually takes a few seconds</Text>
      </View>
    </SafeAreaView>
  );
}

function ActivityDots() {
  return (
    <View style={styles.dots} accessibilityElementsHidden>
      {[0, 1, 2].map((i) => (
        <View key={i} style={[styles.dot, i === 1 && styles.dotActive]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface.background,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  scanRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.brand.blueMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.size.xxl,
    fontWeight: '800',
    color: colors.text.primary,
    textAlign: 'center',
  },
  product: {
    marginTop: spacing.xs,
    fontSize: typography.size.lg,
    fontWeight: '700',
    color: colors.brand.blue,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.md,
    color: colors.text.secondary,
    fontSize: typography.size.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  stepBox: {
    marginTop: spacing.xl,
    backgroundColor: colors.brand.blueLight,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  stepLabel: {
    marginTop: spacing.sm,
    color: colors.brand.blue,
    fontWeight: '600',
    fontSize: typography.size.md,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand.blueMuted,
  },
  dotActive: {
    backgroundColor: colors.brand.blue,
    width: 20,
  },
  note: {
    marginTop: spacing.lg,
    color: colors.text.tertiary,
    fontSize: typography.size.sm,
  },
});
