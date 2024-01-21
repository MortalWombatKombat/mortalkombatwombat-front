export type MessageType = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatViewProps = {
  initialQuestion: string;
} & (
  | { chatViewType: ChatViewTypes.Socratic; proceed: () => void }
  | { chatViewType: ChatViewTypes.Therapeutic; proceed: null }
);

export enum ChatViewTypes {
  Socratic = "SOCRATIC",
  Therapeutic = "THERAPEUTIC",
}
