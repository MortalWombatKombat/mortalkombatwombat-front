import ControlledInput from "@/components/ControlledInput";
import ControlledSingleOptionSelect from "@/components/ControlledSingleOptionSelect";
import API from "@/stores/api";
import { AddictionOption } from "@/types/addiction";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View , Text,  StyleSheet, TouchableOpacity } from "react-native";
import { z } from "zod";

type EditUserFormProps = {
  addictionOptions: AddictionOption[],
  defaultValues: EditUserPatchPayload,
};

const editUserSchema = z.object({
  first_name: z.string().min(1, 'Pole jest wymagane'),
  last_name: z.string().min(1, 'Pole jest wymagane'),
  addiction: z.number(),
});

export type EditUserPatchPayload = z.infer<typeof editUserSchema>;


export default function EditUserForm(props: EditUserFormProps) {
  const { control, handleSubmit } = useForm({ defaultValues: props.defaultValues, resolver: zodResolver(editUserSchema) });
  const { mutate } = useEditUser();
return <View style={styles.container}>
  <Text style={styles.title}>Edit user</Text>
  <ControlledInput control={control} label="First name: " name="first_name" />
  <ControlledInput control={control} label="Last name: " name="last_name" />
  <ControlledSingleOptionSelect name="addiction" control={control} options={props.addictionOptions}>
    <TouchableOpacity style={{ padding: 4 }} onPress={handleSubmit(mutate)}><Text>Edit</Text></TouchableOpacity>
  </ControlledSingleOptionSelect>
</View>
}

const useEditUser = () => {
  const mutate = async (payload: EditUserPatchPayload) => {
    await API.editUser(payload);
    goToRootScreen();
  }
  return {
    mutate
  }
};

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

const goToRootScreen = () => router.replace('/');