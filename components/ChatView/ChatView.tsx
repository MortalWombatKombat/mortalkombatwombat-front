import { FC, useState } from "react";
import OpenAI from "openai";
import { ChatViewProps, MessageType } from "./types";
import {
  FlatList,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { configMap } from "./consts";

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

const Lobby: FC<ChatViewProps> = ({ initialQuestion, chatViewType }) => {
  const [waiting, setWaiting] = useState(false);
  const [messages, setMessages] = useState<Array<MessageType>>([
    { role: "system", content: configMap[chatViewType].instructions },
    { role: "assistant", content: initialQuestion },
  ]);

  const onUserInput = async (message: string) => {
    setWaiting(true);
    setMessages((messages) => [
      ...messages,
      { content: message, role: "user" },
    ]);
    const data = await openai.chat.completions.create({
      model: configMap[chatViewType].model,
      messages: [
        ...messages,
        {
          role: "user",
          content: configMap[chatViewType].formatPrompt(message),
        },
      ],
    });
    if (data.choices.length && data.choices[0].message.content) {
      setWaiting(false);
      setMessages((messages) => [
        ...messages,
        {
          content: data.choices[0].message.content as string,
          role: "assistant",
        },
      ]);
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        style={{ width: "100%", paddingHorizontal: "5%" }}
        data={messages.filter(({ role }) => role !== "system")}
        renderItem={({ item }) => (
          <View
            style={{
              width: "100%",
              alignItems: item.role === "user" ? "flex-start" : "flex-end",
              borderColor: "blue",
              borderWidth: 1,
            }}
          >
            <View
              style={{ maxWidth: "70%", borderColor: "red", borderWidth: 1 }}
            >
              <Text>{item.content}</Text>
            </View>
          </View>
        )}
        keyExtractor={({ content }) => content}
      />
      {waiting ? <ActivityIndicator /> : null}
      <TextInput
        onSubmitEditing={({ nativeEvent }) => onUserInput(nativeEvent.text)}
      />
    </View>
  );
};

export default Lobby;