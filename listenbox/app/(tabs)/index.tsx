import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Atmosphere } from '@/components/Atmosphere';
import { FeedCard } from '@/components/FeedCard';
import { useLogs } from '@/context/LogsContext';
import { fonts, palette, spacing } from '@/constants/theme';

export default function FeedScreen() {
  const { feed } = useLogs();

  return (
    <View style={styles.root}>
      <Atmosphere />
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <Animated.View entering={FadeInDown.duration(450)} style={styles.header}>
          <Text style={styles.brand}>Listenbox</Text>
          <View style={styles.brandRule} />
          <Text style={styles.kicker}>Friends are listening</Text>
        </Animated.View>
        <FlatList
          data={feed}
          keyExtractor={(item) => item.log.id}
          renderItem={({ item, index }) => <FeedCard item={item} index={index} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>No listens yet. Drop the needle on something.</Text>
          }
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.paper,
  },
  safe: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  brand: {
    fontFamily: fonts.displayBlack,
    fontSize: 42,
    letterSpacing: -1.6,
    color: palette.ink,
    lineHeight: 46,
  },
  brandRule: {
    width: 56,
    height: 4,
    backgroundColor: palette.accent,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    borderRadius: 2,
  },
  kicker: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: palette.inkMuted,
    letterSpacing: 0.2,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  empty: {
    marginTop: spacing.xl,
    fontFamily: fonts.displayItalic,
    fontSize: 18,
    color: palette.inkMuted,
  },
});
