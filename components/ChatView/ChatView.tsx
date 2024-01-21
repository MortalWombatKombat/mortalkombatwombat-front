
import React, { FC, useState } from "react";
import OpenAI from "openai";
import { ChatViewProps, ChatViewTypes, MessageType } from "./types";
import {
  FlatList,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { configMap } from "./consts";
import { router } from "expo-router";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  organization: "org-49OKIB9fxQ2Lb8dkdfLksbJt",
});

const Lobby: FC<ChatViewProps> = ({
  initialQuestion,
  chatViewType,
  proceed,
}) => {
  const [waiting, setWaiting] = useState(false);
  const [messages, setMessages] = useState<Array<MessageType>>([
    { role: "system", content: configMap[chatViewType].instructions },
    { role: "assistant", content: initialQuestion },
  ]);

  const onUserInput = async (message: string) => {
    setWaiting(true);
    if (chatViewType === ChatViewTypes.Socratic && messages.length > 15) {
      return proceed();
    }
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
      {chatViewType === ChatViewTypes.Therapeutic ? (
        <Pressable onPress={router.back}>
          <Text>Leave</Text>
        </Pressable>
      ) : null}
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
        style={{ borderWidth: 2 }}
        onSubmitEditing={({ nativeEvent }) => onUserInput(nativeEvent.text)}
      />
    </View>
  );
};

export default Lobby;
