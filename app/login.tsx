import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import ControlledInput from "@/components/ControlledInput";
import { useAuth } from "@/stores/auth/auth";
import { useEffect } from "react";
import { CredentialsData } from "@/stores/auth/types";

const defaultValues = { username: "", password: "" };

export default function TabOneScreen() {
  const { control, handleSubmit, setError } = useForm({ defaultValues });
  const [access, login, loading] = useAuth((state) => [
    state.access,
    state.login,
    state.loading,
  ]);

  useEffect(() => {
    if (access) router.replace("/");
  }, [access]);

  const onSubmit = async (credentials: CredentialsData) => {
    try {
      await login(credentials);
      router.replace("/");
    } catch (err) {
      console.error(err);
      setError("password", { message: "Wrong email or password!" });
    }
  };

  return (
    <View style={styles.container}>
      <ControlledInput control={control} label="Login: " name="username" />
      <ControlledInput
        control={control}
        label="Password: "
        name="password"
        secure
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("/register")}>
        <Text>Register</Text>
      </TouchableOpacity>
      {loading ? <ActivityIndicator /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
