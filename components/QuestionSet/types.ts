export type QuestionSetViewProps = {
  title: string;
  id: number;
  questions: Array<string>;
  proceed: () => void;
};
