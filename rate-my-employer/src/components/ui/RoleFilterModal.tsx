import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../../theme';
import { PrimaryButton } from './PrimaryButton';

type Props = {
  visible: boolean;
  roles: string[];
  selected: string | null;
  onClose: () => void;
  onSelect: (role: string | null) => void;
};

export function RoleFilterModal({ visible, roles, selected, onClose, onSelect }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Filter by role</Text>
          <Text style={styles.meta}>Narrow reviews, interviews, and salaries.</Text>
          <ScrollView style={styles.list}>
            <Pressable
              style={[styles.option, !selected && styles.optionOn]}
              onPress={() => {
                onSelect(null);
                onClose();
              }}
            >
              <Text style={[styles.optionText, !selected && styles.optionTextOn]}>All roles</Text>
            </Pressable>
            {roles.map((role) => (
              <Pressable
                key={role}
                style={[styles.option, selected === role && styles.optionOn]}
                onPress={() => {
                  onSelect(role);
                  onClose();
                }}
              >
                <Text style={[styles.optionText, selected === role && styles.optionTextOn]}>
                  {role}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <PrimaryButton label="Close" variant="ghost" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(7, 30, 66, 0.45)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: colors.surfaceRaised,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.md,
    maxHeight: '75%',
  },
  title: { fontFamily: typography.display, fontSize: 22, color: colors.ink },
  meta: { fontFamily: typography.body, fontSize: 13, color: colors.inkSoft },
  list: { maxHeight: 320 },
  option: {
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  optionOn: { borderColor: colors.blue, backgroundColor: colors.blueSoft },
  optionText: { fontFamily: typography.bodySemi, fontSize: 15, color: colors.ink },
  optionTextOn: { color: colors.blue },
});
