import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NewFindCard } from '@/components/discovery/NewFindCard';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import {
  DEMO_ARTISTS,
  GEOGRAPHIES,
  SCENES,
  brandNewArtists,
  unsignedArtists,
} from '@/lib/demoData';

type FindFilter = 'new' | 'unsigned' | 'all';

/**
 * Find bands — stumble-upon discovery for unsigned / brand-new musicians.
 * Genre + place filters stay; “new” and “unsigned” lead.
 */
export default function ExploreScreen() {
  const [filter, setFilter] = useState<FindFilter>('new');
  const [scene, setScene] = useState<string | null>(null);
  const [geo, setGeo] = useState<string | null>(null);
  const bottomInset = useBottomInset(spacing.tabBar);

  const pool = useMemo(() => {
    if (filter === 'new') return brandNewArtists(40);
    if (filter === 'unsigned') return unsignedArtists();
    return DEMO_ARTISTS;
  }, [filter]);

  const results = useMemo(() => {
    return pool
      .filter((artist) => {
        const sceneOk = !scene || artist.scene === scene;
        const geoOk = !geo || artist.geography === geo;
        return sceneOk && geoOk;
      })
      .sort((a, b) => (b.joinedAt ?? '').localeCompare(a.joinedAt ?? ''));
  }, [pool, scene, geo]);

  const spotlight = useMemo(() => brandNewArtists(3), []);

  return (
    <StaticBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <Text style={styles.headline}>Find bands</Text>
        <Text style={styles.lede}>
          The place for unsigned acts and brand-new friend groups — the singer
          or band you’d catch once on YouTube and want somewhere real to follow.
          No label required. No algorithm ranking.
        </Text>

        {filter === 'new' && !scene && !geo ? (
          <View style={styles.spotlight}>
            <Text style={styles.spotlightLabel}>Fresh this month</Text>
            {spotlight.map((artist) => (
              <NewFindCard key={`spot-${artist.id}`} artist={artist} />
            ))}
          </View>
        ) : null}

        <Text style={styles.section}>Who</Text>
        <View style={styles.chips}>
          <FilterChip
            label="Brand new"
            active={filter === 'new'}
            onPress={() => setFilter('new')}
          />
          <FilterChip
            label="Unsigned"
            active={filter === 'unsigned'}
            onPress={() => setFilter('unsigned')}
          />
          <FilterChip
            label="Everyone"
            active={filter === 'all'}
            onPress={() => setFilter('all')}
          />
        </View>

        <Text style={styles.section}>Genre</Text>
        <View style={styles.chips}>
          <FilterChip
            label="All"
            active={scene === null}
            onPress={() => setScene(null)}
          />
          {SCENES.map((s) => (
            <FilterChip
              key={s}
              label={s}
              active={scene === s}
              onPress={() => setScene(s)}
            />
          ))}
        </View>

        <Text style={styles.section}>Place</Text>
        <View style={styles.chips}>
          <FilterChip
            label="Anywhere"
            active={geo === null}
            onPress={() => setGeo(null)}
          />
          {GEOGRAPHIES.map((g) => (
            <FilterChip
              key={g}
              label={g}
              active={geo === g}
              onPress={() => setGeo(g)}
            />
          ))}
        </View>

        <Text style={styles.section}>
          {results.length} band{results.length === 1 ? '' : 's'}
        </Text>
        {results.map((artist) => (
          <NewFindCard key={artist.id} artist={artist} />
        ))}
        {results.length === 0 ? (
          <Text style={styles.empty}>
            Nobody in this filter yet. Try another scene — or be the first to
            upload.
          </Text>
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
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  headline: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  lede: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  spotlight: {
    marginBottom: spacing.md,
  },
  spotlightLabel: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 0.4,
    color: colors.textDim,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  section: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 0.4,
    color: colors.textDim,
    textTransform: 'uppercase',
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
    borderColor: colors.link,
    backgroundColor: colors.link,
  },
  chipText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontFamily: fonts.sansBold,
  },
  empty: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.md,
    lineHeight: 20,
  },
});
