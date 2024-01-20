import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import ControlledInput from "@/components/ControlledInput";
import { useAuth } from "@/stores/auth/auth";

const defaultValues = { username: "", password: "", rePassword: "" };

export default function TabOneScreen() {
  const { control, handleSubmit, setError } = useForm({ defaultValues });
  const [register, loading] = useAuth((state) => [
    state.register,
    state.loading,
  ]);


  const onSubmit = async (credentials: typeof defaultValues) => {
    if (credentials.rePassword !== credentials.password) {
      return setError("rePassword", { message: "Passwords are not equal!" });
    }
    try {
      await register(credentials);
      router.replace("/");
    } catch (err) {
      setError("password", { message: "Username taken!" });
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
      <ControlledInput
        control={control}
        label="Repeat password: "
        name="rePassword"
        secure
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("/login")}>
        <Text>Login</Text>
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