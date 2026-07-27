import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, fonts } from '@/constants/theme';
import { ALPHA_LETTERS } from '@/lib/demoData';

type AlphaScrubberProps = {
  activeLetter: string | null;
  availableLetters: Set<string>;
  onSelect: (letter: string) => void;
};

/**
 * Horizontal A–Z jump bar for browse mode.
 * On phone: easy thumb taps without opening the keyboard.
 * Paired with a search field when the user already knows the name.
 */
export function AlphaScrubber({
  activeLetter,
  availableLetters,
  onSelect,
}: AlphaScrubberProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {ALPHA_LETTERS.map((letter, index) => {
            const enabled = availableLetters.has(letter);
            const active = activeLetter === letter;
            const isLast = index === ALPHA_LETTERS.length - 1;
            return (
              <View key={letter} style={styles.cell}>
                <Pressable
                  disabled={!enabled}
                  onPress={() => onSelect(letter)}
                  style={[
                    styles.letter,
                    active && styles.letterActive,
                    !enabled && styles.letterDisabled,
                  ]}
                  hitSlop={4}
                >
                  <Text
                    style={[
                      styles.letterText,
                      active && styles.letterTextActive,
                      !enabled && styles.letterTextDisabled,
                    ]}
                  >
                    {letter}
                  </Text>
                </Pressable>
                {!isLast ? <View style={styles.divider} /> : null}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bar: {
    backgroundColor: colors.toolbar,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: 2,
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  letter: {
    minWidth: 28,
    paddingHorizontal: 6,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.toolbar,
  },
  letterActive: {
    backgroundColor: colors.toolbarActive,
    borderBottomWidth: 2,
    borderBottomColor: colors.phosphor,
  },
  letterDisabled: {
    opacity: 0.35,
  },
  letterText: {
    fontFamily: fonts.sans,
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.textMuted,
  },
  letterTextActive: {
    color: colors.phosphor,
  },
  letterTextDisabled: {
    color: colors.textDim,
  },
  divider: {
    width: 1,
    backgroundColor: colors.borderSubtle,
  },
});
