import ControlledInput from "@/components/ControlledInput";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from "react";
import API from "@/stores/api";

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

export default function EditUserScreen() {
  console.debug('Edit user screen');
  const { addictionOptions, isError, error, isLoading } = useAddictionOptions();
  if(isLoading) return <ActivityIndicator />
  if(isError) return <Text>{JSON.stringify(error)}</Text>
  return <EditUserForm  addictionOptions={addictionOptions}/>
}

const useAddictionOptions = () => {
  const [addictionOptions, setAddictionOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const retrieveAddiction = async () => {
      try {
        setIsLoading(true);
        const data = await API.getAddictionOptions()
        setAddictionOptions(data.addictionOptions);
      } catch(e){
        setError(e);
        setIsError(true);
      } finally {
        setIsLoading(true)
      }
    }
    retrieveAddiction();
  }, []);

  return {
    isLoading,
    isError, 
    error,
    addictionOptions
  }
}

type EditUserFormProps = {
  addictionOptions: string[],
};

function EditUserForm(props: EditUserFormProps) {
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
  <ControlledInput control={control} label="Addiction " name="addiction" />
  <Pressable onPress={handleSubmit(onSubmit)}><Text>Go to root</Text></Pressable>
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
