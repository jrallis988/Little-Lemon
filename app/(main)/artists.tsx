import { useCallback, useMemo, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { AlphaScrubber } from '@/components/directory/AlphaScrubber';
import { DirectoryArtistRow } from '@/components/directory/DirectoryArtistRow';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, portalBox, spacing } from '@/constants/theme';
import { useAudioBarInset } from '@/hooks/useAudioBarInset';
import {
  groupArtistsAlphabetically,
  totalDownloadsForArtist,
} from '@/lib/demoData';

/**
 * Alphabetical artist directory — PureVolume-style A–Z archive browse.
 */
export default function ArtistsDirectoryScreen() {
  const bottomInset = useAudioBarInset(spacing.tabBar);
  const scrollRef = useRef<ScrollView>(null);
  const sectionOffsets = useRef<Record<string, number>>({});
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const groups = useMemo(() => groupArtistsAlphabetically(), []);
  const availableLetters = useMemo(
    () => new Set(groups.map((g) => g.letter)),
    [groups],
  );
  const totalArtists = useMemo(
    () => groups.reduce((sum, g) => sum + g.artists.length, 0),
    [groups],
  );

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
      const y = e.nativeEvent.contentOffset.y + 24;
      let current: string | null = null;
      for (const group of groups) {
        const offset = sectionOffsets.current[group.letter] ?? 0;
        if (offset <= y) current = group.letter;
      }
      if (current !== activeLetter) setActiveLetter(current);
    },
    [activeLetter, groups],
  );

  return (
    <StaticBackground>
      <View style={styles.shell}>
        <View style={styles.masthead}>
          <Text style={styles.brand}>BROWSE ARTISTS</Text>
          <Text style={styles.meta}>
            INDEXED: {totalArtists} · SORT: A–Z · MODE: ARCHIVE DIRECTORY
          </Text>
        </View>

        <AlphaScrubber
          activeLetter={activeLetter}
          availableLetters={availableLetters}
          onSelect={scrollToLetter}
        />

        <ScrollView
          ref={scrollRef}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: bottomInset }}
        >
          <View style={styles.listPad}>
            {groups.map((group) => (
              <View
                key={group.letter}
                onLayout={(e) => onSectionLayout(group.letter, e)}
                style={styles.section}
              >
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionLetter}>{group.letter}</Text>
                  <Text style={styles.sectionCount}>
                    {group.artists.length} ARTIST
                    {group.artists.length === 1 ? '' : 'S'}
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
            ))}
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
    gap: 4,
  },
  brand: {
    fontFamily: 'SpaceMono',
    fontSize: 18,
    letterSpacing: 1,
    color: colors.phosphor,
    textTransform: 'uppercase',
  },
  meta: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    letterSpacing: 0.5,
    color: colors.textDim,
    textTransform: 'uppercase',
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
    backgroundColor: colors.toolbar,
    borderBottomWidth: 1,
    borderBottomColor: colors.accentLine,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  sectionLetter: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
    letterSpacing: 1,
    color: colors.phosphor,
  },
  sectionCount: {
    fontFamily: 'SpaceMono',
    fontSize: 8,
    letterSpacing: 0.5,
    color: colors.textDim,
  },
});
