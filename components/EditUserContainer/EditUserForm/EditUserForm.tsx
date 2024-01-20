import ControlledInput from "@/components/ControlledInput";
import ControlledSingleOptionSelect from "@/components/ControlledSingleOptionSelect";
import { AddictionOption } from "@/types/addiction";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View , Text,  StyleSheet, TouchableOpacity } from "react-native";
import { z } from "zod";

type EditUserFormProps = {
  addictionOptions: AddictionOption[],
};

const editUserSchema = z.object({
  firstname: z.string().min(1, 'Pole jest wymagane'),
  lastname: z.string().min(1, 'Pole jest wymagane'),
  addiction: z.string().min(1, 'Pole jest wymagane'),
});

const defaultValues = {
  firstname: "",
  lastname: "",
  addiction: "" // TODO: 'change it for select field
};

export default function EditUserForm(props: EditUserFormProps) {
  const { control, handleSubmit } = useForm({ defaultValues, resolver: zodResolver(editUserSchema) });
  const onSubmit = async () => {
    try {
      goToRootScreen();
    } catch (err) {
      console.error(err);
    }
  };

return <View style={styles.container}>
  <Text style={styles.title}>Edit user</Text>
  <ControlledInput control={control} label="First name: " name="firstname" />
  <ControlledInput control={control} label="Last name: " name="lastname" />
  <ControlledSingleOptionSelect name="addiction" control={control} options={props.addictionOptions}>
    <TouchableOpacity style={{ padding: 4, backgroundColor: 'red' }} onPress={handleSubmit(onSubmit)}><Text>Edit</Text></TouchableOpacity>
  </ControlledSingleOptionSelect>
</View>
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

const goToRootScreen = () => router.replace('/');