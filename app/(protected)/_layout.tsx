import { useAuth } from "../../stores/auth/auth";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, Slot } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
/**
 * Redirect to login IF USER IS NOT AUTHENTICATED
 * Use it on protected screens
 */
export default function ProtectedLayout() {
  const [access] = useAuth((state) => [state.access]);

  if (!access) return <Redirect href="/login" />;

  return (
    <LinearGradient
      style={styles.container}
      colors={["#fff", "#8AEAFF"]}
      locations={[0.6, 1.0]}
    >
      <View style={{ marginVertical: 80, marginHorizontal: 25 }}>
        <Slot />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
