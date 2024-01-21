
import React, { FC, useState } from "react";
import OpenAI from "openai";
import { ChatViewProps, ChatViewTypes, MessageType } from "./types";
import {
  FlatList,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import { configMap } from "./consts";
import { router } from "expo-router";
import LinearGradientButton from "../LinearGradientButton";

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
    <View style={{ flex: 1, width: "100%", minWidth: 300 }}>
      {chatViewType === ChatViewTypes.Therapeutic ? (
        <LinearGradientButton onPress={() => router.replace('/')}>
          <View style={{ justifyContent: "center", alignItems: 'center'}}>
            <Image
              source={require("../../assets/images/button-icons/arrow.png")}
              style={{ width: 25, height: 25  }}
            />
          </View>
        </LinearGradientButton>
      ) : null}
      <FlatList
        style={{ width: "100%", paddingHorizontal: "5%", paddingVertical: 5, rowGap: 5 }}
        data={messages.filter(({ role }) => role !== "system")}
        renderItem={({ item }) => (
          <View
            style={{
              rowGap: 5,
              borderRadius: 16,
              width: 250,
              alignItems: item.role === "user" ? "flex-start" : "flex-end",
              backgroundColor: item.role === "user" ? "#E8E8E8" : "#007596",
              paddingVertical: 16,
              paddingHorizontal: 8,
              marginVertical: 8,

            }}
          >
            <View
              style={{ maxWidth: "70%" }}
            >
              <Text style={{
                  color: item.role === "user" ? "#fff" : "#E8E8E8"
                }}>{item.content}</Text>
            </View>
          </View>
        )}
        keyExtractor={({ content }) => content}
      />
      {waiting ? <ActivityIndicator /> : null}
      <TextInput
              style={{
                borderRadius: 16,
                paddingHorizontal: 8,
                paddingVertical: 8,
                backgroundColor: "#E8E8E8",
                elevation: 4,
              }}
              placeholder="Type here..."
        onSubmitEditing={({ nativeEvent }) => onUserInput(nativeEvent.text)}
      />
    </View>
  );
};

export default Lobby;
