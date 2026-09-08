import { Alert, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../src/components';
import { colors, spacing, typography } from '../src/theme';

export default function GuidelinesScreen() {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Community Guidelines</Text>
      <Text style={styles.rule}>Be honest. Be respectful.</Text>
      <Text style={styles.body}>
        Share first-hand workplace and interview experiences. No hate speech, doxxing, or fabricated
        reviews. Keep personal medical or legal details private.
      </Text>
      <Text style={styles.body}>
        Employer responses should address the feedback, not the individual. RME may remove content
        that breaks these rules.
      </Text>
      <PrimaryButton
        label="Report Content"
        variant="secondary"
        onPress={() => Alert.alert('Report', 'Report flow coming soon.')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: spacing.lg, gap: spacing.md, backgroundColor: colors.surface },
  title: { fontFamily: typography.display, fontSize: 28, color: colors.ink },
  rule: { fontFamily: typography.bodyBold, fontSize: 18, color: colors.navy },
  body: { fontFamily: typography.body, fontSize: 15, lineHeight: 22, color: colors.inkMuted },
});
