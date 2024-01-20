import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View, Text, Pressable } from "react-native";
import { z } from "zod";

const moodCheckSchema = z.object({
  current_mood_value: z.number(),
  addiction_manage_progress: z.number(),
});

const defaultValues = {
  current_mood_value: 0,
  addiction_manage_progress: 0, // change it to 1/5
};

export default function MoodCheckScreen(){
  const { control, handleSubmit } = useForm({ defaultValues, resolver: zodResolver(moodCheckSchema) });
  const onSubmit = async () => {
    try {
      goToRootScreen();
    } catch (err) {
      console.error(err);
    }
  };

  return <View>
    <Text>Mood check</Text>
    <Pressable onPress={handleSubmit(onSubmit)}><Text>Complete</Text></Pressable>
  </View>
}

const goToRootScreen = () => router.replace('/');