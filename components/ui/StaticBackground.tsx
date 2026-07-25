import { type ReactNode, useEffect } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/constants/theme';

type StaticBackgroundProps = {
  children?: ReactNode;
  style?: ViewStyle;
  /** Intensity of grain / scanline overlays (0–1) */
  intensity?: number;
};

/**
 * Warm off-black canvas with analog snow, scan lines, and subtle chromatic drift.
 * Loading / idle atmospheres should prefer this over spinners.
 */
export function StaticBackground({
  children,
  style,
  intensity = 0.55,
}: StaticBackgroundProps) {
  const drift = useSharedValue(0);
  const flicker = useSharedValue(0.04);

  useEffect(() => {
    drift.value = withRepeat(
      withTiming(1, { duration: 4200, easing: Easing.linear }),
      -1,
      false,
    );
    flicker.value = withRepeat(
      withTiming(0.09, { duration: 180, easing: Easing.linear }),
      -1,
      true,
    );
  }, [drift, flicker]);

  const grainStyle = useAnimatedStyle(() => ({
    opacity: 0.035 + flicker.value * intensity,
    transform: [{ translateY: drift.value * -24 }],
  }));

  const aberrationStyle = useAnimatedStyle(() => ({
    opacity: 0.04 + flicker.value * 0.5 * intensity,
    transform: [{ translateX: (drift.value - 0.5) * 3 }],
  }));

  return (
    <View style={[styles.root, style]}>
      <View style={styles.wash} />
      <Animated.View pointerEvents="none" style={[styles.aberration, aberrationStyle]} />
      <View pointerEvents="none" style={styles.scanlines} />
      <Animated.View pointerEvents="none" style={[styles.grain, grainStyle]} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const SCAN_LINE_HEIGHT = 3;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  wash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background,
    borderColor: colors.backgroundElevated,
  },
  aberration: {
    ...StyleSheet.absoluteFill,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderLeftColor: colors.aberrationRed,
    borderRightColor: colors.aberrationCyan,
  },
  scanlines: {
    ...StyleSheet.absoluteFill,
    opacity: 0.35,
    backgroundColor: 'transparent',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.scanline,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: SCAN_LINE_HEIGHT },
    shadowOpacity: 0.35,
    shadowRadius: 0,
  },
  grain: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.snow,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
