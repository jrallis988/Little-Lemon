import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Atmosphere } from '@/components/Atmosphere';
import { palette, spacing } from '@/constants/theme';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  atmosphere?: 'soft' | 'bold';
};

export function Screen({
  children,
  scroll = true,
  style,
  contentStyle,
  atmosphere = 'soft',
}: Props) {
  const body = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.fill, contentStyle]}>{children}</View>
  );

  return (
    <View style={[styles.root, style]}>
      <Atmosphere intensity={atmosphere} />
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        {body}
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
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  fill: {
    flex: 1,
  },
});
