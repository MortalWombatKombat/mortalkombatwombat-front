import ControlledInput from "@/components/ControlledInput";
import ControlledSingleOptionSelect from "@/components/ControlledSingleOptionSelect";
import { useAuth } from "@/stores/auth/auth";
import { UserData } from "@/stores/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { z } from "zod";

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
      <Text style={styles.title}>Edit user</Text>
      <ControlledInput
        control={control}
        label="First name: "
        name="first_name"
      />
      <ControlledInput control={control} label="Last name: " name="last_name" />
      <ControlledSingleOptionSelect
        name="addiction"
        control={control}
        options={addictions}
      >
        <TouchableOpacity
          style={{ padding: 4 }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
      </ControlledSingleOptionSelect>
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

const goToRootScreen = () => router.replace("/");
