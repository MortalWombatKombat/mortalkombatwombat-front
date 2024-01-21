import ControlledInput from "@/components/ControlledInput";
import ControlledSingleOptionSelect from "@/components/ControlledSingleOptionSelect";
import { useAuth } from "@/stores/auth/auth";
import { UserData } from "@/stores/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { z } from "zod";
import LinearGradientButton from "../LinearGradientButton";

const editUserSchema = z.object({
  first_name: z.string().min(1, "Pole jest wymagane"),
  last_name: z.string().min(1, "Pole jest wymagane"),
  addiction: z.number(),
});

export type EditUserPatchPayload = z.infer<typeof editUserSchema>;

export default function EditUserForm() {
  const [user, addictions, editUser] = useAuth((state) => [
    state.user,
    state.addictions,
    state.editUser,
  ]);
  const { control, handleSubmit } = useForm({
    defaultValues: user || {},
    resolver: zodResolver(editUserSchema),
  });

  const onSubmit = (payload: UserData) => {
    editUser(payload);
    router.navigate("/");
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", }}>
        <LinearGradientButton onPress={goToRootScreen}>
          <Text style={{ textAlign: "center", color: '#fff', fontWeight: "bold"}}>Go back</Text>
        </LinearGradientButton>
      </View>
      <Text style={styles.title}>Edit user</Text>
      <ControlledInput
        control={control}
        label="What's your first name?"
        name="first_name"
        placeholder=""
      />
      <ControlledInput control={control} label="What's your last name?" name="last_name" />
      <ControlledSingleOptionSelect
        name="addiction"
        control={control}
        options={addictions}
      >
        <TouchableOpacity
          style={styles.appButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.appButtonText}>Done!</Text>
        </TouchableOpacity>
      </ControlledSingleOptionSelect>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    rowGap: 20,
    width: 300,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#007596'
  },
  appButton: {
    backgroundColor: "#007596",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
    elevation: 8,
  },
  appButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

const goToRootScreen = () => router.replace("/");
