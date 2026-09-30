import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { type ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ageLabel } from "../domain/format";
import { selectActivePatient } from "../domain/selectors";
import { useChart } from "../state/chart-context";
import { fontWeight, fonts, theme } from "./theme";

export function Mark({ size = 72 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          position: "absolute",
          width: size * 0.72,
          height: size * 0.72,
          borderRadius: size,
          backgroundColor: theme.sky,
          left: 0,
          top: size * 0.12,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: size * 0.46,
          height: size * 0.46,
          borderRadius: size,
          backgroundColor: theme.pink,
          right: 0,
          bottom: size * 0.06,
          borderWidth: Math.max(3, size * 0.05),
          borderColor: theme.paper,
        }}
      />
    </View>
  );
}

export function Avatar({ initials, color, size = 36 }: { initials: string; color: string; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: theme.white, fontFamily: fonts.bold, fontWeight: fontWeight.subhead, fontSize: size * 0.34 }}>{initials}</Text>
    </View>
  );
}

const typeStyles = StyleSheet.create({
  display: { fontFamily: fonts.display, fontWeight: fontWeight.display, fontSize: 34, lineHeight: 40, color: theme.ink },
  title: { fontFamily: fonts.display, fontWeight: fontWeight.display, fontSize: 24, lineHeight: 30, color: theme.ink },
  body: { fontFamily: fonts.body, fontWeight: fontWeight.body, fontSize: 16, lineHeight: 23, color: theme.ink },
  label: { fontFamily: fonts.semibold, fontWeight: fontWeight.subhead, fontSize: 13, lineHeight: 18, letterSpacing: 0.3, color: theme.ink },
  small: { fontFamily: fonts.body, fontWeight: fontWeight.body, fontSize: 13, lineHeight: 18, color: theme.muted },
});

export function T({
  children,
  variant = "body",
  color,
  style,
}: {
  children: ReactNode;
  variant?: keyof typeof typeStyles;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[typeStyles[variant], color ? { color } : null, style]}>{children}</Text>;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
}) {
  const palette = {
    primary: { backgroundColor: theme.blue, color: theme.white, borderColor: theme.blue },
    secondary: { backgroundColor: theme.white, color: theme.blue, borderColor: theme.gray },
    ghost: { backgroundColor: "transparent", color: theme.ocean, borderColor: "transparent" },
    danger: { backgroundColor: theme.dangerSoft, color: theme.danger, borderColor: theme.dangerSoft },
  }[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.backgroundColor, borderColor: palette.borderColor, opacity: disabled ? 0.5 : pressed ? 0.86 : 1 },
      ]}
    >
      <Text style={{ fontFamily: fonts.semibold, fontWeight: fontWeight.subhead, fontSize: 16, color: palette.color }}>{label}</Text>
    </Pressable>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Pill({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "ok" | "warn" | "tag" | "danger" }) {
  const colors = {
    neutral: { backgroundColor: theme.foam, color: theme.ocean },
    ok: { backgroundColor: theme.okSoft, color: theme.green },
    warn: { backgroundColor: theme.warnSoft, color: theme.pink },
    tag: { backgroundColor: theme.warnSoft, color: theme.pink },
    danger: { backgroundColor: theme.dangerSoft, color: theme.alert },
  }[tone];
  return (
    <View style={{ alignSelf: "flex-start", backgroundColor: colors.backgroundColor, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>
      <Text style={{ fontFamily: fonts.semibold, fontWeight: fontWeight.subhead, fontSize: 12, color: colors.color }}>{label}</Text>
    </View>
  );
}

export function Banner({ text, tone = "warn" }: { text: string; tone?: "warn" | "ok" }) {
  const colors = tone === "ok" ? { backgroundColor: theme.okSoft, color: theme.green } : { backgroundColor: theme.dangerSoft, color: theme.alert };
  return (
    <View style={{ backgroundColor: colors.backgroundColor, borderRadius: 14, padding: 12 }}>
      <T variant="small" color={colors.color}>{text}</T>
    </View>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <T variant="label" color={theme.soft} style={{ textTransform: "uppercase", letterSpacing: 1.1 }}>{children}</T>;
}

export function Row({
  title,
  detail,
  onPress,
  trailing,
}: {
  title: string;
  detail?: string;
  onPress?: () => void;
  trailing?: ReactNode;
}) {
  const content = (
    <View style={styles.row}>
      <View style={{ flex: 1, gap: 2 }}>
        <T variant="label" style={{ fontSize: 16 }}>{title}</T>
        {detail ? <T variant="small">{detail}</T> : null}
      </View>
      {trailing ?? (onPress ? <Ionicons name="chevron-forward" size={18} color={theme.soft} /> : null)}
    </View>
  );
  if (!onPress) return <Card>{content}</Card>;
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
      <Card>{content}</Card>
    </Pressable>
  );
}

export function Empty({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <T variant="title" style={{ fontSize: 22 }}>{title}</T>
      <T color={theme.muted}>{body}</T>
    </Card>
  );
}

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  autoCapitalize = "sentences",
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}) {
  return (
    <View style={{ gap: 6 }}>
      <T variant="label">{label}</T>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.soft}
        multiline={multiline}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCapitalize !== "none"}
        style={[styles.input, multiline ? { minHeight: 96, textAlignVertical: "top" } : null]}
      />
    </View>
  );
}

