import React from 'react';
import ChatView from "../../components/ChatView";
import { ChatViewTypes } from "../../components/ChatView/types";
import EducationalView from "../../components/EducationalView";
import LinearGradientButton from "../../components/LinearGradientButton";
import QuestionSet from "../../components/QuestionSet";
import TimeView from "../../components/TimeView";
import API from "../../stores/api";
import { ChallengeType } from "../../types/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, Image } from "react-native";

export default function ChallengeScreen() {
  const [challenge, setChallenge] = useState<ChallengeType | null>(null);
  useEffect(() => {
    const fetchChallenge = async () => {
      const data = await API.drawChallenge();
      setChallenge(data);
    };
    fetchChallenge();
  }, []);

  const proceed = () => {
    API.finishChallenge();
    router.push("/");
  };

  return (
    <View style={{ flex: 1, width: 300 }}>
      <View style={{ width: "100%", marginVertical: 16 }}>
        <LinearGradientButton onPress={goToRootScreen}>
          <View style={{ justifyContent: "center", alignItems: 'center'}}>
            <Image
              source={require("../../assets/images/button-icons/arrow.png")}
              style={{ width: 25, height: 25  }}
              />
          </View>
        </LinearGradientButton>
      </View>
      {challenge ? (
        (() => {
          if (challenge.type === "socratic_dialogue") {
            return (
              <ChatView
                chatViewType={ChatViewTypes.Socratic}
                initialQuestion={challenge.data.value}
                proceed={proceed}
              />
            );
          }
          if (challenge.type === "question_set") {
            return <QuestionSet {...challenge.data} proceed={proceed} />;
          }
          if (challenge.type === "educational") {
            return (
              <EducationalView
                fileRefs={challenge.data.ref}
                content={challenge.data.content}
                id={challenge.data.id}
                title={challenge.data.title}
                proceed={proceed}
              />
            );
          }
          if (challenge.type === "time_event") {
            return <TimeView {...challenge.data} proceed={proceed} />;
          }
        })()
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

const goToRootScreen = () => router.replace("/");
