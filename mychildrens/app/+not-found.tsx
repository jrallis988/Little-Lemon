import { Link } from "expo-router";
import { View } from "react-native";
import { T } from "@/src/ui/primitives";
import { theme } from "@/src/ui/theme";

export default function NotFound() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.paper, alignItems: "center", justifyContent: "center", padding: 24, gap: 12 }}>
      <T variant="title">That page is not in the chart.</T>
      <Link href="/">Back to the start</Link>
    </View>
  );
}
