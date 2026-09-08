import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, spacing, typography } from '../tokens';

export function BioCrossLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const icon = size === 'lg' ? 36 : size === 'sm' ? 22 : 28;
  const text = size === 'lg' ? 22 : size === 'sm' ? 16 : 18;
  return (
    <View style={styles.row} accessible accessibilityLabel="BioCross">
      <LogoMark size={icon} />
      <Text style={[styles.wordmark, { fontSize: text }]}>BioCross</Text>
    </View>
  );
}

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Circle cx="32" cy="32" r="30" fill={colors.brand.blue} opacity={0.12} />
      <Path
        d="M32 10c6 8 14 12 14 22a14 14 0 1 1-28 0c0-10 8-14 14-22z"
        fill="none"
        stroke={colors.brand.blue}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <Path
        d="M18 28c8 2 12 8 14 18M46 28c-8 2-12 8-14 18"
        fill="none"
        stroke={colors.brand.blue}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Circle cx="32" cy="34" r="5" fill={colors.brand.blue} />
    </Svg>
  );
}

export function AppHeader({
  onBack,
  onNotifications,
  notificationCount = 0,
  right,
  showLogo = true,
}: {
  onBack?: () => void;
  onNotifications?: () => void;
  notificationCount?: number;
  right?: React.ReactNode;
  showLogo?: boolean;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={12}
            style={styles.iconBtn}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
          </Pressable>
        ) : (
          <View style={styles.iconBtn} />
        )}
      </View>
      {showLogo ? <BioCrossLogo /> : <View />}
      <View style={[styles.side, { alignItems: 'flex-end' }]}>
        {right}
        {onNotifications ? (
          <Pressable
            onPress={onNotifications}
            accessibilityRole="button"
            accessibilityLabel={`Notifications${notificationCount ? `, ${notificationCount} unread` : ''}`}
            style={styles.iconBtn}
          >
            <Ionicons name="notifications-outline" size={22} color={colors.text.primary} />
            {notificationCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            ) : null}
          </Pressable>
        ) : !right ? (
          <View style={styles.iconBtn} />
        ) : null}
      </View>
    </View>
  );
}

export function ProgressSegments({
  total,
  current,
  label,
}: {
  total: number;
  current: number;
  label?: string;
}) {
  return (
    <View style={styles.progressWrap} accessibilityLabel={label ?? `Step ${current} of ${total}`}>
      <View style={styles.segments}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.segment,
              i < current - 1 && styles.segmentDone,
              i === current - 1 && styles.segmentCurrent,
            ]}
          />
        ))}
      </View>
      {label ? <Text style={styles.progressLabel}>{label}</Text> : null}
    </View>
  );
}

export function ScreenTitle({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.titleRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wordmark: { fontWeight: '800', color: colors.brand.navy },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  side: { width: 72, flexDirection: 'row', alignItems: 'center' },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.brand.blue,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  progressWrap: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  segments: { flexDirection: 'row', gap: 6 },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surface.borderStrong,
  },
  segmentDone: { backgroundColor: colors.brand.blue },
  segmentCurrent: { backgroundColor: colors.brand.blueMuted },
  progressLabel: {
    marginTop: spacing.xs,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    textAlign: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.size.xxl,
    fontWeight: '800',
    color: colors.text.primary,
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: 22,
  },
});
