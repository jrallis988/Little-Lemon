import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { WaveformPlayer } from '@/components/audio/WaveformPlayer';
import { BandCard } from '@/components/ui/BandCard';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, spacing, typography } from '@/constants/theme';
import { DEMO_ARTISTS, DEMO_TRACKS } from '@/lib/demoData';

/**
 * Human-curated Editorial homepage — no algorithmic ranking.
 */
export default function EditorialScreen() {
  const spotlight = DEMO_TRACKS[0];
  const featuredArtists = DEMO_ARTISTS.slice(0, 3);

  return (
    <StaticBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>STATICVOLUME</Text>
        <Text style={styles.kicker}>EDITORIAL SPOTLIGHT</Text>
        <Text style={styles.lede}>
          Hand-picked transmissions. Status comes from the scene — not a badge.
        </Text>

        <View style={styles.spotlight}>
          <WaveformPlayer track={spotlight} />
        </View>

        <Text style={styles.section}>FEATURED ARTISTS</Text>
        {featuredArtists.map((artist) => (
          <BandCard
            key={artist.id}
            id={artist.id}
            name={artist.displayName}
            scene={artist.scene}
            geography={artist.geography}
            downloadCount={
              DEMO_TRACKS.find((t) => t.artistId === artist.id)?.downloadCount ?? 0
            }
          />
        ))}
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl + spacing.audioBar,
  },
  brand: {
    ...typography.brand,
    color: colors.phosphor,
    marginBottom: spacing.sm,
  },
  kicker: {
    ...typography.monoTiny,
    color: colors.copper,
    marginBottom: spacing.xs,
  },
  lede: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  spotlight: {
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  section: {
    ...typography.caption,
    color: colors.textDim,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
});
