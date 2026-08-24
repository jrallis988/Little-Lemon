import React, { useCallback, useEffect, useState } from 'react';
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
      ? 'No known conflicts were identified based on the health information currently available to BioCross.'
      : check.summary;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} showLogo={false} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.checkedAt}>
            Checked {new Date(check.checkedAt).toLocaleString()}
          </Text>
          {check.newerInfoAvailable ? (
            <View style={styles.newerBadge}>
              <Ionicons name="refresh-circle" size={14} color={colors.semantic.caution} />
              <Text style={styles.newerText}>Newer information available</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.section}>
          <SupplementCard supplement={check.supplement} />
        </View>

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

        {check.evidence.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Evidence & sources</Text>
            {check.evidence.map((ev) => (
              <View key={ev.id} style={styles.cardGap}>
                <EvidenceCard evidence={ev} />
              </View>
            ))}
          </View>
        ) : null}

        {check.tips.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {check.riskLevel === 'high' ? 'What to do next' : 'Tips'}
            </Text>
            <HealthCard>
              {check.tips.map((tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <Ionicons
                    name={
                      check.riskLevel === 'high'
                        ? 'alert-circle-outline'
                        : 'checkmark-circle-outline'
                    }
                    size={18}
                    color={
                      check.riskLevel === 'high'
                        ? colors.semantic.high
                        : colors.semantic.low
                    }
                  />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </HealthCard>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.snapshot}>{check.profileSnapshotNote}</Text>
        </View>

        <View style={styles.section}>
          <InfoCallout
            tone="warning"
            icon="medical-outline"
            title="Medical disclaimer"
            body={check.disclaimer}
          />
        </View>

        <View style={styles.actions}>
          <BioCrossButton
            label="View My Profile"
            variant="outline"
            size="md"
            onPress={() => router.push('/(tabs)/profile')}
          />
          <BioCrossButton
            label="Edit Supplement"
            variant="secondary"
            size="md"
            onPress={() =>
              router.push({
                pathname: '/check/confirm',
                params: { supplementId: check.supplement.id },
              })
            }
            style={styles.actionGap}
          />
        </View>

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
  newerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xs,
    backgroundColor: colors.semantic.cautionBg,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  newerText: {
    color: colors.semantic.caution,
    fontWeight: '600',
    fontSize: typography.size.xs,
  },
  section: { marginHorizontal: spacing.xl, marginBottom: spacing.lg },
  sectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  cardGap: { marginBottom: spacing.sm },
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
  snapshot: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    fontStyle: 'italic',
  },
  actions: { marginHorizontal: spacing.xl, marginBottom: spacing.md },
  actionGap: { marginTop: spacing.sm },
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
