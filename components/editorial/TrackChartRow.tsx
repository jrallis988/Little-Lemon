import { TrackListing } from '@/components/tracks/TrackListing';
import type { Track } from '@/types/models';

type TrackChartRowProps = {
  track: Track;
  rank: number;
  /** Kept for call-site compatibility; charts show downloads + reposts together */
  metric?: 'downloads' | 'reposts';
};

/** Chart row without playback — discovery + download counts only. */
export function TrackChartRow({ track, rank }: TrackChartRowProps) {
  return <TrackListing track={track} rank={rank} />;
}
