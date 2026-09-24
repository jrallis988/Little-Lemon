import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../tokens';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

/**
 * Compact offline banner — shows only when connectivity is lost.
 */
export function OfflineBanner({ onRetry }: { onRetry?: () => void }) {
  const online = useOnlineStatus();
  if (online) return null;

  return (
    <View
      style={styles.wrap}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityLabel="You appear to be offline"
    >
      <Ionicons name="cloud-offline-outline" size={18} color={colors.semantic.caution} />
      <Text style={styles.text}>You're offline. Some checks may be limited.</Text>
      {onRetry ? (
        <Pressable onPress={onRetry} accessibilityRole="button" accessibilityLabel="Retry connection">
          <Text style={styles.retry}>Retry</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: colors.semantic.cautionBg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.semantic.cautionBorder,
  },
  text: {
    flex: 1,
    color: colors.semantic.caution,
    fontSize: typography.size.sm,
    fontWeight: '600',
  },
  retry: {
    color: colors.brand.blue,
    fontWeight: '700',
    fontSize: typography.size.sm,
  },
});
