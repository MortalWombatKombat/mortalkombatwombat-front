import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function EditUserScreen(){
  return <View>
    <Text>Edit user</Text>
    <Pressable onPress={goToRootScreen}><Text>Go to root</Text></Pressable>
  </View>
}

const goToRootScreen = () => router.replace('/');