import { FlatList, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeedCard } from '@/components/FeedCard';
import { useLogs } from '@/context/LogsContext';
import { fonts, palette, spacing } from '@/constants/theme';

export default function FeedScreen() {
  const { feed } = useLogs();

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[palette.paper, palette.paperDeep, '#DCE6F0']}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <Text style={styles.brand}>Listenbox</Text>
          <Text style={styles.kicker}>Friends are listening</Text>
        </View>
        <FlatList
          data={feed}
          keyExtractor={(item) => item.log.id}
          renderItem={({ item, index }) => <FeedCard item={item} index={index} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>No listens yet. Be the first to log an album.</Text>
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
    paddingBottom: spacing.sm,
    gap: 4,
  },
  brand: {
    fontFamily: fonts.display,
    fontSize: 34,
    letterSpacing: -1,
    color: palette.ink,
  },
  kicker: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: palette.inkMuted,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  empty: {
    marginTop: spacing.xl,
    fontFamily: fonts.body,
    fontSize: 15,
    color: palette.inkMuted,
  },
});
