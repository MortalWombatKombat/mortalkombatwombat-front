import { useAuth } from "../../stores/auth/auth";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, ImageBackground, StyleSheet, View } from "react-native";
import { useAssets } from "expo-asset";
/**
 * Redirect to main screen if user IS AUTHORIZED
 * Use it on protected screens
 */
export default function ProtectedLayout() {
  const [access] = useAuth((state) => [state.access]);

  const [assets, error] = useAssets([
    require("../../assets/images/sign-forms/bg.png"),
  ]);

  if (access) return <Redirect href="/" />;
  const bgImage = assets?.at(0);
  if (!bgImage) return <ActivityIndicator />;

  return (
    <ImageBackground source={require('../../assets/images/sign-forms/bg.png')} style={styles.container}>
      <Slot />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
