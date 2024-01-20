import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function ChallengeScreen(){
  return <View>
    <Text>Challenge</Text>
    <Pressable onPress={goToRootScreen}><Text>Go to root screen</Text></Pressable>
  </View>
}

const goToRootScreen = () => router.replace('/');