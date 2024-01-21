import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  GestureResponderEvent,
} from "react-native";
import { router } from "expo-router";
import { useRef, useState } from "react";
import MoodCheck from "@/components/MoodCheck";
import { useAuth } from "@/stores/auth/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useAssets } from "expo-asset";

export default function HomePage() {
  const [currentMoodValue, addictionManageProgressValue] = useAuth((state) => [
    state.currentMoodValue,
    state.addictionManageProgressValue,
  ]);
  const [assets, error] = useAssets([
    require("@/assets/images/flower/flower-1.png"),
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <GradientAppButton onPress={openMoodModal}>
          <Text style={{ textAlign: "center" }}>Mood check</Text>
        </GradientAppButton>
        <GradientAppButton onPress={goToTherapy}>
          <Text style={{ textAlign: "center" }}>See Therapy</Text>
        </GradientAppButton>
        <GradientAppButton onPress={goToEditUserScreen}>
          <Text style={{ textAlign: "center" }}>Edit user</Text>
        </GradientAppButton>
      </View>
      {assets ? <Image source={assets[0]} width={200} height={500} /> : null}
      <TouchableOpacity style={styles.appButton} onPress={navigateToChallenge}>
        <Text style={styles.appButtonText}>Start challenge</Text>
      </TouchableOpacity>
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

const GradientAppButton = ({
  onPress,
  children,
}: {
  onPress: (e: GestureResponderEvent) => void;
  children: React.ReactNode;
}) => {
  return (
    <LinearGradient
      colors={["#00FF8B", "#8AEAFF"]}
      locations={[0.6, 1.0]}
      style={{
        width: 75,
        height: 75,
        borderRadius: 100,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
    </LinearGradient>
  );
};

const goToEditUserScreen = () => router.navigate("/edit-user");
const goToTherapy = () => router.navigate("/therapy");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
