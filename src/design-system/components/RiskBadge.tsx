import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { radii, spacing, typography, riskColors, type RiskLevel } from '../tokens';

export interface RiskBadgeProps {
  level: RiskLevel;
  label?: string;
  compact?: boolean;
}

const ICONS: Record<RiskLevel, keyof typeof Ionicons.glyphMap> = {
  low: 'shield-checkmark',
  caution: 'warning',
  high: 'alert-circle',
  unknown: 'help-circle',
  info: 'information-circle',
};

/**
 * Risk communication always pairs color + icon + text (never color alone).
 */
export function RiskBadge({ level, label, compact = false }: RiskBadgeProps) {
  const tone = riskColors(level);
  return (
    <View
      style={[
        styles.badge,
        compact && styles.compact,
        { backgroundColor: tone.bg, borderColor: tone.border },
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Risk level: ${label ?? tone.label}`}
    >
      <Ionicons name={ICONS[level]} size={compact ? 14 : 16} color={tone.fg} />
      <Text style={[styles.label, { color: tone.fg }]}>{label ?? tone.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  compact: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
  },
  label: {
    fontSize: typography.size.xs,
    fontWeight: '700',
  },
});
