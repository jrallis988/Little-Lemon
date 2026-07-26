import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { WaveformPlayer } from '@/components/audio/WaveformPlayer';
import {
  EditorialSubNav,
  type EditorialTab,
} from '@/components/editorial/EditorialSubNav';
import { FeaturedMosaic } from '@/components/editorial/FeaturedMosaic';
import { ListeningList } from '@/components/editorial/ListeningList';
import { PortalHeader } from '@/components/editorial/PortalHeader';
import { RecentlyFeaturedList } from '@/components/editorial/RecentlyFeaturedList';
import { TrackChartRow } from '@/components/editorial/TrackChartRow';
import { StaticBackground } from '@/components/ui/StaticBackground';
import { colors, portalBox, spacing } from '@/constants/theme';
import { useAudioBarInset } from '@/hooks/useAudioBarInset';
import {
  DEMO_COMMENTS,
  DEMO_TRACKS,
  EVERYBODY_LISTENING,
  FEATURED_SPOTLIGHT,
  RECENTLY_FEATURED,
  getTrackById,
  tracksByDownloads,
  tracksByReposts,
} from '@/lib/demoData';

const WIDE = 900;
const MID = 700;

/**
 * PureVolume-structured editorial homepage:
 * dark portal header → segmented toolbar → featured mosaic →
 * Everybody's Listening | center feed | Recently Featured.
 */
export default function EditorialScreen() {
  const [tab, setTab] = useState<EditorialTab>('Featured');
  const { width } = useWindowDimensions();
  const bottomInset = useAudioBarInset(spacing.tabBar);
  const isWide = width >= WIDE;
  const isMid = width >= MID;

  const spotlightTrack =
    getTrackById(FEATURED_SPOTLIGHT.trackId) ?? DEMO_TRACKS[0];
  const spotlightComments = DEMO_COMMENTS.filter(
    (c) => c.trackId === spotlightTrack.id,
  );

  const listening = useMemo(
    () =>
      EVERYBODY_LISTENING.map((id) => getTrackById(id)).filter(
        (t): t is NonNullable<typeof t> => t != null,
      ),
    [],
  );

  const recentlyFeatured = useMemo(
    () =>
      RECENTLY_FEATURED.map((id) => getTrackById(id)).filter(
        (t): t is NonNullable<typeof t> => t != null,
      ),
    [],
  );

  const topSongs = useMemo(() => tracksByReposts(), []);
  const topDownloads = useMemo(() => tracksByDownloads(), []);

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

                <View style={styles.panel}>
                  <View style={styles.panelHeader}>
                    <Text style={styles.panelTitle}>NOW PLAYING</Text>
                  </View>
                  <View style={styles.panelBody}>
                    <WaveformPlayer
                      track={spotlightTrack}
                      comments={spotlightComments}
                    />
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
              </View>

              {isWide ? (
                <View style={styles.rightRail}>
                  <RecentlyFeaturedList tracks={recentlyFeatured} />
                  <View style={{ height: spacing.sm }} />
                  <View style={styles.albumBox}>
                    <View style={styles.panelHeader}>
                      <Text style={styles.panelTitle}>FEATURED ALBUM</Text>
                    </View>
                    <View style={styles.albumArt}>
                      <Text style={styles.albumMark}>SV</Text>
                    </View>
                    <View style={styles.albumMeta}>
                      <Text style={styles.albumTitle}>Snow on the Tape</Text>
                      <Text style={styles.albumArtist}>Static Bloom</Text>
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
    fontFamily: 'SpaceMono',
    fontSize: 10,
    letterSpacing: 0.6,
    color: colors.text,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  panelBody: {
    padding: spacing.sm,
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
    fontFamily: 'SpaceMono',
    fontSize: 28,
    color: colors.phosphorDim,
  },
  albumMeta: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    gap: 2,
  },
  albumTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 12,
    color: colors.text,
    fontWeight: '700',
  },
  albumArtist: {
    fontFamily: 'SpaceMono',
    fontSize: 11,
    color: colors.textMuted,
  },
});
