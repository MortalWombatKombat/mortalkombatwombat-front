import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { router } from "expo-router";

import { useForm } from "react-hook-form";
import ControlledInput from "@/components/ControlledInput";
import { useAuth } from "@/stores/auth/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultValues = { username: "", password: "", rePassword: "" };

const registerSchema = z
  .object({
    username: z.string().min(1, "Pole jest wymagane"),
    password: z.string().min(1, "Pole jest wymagane"),
    rePassword: z.string().min(1, "Pole jest wymagane"),
  })
  .refine(({ password, rePassword }) => password !== rePassword, {
    path: ["password"],
    message: "Passwords don't match",
  });

export default function TabOneScreen() {
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(registerSchema),
  });
  const [register, loading] = useAuth((state) => [
    state.register,
    state.loading,
  ]);

  const onSubmit = async (credentials: typeof defaultValues) => {
    try {
      await register(credentials);
      router.replace("/edit-user");
    } catch (err) {
      console.error(err);
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
