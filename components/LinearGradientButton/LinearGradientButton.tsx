import { LinearGradient } from "expo-linear-gradient";
import { GestureResponderEvent, Pressable } from "react-native";

const GradientAppButton = ({
  onPress,
  children,
}: {
  onPress: (e: GestureResponderEvent) => void;
  children: React.ReactNode;
}) => {
  return (
    <Pressable onPress={onPress}>
    <LinearGradient
      colors={["#00FF8B", "#8AEAFF"]}
      locations={[0.6, 1.0]}
      style={{
        width: 75,
        height: 75,
        borderRadius: 100,
        justifyContent: "center",
        alignContent: "center",
        elevation: 4,
      }}
    >
      {children}
    </LinearGradient>
    </Pressable>
  );
};

export default GradientAppButton;