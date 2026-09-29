import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Share,
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
  EvidenceCard,
  ErrorState,
  FindingCard,
  HealthCard,
  InfoCallout,
  LoadingState,
  RiskResultCard,
  SupplementCard,
} from '../../src/design-system';
import { colors, radii, spacing, typography } from '../../src/design-system/tokens';
import type { SupplementCheck } from '../../src/domain/models';
import { biocrossRepository } from '../../src/domain/repository';
import { useBioCross } from '../../src/state/BioCrossContext';

export default function ResultScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { checks, ready } = useBioCross();
  const [check, setCheck] = useState<SupplementCheck | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<'helpful' | 'not_helpful' | null>(null);

  const loadCheck = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const fromContext = checks.find((c) => c.id === id);
    if (fromContext) {
      setCheck(fromContext);
      setLoading(false);
      return;
    }
    const fromRepo = await biocrossRepository.getCheckById(id);
    setCheck(fromRepo ?? null);
    setLoading(false);
  }, [id, checks]);

  useEffect(() => {
    if (ready) loadCheck();
  }, [ready, loadCheck]);

  const profileRelevant = useMemo(() => {
    if (!check) return [];
    return check.findings.filter(
      (f) => f.triggeredByProfileItemLabel || f.whyItMatters,
    );
  }, [check]);

  const handleShare = async () => {
    if (!check) return;
    try {
      await Share.share({
        message: `BioCross Safety Check: ${check.supplement.name}\n${check.headline}\n${check.summary}\n\nBioCross provides informational insights, not medical advice.`,
        title: `BioCross — ${check.supplement.name}`,
      });
    } catch {
      // user dismissed
    }
  };

  const handleFeedback = (value: 'helpful' | 'not_helpful') => {
    setFeedback(value);
    Alert.alert(
      'Thank you',
      'Your feedback helps BioCross improve safety insights for everyone.',
    );
  };

  if (!ready || loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <LoadingState message="Loading safety results…" />
      </SafeAreaView>
    );
  }

  if (!check) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader onBack={() => router.back()} showLogo={false} />
        <ErrorState
          title="Result not found"
          body="We couldn't find this safety check. It may have been removed or the link is invalid."
          actionLabel="View history"
          onAction={() => router.push('/(tabs)/history')}
        />
      </SafeAreaView>
    );
  }

  const lowSummary =
    check.riskLevel === 'low'
      ? 'No known conflicts were identified based on your current health profile and the information available to BioCross.'
      : check.summary;

  const firstFindingWithEvidence = check.findings.find((f) => f.evidenceIds.length > 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} showLogo={false} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.checkedAt}>
            Checked {new Date(check.checkedAt).toLocaleString()}
          </Text>
        </View>

        {/* 1. Supplement card */}
        <View style={styles.section}>
          <SupplementCard supplement={check.supplement} />
        </View>

        {/* 2. RiskResultCard summary */}
        <View style={styles.section}>
          <RiskResultCard
            check={{ ...check, summary: lowSummary }}
            onLearnMore={() => {
              const first = check.findings[0];
              if (first) {
                router.push({
                  pathname: '/result/evidence/[findingId]',
                  params: { findingId: first.id, checkId: check.id },
                });
              }
            }}
          />
        </View>

        {/* 3. more_info action buttons */}
        {check.riskLevel === 'more_info' ? (
          <View style={styles.section}>
            <BioCrossButton
              label="Update my information"
              icon="person-outline"
              onPress={() => router.push('/(tabs)/profile')}
            />
            <BioCrossButton
              label="Review supplement label"
              variant="outline"
              size="md"
              onPress={() =>
                router.push({
                  pathname: '/check/label-review',
                  params: { supplementId: check.supplement.id },
                })
              }
              style={styles.actionGap}
            />
            <BioCrossButton
              label="Try again"
              variant="secondary"
              size="md"
              onPress={() => router.push('/(tabs)/check')}
              style={styles.actionGap}
            />
          </View>
        ) : null}

        {/* 4. What we found */}
        {check.findings.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What we found</Text>
            {check.findings.map((finding) => (
              <View key={finding.id} style={styles.cardGap}>
                <FindingCard
                  finding={finding}
                  onOpenEvidence={() =>
                    router.push({
                      pathname: '/result/evidence/[findingId]',
                      params: { findingId: finding.id, checkId: check.id },
                    })
                  }
                />
              </View>
            ))}
          </View>
        ) : null}

        {/* 5. Why it matters / profile relevance */}
        {profileRelevant.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Why it matters / What in my profile is relevant
            </Text>
            <HealthCard>
              {profileRelevant.map((finding) => (
                <View key={finding.id} style={styles.profileBlock}>
                  <Text style={styles.profileFindingTitle}>{finding.title}</Text>
                  {finding.triggeredByProfileItemLabel ? (
                    <Text style={styles.profileTrigger}>
                      Relevant profile item: {finding.triggeredByProfileItemLabel}
                    </Text>
                  ) : null}
                  <Text style={styles.profileWhy}>{finding.whyItMatters}</Text>
                </View>
              ))}
            </HealthCard>
          </View>
        ) : null}

        {/* 6. Evidence & Sources */}
        {check.evidence.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Evidence & Sources</Text>
            {check.evidence.map((ev) => (
              <View key={ev.id} style={styles.cardGap}>
                <EvidenceCard evidence={ev} />
              </View>
            ))}
            {firstFindingWithEvidence ? (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/result/evidence/[findingId]',
                    params: {
                      findingId: firstFindingWithEvidence.id,
                      checkId: check.id,
                    },
                  })
                }
                accessibilityRole="link"
                style={styles.evidenceLinkBtn}
              >
                <Text style={styles.evidenceLinkText}>View full evidence detail ›</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}

        {/* 7. What should I do next */}
        {check.tips.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What should I do next</Text>
            <HealthCard>
              {check.tips.map((tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <Ionicons
                    name={
                      check.riskLevel === 'high'
                        ? 'alert-circle-outline'
                        : check.riskLevel === 'more_info'
                          ? 'information-circle-outline'
                          : 'checkmark-circle-outline'
                    }
                    size={18}
                    color={
                      check.riskLevel === 'high'
                        ? colors.semantic.high
                        : check.riskLevel === 'more_info'
                          ? colors.semantic.unknown
                          : colors.semantic.low
                    }
                  />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </HealthCard>
          </View>
        ) : null}

        {/* 8. Disclaimer */}
        <View style={styles.section}>
          <InfoCallout
            tone="warning"
            icon="medical-outline"
            title="Medical disclaimer"
            body={check.disclaimer}
          />
          <Text style={styles.changeNote}>
            Results may change if your health information or available research changes.
          </Text>
          {check.profileSnapshotNote ? (
            <Text style={styles.snapshot}>{check.profileSnapshotNote}</Text>
          ) : null}
        </View>

        {/* 9. Newer information banner */}
        {check.newerInfoAvailable ? (
          <View style={styles.section}>
            <View style={styles.newerBanner}>
              <Ionicons name="refresh-circle" size={20} color={colors.semantic.caution} />
              <View style={{ flex: 1 }}>
                <Text style={styles.newerTitle}>New information available</Text>
                <Text style={styles.newerBody}>
                  Updated research or profile data may change this result.
                </Text>
              </View>
            </View>
            <BioCrossButton
              label="Recheck Supplement"
              icon="refresh-outline"
              onPress={() =>
                router.push({
                  pathname: '/check/confirm',
                  params: { supplementId: check.supplement.id },
                })
              }
              style={styles.actionGap}
            />
          </View>
        ) : null}

        <View style={styles.shareRow}>
          <Pressable
            onPress={handleShare}
            accessibilityRole="button"
            accessibilityLabel="Share results"
            style={styles.shareBtn}
          >
            <Ionicons name="share-outline" size={20} color={colors.brand.blue} />
            <Text style={styles.shareText}>Share</Text>
          </Pressable>
        </View>

        <View style={styles.feedback}>
          <Text style={styles.feedbackTitle}>Was this helpful?</Text>
          <View style={styles.feedbackRow}>
            <Pressable
              onPress={() => handleFeedback('helpful')}
              accessibilityRole="button"
              accessibilityLabel="Yes, helpful"
              style={[
                styles.feedbackBtn,
                feedback === 'helpful' && styles.feedbackBtnActive,
              ]}
            >
              <Ionicons
                name="thumbs-up-outline"
                size={18}
                color={feedback === 'helpful' ? colors.text.inverse : colors.brand.blue}
              />
              <Text
                style={[
                  styles.feedbackBtnText,
                  feedback === 'helpful' && styles.feedbackBtnTextActive,
                ]}
              >
                Yes
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleFeedback('not_helpful')}
              accessibilityRole="button"
              accessibilityLabel="No, not helpful"
              style={[
                styles.feedbackBtn,
                feedback === 'not_helpful' && styles.feedbackBtnActive,
              ]}
            >
              <Ionicons
                name="thumbs-down-outline"
                size={18}
                color={feedback === 'not_helpful' ? colors.text.inverse : colors.brand.blue}
              />
              <Text
                style={[
                  styles.feedbackBtnText,
                  feedback === 'not_helpful' && styles.feedbackBtnTextActive,
                ]}
              >
                No
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  scroll: { paddingBottom: spacing.xxxl },
  header: { paddingHorizontal: spacing.xl, marginBottom: spacing.sm },
  checkedAt: { color: colors.text.tertiary, fontSize: typography.size.sm },
  section: { marginHorizontal: spacing.xl, marginBottom: spacing.lg },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  cardGap: { marginBottom: spacing.sm },
  actionGap: { marginTop: spacing.sm },
  profileBlock: {
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surface.border,
  },
  profileFindingTitle: {
    fontWeight: '700',
    color: colors.text.primary,
    fontSize: typography.size.md,
  },
  profileTrigger: {
    marginTop: 4,
    color: colors.brand.blue,
    fontSize: typography.size.sm,
    fontWeight: '600',
  },
  profileWhy: {
    marginTop: 4,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    lineHeight: 20,
  },
  evidenceLinkBtn: { marginTop: spacing.xs, minHeight: 44, justifyContent: 'center' },
  evidenceLinkText: { color: colors.brand.blue, fontWeight: '700', fontSize: typography.size.sm },
  tipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
    paddingVertical: spacing.xs,
  },
  tipText: {
    flex: 1,
    color: colors.text.primary,
    fontSize: typography.size.sm,
    lineHeight: 20,
  },
  changeNote: {
    marginTop: spacing.sm,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    lineHeight: 20,
  },
  snapshot: {
    marginTop: spacing.xs,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    fontStyle: 'italic',
  },
  newerBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.semantic.cautionBg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.semantic.cautionBorder,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  newerTitle: {
    fontWeight: '700',
    color: colors.semantic.caution,
    fontSize: typography.size.md,
  },
  newerBody: {
    marginTop: 2,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    lineHeight: 18,
  },
  shareRow: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.sm,
    minHeight: 44,
  },
  shareText: { color: colors.brand.blue, fontWeight: '700' },
  feedback: {
    marginHorizontal: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  feedbackTitle: {
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  feedbackRow: { flexDirection: 'row', gap: spacing.md },
  feedbackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.brand.blue,
    minHeight: 44,
  },
  feedbackBtnActive: {
    backgroundColor: colors.brand.blue,
    borderColor: colors.brand.blue,
  },
  feedbackBtnText: { color: colors.brand.blue, fontWeight: '700' },
  feedbackBtnTextActive: { color: colors.text.inverse },
});
