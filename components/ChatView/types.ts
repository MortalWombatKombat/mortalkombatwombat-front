export type MessageType = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatViewProps = {
  initialQuestion: string;
  chatViewType: ChatViewTypes;
};

export enum ChatViewTypes {
  Socratic = "SOCRATIC",
  Therapeutic = "THERAPEUTIC",
}
