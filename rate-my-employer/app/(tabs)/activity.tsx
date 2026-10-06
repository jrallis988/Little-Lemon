import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState, PrimaryButton } from '../../src/components';
import { useApp } from '../../src/context/AppContext';
import { colors, radii, spacing, typography } from '../../src/theme';

export default function ActivityScreen() {
  const { activity, markActivityRead } = useApp();
  const unread = activity.filter((item) => !item.read).length;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={activity}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Activity</Text>
            <Text style={styles.copy}>
              Helpful votes, replies, and updates
              {unread > 0 ? ` · ${unread} unread` : ''}.
            </Text>
            {unread > 0 ? (
              <PrimaryButton
                label="Mark all read"
                variant="ghost"
                onPress={() => markActivityRead()}
              />
            ) : null}
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="No activity yet"
            body="When people find your reviews helpful or employers reply, it shows up here."
          />
        }
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, !item.read && styles.unread]}
            onPress={() => markActivityRead(item.id)}
          >
            <Text style={styles.kicker}>{item.type.toUpperCase()}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </Pressable>
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
