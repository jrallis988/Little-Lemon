import { useCallback, useMemo, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { AlphaScrubber } from '@/components/directory/AlphaScrubber';
import { DirectoryArtistRow } from '@/components/directory/DirectoryArtistRow';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, portalBox, spacing, fonts } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import {
  DEMO_ARTISTS,
  groupArtistsAlphabetically,
  totalDownloadsForArtist,
} from '@/lib/demoData';

/**
 * Artist directory — mobile-practical hybrid:
 * search when you know the name, A–Z scrubber when you’re browsing.
 */
export default function ArtistsDirectoryScreen() {
  const bottomInset = useBottomInset(spacing.tabBar);
  const scrollRef = useRef<ScrollView>(null);
  const sectionOffsets = useRef<Record<string, number>>({});
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return DEMO_ARTISTS.filter((artist) => {
      const haystack = [
        artist.displayName,
        artist.scene,
        artist.geography,
        artist.lineupNote,
        ...(artist.genreTags ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    }).sort((a, b) =>
      a.displayName.localeCompare(b.displayName, undefined, {
        sensitivity: 'base',
      }),
    );
  }, [isSearching, normalizedQuery]);

  const groups = useMemo(() => groupArtistsAlphabetically(), []);
  const availableLetters = useMemo(
    () => new Set(groups.map((g) => g.letter)),
    [groups],
  );
  const totalArtists = DEMO_ARTISTS.length;

  const onSectionLayout = useCallback((letter: string, e: LayoutChangeEvent) => {
    sectionOffsets.current[letter] = e.nativeEvent.layout.y;
  }, []);

  const scrollToLetter = useCallback((letter: string) => {
    const y = sectionOffsets.current[letter];
    if (y == null || !scrollRef.current) return;
    setActiveLetter(letter);
    scrollRef.current.scrollTo({ y: Math.max(0, y - 8), animated: true });
  }, []);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isSearching) return;
      const y = e.nativeEvent.contentOffset.y + 24;
      let current: string | null = null;
      for (const group of groups) {
        const offset = sectionOffsets.current[group.letter] ?? 0;
        if (offset <= y) current = group.letter;
      }
      if (current !== activeLetter) setActiveLetter(current);
    },
    [activeLetter, groups, isSearching],
  );

  return (
    <StaticBackground>
      <View style={styles.shell}>
        <View style={styles.masthead}>
          <Text style={styles.brand}>Browse artists</Text>
          <Text style={styles.meta}>
            {totalArtists} indexed · search or jump A–Z
          </Text>

          <View style={styles.searchWrap}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search artists, scenes, places…"
              placeholderTextColor={colors.textDim}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              returnKeyType="search"
              style={styles.searchInput}
              accessibilityLabel="Search artists"
            />
            {query.length > 0 ? (
              <Text style={styles.clearHint} onPress={() => setQuery('')}>
                Clear
              </Text>
            ) : null}
          </View>
        </View>

        {!isSearching ? (
          <AlphaScrubber
            activeLetter={activeLetter}
            availableLetters={availableLetters}
            onSelect={scrollToLetter}
          />
        ) : null}

        <ScrollView
          ref={scrollRef}
          onScroll={onScroll}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: bottomInset }}
        >
          <View style={styles.listPad}>
            {isSearching ? (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionLetter}>Results</Text>
                  <Text style={styles.sectionCount}>
                    {searchResults.length} match
                    {searchResults.length === 1 ? '' : 'es'}
                  </Text>
                </View>
                {searchResults.length === 0 ? (
                  <Text style={styles.empty}>
                    No artists match “{query.trim()}”. Try a letter browse
                    instead.
                  </Text>
                ) : (
                  searchResults.map((artist) => (
                    <DirectoryArtistRow
                      key={artist.id}
                      artist={artist}
                      downloadCount={totalDownloadsForArtist(artist.id)}
                    />
                  ))
                )}
              </View>
            ) : (
              groups.map((group) => (
                <View
                  key={group.letter}
                  onLayout={(e) => onSectionLayout(group.letter, e)}
                  style={styles.section}
                >
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionLetter}>{group.letter}</Text>
                    <Text style={styles.sectionCount}>
                      {group.artists.length} artist
                      {group.artists.length === 1 ? '' : 's'}
                    </Text>
                  </View>
                  {group.artists.map((artist) => (
                    <DirectoryArtistRow
                      key={artist.id}
                      artist={artist}
                      downloadCount={totalDownloadsForArtist(artist.id)}
                    />
                  ))}
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
  },
  masthead: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
    gap: 6,
  },
  brand: {
    fontFamily: fonts.sansBold,
    fontSize: 20,
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  searchWrap: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.text,
  },
  clearHint: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.link,
    paddingVertical: 8,
  },
  listPad: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  section: {
    ...portalBox,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceRaised,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  sectionLetter: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    color: colors.text,
  },
  sectionCount: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
  },
  empty: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    padding: spacing.md,
  },
});
