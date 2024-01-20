import ControlledInput from "@/components/ControlledInput";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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


export default function EditUserScreen(){
  const { control, handleSubmit, setError } = useForm({ defaultValues, resolver: zodResolver(editUserSchema) });
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
    <ControlledInput control={control} label="Addiction " name="addiction" />
    <Pressable onPress={handleSubmit(onSubmit)}><Text>Go to root</Text></Pressable>
  </View>
}

const goToRootScreen = () => router.replace('/');


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
