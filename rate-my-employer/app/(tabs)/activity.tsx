import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function ActivityScreen() {
  const { activity } = useApp();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={activity}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Activity</Text>
            <Text style={styles.copy}>Helpful votes, replies, and updates.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, !item.read && styles.unread]}>
            <Text style={styles.kicker}>{item.type.toUpperCase()}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.lg, gap: spacing.sm },
  title: { fontFamily: typography.display, fontSize: 28, color: colors.ink },
  copy: { fontFamily: typography.body, fontSize: 15, color: colors.inkMuted },
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 4,
  },
  unread: { borderColor: colors.blue, backgroundColor: colors.blueSoft },
  kicker: {
    fontFamily: typography.bodySemi,
    fontSize: 11,
    color: colors.blue,
    letterSpacing: 0.4,
  },
  cardTitle: { fontFamily: typography.bodySemi, fontSize: 16, color: colors.ink },
  body: { fontFamily: typography.body, fontSize: 14, color: colors.inkMuted, lineHeight: 20 },
});
