import { FC } from "react";
import { FlatList, Linking, Pressable, Text, View } from "react-native";
import { EducationalProps } from "./types";

const EducationalView: FC<EducationalProps> = ({
  content,
  fileRefs,
  title,
  proceed,
}) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{content}</Text>
      <FlatList
        data={fileRefs}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable onPress={() => Linking.openURL(item)}>
            <Text>{item}</Text>
          </Pressable>
        )}
      />
      <Pressable onPress={proceed}>
        <Text>Proceed</Text>
      </Pressable>
    </View>
  );
};

export default EducationalView;
