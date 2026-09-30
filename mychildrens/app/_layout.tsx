import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ChartProvider, useChart } from "@/src/state/chart-context";
import { AppFrame } from "@/src/ui/frame";
import { LockScreen } from "@/src/ui/lock";
import { installBrandFonts, nativeFontAssets } from "@/src/ui/brand-fonts";
import { theme } from "@/src/ui/theme";

SplashScreen.preventAutoHideAsync().catch(() => undefined);

function RootNavigator() {
  const { state } = useChart();
  installBrandFonts();
  const [loaded, error] = useFonts(nativeFontAssets);

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync().catch(() => undefined);
  }, [loaded, error]);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    document.title = "MyChildren's prototype";
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.backgroundColor = theme.blue;
    const root = document.getElementById("root");
    if (root) root.style.height = "100%";
  }, []);

  if (!loaded && !error) return null;

  return (
    <AppFrame>
      <StatusBar style="dark" />
      <View style={{ flex: 1, backgroundColor: theme.paper }}>
        {state.locked ? <LockScreen /> : <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.paper } }} />}
      </View>
    </AppFrame>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ChartProvider>
        <RootNavigator />
      </ChartProvider>
    </SafeAreaProvider>
  );
}
