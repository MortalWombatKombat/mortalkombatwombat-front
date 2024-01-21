import { FC, useState } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
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
    <View style={{ rowGap: 16}}>
      <Text>{formatSeconds(secondsLeft)}</Text>
      <Text>{title}</Text>
      <Text>{content}</Text>
      <View style={{ flexDirection: "row", justifyContent: "flex-start", columnGap: 8}}>
        <Pressable style={styles.appButton} onPress={startCounter}>
          <Text style={styles.appButtonText}>Start</Text>
        </Pressable>
        <Pressable style={styles.appButton} onPress={proceed} disabled={secondsLeft !== 0}>
          <Text style={styles.appButtonText}>Finish</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TimeView;

const styles = StyleSheet.create({
  appButton: {
    width: "40%",
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
})
