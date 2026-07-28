import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, portalBox, spacing } from '@/constants/theme';
import {
  PLATFORM_TIMELINE,
  TIMELINE_ERA_LABEL,
  type TimelineEvent,
} from '@/lib/timelineHistory';

type PlatformTimelineProps = {
  events?: TimelineEvent[];
};

/**
 * Interactive-feeling archive timeline — PureVolume founding era → StaticVolume.
 * Portal dossier styling: year rail, bordered era cards, clear dividers.
 */
export function PlatformTimeline({
  events = PLATFORM_TIMELINE,
}: PlatformTimelineProps) {
  return (
    <View style={styles.root}>
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        return (
          <View key={event.id} style={styles.row}>
            <View style={styles.rail}>
              <View style={styles.dot} />
              {!isLast ? <View style={styles.line} /> : null}
            </View>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.year}>{event.year}</Text>
                <Text style={styles.era}>{TIMELINE_ERA_LABEL[event.era]}</Text>
              </View>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.summary}>{event.summary}</Text>
              {event.highlights?.length ? (
                <View style={styles.highlights}>
                  {event.highlights.map((item) => (
                    <View key={item} style={styles.chip}>
                      <Text style={styles.chipText}>{item}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
  },
  rail: {
    width: 16,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.link,
    borderWidth: 2,
    borderColor: colors.surface,
    marginTop: 14,
    zIndex: 1,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginTop: 2,
    marginBottom: -2,
  },
  card: {
    ...portalBox,
    flex: 1,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    gap: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  year: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    color: colors.link,
  },
  era: {
    fontFamily: fonts.sans,
    fontSize: 10,
    letterSpacing: 0.4,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fonts.sansBold,
    fontSize: 16,
    color: colors.text,
  },
  summary: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  highlights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipText: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.text,
  },
});
