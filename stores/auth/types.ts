import { AddictionOption } from "@/types/types";

export type TokensData = {
  access: string;
  refresh: string;
};

export type AuthStore = {
  access: string | null;
  refresh: string | null;
  username: string | null;
  loading: boolean;
  user: UserData | null;
  restoreTokensLoading: boolean;
  currentMoodValue: number | undefined;
  addictionManageProgressValue: number | undefined;
  addictions: Array<AddictionOption>;
  login: (credentials: CredentialsData) => Promise<void>;
  postMood: (data: MoodData) => Promise<void>;
  register: (credentials: CredentialsData) => Promise<void>;
  refreshToken: (token: string) => Promise<void>;
  restoreTokens: () => Promise<void>;
  editUser: (payload: UserData) => Promise<void>;
};

export type CredentialsData = {
  username: string;
  password: string;
};

export type MoodData = {
  currentMoodValue: number;
  addictionManageProgressValue: number;
};

export type BackendMoodData = {
  current_mood_value: number;
  addiction_manage_progress: number;
};

export type UserData = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  addiction: number | null;
  challenges_done: number;
};

export type RegisterData = CredentialsData & {
  re_password: string;
};
