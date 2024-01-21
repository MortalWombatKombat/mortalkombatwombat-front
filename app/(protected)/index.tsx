import { StyleSheet, View, Text, Image } from "react-native";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import MoodCheck from "../../components/MoodCheck";
import { useAuth } from "../../stores/auth/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradientButton from "../../components/LinearGradientButton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function HomePage() {
  const [currentMoodValue, addictionManageProgressValue] = useAuth((state) => [
    state.currentMoodValue,
    state.addictionManageProgressValue,
  ]);
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const canCloseModal = useRef(true);
  const [flower, setFlower] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setFlower((fl) => (fl === 4 ? 0 : fl + 1));
    }, 5000);
  }, []);

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
    router.push("/challenge");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <LinearGradientButton onPress={openMoodModal}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/button-icons/smile.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
        </LinearGradientButton>
        <LinearGradientButton onPress={goToTherapy}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/button-icons/handshake.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
        </LinearGradientButton>
        <LinearGradientButton onPress={goToEditUserScreen}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/button-icons/user.png")}
              style={{ width: 40, height: 50 }}
            />
          </View>
        </LinearGradientButton>
      </View>
      <View
        style={{
          width: "100%",
          height: 500,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {(() => {
          if (flower === 0)
            return (
              <Animated.Image
                source={require("../../assets/images/flower/flower-1.png")}
                style={{
                  width: 400,
                  height: 400,
                  position: "absolute",
                  top: 50,
                }}
              />
            );
          if (flower === 1)
            return (
              <Animated.Image
                source={require("../../assets/images/flower/flower-2.png")}
                style={{
                  width: 400,
                  height: 400,
                  position: "absolute",
                  top: 50,
                }}
              />
            );
          if (flower === 2)
            return (
              <Animated.Image
                source={require("../../assets/images/flower/flower-3.png")}
                style={{
                  width: 400,
                  height: 400,
                  position: "absolute",
                  top: 50,
                }}
              />
            );
          if (flower === 3)
            return (
              <Animated.Image
                source={require("../../assets/images/flower/flower-4.png")}
                style={{
                  width: 400,
                  height: 400,
                  position: "absolute",
                  top: 50,
                }}
              />
            );
          if (flower === 4)
            return (
              <Animated.Image
                source={require("../../assets/images/flower/flower-5.png")}
                style={{
                  width: 400,
                  height: 400,
                  position: "absolute",
                  top: 50,
                }}
              />
            );
        })()}
      </View>
      <TouchableOpacity style={styles.appButton} onPress={navigateToChallenge}>
        <Text style={styles.appButtonText}>Start challenge</Text>
      </TouchableOpacity>
      {showMoodCheck ? (
        <MoodCheck
          onClose={() => setShowMoodCheck(false)}
          onProgress={() => router.push("/challenge")}
          canClose={canCloseModal.current}
        />
      ) : null}
    </View>
  );
}

const goToEditUserScreen = () => router.push("/edit-user");
const goToTherapy = () => router.push("/therapy");

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
