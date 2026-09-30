import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useI18n } from "@/src/i18n/use-i18n";
import { fonts, theme } from "@/src/ui/theme";

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  return (
    <View style={{ flex: 1, backgroundColor: theme.hospital, paddingTop: insets.top + 48, paddingHorizontal: 28, paddingBottom: insets.bottom + 28, justifyContent: "space-between" }}>
      <View style={{ gap: 28 }}>
        <HospitalMark />
        <View style={{ gap: 8 }}>
          <Text style={{ fontFamily: fonts.semibold, fontSize: 15, letterSpacing: 0.4, color: "#D6E4F5" }}>{t("hospital")}</Text>
          <Text style={{ fontFamily: fonts.display, fontSize: 42, lineHeight: 48, color: theme.white }}>{t("appName")}</Text>
          <Text style={{ fontFamily: fonts.body, fontSize: 18, lineHeight: 26, color: "#E7F0FA", maxWidth: 280 }}>{t("welcomeLine")}</Text>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("continue")}
        onPress={() => router.push("/login")}
        style={({ pressed }) => ({
          minHeight: 52,
          borderRadius: 14,
          backgroundColor: theme.white,
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <Text style={{ fontFamily: fonts.semibold, fontSize: 17, color: theme.hospitalDeep }}>{t("continue")}</Text>
      </Pressable>
    </View>
  );
}

function HospitalMark() {
  return (
    <View style={{ width: 72, height: 72 }}>
      <View style={{ position: "absolute", width: 52, height: 52, borderRadius: 26, backgroundColor: "#4FA3E3", left: 0, top: 8 }} />
      <View style={{ position: "absolute", width: 28, height: 28, borderRadius: 14, backgroundColor: "#F2C14E", right: 2, bottom: 6, borderWidth: 3, borderColor: theme.hospital }} />
    </View>
  );
}
