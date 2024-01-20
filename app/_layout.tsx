import { useAuth } from "@/stores/auth/auth";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [access, restoreTokensLoading, restoreTokens] = useAuth((state) => [
    state.access,
    state.restoreTokensLoading,
    state.restoreTokens,
  ]);

  useEffect(() => {
    if (!access) restoreTokens();
  }, [access]);

  if (restoreTokensLoading) return <ActivityIndicator />;

  return <Slot />;
}
