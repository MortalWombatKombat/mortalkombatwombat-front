import { FC, useRef } from "react";
import { Pressable, Text } from "react-native";
import { MoodCheckProps } from "./types";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Slider from "@react-native-community/slider";
import { useAuth } from "@/stores/auth/auth";

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
      onPress={canClose ? onClose : null}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={{
          elevation: 5,
          width: "70%",
          height: "60%",
          padding: 20,
          backgroundColor: "white",
        }}
      >
        <Text>How do you rate your current mood?</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#aff"
          maximumTrackTintColor="#033"
          value={currentMoodValueRef.current}
          onSlidingComplete={(value) => (currentMoodValueRef.current = value)}
        />
        <Text>How do you assess progress in your fight against addiction?</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#aff"
          maximumTrackTintColor="#033"
          value={addictionManageProgressValueRef.current}
          onSlidingComplete={(value) =>
            (addictionManageProgressValueRef.current = value)
          }
        />
        <Pressable onPress={onSubmit}>
          <Text>Submit</Text>
        </Pressable>
      </Animated.View>
    </Pressable>
  );
};

export default MoodCheck;
