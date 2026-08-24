import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  AppHeader,
  BioCrossButton,
  HealthCard,
  HealthRecordCard,
  InfoCallout,
  ProgressSegments,
  ScreenTitle,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import { DEMO_DOCUMENT } from '../../src/domain/fixtures';
import type { ExtractedHealthItem, ProfileItemCategory } from '../../src/domain/models';
import { useBioCross } from '../../src/state/BioCrossContext';

type FilterKey = 'all' | 'ready' | 'needs_detail' | 'skipped';

const CATEGORY_LABELS: Record<ProfileItemCategory, string> = {
  condition: 'Medical Condition',
  medication: 'Medication',
  supplement: 'Supplement',
  allergy: 'Allergy',
  procedure: 'Surgery / Procedure',
  lab_result: 'Test Result',
  lifestyle: 'Lifestyle',
  recent_change: 'Recent Change',
  basic: 'Basic Info',
};

export default function ReviewImportScreen() {
  const router = useRouter();
  const { documentId } = useLocalSearchParams<{ documentId?: string }>();
  const { documents, getExtractedItems, confirmExtractedItems } = useBioCross();
  const [items, setItems] = useState<ExtractedHealthItem[]>([]);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const resolvedDocumentId = documentId ?? DEMO_DOCUMENT.id;
  const document =
    documents.find((d) => d.id === resolvedDocumentId) ?? { ...DEMO_DOCUMENT, id: resolvedDocumentId };

  const loadItems = useCallback(async () => {
    setLoading(true);
    const extracted = await getExtractedItems(resolvedDocumentId);
    setItems(extracted);
    setLoading(false);
  }, [getExtractedItems, resolvedDocumentId]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const counts = useMemo(
    () => ({
      all: items.length,
      ready: items.filter((i) => i.status === 'ready').length,
      needs_detail: items.filter((i) => i.status === 'needs_detail').length,
      skipped: items.filter((i) => i.status === 'skipped').length,
    }),
    [items],
  );

  const filteredItems = useMemo(() => {
    switch (filter) {
      case 'ready':
        return items.filter((i) => i.status === 'ready' || i.status === 'added');
      case 'needs_detail':
        return items.filter((i) => i.status === 'needs_detail');
      case 'skipped':
        return items.filter((i) => i.status === 'skipped');
      default:
        return items;
    }
  }, [filter, items]);

  const selectedCount = items.filter((i) => i.status === 'added').length;

  const updateItem = (id: string, status: ExtractedHealthItem['status']) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      await confirmExtractedItems(items);
      router.push('/onboarding/preferences');
    } finally {
      setSubmitting(false);
    }
  };

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'ready', label: 'Ready to add', count: counts.ready },
    { key: 'needs_detail', label: 'Needs details', count: counts.needs_detail },
    { key: 'skipped', label: 'Skipped', count: counts.skipped },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader onBack={() => router.back()} />
      <ProgressSegments total={6} current={4} label="Step 4 of 6" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTitle
          title="Review Imported Information"
          subtitle="We found health information in your uploaded record. Review each item below and choose what to add — nothing goes on your profile until you confirm."
        />

        <View style={styles.section}>
          <HealthRecordCard document={document} />
        </View>

        <View style={styles.foundBanner}>
          <Ionicons name="sparkles-outline" size={18} color={colors.brand.blue} />
          <Text style={styles.foundBannerText}>We found {counts.all} items</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((f) => (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[styles.filterPill, filter === f.key && styles.filterPillActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: filter === f.key }}
            >
              <Text style={[styles.filterPillText, filter === f.key && styles.filterPillTextActive]}>
                {f.label} ({f.count})
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.itemsList}>
          {loading ? (
            <Text style={styles.loadingText}>Loading extracted items…</Text>
          ) : filteredItems.length === 0 ? (
            <Text style={styles.loadingText}>No items in this filter.</Text>
          ) : (
            filteredItems.map((item) => (
              <FindingCard
                key={item.id}
                item={item}
                onAdd={() => updateItem(item.id, 'added')}
                onSkip={() => updateItem(item.id, 'skipped')}
                onReview={() => updateItem(item.id, 'ready')}
                onRemove={() => updateItem(item.id, 'ready')}
              />
            ))
          )}
        </View>

        <InfoCallout
          icon="shield-checkmark"
          tone="privacy"
          body="Only items you confirm will be added to your profile. You can edit or remove them anytime."
        />

        <View style={styles.footer}>
          <BioCrossButton
            label={
              selectedCount > 0
                ? `Add selected items to my profile (${selectedCount})`
                : 'Add selected items to my profile'
            }
            onPress={handleConfirm}
            loading={submitting}
          />
          <Pressable
            onPress={() => router.push('/onboarding/preferences')}
            style={styles.skipLink}
            accessibilityRole="link"
          >
            <Text style={styles.skipLinkText}>Skip for now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FindingCard({
  item,
  onAdd,
  onSkip,
  onReview,
  onRemove,
}: {
  item: ExtractedHealthItem;
  onAdd: () => void;
  onSkip: () => void;
  onReview: () => void;
  onRemove: () => void;
}) {
  const categoryLabel = CATEGORY_LABELS[item.category] ?? item.category;
  const isAdded = item.status === 'added';
  const isSkipped = item.status === 'skipped';
  const needsDetail = item.status === 'needs_detail';

  return (
    <HealthCard style={styles.findingCard}>
      <View style={styles.findingHeader}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryPillText}>{categoryLabel}</Text>
        </View>
        {isAdded ? (
          <View style={styles.addedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={colors.semantic.low} />
            <Text style={styles.addedBadgeText}>Added</Text>
          </View>
        ) : isSkipped ? (
          <View style={styles.skippedBadge}>
            <Text style={styles.skippedBadgeText}>Skipped</Text>
          </View>
        ) : needsDetail ? (
          <View style={styles.needsBadge}>
            <Ionicons name="alert-circle-outline" size={14} color={colors.semantic.caution} />
            <Text style={styles.needsBadgeText}>Needs details</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.findingName}>{item.name}</Text>
      {item.details ? <Text style={styles.findingDetails}>{item.details}</Text> : null}
      {item.needsDetailReason ? (
        <Text style={styles.findingReason}>{item.needsDetailReason}</Text>
      ) : null}

      <View style={styles.findingActions}>
        {needsDetail ? (
          <>
            <BioCrossButton label="Review" onPress={onReview} variant="outline" size="sm" fullWidth={false} />
            <BioCrossButton label="Skip" onPress={onSkip} variant="ghost" size="sm" fullWidth={false} />
          </>
        ) : isAdded ? (
          <BioCrossButton
            label="Remove"
            onPress={onRemove}
            variant="ghost"
            size="sm"
            fullWidth={false}
          />
        ) : isSkipped ? (
          <BioCrossButton label="Add" onPress={onAdd} variant="outline" size="sm" fullWidth={false} />
        ) : (
          <>
            <BioCrossButton label="Add" onPress={onAdd} variant="primary" size="sm" fullWidth={false} />
            <BioCrossButton label="Skip" onPress={onSkip} variant="ghost" size="sm" fullWidth={false} />
          </>
        )}
      </View>
    </HealthCard>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  content: { paddingBottom: spacing.xxxl },
  section: { paddingHorizontal: spacing.xl, marginBottom: spacing.sm },
  foundBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: colors.brand.blueLight,
    borderRadius: radii.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.brand.blueMuted,
  },
  foundBannerText: { fontWeight: '700', color: colors.brand.blue, fontSize: typography.size.sm },
  filterRow: {
    paddingHorizontal: spacing.xl,
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  filterPill: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.surface.borderStrong,
    backgroundColor: colors.surface.card,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  filterPillActive: {
    borderColor: colors.brand.blue,
    backgroundColor: colors.brand.blueLight,
  },
  filterPillText: { color: colors.text.secondary, fontWeight: '600', fontSize: typography.size.sm },
  filterPillTextActive: { color: colors.brand.blue },
  itemsList: { paddingHorizontal: spacing.xl, gap: spacing.sm },
  loadingText: { color: colors.text.secondary, textAlign: 'center', paddingVertical: spacing.lg },
  findingCard: { marginBottom: 0 },
  findingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  categoryPill: {
    backgroundColor: colors.surface.background,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryPillText: {
    color: colors.text.secondary,
    fontWeight: '600',
    fontSize: typography.size.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  addedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.semantic.lowBg,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  addedBadgeText: { color: colors.semantic.low, fontWeight: '700', fontSize: 11 },
  skippedBadge: {
    backgroundColor: colors.semantic.unknownBg,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  skippedBadgeText: { color: colors.text.tertiary, fontWeight: '700', fontSize: 11 },
  needsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.semantic.cautionBg,
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  needsBadgeText: { color: colors.semantic.caution, fontWeight: '700', fontSize: 11 },
  findingName: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  findingDetails: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: 2 },
  findingReason: {
    color: colors.semantic.caution,
    fontSize: typography.size.xs,
    marginTop: 4,
    fontStyle: 'italic',
  },
  findingActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    flexWrap: 'wrap',
  },
  footer: { marginHorizontal: spacing.xl, marginTop: spacing.lg, gap: spacing.sm },
  skipLink: { alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  skipLinkText: { color: colors.brand.blue, fontWeight: '700' },
});
