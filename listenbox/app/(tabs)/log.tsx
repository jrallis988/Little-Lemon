import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { AlbumCover } from '@/components/AlbumCover';
import { RatingStars } from '@/components/RatingStars';
import { Screen } from '@/components/Screen';
import { useAuth } from '@/context/AuthContext';
import { useCatalog } from '@/context/CatalogContext';
import { useLogs } from '@/context/LogsContext';
import { SEED_ALBUMS } from '@/data/seed';
import { searchAlbums } from '@/lib/musicbrainz';
import { fonts, palette, radii, spacing } from '@/constants/theme';
import type { Album, ListenRating } from '@/types/models';

export default function LogScreen() {
  const { user } = useAuth();
  const { createLog } = useLogs();
  const { upsertAlbum, upsertAlbums } = useCatalog();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Album[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [album, setAlbum] = useState<Album | null>(null);
  const [rating, setRating] = useState<ListenRating | undefined>(undefined);
  const [review, setReview] = useState('');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setSearching(false);
      setSearchError(null);
      return;
    }

    let cancelled = false;
    setSearching(true);
    setSearchError(null);

    const timer = setTimeout(async () => {
      try {
        const albums = await searchAlbums(trimmed, 8);
        if (cancelled) return;
        setResults(albums);
        upsertAlbums(albums);
      } catch (err) {
        if (cancelled) return;
        setResults([]);
        setSearchError(err instanceof Error ? err.message : 'Search failed');
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 450);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, upsertAlbums]);

  const list = query.trim() ? results : SEED_ALBUMS;

  function selectAlbum(item: Album) {
    upsertAlbum(item);
    setAlbum(item);
  }

  function handleSave() {
    if (!user || !album) return;
    upsertAlbum(album);
    createLog({
      userId: user.id,
      albumId: album.id,
      listenedOn: new Date().toISOString().slice(0, 10),
      rating,
      review,
      liked,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setAlbum(null);
      setRating(undefined);
      setReview('');
      setLiked(false);
      setQuery('');
      router.push('/(tabs)');
    }, 700);
  }

  return (
    <Screen>
      <Text style={styles.brand}>Log a listen</Text>
      <Text style={styles.sub}>Search MusicBrainz or pick a suggestion.</Text>

      <Text style={styles.section}>Search</Text>
      <TextInput
        testID="album-search"
        value={query}
        onChangeText={setQuery}
        placeholder="Album or artist"
        placeholderTextColor={palette.inkFaint}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.searchInput}
      />

      <View style={styles.listHeader}>
        <Text style={styles.sectionInline}>
          {query.trim() ? 'Results' : 'Suggestions'}
        </Text>
        {searching ? <ActivityIndicator color={palette.ink} size="small" /> : null}
      </View>

      {searchError ? <Text style={styles.error}>{searchError}</Text> : null}

      {!searching && query.trim() && results.length === 0 && !searchError ? (
        <Text style={styles.empty}>No albums found. Try another title or artist.</Text>
      ) : null}

      <View style={styles.albumGrid}>
        {list.map((item) => {
          const selected = album?.id === item.id;
          return (
            <Pressable
              key={item.id}
              testID={`album-${item.id}`}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`Select ${item.title} by ${item.artist}`}
              onPress={() => selectAlbum(item)}
              style={[styles.albumChip, selected && styles.albumChipSelected]}>
              <AlbumCover album={item} size={56} />
              <View style={styles.albumChipText}>
                <Text numberOfLines={1} style={styles.albumChipTitle}>
                  {item.title}
                </Text>
                <Text numberOfLines={1} style={styles.albumChipArtist}>
                  {item.artist}
                  {item.year ? ` · ${item.year}` : ''}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {album ? (
        <Animated.View entering={FadeIn.duration(280)} style={styles.form}>
          <Text style={styles.section}>Selected</Text>
          <View style={styles.selectedRow}>
            <AlbumCover album={album} size={72} />
            <View style={styles.albumChipText}>
              <Text style={styles.albumChipTitle}>{album.title}</Text>
              <Text style={styles.albumChipArtist}>
                {album.artist}
                {album.year ? ` · ${album.year}` : ''}
              </Text>
              {album.musicBrainzId ? (
                <Text style={styles.source}>via MusicBrainz</Text>
              ) : null}
            </View>
          </View>

          <Text style={styles.section}>Rating</Text>
          <RatingStars value={rating} editable onChange={setRating} size="md" />

          <Text style={styles.section}>Review</Text>
          <TextInput
            value={review}
            onChangeText={setReview}
            placeholder="What stuck with you?"
            placeholderTextColor={palette.inkFaint}
            multiline
            style={styles.reviewInput}
          />

          <Pressable
            onPress={() => setLiked((v) => !v)}
            style={[styles.likeToggle, liked && styles.likeToggleOn]}>
            <Text style={[styles.likeText, liked && styles.likeTextOn]}>
              {liked ? '♥ Liked' : '♡ Like this album'}
            </Text>
          </Pressable>

          <Pressable
            testID="save-listen"
            accessibilityRole="button"
            accessibilityLabel="Save listen"
            onPress={handleSave}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}>
            <Text style={styles.ctaText}>{saved ? 'Logged!' : 'Save listen'}</Text>
          </Pressable>
        </Animated.View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: {
    fontFamily: fonts.display,
    fontSize: 34,
    letterSpacing: -1,
    color: palette.ink,
    marginTop: spacing.md,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: palette.inkMuted,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  section: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: palette.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  sectionInline: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: palette.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  searchInput: {
    backgroundColor: palette.white,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(11, 31, 42, 0.12)',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 16,
    color: palette.ink,
  },
  error: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: palette.danger,
    marginBottom: spacing.sm,
  },
  empty: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: palette.inkMuted,
    marginBottom: spacing.sm,
  },
  albumGrid: {
    gap: spacing.sm,
  },
  albumChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  albumChipSelected: {
    borderColor: palette.ink,
    backgroundColor: palette.white,
  },
  albumChipText: {
    flex: 1,
    gap: 2,
  },
  albumChipTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: palette.ink,
  },
  albumChipArtist: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: palette.inkMuted,
  },
  source: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: palette.inkFaint,
    marginTop: 2,
  },
  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  form: {
    marginTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  reviewInput: {
    minHeight: 110,
    backgroundColor: palette.white,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(11, 31, 42, 0.12)',
    padding: spacing.md,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 22,
    color: palette.ink,
    textAlignVertical: 'top',
  },
  likeToggle: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(11, 31, 42, 0.06)',
  },
  likeToggleOn: {
    backgroundColor: 'rgba(194, 59, 34, 0.12)',
  },
  likeText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: palette.inkMuted,
  },
  likeTextOn: {
    color: palette.danger,
  },
  cta: {
    marginTop: spacing.lg,
    backgroundColor: palette.accent,
    borderRadius: radii.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaPressed: {
    transform: [{ scale: 0.98 }],
  },
  ctaText: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: palette.accentInk,
  },
});
