import { StyleSheet, View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useRef, useState } from "react";
import MoodCheck from "@/components/MoodCheck";
import { useAuth } from "@/stores/auth/auth";

export default function HomePage() {
  const [currentMoodValue, addictionManageProgressValue] = useAuth((state) => [
    state.currentMoodValue,
    state.addictionManageProgressValue,
  ]);
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const canCloseModal = useRef(true);

  const openMoodModal = () => {
    canCloseModal.current = true;
    setShowMoodCheck(true);
  };

  const navigateToChallenge = () => {
    if (
      typeof addictionManageProgressValue === "undefined" ||
      typeof currentMoodValue === "undefined"
    ) {
      canCloseModal.current = false;
      setShowMoodCheck(true);
      return;
    }
    router.navigate("/challenge");
  };

  return (
    <View style={styles.container}>
      <Text>Kwiatek</Text>
      <Pressable onPress={openMoodModal}>
        <Text>Mood check</Text>
      </Pressable>
      <Pressable onPress={goToEditUserScreen}>
        <Text>Edit user</Text>
      </Pressable>
      <Pressable onPress={navigateToChallenge}>
        <Text>Start challenge</Text>
      </Pressable>
      {showMoodCheck ? (
        <MoodCheck
          onClose={() => setShowMoodCheck(false)}
          onProgress={() => router.navigate("/challenge")}
          canClose={canCloseModal.current}
        />
      ) : null}
    </View>
  );
}

const goToEditUserScreen = () => router.replace("/edit-user");

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
