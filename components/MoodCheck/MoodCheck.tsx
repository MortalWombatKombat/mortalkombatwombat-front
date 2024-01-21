import { FC, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { MoodCheckProps } from "./types";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Slider from "@react-native-community/slider";
import { useAuth } from "../../stores/auth/auth";

const MoodCheck: FC<MoodCheckProps> = ({ onClose, onProgress, canClose }) => {
  const [currentMoodValue, addictionManageProgressValue, postMood] = useAuth(
    (state) => [
      state.currentMoodValue,
      state.addictionManageProgressValue,
      state.postMood,
    ]
  );
  const currentMoodValueRef = useRef(Number(currentMoodValue));
  const addictionManageProgressValueRef = useRef(
    Number(addictionManageProgressValue)
  );
  const onSubmit = () => {
    postMood({
      currentMoodValue: currentMoodValueRef.current,
      addictionManageProgressValue: addictionManageProgressValueRef.current,
    });
    if (canClose) onClose();
    else onProgress();
  };

  return (
    <Pressable
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
        height: "100%",
        opacity: 1,
      }}
      // onPress={canClose ? onClose : null}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={{
          elevation: 5,
          width: "80%",
          height: "70%",
          padding: 20,
          backgroundColor: "white",
          rowGap: 25
        }}
      > 
        <View style={{ alignItems: "center"}}>
          <Text style={{ color: "#007596", fontWeight: "bold", fontSize: 24 }}>Mood Check!</Text>
          <Text style={{ color: "#007596" }}>Stay healthy and aware of yourself</Text>
        </View>
        <View style={{ rowGap: 16 }}>
          <Text style={{ borderRadius: 8, backgroundColor: "#007596", color: "#fff", paddingHorizontal: 8, paddingVertical: 8 }}>How do you rate your current mood?</Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#aff"
            maximumTrackTintColor="#00FF8B"
            value={currentMoodValueRef.current}
            onSlidingComplete={(value) => (currentMoodValueRef.current = value)}
          />
        </View>
        <View style={{ rowGap: 16 }}>
          <Text style={{ borderRadius: 8, backgroundColor: "#007596", color: "#fff", paddingHorizontal: 8, paddingVertical: 8 }}>How do you assess progress in your fight against addiction?</Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#aff"
            maximumTrackTintColor="#00FF8B"
            value={addictionManageProgressValueRef.current}
            onSlidingComplete={(value) =>
              (addictionManageProgressValueRef.current = value)
            }
          />
          </View>
        <View style={{ alignItems: "flex-end" }}>
          <Pressable style={{ backgroundColor: '#007596', width: "50%", paddingVertical: 4, paddingHorizontal: 4, borderRadius: 16 }} onPress={onSubmit}>
            <Text style={{ color: '#fff', textAlign: "center" }}>Done!</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default MoodCheck;
