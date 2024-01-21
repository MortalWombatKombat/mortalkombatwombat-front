import { FC } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { QuestionSetViewProps } from "./types";

const QuestionSetView: FC<QuestionSetViewProps> = ({ questions, proceed }) => {
  return (
    <View>
      <FlatList
        data={questions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
            <TextInput />
          </View>
        )}
      />
      <Pressable onPress={proceed}>
        <Text>Proceed</Text>
      </Pressable>
    </View>
  );
};

export default QuestionSetView;
