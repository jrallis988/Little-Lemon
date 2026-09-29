import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HealthCard } from './HealthCard';
import { RiskBadge } from './RiskBadge';
import { colors, radii, spacing, typography, riskColors } from '../tokens';
import type { RiskLevel } from '../tokens';
import type { SafetyFinding, SupplementCheck } from '../../domain/models';

export interface RiskResultCardProps {
  check: SupplementCheck;
  onLearnMore?: () => void;
}

export function RiskResultCard({ check, onLearnMore }: RiskResultCardProps) {
  const tone = riskColors(check.riskLevel);
  const iconName =
    check.riskLevel === 'low'
      ? 'shield-checkmark'
      : check.riskLevel === 'caution'
        ? 'warning'
        : check.riskLevel === 'high'
          ? 'shield'
          : 'help-circle';

  return (
    <HealthCard
      backgroundColor={tone.bg}
      borderColor={tone.border}
      accessibilityRole="summary"
      accessibilityLabel={`${check.headline}. ${check.summary}`}
    >
      <View style={styles.topRow}>
        <View style={[styles.iconCircle, { backgroundColor: '#fff' }]}>
          <Ionicons name={iconName} size={28} color={tone.fg} />
        </View>
        <View style={styles.gauge}>
          <RiskGauge level={check.riskLevel} />
        </View>
      </View>
      <Text style={[styles.headline, { color: tone.fg }]}>{check.headline}</Text>
      <Text style={styles.summary}>{check.summary}</Text>

      {check.riskLevel === 'high' ? (
        <View style={styles.whyBox}>
          <Text style={styles.whyTitle}>Why it’s high risk:</Text>
          {check.findings.slice(0, 3).map((f) => (
            <View key={f.id} style={styles.whyRow}>
              <Ionicons
                name={
                  f.category === 'interaction'
                    ? 'git-network-outline'
                    : f.category === 'condition'
                      ? 'heart-outline'
                      : 'alert-circle-outline'
                }
                size={16}
                color={colors.semantic.high}
              />
              <Text style={styles.whyText}>{f.title}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {check.riskLevel === 'caution' ? (
        <View style={[styles.confidence, { backgroundColor: colors.semantic.cautionBg }]}>
          <Ionicons name="warning" size={18} color={colors.semantic.caution} />
          <Text style={[styles.confidenceText, { color: colors.semantic.caution }]}>
            Something needs your attention before you take this. Review the findings and talk with your
            healthcare provider.
          </Text>
        </View>
      ) : null}

      {check.riskLevel === 'low' ? (
        <View style={[styles.confidence, { backgroundColor: colors.semantic.lowBg }]}>
          <Ionicons name="checkmark-circle" size={18} color={colors.semantic.low} />
          <Text style={[styles.confidenceText, { color: colors.semantic.low }]}>
            No known conflicts were identified based on your current health profile and the information
            available to BioCross.
          </Text>
        </View>
      ) : null}

      {check.riskLevel === 'more_info' ? (
        <>
          <View style={[styles.confidence, { backgroundColor: colors.semantic.unknownBg }]}>
            <Ionicons name="information-circle" size={18} color={colors.semantic.unknown} />
            <Text style={styles.confidenceText}>
              BioCross will not invent a safety result when product or profile information is incomplete.
            </Text>
          </View>
          {check.findings.length > 0 ? (
            <View style={styles.whyBox}>
              <Text style={styles.whyTitle}>What we need:</Text>
              {check.findings.map((f) => (
                <View key={f.id} style={styles.whyRow}>
                  <Ionicons name="ellipse" size={8} color={colors.semantic.unknown} />
                  <Text style={styles.whyText}>{f.title}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Always talk to your healthcare provider before using</Text>
        {onLearnMore ? (
          <Pressable onPress={onLearnMore} accessibilityRole="link" accessibilityLabel="Learn more">
            <Text style={styles.learnMore}>Learn more</Text>
          </Pressable>
        ) : null}
      </View>
    </HealthCard>
  );
}

function RiskGauge({ level }: { level: RiskLevel }) {
  const position = level === 'low' ? '12%' : level === 'caution' ? '50%' : level === 'high' ? '88%' : '50%';
  return (
    <View accessible accessibilityLabel={`Risk gauge indicating ${level}`}>
      <View style={styles.gaugeArc}>
        <View style={[styles.gaugeSeg, { backgroundColor: colors.semantic.low }]} />
        <View style={[styles.gaugeSeg, { backgroundColor: colors.semantic.caution }]} />
        <View style={[styles.gaugeSeg, { backgroundColor: colors.semantic.high }]} />
      </View>
      <View style={[styles.needle, { left: position }]} />
      <Text style={styles.gaugeLabel}>
        {level === 'more_info'
          ? 'More info'
          : level === 'low'
            ? 'Low'
            : level.charAt(0).toUpperCase() + level.slice(1)}
      </Text>
    </View>
  );
}

export function FindingCard({
  finding,
  onOpenEvidence,
}: {
  finding: SafetyFinding;
  onOpenEvidence?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const tone = riskColors(finding.severity === 'info' ? 'info' : finding.severity);

  return (
    <HealthCard>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`${finding.title}. ${finding.summary}`}
        style={styles.findingHeader}
      >
        <View style={[styles.findingIcon, { backgroundColor: tone.bg }]}>
          <Ionicons
            name={
              finding.severity === 'high'
                ? 'alert-circle'
                : finding.severity === 'caution'
                  ? 'warning'
                  : finding.severity === 'low'
                    ? 'checkmark-circle'
                    : finding.severity === 'more_info'
                      ? 'help-circle'
                      : 'information-circle'
            }
            size={20}
            color={tone.fg}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.findingTitle}>{finding.title}</Text>
          <Text style={styles.findingSummary}>{finding.summary}</Text>
        </View>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={colors.text.secondary} />
      </Pressable>

      {open ? (
        <View style={styles.findingBody}>
          <DetailBlock title="What we found" body={finding.whatWeFound} />
          <DetailBlock title="Why it matters" body={finding.whyItMatters} />
          {finding.triggeredByProfileItemLabel ? (
            <DetailBlock title="Triggered by your health profile" body={finding.triggeredByProfileItemLabel} />
          ) : null}
          <DetailBlock title="What to discuss with your healthcare professional" body={finding.discussWithProvider} />
          {onOpenEvidence && finding.evidenceIds.length > 0 ? (
            <Pressable onPress={onOpenEvidence} accessibilityRole="link">
              <Text style={styles.evidenceLink}>View evidence & sources</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </HealthCard>
  );
}

function DetailBlock({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.detailBlock}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gauge: { width: 120 },
  gaugeArc: { flexDirection: 'row', height: 10, borderRadius: 8, overflow: 'hidden' },
  gaugeSeg: { flex: 1 },
  needle: {
    position: 'absolute',
    top: -2,
    width: 10,
    height: 14,
    marginLeft: -5,
    borderRadius: 2,
    backgroundColor: colors.text.primary,
  },
  gaugeLabel: {
    marginTop: spacing.xs,
    textAlign: 'center',
    fontSize: typography.size.xs,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  headline: {
    marginTop: spacing.md,
    fontSize: typography.size.xxl,
    fontWeight: '800',
  },
  summary: {
    marginTop: spacing.xs,
    color: colors.text.primary,
    fontSize: typography.size.md,
    lineHeight: 22,
  },
  whyBox: {
    marginTop: spacing.md,
    backgroundColor: '#fff',
    borderRadius: radii.md,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  whyTitle: { fontWeight: '700', color: colors.text.primary, marginBottom: 4 },
  whyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  whyText: { color: colors.text.primary, flex: 1, fontSize: typography.size.sm },
  confidence: {
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: 8,
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface.background,
  },
  confidenceText: { flex: 1, fontSize: typography.size.sm, lineHeight: 18, color: colors.text.secondary },
  footer: {
    marginTop: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  footerText: { flex: 1, color: colors.text.secondary, fontSize: typography.size.xs },
  learnMore: { color: colors.brand.blue, fontWeight: '700', fontSize: typography.size.sm },
  findingHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  findingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  findingTitle: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  findingSummary: { color: colors.text.secondary, fontSize: typography.size.sm, marginTop: 2 },
  findingBody: { marginTop: spacing.md, gap: spacing.sm, borderTopWidth: 1, borderTopColor: colors.surface.border, paddingTop: spacing.md },
  detailBlock: { gap: 4 },
  detailTitle: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.sm },
  detailBody: { color: colors.text.secondary, fontSize: typography.size.sm, lineHeight: 18 },
  evidenceLink: { color: colors.brand.blue, fontWeight: '700', marginTop: 4 },
});
