export type AddictionOption = {
  id: number;
  name: string;
};

export type ChallengeType =
  | {
      type: "socratic_dialogue";
      data: {
        id: number;
        title: string;
        value: string;
      };
    }
  | {
      type: "question_set";
      data: {
        title: string;
        id: number;
        questions: Array<string>;
      };
    }
  | {
      type: "educational";
      data: {
        title: string;
        content: string;
        id: number;
        ref: Array<string>;
      };
    }
  | {
      type: "time_event";
      data: {
        title: string;
        content: string;
        id: number;
        time_sec: number;
      };
    };
