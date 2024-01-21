import { FC } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { QuestionSetViewProps } from "./types";

const QuestionSetView: FC<QuestionSetViewProps> = ({ questions, proceed }) => {
  return (
    <View>
      <FlatList
     
        data={questions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 15 }}>
            <Text style={{ color: "#007596" }}>{item}</Text>
            <TextInput  
              style={{
                borderRadius: 16,
                paddingHorizontal: 8,
                paddingVertical: 8,
                backgroundColor: "#E8E8E8",
                elevation: 4,
              }}
              placeholder="Type something..."
              />
              
          </View>
        )}
      />
      <Pressable style={styles.appButton} onPress={proceed}>
        <Text style={styles.appButtonText}>Proceed</Text>
      </Pressable>
    </View>
  );
};

export default QuestionSetView;

const styles = StyleSheet.create({
  appButton: {
    backgroundColor: "#007596",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
    elevation: 8, 
    width: "50%",
  },
  appButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center"
  },
})
