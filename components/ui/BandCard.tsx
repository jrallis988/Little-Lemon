import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { colors, radii, spacing, typography } from '@/constants/theme';

export type BandCardProps = {
  id: string;
  name: string;
  scene?: string | null;
  geography?: string | null;
  artworkUrl?: string | null;
  downloadCount?: number;
};

/**
 * Artist showcase tile — framed like physical media, not a glass card.
 * Used in editorial / explore lists as a navigation affordance.
 */
export function BandCard({
  id,
  name,
  scene,
  geography,
  downloadCount = 0,
}: BandCardProps) {
  const meta = [scene, geography].filter(Boolean).join(' · ');

  return (
    <Link href={`/artist/${id}`} asChild>
      <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
        <View style={styles.sleeve}>
          <View style={styles.artwork}>
            <View style={styles.artworkInner}>
              <Text style={styles.artworkMark}>SV</Text>
            </View>
            <View style={styles.sleeveEdge} />
          </View>
          <View style={styles.meta}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            {meta.length > 0 ? (
              <Text style={styles.scene} numberOfLines={1}>
                {meta}
              </Text>
            ) : null}
            <Text style={styles.downloads}>
              {downloadCount.toLocaleString()} downloads
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.85,
  },
  sleeve: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  artwork: {
    width: 72,
    height: 72,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.media,
    overflow: 'hidden',
  },
  artworkInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceRaised,
  },
  artworkMark: {
    ...typography.monoTiny,
    color: colors.phosphorDim,
  },
  sleeveEdge: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.phosphorDim,
    opacity: 0.35,
  },
  meta: {
    flex: 1,
    gap: 4,
  },
  name: {
    ...typography.title,
    color: colors.text,
  },
  scene: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  downloads: {
    ...typography.monoTiny,
    color: colors.copper,
    textTransform: 'uppercase',
  },
});
