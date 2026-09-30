import { type ReactNode } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import { theme } from "./theme";

export function AppFrame({ children }: { children: ReactNode }) {
  const { width, height } = useWindowDimensions();
  const framed = Platform.OS === "web" && width >= 800;
  if (!framed) {
    return <View style={{ flex: 1, backgroundColor: theme.paper }}>{children}</View>;
  }
  const frameHeight = Math.min(Math.max(height - 48, 640), 900);
  return (
    <View style={{ flex: 1, backgroundColor: "#102833", alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          width: 400,
          height: frameHeight,
          backgroundColor: theme.paper,
          borderRadius: 32,
          overflow: "hidden",
          borderWidth: 10,
          borderColor: "#0C1C24",
        }}
      >
        {children}
      </View>
    </View>
  );
}
