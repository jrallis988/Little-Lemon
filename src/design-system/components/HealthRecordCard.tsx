import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HealthCard } from './HealthCard';
import { colors, radii, spacing, typography } from '../tokens';
import type { UploadedDocument } from '../../domain/models';

export function HealthRecordCard({
  document,
  onView,
}: {
  document: UploadedDocument;
  onView?: () => void;
}) {
  const processed = document.status === 'extracted' || document.status === 'reviewed';
  return (
    <HealthCard>
      <View style={styles.row}>
        <View style={styles.fileIcon}>
          <Ionicons name="document-text" size={22} color={colors.semantic.high} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{document.fileName}</Text>
          <Text style={styles.meta}>
            Uploaded {new Date(document.uploadedAt).toLocaleString()}
          </Text>
          <Text style={styles.meta}>
            {document.pageCount ? `${document.pageCount} pages · ` : ''}
            {(document.sizeBytes / (1024 * 1024)).toFixed(1)} MB
          </Text>
        </View>
        {processed ? (
          <View style={styles.badge}>
            <Ionicons name="checkmark-circle" size={14} color={colors.semantic.low} />
            <Text style={styles.badgeText}>Processed</Text>
          </View>
        ) : (
          <Text style={styles.status}>{document.status}</Text>
        )}
      </View>
      {onView ? (
        <Pressable onPress={onView} style={styles.viewLink} accessibilityRole="link">
          <Text style={styles.link}>View file ›</Text>
        </Pressable>
      ) : null}
    </HealthCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.semantic.highBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontWeight: '700', color: colors.text.primary, fontSize: typography.size.md },
  meta: { color: colors.text.secondary, fontSize: typography.size.xs, marginTop: 2 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.semantic.lowBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  badgeText: { color: colors.semantic.low, fontWeight: '700', fontSize: 11 },
  status: { color: colors.text.secondary, fontSize: typography.size.xs, textTransform: 'capitalize' },
  viewLink: { marginTop: spacing.sm, alignSelf: 'flex-end' },
  link: { color: colors.brand.blue, fontWeight: '700' },
});
