import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HealthCard } from './HealthCard';
import { RiskBadge } from './RiskBadge';
import { colors, spacing, typography } from '../tokens';
import type { Supplement, SupplementCheck } from '../../domain/models';
import type { RiskLevel } from '../tokens';

export function SupplementCard({
  supplement,
  subtitle,
  onPress,
  right,
}: {
  supplement: Supplement;
  subtitle?: string;
  onPress?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <HealthCard>
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole={onPress ? 'button' : 'summary'}
        accessibilityLabel={`${supplement.name}${supplement.brand ? ` by ${supplement.brand}` : ''}`}
        style={styles.row}
      >
        <View style={styles.thumb}>
          <Ionicons name="flask-outline" size={22} color={colors.brand.blue} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{supplement.name}</Text>
          <Text style={styles.meta}>
            {[supplement.dosage, supplement.form].filter(Boolean).join(' · ')}
          </Text>
          {supplement.brand ? <Text style={styles.brand}>Brand: {supplement.brand}</Text> : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {right}
        {onPress ? <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} /> : null}
      </Pressable>
    </HealthCard>
  );
}

export function RecentCheckCard({
  check,
  onPress,
}: {
  check: SupplementCheck;
  onPress?: () => void;
}) {
  const level = check.riskLevel as RiskLevel;
  const isMoreInfo = level === 'more_info';
  return (
    <HealthCard>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${check.supplement.name}, ${check.headline}`}
        style={styles.row}
      >
        <View
          style={[
            styles.thumb,
            {
              backgroundColor:
                level === 'low'
                  ? colors.semantic.lowBg
                  : level === 'caution'
                    ? colors.semantic.cautionBg
                    : level === 'high'
                      ? colors.semantic.highBg
                      : isMoreInfo
                        ? colors.semantic.unknownBg
                        : colors.semantic.unknownBg,
            },
          ]}
        >
          <Ionicons
            name={
              level === 'low'
                ? 'shield-checkmark'
                : level === 'caution'
                  ? 'warning'
                  : level === 'high'
                    ? 'alert-circle'
                    : 'help-circle'
            }
            size={20}
            color={
              level === 'low'
                ? colors.semantic.low
                : level === 'caution'
                  ? colors.semantic.caution
                  : level === 'high'
                    ? colors.semantic.high
                    : colors.semantic.unknown
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{check.supplement.name}</Text>
            <RiskBadge level={level} compact />
          </View>
          <Text style={styles.meta}>{check.supplement.dosage}</Text>
          <Text style={styles.subtitle}>
            Checked {new Date(check.checkedAt).toLocaleDateString()}
            {check.newerInfoAvailable ? ' · Newer information available' : ''}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
      </Pressable>
    </HealthCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  name: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  meta: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: 2 },
  brand: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: 2 },
  subtitle: { color: colors.text.tertiary, fontSize: typography.size.xs, marginTop: 4 },
});
