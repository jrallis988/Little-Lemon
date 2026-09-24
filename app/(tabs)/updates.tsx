import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  EmptyState,
  HealthCard,
  LoadingState,
  ScreenTitle,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import type { AlertType, SafetyAlert } from '../../src/domain/models';
import { useBioCross } from '../../src/state/BioCrossContext';

type FilterKey = 'all' | AlertType;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Updates' },
  { key: 'recall', label: 'Recalls' },
  { key: 'interaction', label: 'Interactions' },
  { key: 'research', label: 'Research' },
  { key: 'system', label: 'System' },
];

function alertIcon(type: AlertType): keyof typeof Ionicons.glyphMap {
  switch (type) {
    case 'recall':
      return 'warning';
    case 'interaction':
      return 'git-network-outline';
    case 'research':
      return 'flask-outline';
    case 'system':
      return 'phone-portrait-outline';
    case 'regulatory':
      return 'shield-outline';
  }
}

function alertColor(type: AlertType): string {
  switch (type) {
    case 'recall':
    case 'regulatory':
      return colors.semantic.high;
    case 'interaction':
      return colors.semantic.caution;
    case 'research':
      return colors.brand.blue;
    case 'system':
      return colors.text.secondary;
  }
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'high' | 'info' | 'caution' | 'muted';
}) {
  const palette = {
    high: { bg: colors.semantic.highBg, fg: colors.semantic.high },
    info: { bg: colors.brand.blueLight, fg: colors.brand.blue },
    caution: { bg: colors.semantic.cautionBg, fg: colors.semantic.caution },
    muted: { bg: colors.semantic.unknownBg, fg: colors.text.secondary },
  }[tone];

  return (
    <View
      style={[styles.summaryCard, { backgroundColor: palette.bg }]}
      accessibilityLabel={`${label}: ${value}`}
    >
      <Text style={[styles.summaryValue, { color: palette.fg }]}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function AlertCard({
  alert,
  onPress,
  urgent,
}: {
  alert: SafetyAlert;
  onPress: () => void;
  urgent?: boolean;
}) {
  const iconColor = alertColor(alert.type);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${alert.title}. ${alert.description}`}
    >
      <HealthCard
        borderColor={urgent ? colors.semantic.highBorder : colors.surface.border}
        backgroundColor={urgent ? colors.semantic.highBg : colors.surface.card}
      >
        <View style={styles.alertRow}>
          <View style={[styles.alertIcon, { backgroundColor: '#fff' }]}>
            <Ionicons name={alertIcon(alert.type)} size={20} color={iconColor} />
          </View>
          <View style={{ flex: 1 }}>
            {alert.personalizedLabel ? (
              <Text style={[styles.personalized, { color: iconColor }]}>
                {alert.personalizedLabel}
              </Text>
            ) : null}
            <Text style={styles.alertTitle}>{alert.title}</Text>
            <Text style={styles.alertDesc}>{alert.description}</Text>
            <Text style={styles.alertMeta}>
              {alert.date}
              {alert.source ? ` · ${alert.source}` : ''}
            </Text>
          </View>
          {!alert.isRead ? <View style={styles.unreadDot} /> : null}
        </View>
      </HealthCard>
    </Pressable>
  );
}

export default function UpdatesScreen() {
  const { ready, alerts, markAlertRead } = useBioCross();
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return alerts;
    return alerts.filter((a) => a.type === filter);
  }, [alerts, filter]);

  const highPriority = alerts.filter(
    (a) => a.priority === 'urgent' && !a.isRead,
  );
  const personalized = alerts.filter((a) => a.priority === 'personalized');
  const urgentNews = alerts.filter(
    (a) => a.priority === 'urgent' || a.type === 'recall' || a.type === 'regulatory',
  );
  const generalNews = alerts.filter(
    (a) =>
      a.priority === 'informational' &&
      a.type !== 'recall' &&
      a.type !== 'regulatory',
  );
  const recentlyRead = alerts.filter((a) => a.isRead).slice(0, 3);

  const stats = {
    highPriority: alerts.filter((a) => a.priority === 'urgent' && !a.isRead).length,
    newUpdates: alerts.filter((a) => !a.isRead).length,
    safetyUpdates: alerts.filter(
      (a) => a.type === 'recall' || a.type === 'interaction' || a.type === 'regulatory',
    ).length,
    read: alerts.filter((a) => a.isRead).length,
  };

  const handleAlertPress = async (alert: SafetyAlert) => {
    if (!alert.isRead) await markAlertRead(alert.id);
  };

  if (!ready) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <LoadingState message="Loading updates…" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenTitle
        title="Updates & Alerts"
        subtitle={
          stats.newUpdates > 0
            ? 'Important safety updates related to your health.'
            : 'Stay informed. Stay safe.'
        }
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
        style={styles.filterScroll}
      >
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`Filter: ${f.label}`}
              style={[styles.filterChip, active && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryRow}>
          <SummaryCard label="High Priority" value={stats.highPriority} tone="high" />
          <SummaryCard label="New Updates" value={stats.newUpdates} tone="info" />
          <SummaryCard label="Safety Updates" value={stats.safetyUpdates} tone="caution" />
          <SummaryCard label="Read" value={stats.read} tone="muted" />
        </View>

        <View style={styles.monitoringBanner}>
          <Ionicons name="globe-outline" size={20} color={colors.brand.blue} />
          <Text style={styles.monitoringText}>
            BioCross monitors FDA, Health Canada, WHO, and trusted research sources for updates
            that may affect your supplements and health profile.
          </Text>
        </View>

        {filter === 'all' ? (
          <>
            <Text style={styles.sectionTitle}>High Priority Alerts</Text>
            {highPriority.length === 0 ? (
              <Text style={styles.emptySection}>No urgent alerts right now.</Text>
            ) : (
              highPriority.map((a) => (
                <View key={a.id} style={styles.cardGap}>
                  <AlertCard alert={a} onPress={() => handleAlertPress(a)} urgent />
                </View>
              ))
            )}

            <Text style={styles.sectionTitle}>Alerts for You</Text>
            {personalized.length === 0 ? (
              <Text style={styles.emptySection}>No personalized alerts at this time.</Text>
            ) : (
              personalized.map((a) => (
                <View key={a.id} style={styles.cardGap}>
                  <AlertCard alert={a} onPress={() => handleAlertPress(a)} />
                </View>
              ))
            )}

            <Text style={styles.sectionTitle}>Top Health & Supplement News</Text>
            <Text style={styles.sectionSub}>Urgent & regulatory</Text>
            {urgentNews
              .filter((a) => !highPriority.some((h) => h.id === a.id))
              .slice(0, 3)
              .map((a) => (
                <View key={a.id} style={styles.cardGap}>
                  <AlertCard alert={a} onPress={() => handleAlertPress(a)} urgent={a.priority === 'urgent'} />
                </View>
              ))}

            <Text style={styles.sectionSub}>General research & news</Text>
            {generalNews.slice(0, 4).map((a) => (
              <View key={a.id} style={styles.cardGap}>
                <AlertCard alert={a} onPress={() => handleAlertPress(a)} />
              </View>
            ))}

            <Text style={styles.sectionTitle}>Recently Read</Text>
            {recentlyRead.length === 0 ? (
              <Text style={styles.emptySection}>No read alerts yet.</Text>
            ) : (
              recentlyRead.map((a) => (
                <View key={a.id} style={styles.cardGap}>
                  <AlertCard alert={a} onPress={() => handleAlertPress(a)} />
                </View>
              ))
            )}

            <Text style={styles.sectionTitle}>Featured Resource</Text>
            <HealthCard backgroundColor={colors.brand.blueLight} borderColor={colors.brand.blueMuted}>
              <View style={styles.featuredRow}>
                <Ionicons name="book-outline" size={24} color={colors.brand.blue} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.featuredTitle}>Understanding Supplement Safety</Text>
                  <Text style={styles.featuredBody}>
                    Learn how BioCross checks ingredients against your health profile and what
                    evidence we use.
                  </Text>
                </View>
              </View>
            </HealthCard>
          </>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="newspaper-outline"
            title="No updates in this category"
            body="Try another filter or check back later for new alerts."
          />
        ) : (
          filtered.map((a) => (
            <View key={a.id} style={styles.cardGap}>
              <AlertCard
                alert={a}
                onPress={() => handleAlertPress(a)}
                urgent={a.priority === 'urgent'}
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  filterScroll: { maxHeight: 48, marginBottom: spacing.sm },
  filters: {
    paddingHorizontal: spacing.xl,
    gap: spacing.xs,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  filterChipActive: {
    backgroundColor: colors.brand.blue,
    borderColor: colors.brand.blue,
  },
  filterText: {
    fontWeight: '600',
    fontSize: typography.size.sm,
    color: colors.text.secondary,
  },
  filterTextActive: { color: colors.text.inverse },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    width: '47%',
    borderRadius: radii.md,
    padding: spacing.md,
  },
  summaryValue: {
    fontSize: typography.size.xxl,
    fontWeight: '800',
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: typography.size.xs,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  monitoringBanner: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.brand.blueLight,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.brand.blueMuted,
  },
  monitoringText: {
    flex: 1,
    fontSize: typography.size.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  sectionSub: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  emptySection: {
    color: colors.text.tertiary,
    fontSize: typography.size.sm,
    marginBottom: spacing.md,
  },
  cardGap: { marginBottom: spacing.sm },
  alertRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personalized: {
    fontSize: typography.size.xs,
    fontWeight: '700',
    marginBottom: 2,
  },
  alertTitle: {
    fontWeight: '700',
    color: colors.text.primary,
    fontSize: typography.size.md,
  },
  alertDesc: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginTop: 4,
    lineHeight: 18,
  },
  alertMeta: {
    color: colors.text.tertiary,
    fontSize: typography.size.xs,
    marginTop: spacing.xs,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand.blue,
    marginTop: 4,
  },
  featuredRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  featuredTitle: {
    fontWeight: '700',
    color: colors.text.primary,
    fontSize: typography.size.md,
  },
  featuredBody: {
    marginTop: 4,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    lineHeight: 18,
  },
});
