import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HealthCard } from './HealthCard';
import { colors, spacing, typography } from '../tokens';
import type { EvidenceSource, EvidenceStrength } from '../../domain/models';

function strengthLabel(s: EvidenceStrength): string {
  switch (s) {
    case 'established':
      return 'Established interaction information';
    case 'moderate':
      return 'Moderate evidence';
    case 'limited':
      return 'Limited research';
    case 'emerging':
      return 'Emerging research';
  }
}

export function EvidenceCard({
  evidence,
  onOpen,
}: {
  evidence: EvidenceSource;
  onOpen?: () => void;
}) {
  return (
    <HealthCard>
      <Pressable
        onPress={onOpen}
        disabled={!onOpen}
        accessibilityRole={onOpen ? 'button' : 'summary'}
        accessibilityLabel={`${evidence.source}. ${evidence.relevantFinding}`}
      >
        <View style={styles.row}>
          <View style={styles.icon}>
            <Ionicons name="library-outline" size={18} color={colors.brand.blue} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.source}>{evidence.source}</Text>
            {evidence.publication ? <Text style={styles.pub}>{evidence.publication}</Text> : null}
            <Text style={styles.finding}>{evidence.relevantFinding}</Text>
            <Text style={styles.meta}>
              {strengthLabel(evidence.evidenceStrength)}
              {evidence.publicationDate ? ` · ${evidence.publicationDate}` : ''}
              {evidence.studyType ? ` · ${evidence.studyType}` : ''}
            </Text>
            <Text style={styles.retrieved}>Retrieved by BioCross: {new Date(evidence.retrievedAt).toLocaleDateString()}</Text>
          </View>
          {onOpen ? <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} /> : null}
        </View>
      </Pressable>
    </HealthCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brand.blueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  source: { fontWeight: '800', color: colors.text.primary, fontSize: typography.size.md },
  pub: { color: colors.text.secondary, marginTop: 2, fontSize: typography.size.sm },
  finding: { color: colors.text.primary, marginTop: spacing.xs, fontSize: typography.size.sm, lineHeight: 18 },
  meta: { color: colors.brand.blue, marginTop: spacing.xs, fontSize: typography.size.xs, fontWeight: '600' },
  retrieved: { color: colors.text.tertiary, marginTop: 4, fontSize: typography.size.xs },
});
