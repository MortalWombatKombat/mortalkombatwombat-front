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
      <Text style={styles.title}>Sing in</Text>
      <ControlledInput placeholder="Enter name" control={control} label="User name" name="username" />
      <ControlledInput
        control={control}
        label="Password"
        name="password"
        placeholder="Enter password"
        secure
      />
      <View style={{ alignItems: "flex-end", rowGap: 8 }}>
        <TouchableOpacity style={{ marginLeft: 4 }}onPress={() => router.navigate("/register")}>
        <Text style={{ color: '#10663F' }}>
            Don't have an account? 
            <Text style={{ fontWeight: 'bold', color: '#10663F' }}>{" Sign up"}</Text>
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {loading ? <ActivityIndicator /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 16,
    padding: 48
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#15CA78",
    fontFamily: 'Roboto'
  },
  button: {
    backgroundColor: "#15CA78",
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 16,
      height: 16,
    }
    // boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.15)"
  },
  buttonText: {
    color: '#fff',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
