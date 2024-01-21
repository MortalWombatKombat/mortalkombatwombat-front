import { FC, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { TimeViewProps } from "./types";
import { formatSeconds } from "./utils";

const TimeView: FC<TimeViewProps> = ({ content, time_sec, title, proceed }) => {
  const [secondsLeft, setSecondsLeft] = useState(time_sec);
  const startCounter = () => {
    const interval = setInterval(() => {
      if (secondsLeft === 0) {
        clearInterval(interval);
        return;
      }
      setSecondsLeft((left) => left - 1);
    }, 1000);
  };

  return (
    <View>
      <Text>{formatSeconds(secondsLeft)}</Text>
      <Text>{title}</Text>
      <Text>{content}</Text>
      <Pressable onPress={startCounter}>
        <Text>Start</Text>
      </Pressable>
      <Pressable onPress={proceed} disabled={secondsLeft !== 0}>
        <Text>Finish</Text>
      </Pressable>
    </View>
  );
};

export default TimeView;