export function Segment<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.segment}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={[styles.segmentItem, selected ? { backgroundColor: theme.ocean } : null]}
          >
            <Text style={{ fontFamily: fonts.semibold, fontWeight: fontWeight.subhead, color: selected ? theme.white : theme.gray }}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function PrototypeNote() {
  return (
    <T variant="small" color={theme.soft}>
      MyChildren's prototype. Not the official Boston Children's Hospital app, and not Epic MyChart. Sample people are fictional.
    </T>
  );
}

function Protected({ children }: { children: ReactNode }) {
  const { state } = useChart();
  if (state.session.kind === "signed_out" || !state.chart) return <Redirect href="/welcome" />;
  return <>{children}</>;
}

export function Screen({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <Protected>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: insets.top + 16,
            paddingHorizontal: 20,
            paddingBottom: footer ? 20 : insets.bottom + 28,
            gap: 14,
          }}
        >
          {children}
        </ScrollView>
        {footer ? <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: insets.bottom + 12, gap: 8 }}>{footer}</View> : null}
      </View>
    </Protected>
  );
}

export function BackButton() {
  const router = useRouter();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      aria-label="Go back"
      role="button"
      testID="go-back"
      onPress={() => router.back()}
      style={styles.back}
    >
      <Ionicons name="chevron-back" size={22} color={theme.ink} />
    </Pressable>
  );
}

export function StackHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <BackButton />
      <View style={{ flex: 1, gap: 2 }}>
        <T variant="title" style={{ fontSize: 26 }}>{title}</T>
        {subtitle ? <T variant="small">{subtitle}</T> : null}
      </View>
    </View>
  );
}

export function ChildSwitcher() {
  const { state, dispatch } = useChart();
  const children = state.chart?.children ?? [];
  if (children.length < 2) return null;
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {children.map(({ child }) => {
        const selected = child.id === state.activeChildId;
        return (
          <Pressable
            key={child.id}
            accessibilityRole="button"
            accessibilityLabel={`Show ${child.preferredName}'s chart`}
            accessibilityState={{ selected }}
            onPress={() => dispatch({ type: "select_child", id: child.id })}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              paddingVertical: 6,
              paddingLeft: 6,
              paddingRight: 12,
              borderRadius: 999,
              backgroundColor: selected ? theme.ink : theme.card,
              borderWidth: 1,
              borderColor: selected ? theme.ink : theme.line,
            }}
          >
            <Avatar initials={child.initials} color={child.color} size={24} />
            <Text style={{ fontFamily: fonts.semibold, fontWeight: fontWeight.subhead, color: selected ? theme.white : theme.blue }}>{child.preferredName}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function FamilyHeader({ kicker, title, back = false }: { kicker: string; title: string; back?: boolean }) {
  const { state } = useChart();
  const patient = selectActivePatient(state);
  const onlyChild = state.chart?.children.length === 1 ? patient : null;
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {back ? <BackButton /> : null}
        <View style={{ flex: 1, gap: 2 }}>
          <T variant="label" color={theme.ocean}>{kicker}</T>
          <T variant="display">{title}</T>
        </View>
      </View>
      <ChildSwitcher />
      {onlyChild ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Avatar initials={onlyChild.child.initials} color={onlyChild.child.color} />
          <View>
            <T variant="label" style={{ fontSize: 16 }}>{onlyChild.child.name}</T>
            <T variant="small">{ageLabel(onlyChild.child.birthDate)} · MRN {onlyChild.child.mrn}</T>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.paper },
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.line,
  },
  button: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  input: {
    backgroundColor: theme.white,
    borderColor: theme.line,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 48,
    fontFamily: fonts.body,
    fontWeight: fontWeight.body,
    fontSize: 16,
    color: theme.ink,
  },
  segment: {
    flexDirection: "row",
    backgroundColor: theme.foam,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  segmentItem: { flex: 1, minHeight: 36, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.line,
    alignItems: "center",
    justifyContent: "center",
  },
});
