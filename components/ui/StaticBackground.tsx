import { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors } from '@/constants/theme';

type StaticBackgroundProps = {
  children?: ReactNode;
  style?: ViewStyle;
  /** Kept for API compatibility; unused in light portal theme */
  intensity?: number;
};

/**
 * Clean PureVolume-style page canvas — light gray/white, no CRT overlays.
 */
export function StaticBackground({ children, style }: StaticBackgroundProps) {
  return (
    <View style={[styles.root, style]}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.backgroundElevated,
  },
  content: {
    flex: 1,
  },
});
