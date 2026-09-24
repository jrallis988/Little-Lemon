import { useEffect, useMemo, useState } from 'react';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import {
  EditorialSubNav,
  type EditorialTab,
} from '@/components/editorial/EditorialSubNav';
import { FeaturedMosaic } from '@/components/editorial/FeaturedMosaic';
import { ListeningList } from '@/components/editorial/ListeningList';
import { PortalHeader } from '@/components/editorial/PortalHeader';
import { RecentlyFeaturedList } from '@/components/editorial/RecentlyFeaturedList';
import { TrackChartRow } from '@/components/editorial/TrackChartRow';
import { JustFoundPanel } from '@/components/discovery/JustFoundPanel';
import { ListCard } from '@/components/social/ListCard';
import { ReviewCard } from '@/components/social/ReviewCard';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import { useBottomInset } from '@/hooks/useBottomInset';
import {
  DEMO_LISTS,
  DEMO_TRACKS,
  EVERYBODY_LISTENING,
  FEATURED_SPOTLIGHT,
  RECENTLY_FEATURED,
  brandNewArtists,
  getTrackById,
  popularReviews,
  tracksByDownloads,
  tracksByReposts,
} from '@/lib/demoData';
import { fetchHomeEditorial, resolveTrackIds } from '@/lib/editorialApi';
import type { UserProfile } from '@/types/models';

const WIDE = 900;
const MID = 700;

/**
 * Editorial homepage — find unsigned bands + Letterboxd taste + PureVolume portal.
 * Featured / Just Found prefer human editorial_slots when present.
 */
