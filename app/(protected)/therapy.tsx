import ChatView from "../../components/ChatView";
import { ChatViewTypes } from "../../components/ChatView/types";

export default function MoodCheckScreen() {
  return (
    <ChatView
      chatViewType={ChatViewTypes.Therapeutic}
      initialQuestion="How do you feel today?"
      proceed={null}
    />
  );
}
