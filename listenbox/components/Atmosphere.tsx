import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { palette } from '@/constants/theme';

type Props = {
  /** Stronger rings for login hero */
  intensity?: 'soft' | 'bold';
};

/** Atmospheric slate wash + vinyl groove rings. */
export function Atmosphere({ intensity = 'soft' }: Props) {
  const spin = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(
      withTiming(1, { duration: 48000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [spin]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }],
  }));

  const bold = intensity === 'bold';

  return (
    <View style={styles.root} pointerEvents="none">
      <LinearGradient
        colors={[palette.paperWash, palette.paper, palette.paperDeep, '#C9D6E4']}
        locations={[0, 0.35, 0.72, 1]}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(214,255,58,0.18)', 'transparent', 'rgba(7,21,28,0.06)']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        style={[
          styles.ringCluster,
          bold ? styles.ringClusterBold : null,
          ringStyle,
        ]}>
        <View style={[styles.ring, styles.ringOuter, bold && styles.ringOuterBold]} />
        <View style={[styles.ring, styles.ringMid]} />
        <View style={[styles.ring, styles.ringInner]} />
        <View style={[styles.spindle, bold && styles.spindleBold]} />
      </Animated.View>

      <View style={[styles.accentBar, bold && styles.accentBarBold]} />
      <View style={styles.grain} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  ringCluster: {
    position: 'absolute',
    width: 340,
    height: 340,
    right: -90,
    top: -40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringClusterBold: {
    width: 420,
    height: 420,
    right: -110,
    top: -60,
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.ring,
  },
  ringOuter: {
    width: '100%',
    height: '100%',
    borderWidth: 18,
    borderColor: 'rgba(7, 21, 28, 0.05)',
  },
  ringOuterBold: {
    borderWidth: 26,
    borderColor: 'rgba(7, 21, 28, 0.07)',
  },
  ringMid: {
    width: '68%',
    height: '68%',
    borderWidth: 10,
    borderColor: 'rgba(7, 21, 28, 0.07)',
  },
  ringInner: {
    width: '38%',
    height: '38%',
    borderWidth: 6,
    borderColor: 'rgba(214, 255, 58, 0.35)',
  },
  spindle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: palette.accent,
  },
  spindleBold: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: palette.accent,
  },
  accentBarBold: {
    width: 6,
  },
  grain: {
    ...StyleSheet.absoluteFill,
    opacity: 0.035,
    backgroundColor: 'transparent',
    // Subtle horizontal scan lines without images
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.ink,
  },
});
