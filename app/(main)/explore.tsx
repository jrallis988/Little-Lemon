import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BandCard } from '@/components/ui/BandCard';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, spacing, typography, fonts } from '@/constants/theme';
import { useAudioBarInset } from '@/hooks/useAudioBarInset';
import { DEMO_ARTISTS, DEMO_TRACKS, GEOGRAPHIES, SCENES } from '@/lib/demoData';

/**
 * Scene & geography browsing — e.g. "Punk bands in NH", "Hyperpop in LA".
 */
export default function ExploreScreen() {
  const [scene, setScene] = useState<string | null>(null);
  const [geo, setGeo] = useState<string | null>(null);
  const bottomInset = useAudioBarInset(spacing.tabBar);

  const results = useMemo(() => {
    return DEMO_ARTISTS.filter((artist) => {
      const sceneOk = !scene || artist.scene === scene;
      const geoOk = !geo || artist.geography === geo;
      return sceneOk && geoOk;
    });
  }, [scene, geo]);

  return (
    <StaticBackground>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}>
        <Text style={styles.headline}>FIND A SCENE</Text>
        <Text style={styles.lede}>
          Filter by genre and place. Chronological discovery — no global charts.
        </Text>

        <Text style={styles.section}>GENRE</Text>
        <View style={styles.chips}>
          <FilterChip
            label="ALL"
            active={scene === null}
            onPress={() => setScene(null)}
          />
          {SCENES.map((s) => (
            <FilterChip
              key={s}
              label={s.toUpperCase()}
              active={scene === s}
              onPress={() => setScene(s)}
            />
          ))}
        </View>

        <Text style={styles.section}>GEOGRAPHY</Text>
        <View style={styles.chips}>
          <FilterChip label="ANYWHERE" active={geo === null} onPress={() => setGeo(null)} />
          {GEOGRAPHIES.map((g) => (
            <FilterChip
              key={g}
              label={g.toUpperCase()}
              active={geo === g}
              onPress={() => setGeo(g)}
            />
          ))}
        </View>

        <Text style={styles.section}>
          {results.length} ARTIST{results.length === 1 ? '' : 'S'}
        </Text>
        {results.map((artist) => (
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
        {results.length === 0 ? (
          <Text style={styles.empty}>No signal in this filter. Try another scene.</Text>
        ) : null}
      </ScrollView>
    </StaticBackground>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  headline: {
    ...typography.headline,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  lede: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  section: {
    ...typography.monoTiny,
    color: colors.textDim,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 2,
    backgroundColor: colors.surface,
  },
  chipActive: {
    borderColor: colors.phosphor,
    backgroundColor: colors.surfaceRaised,
  },
  chipText: {
    ...typography.monoTiny,
    color: colors.textDim,
  },
  chipTextActive: {
    color: colors.phosphor,
  },
  empty: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});
