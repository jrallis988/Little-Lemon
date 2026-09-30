import { Redirect } from "expo-router";
import { useChart } from "@/src/state/chart-context";

export default function Index() {
  const { state } = useChart();
  if (state.session.kind === "signed_out") return <Redirect href="/login" />;
  return <Redirect href="/(tabs)/home" />;
}