export default function EditorialScreen() {
  const [tab, setTab] = useState<EditorialTab>('Featured');
  const { width } = useWindowDimensions();
  const bottomInset = useBottomInset(spacing.tabBar);
  const isWide = width >= WIDE;
  const isMid = width >= MID;
  const [justFound, setJustFound] = useState<UserProfile[]>(() =>
    brandNewArtists(4),
  );
  const [listeningIds, setListeningIds] = useState<string[]>([
    ...EVERYBODY_LISTENING,
  ]);
  const [recentIds, setRecentIds] = useState<string[]>([...RECENTLY_FEATURED]);
  const [editorialSource, setEditorialSource] = useState<'editorial' | 'demo'>(
    'demo',
  );

  useEffect(() => {
    void fetchHomeEditorial().then((home) => {
      setJustFound(home.justFound);
      setListeningIds(home.everybodyListeningIds);
      setRecentIds(home.recentlyFeaturedIds);
      setEditorialSource(home.source);
    });
  }, []);

  const spotlightTrack =
    getTrackById(FEATURED_SPOTLIGHT.trackId) ?? DEMO_TRACKS[0];

  const listening = useMemo(() => resolveTrackIds(listeningIds), [listeningIds]);
  const recentlyFeatured = useMemo(() => resolveTrackIds(recentIds), [recentIds]);

  const topSongs = useMemo(() => tracksByReposts(), []);
  const topDownloads = useMemo(() => tracksByDownloads(), []);
  const reviews = useMemo(() => popularReviews(3), []);
  const lists = useMemo(() => DEMO_LISTS.slice(0, 2), []);

  return (
    <StaticBackground>
      <ScrollView
        stickyHeaderIndices={[0, 1]}
        contentContainerStyle={{ paddingBottom: bottomInset }}
      >
        <PortalHeader />
        <EditorialSubNav active={tab} onChange={setTab} />

        {tab === 'Featured' ? (
          <>
            <FeaturedMosaic />

            <View
              style={[
                styles.columns,
                isWide && styles.columnsWide,
                isMid && !isWide && styles.columnsMid,
              ]}
            >
              {(isWide || isMid) && (
                <View style={[styles.sideCol, isWide && styles.leftRail]}>
                  <ListeningList tracks={listening} />
                </View>
              )}

              <View style={[styles.mainCol, isWide && styles.mainWide]}>
                {!isMid ? (
                  <View style={styles.mobileListen}>
                    <ListeningList tracks={listening.slice(0, 4)} />
                  </View>
                ) : null}

                <Text style={styles.editorialHint}>
                  Just Found ·{' '}
                  {editorialSource === 'editorial'
                    ? 'human editorial slots'
                    : 'seed curation (wire editorial_slots)'}
                </Text>
                <JustFoundPanel artists={justFound} />

                <Pressable
                  style={styles.historyTeaser}
                  onPress={() => router.push('/(main)/history')}
                >
                  <Text style={styles.historyKicker}>Archive</Text>
                  <Text style={styles.historyTitle}>
                    PureVolume → StaticVolume
                  </Text>
                  <Text style={styles.historyBody}>
                    From the 2003 portal launch through shutdown — and why this
                    revival exists. Open the full timeline →
                  </Text>
                </Pressable>

                <View style={styles.panel}>
                  <View style={styles.panelHeader}>
                    <Text style={styles.panelTitle}>POPULAR REVIEWS</Text>
                  </View>
                  <View style={styles.reviewPad}>
                    {reviews.map((review) => (
                      <ReviewCard
                        key={review.id}
                        review={review}
                        showTrack
                      />
                    ))}
                  </View>
                </View>

                <View style={styles.panel}>
                  <View style={styles.panelHeader}>
                    <Text style={styles.panelTitle}>LATEST ON THE WIRE</Text>
                  </View>
                  {DEMO_TRACKS.slice(0, 5).map((track, index) => (
                    <TrackChartRow
                      key={track.id}
                      track={track}
                      rank={index + 1}
                      metric="downloads"
                    />
                  ))}
                </View>

                <View style={styles.panel}>
                  <View style={styles.panelHeader}>
                    <Text style={styles.panelTitle}>POPULAR LISTS</Text>
                  </View>
                  <View style={styles.reviewPad}>
                    {lists.map((list) => (
                      <ListCard key={list.id} list={list} />
                    ))}
                  </View>
                </View>
              </View>

              {isWide ? (
                <View style={styles.rightRail}>
                  <RecentlyFeaturedList tracks={recentlyFeatured} />
                  <View style={{ height: spacing.sm }} />
                  <View style={styles.albumBox}>
                    <View style={styles.panelHeader}>
                      <Text style={styles.panelTitle}>FEATURED RELEASE</Text>
                    </View>
                    <View style={styles.albumArt}>
                      <Text style={styles.albumMark}>
                        {spotlightTrack.artistName.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.albumMeta}>
                      <Text style={styles.albumTitle}>{spotlightTrack.title}</Text>
                      <Text style={styles.albumArtist}>
                        {spotlightTrack.artistName}
                      </Text>
                      <Text style={styles.albumStats}>
                        {spotlightTrack.downloadCount.toLocaleString()} downloads
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.mobileRecent}>
                  <RecentlyFeaturedList tracks={recentlyFeatured} />
                </View>
              )}
            </View>
          </>
        ) : null}

        {tab === 'Top Songs' ? (
          <View style={styles.chartWrap}>
            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <Text style={styles.panelTitle}>TOP SONGS</Text>
              </View>
              {topSongs.map((track, index) => (
                <TrackChartRow
                  key={track.id}
                  track={track}
                  rank={index + 1}
                  metric="reposts"
                />
              ))}
            </View>
          </View>
        ) : null}

        {tab === 'Top Downloads' ? (
          <View style={styles.chartWrap}>
            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <Text style={styles.panelTitle}>TOP DOWNLOADS</Text>
              </View>
              {topDownloads.map((track, index) => (
                <TrackChartRow
                  key={track.id}
                  track={track}
                  rank={index + 1}
                  metric="downloads"
                />
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </StaticBackground>
  );
}

const styles = StyleSheet.create({
  columns: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  columnsMid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  columnsWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sideCol: {
    width: 220,
  },
  leftRail: {
    width: 230,
  },
  rightRail: {
    width: 240,
  },
  mainCol: {
    flex: 1,
    gap: spacing.md,
    minWidth: 0,
  },
  mainWide: {
    flex: 1.4,
  },
  mobileListen: {
    marginBottom: 0,
  },
  mobileRecent: {
    marginTop: 0,
  },
  panel: {
    ...portalBox,
    overflow: 'hidden',
  },
  panelHeader: {
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
  chartWrap: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  albumBox: {
    ...portalBox,
    overflow: 'hidden',
  },
  albumArt: {
    margin: spacing.sm,
    height: 160,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumMark: {
    fontFamily: fonts.condensedBold,
    fontSize: 28,
    color: colors.textDim,
  },
  albumMeta: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    gap: 2,
  },
  albumTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 14,
    color: colors.text,
  },
  albumArtist: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
  },
  albumStats: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textDim,
    marginTop: 4,
  },
  reviewPad: {
    padding: spacing.sm,
    paddingBottom: 0,
  },
  editorialHint: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textDim,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  historyTeaser: {
    ...portalBox,
    padding: spacing.sm,
    gap: 4,
    borderColor: colors.link,
  },
  historyKicker: {
    fontFamily: fonts.sansBold,
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.link,
    textTransform: 'uppercase',
  },
  historyTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    color: colors.text,
  },
  historyBody: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
});
