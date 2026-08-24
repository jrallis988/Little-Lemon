import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppHeader,
  EvidenceCard,
  ErrorState,
  HealthCard,
  LoadingState,
} from '../../src/design-system';
import { colors, spacing, typography } from '../../src/design-system/tokens';
import type { EvidenceSource, SafetyFinding, SupplementCheck } from '../../src/domain/models';
import { biocrossRepository } from '../../src/domain/repository';
import { DEMO_EVIDENCE } from '../../src/domain/fixtures';
import { useBioCross } from '../../src/state/BioCrossContext';

export default function EvidenceDetailScreen() {
  const router = useRouter();
  const { findingId, checkId } = useLocalSearchParams<{
    findingId: string;
    checkId?: string;
  }>();
  const { checks, ready } = useBioCross();
  const [check, setCheck] = useState<SupplementCheck | null>(null);
  const [finding, setFinding] = useState<SafetyFinding | null>(null);
  const [evidenceList, setEvidenceList] = useState<EvidenceSource[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!findingId) return;
    setLoading(true);

    let loadedCheck: SupplementCheck | undefined;
    if (checkId) {
      loadedCheck = checks.find((c) => c.id === checkId);
      if (!loadedCheck) {
        loadedCheck = await biocrossRepository.getCheckById(checkId);
      }
    }

    if (!loadedCheck) {
      loadedCheck = checks.find((c) => c.findings.some((f) => f.id === findingId));
      if (!loadedCheck) {
        for (const c of checks) {
          if (c.findings.some((f) => f.id === findingId)) {
            loadedCheck = c;
            break;
          }
        }
      }
    }

    const foundFinding = loadedCheck?.findings.find((f) => f.id === findingId);

    if (loadedCheck && foundFinding) {
      setCheck(loadedCheck);
      setFinding(foundFinding);
      const fromCheck = loadedCheck.evidence.filter((e) =>
        foundFinding.evidenceIds.includes(e.id),
      );
      if (fromCheck.length > 0) {
        setEvidenceList(fromCheck);
      } else if (foundFinding.evidenceIds.length > 0) {
        setEvidenceList(
          DEMO_EVIDENCE.filter((e) => foundFinding.evidenceIds.includes(e.id)),
        );
      } else {
        setEvidenceList([]);
      }
    } else {
      setCheck(null);
      setFinding(null);
      setEvidenceList([]);
    }

    setLoading(false);
  }, [checkId, findingId, checks]);

  useEffect(() => {
    if (ready) load();
  }, [ready, load]);

  if (!ready || loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <LoadingState message="Loading evidence…" />
      </SafeAreaView>
    );
  }

  if (!finding) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <AppHeader onBack={() => router.back()} showLogo={false} />
        <ErrorState
          title="Evidence not found"
          body="We couldn't find evidence for this finding. Return to your results to review the full safety check."
          actionLabel="Go back"
          onAction={() => router.back()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader onBack={() => router.back()} showLogo={false} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Evidence & Sources</Text>
          <Text style={styles.subtitle}>{finding.title}</Text>
        </View>

        <View style={styles.section}>
          <HealthCard>
            <Text style={styles.blockTitle}>What we found</Text>
            <Text style={styles.blockBody}>{finding.whatWeFound}</Text>
            <Text style={[styles.blockTitle, { marginTop: spacing.md }]}>Why it matters</Text>
            <Text style={styles.blockBody}>{finding.whyItMatters}</Text>
            {finding.triggeredByProfileItemLabel ? (
              <>
                <Text style={[styles.blockTitle, { marginTop: spacing.md }]}>
                  Related to your profile
                </Text>
                <Text style={styles.blockBody}>{finding.triggeredByProfileItemLabel}</Text>
              </>
            ) : null}
          </HealthCard>
        </View>

        {check ? (
          <Text style={styles.productRef}>
            Product: {check.supplement.name}
            {check.supplement.brand ? ` · ${check.supplement.brand}` : ''}
          </Text>
        ) : null}

        <Text style={styles.sectionTitle}>
          {evidenceList.length > 0
            ? `${evidenceList.length} source${evidenceList.length !== 1 ? 's' : ''}`
            : 'No linked sources'}
        </Text>

        {evidenceList.length === 0 ? (
          <HealthCard>
            <Text style={styles.emptyEvidence}>
              BioCross did not link specific published sources to this finding. Your healthcare
              provider can help interpret clinical relevance for your situation.
            </Text>
          </HealthCard>
        ) : (
          evidenceList.map((ev) => (
            <View key={ev.id} style={styles.cardGap}>
              <EvidenceCard evidence={ev} />
            </View>
          ))
        )}

        <View style={styles.section}>
          <HealthCard backgroundColor={colors.brand.blueLight} borderColor={colors.brand.blueMuted}>
            <Text style={styles.disclaimerTitle}>About BioCross evidence</Text>
            <Text style={styles.disclaimerBody}>
              Sources are retrieved from trusted databases and publications. Evidence strength
              reflects how established the information is — not a substitute for professional
              medical advice.
            </Text>
          </HealthCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface.background },
  scroll: { paddingBottom: spacing.xxxl },
  header: { paddingHorizontal: spacing.xl, marginBottom: spacing.lg },
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
  section: { marginHorizontal: spacing.xl, marginBottom: spacing.lg },
  blockTitle: {
    fontWeight: '700',
    color: colors.text.primary,
    fontSize: typography.size.sm,
  },
  blockBody: {
    marginTop: 4,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    lineHeight: 20,
  },
  productRef: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.sm,
    color: colors.text.tertiary,
    fontSize: typography.size.sm,
  },
  sectionTitle: {
    marginHorizontal: spacing.xl,
    fontSize: typography.size.lg,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  cardGap: { marginHorizontal: spacing.xl, marginBottom: spacing.sm },
  emptyEvidence: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    lineHeight: 20,
  },
  disclaimerTitle: {
    fontWeight: '700',
    color: colors.text.primary,
    fontSize: typography.size.md,
  },
  disclaimerBody: {
    marginTop: spacing.xs,
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    lineHeight: 20,
  },
});
