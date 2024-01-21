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
import { CredentialsData } from "@/stores/auth/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultValues = { username: "", password: "" };

const loginSchema = z.object({
  username: z.string().min(1, "Pole jest wymagane"),
  password: z.string().min(1, "Pole jest wymagane"),
});

export default function TabOneScreen() {
  const { control, handleSubmit, setError } = useForm({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });
  const [login, loading] = useAuth((state) => [state.login, state.loading]);
  const onSubmit = async (credentials: CredentialsData) => {
    try {
      await login(credentials);
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
