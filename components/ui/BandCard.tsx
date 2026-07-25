import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { colors } from '@/constants/theme';

export type BandCardProps = {
  id: string;
  name: string;
  scene?: string | null;
  geography?: string | null;
  artworkUrl?: string | null;
  downloadCount?: number;
};

/**
 * Artist directory row — sharp bordered media frame, portal table density.
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
      <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <View style={styles.artwork}>
          <Text style={styles.artworkMark}>SV</Text>
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
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{downloadCount.toLocaleString()}</Text>
          <Text style={styles.metricLabel}>DL</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.border,
    backgroundColor: colors.backgroundElevated,
  },
  pressed: {
    backgroundColor: colors.toolbarActive,
  },
  artwork: {
    width: 36,
    height: 36,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkMark: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    color: colors.phosphorDim,
    letterSpacing: 0.4,
  },
  meta: {
    flex: 1,
    gap: 1,
    minWidth: 0,
  },
  name: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    letterSpacing: 0.3,
    color: colors.text,
    textTransform: 'uppercase',
  },
  scene: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    letterSpacing: 0.3,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  metric: {
    alignItems: 'flex-end',
    gap: 1,
  },
  metricValue: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    color: colors.copper,
  },
  metricLabel: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    letterSpacing: 0.4,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
});
