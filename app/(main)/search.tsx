import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { DirectoryArtistRow } from '@/components/directory/DirectoryArtistRow';
import { TrackListing } from '@/components/tracks/TrackListing';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import { totalDownloadsForArtist } from '@/lib/demoData';
import {
  type SearchFacet,
  searchCatalog,
} from '@/lib/searchCatalog';
import { getSpotifySyncStatus } from '@/lib/spotify';

const FACETS: { id: SearchFacet; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'artist', label: 'Artist' },
  { id: 'song', label: 'Song' },
  { id: 'genre', label: 'Genre' },
];

const SUGGESTIONS = [
  'Olivia Rodrigo',
  'Sabrina Carpenter',
  'Black Veil Brides',
  'Weird Al',
  'Espresso',
  'Pop',
  'Metalcore',
  'Couch Static',
];

/**
 * Global catalog search — artists, songs, genres.
 * Covers unsigned finds + contemporary catalog (Spotify-era target).
 */
export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string; facet?: string }>();
  const bottomInset = useBottomInset(spacing.tabBar);
  const spotify = getSpotifySyncStatus();

  const [query, setQuery] = useState(params.q ?? '');
  const [facet, setFacet] = useState<SearchFacet>(
    (params.facet as SearchFacet) || 'all',
  );

  useEffect(() => {
    if (typeof params.q === 'string') setQuery(params.q);
  }, [params.q]);

  const results = useMemo(
    () => searchCatalog(query, facet),
    [query, facet],
  );

  const hasQuery = query.trim().length > 0;
  const empty =
    hasQuery &&
    results.artists.length === 0 &&
    results.tracks.length === 0 &&
    results.genres.length === 0;

  return (
    <StaticBackground>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
      >
        <Text style={styles.headline}>Search</Text>
        <Text style={styles.lede}>
          Look up anyone in the catalog — Olivia Rodrigo, Black Veil Brides,
          Weird Al, or the roommate band that uploaded yesterday. Filter by
          artist, song, or genre.
        </Text>

        <View style={styles.searchRow}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Artist, song, or genre…"
            placeholderTextColor={colors.textDim}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            returnKeyType="search"
            style={styles.input}
            accessibilityLabel="Search catalog"
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery('')}>
              <Text style={styles.clear}>Clear</Text>
            </Pressable>
          ) : null}
        </View>

        <View style={styles.facets}>
          {FACETS.map((item) => {
            const active = facet === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setFacet(item.id)}
                style={[styles.facet, active && styles.facetActive]}
              >
                <Text
                  style={[styles.facetText, active && styles.facetTextActive]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.coverage}>
          Coverage target: Spotify-scale contemporary catalog (~2010–present).
          {spotify.configured
            ? ' Spotify client configured — sync Edge Function next.'
            : ' Demo seed is live; connect Spotify sync for full coverage.'}
        </Text>

        {!hasQuery ? (
          <View style={styles.suggestions}>
            <Text style={styles.sectionTitle}>Try searching</Text>
            <View style={styles.chips}>
              {SUGGESTIONS.map((hint) => (
                <Pressable
                  key={hint}
                  style={styles.chip}
                  onPress={() => setQuery(hint)}
                >
                  <Text style={styles.chipText}>{hint}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {empty ? (
          <Text style={styles.empty}>
            Nothing matched “{query.trim()}” in the demo catalog. Full Spotify
            sync will fill gaps — try another spelling or facet.
          </Text>
        ) : null}

        {results.artists.length > 0 ? (
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>Artists</Text>
              <Text style={styles.panelCount}>{results.artists.length}</Text>
            </View>
            {results.artists.map((artist) => (
              <DirectoryArtistRow
                key={artist.id}
                artist={artist}
                downloadCount={totalDownloadsForArtist(artist.id)}
              />
            ))}
          </View>
        ) : null}

        {results.tracks.length > 0 ? (
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>Songs</Text>
              <Text style={styles.panelCount}>{results.tracks.length}</Text>
            </View>
            {results.tracks.map((track) => (
              <View key={track.id}>
                <TrackListing track={track} />
                {track.releaseYear ? (
                  <Text style={styles.year}>{track.releaseYear}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {results.genres.length > 0 ? (
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>Genres</Text>
              <Text style={styles.panelCount}>{results.genres.length}</Text>
            </View>
            {results.genres.map((hit) => (
              <Pressable
                key={hit.genre}
                style={styles.genreRow}
                onPress={() => {
                  setFacet('genre');
                  setQuery(hit.genre);
                }}
              >
                <Text style={styles.genreName}>{hit.genre}</Text>
                <Text style={styles.genreMeta}>
                  {hit.artistCount} artists · {hit.trackCount} songs
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <Pressable
          style={styles.backArtists}
          onPress={() => router.push('/(main)/artists')}
        >
          <Text style={styles.backArtistsText}>Browse A–Z directory →</Text>
        </Pressable>
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  headline: {
    fontFamily: fonts.sansBold,
    fontSize: 22,
    color: colors.text,
  },
  lede: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontFamily: fonts.sans,
    fontSize: 16,
    color: colors.text,
  },
  clear: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.link,
    paddingVertical: 8,
  },
  facets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  facet: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  facetActive: {
    backgroundColor: colors.link,
    borderColor: colors.link,
  },
  facetText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
  },
  facetTextActive: {
    color: '#FFFFFF',
    fontFamily: fonts.sansBold,
  },
  coverage: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textDim,
    lineHeight: 17,
    marginBottom: spacing.sm,
  },
  suggestions: {
    gap: 8,
  },
  sectionTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 11,
    letterSpacing: 0.4,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  chipText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.link,
  },
  empty: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    paddingVertical: spacing.md,
  },
  panel: {
    ...portalBox,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceRaised,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  panelTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    letterSpacing: 0.4,
    color: colors.text,
    textTransform: 'uppercase',
  },
  panelCount: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textDim,
  },
  year: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
    paddingHorizontal: spacing.sm,
    paddingBottom: 8,
    marginTop: -4,
  },
  genreRow: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    gap: 2,
  },
  genreName: {
    fontFamily: fonts.sansBold,
    fontSize: 15,
    color: colors.link,
  },
  genreMeta: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  backArtists: {
    paddingVertical: spacing.lg,
    alignItems: 'flex-start',
  },
  backArtistsText: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.link,
  },
});
