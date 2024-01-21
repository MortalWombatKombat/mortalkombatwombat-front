import { create } from "zustand";
import { AuthStore, CredentialsData, MoodData, UserData } from "./types";
import API from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { verifyAccessToken } from "./utils";
import { router } from "expo-router";

export const useAuth = create<AuthStore>((set) => ({
  access: null,
  refresh: null,
  username: null,
  loading: false,
  checkedAccessInStorage: false,
  restoreTokensLoading: false,
  currentMoodValue: undefined,
  addictionManageProgressValue: undefined,
  user: null,
  addictions: [],

  login: async (credentials: CredentialsData) => {
    set({ loading: true });
    try {
      const tokens = await API.login({
        username: credentials.username,
        password: credentials.password,
      });
      AsyncStorage.setItem("access", tokens.access);
      AsyncStorage.setItem("refresh", tokens.refresh);
      const [moodData, userData] = await Promise.all([
        API.getMood(),
        API.getUser(),
      ]);
      set({
        ...tokens,
        user: userData,
        currentMoodValue: moodData?.current_mood_value,
        addictionManageProgressValue: moodData?.addiction_manage_progress,
      });
      router.replace("/");
    } finally {
      set({ loading: false });
    }
  },

  postMood: async (payload: MoodData) => {
    set({ ...payload });
    API.postMood({
      current_mood_value: Math.round(payload.currentMoodValue),
      addiction_manage_progress: Math.round(
        payload.addictionManageProgressValue
      ),
    });
  },

  editUser: async (payload: UserData) => {
    set({ user: payload });
    API.editUser(payload);
  },

  register: async (credentials: CredentialsData) => {
    set({ loading: true });
    try {
      await API.register({
        username: credentials.username,
        password: credentials.password,
      });
      const tokens = await API.login({
        username: credentials.username,
        password: credentials.password,
      });
      AsyncStorage.setItem("access", tokens.access);
      AsyncStorage.setItem("refresh", tokens.refresh);
      const [moodData, userData, addictions] = await Promise.all([
        API.getMood(),
        API.getUser(),
        API.getAddictionOptions(),
      ]);
      set({
        access: tokens.access,
        refresh: tokens.refresh,
        restoreTokensLoading: false,
        user: userData,
        addictions,
        currentMoodValue: moodData?.current_mood_value,
        addictionManageProgressValue: moodData?.addiction_manage_progress,
      });
      router.replace("/");
    } finally {
      set({ loading: false });
    }
  },

  refreshToken: async (refresh: string) => {
    set({ loading: true });
    try {
      const { access } = await API.refreshToken(refresh);
      AsyncStorage.setItem("access", access);
      set({ access });
    } catch {
      set({ access: null, refresh: null });
    } finally {
      set({ loading: false });
    }
  },

  restoreTokens: async () => {
    set({ restoreTokensLoading: true });
    const access = await AsyncStorage.getItem("access");
    const refresh = await AsyncStorage.getItem("refresh");

    if (!refresh) {
      set({ restoreTokensLoading: false });
      return;
    }

    const verifiedAccess = await verifyAccessToken(access);
    if (verifiedAccess) {
      const [moodData, userData, addictions] = await Promise.all([
        API.getMood(),
        API.getUser(),
        API.getAddictionOptions(),
      ]);
      set({
        access: verifiedAccess,
        refresh,
        restoreTokensLoading: false,
        user: userData,
        addictions,
        currentMoodValue: moodData?.current_mood_value,
        addictionManageProgressValue: moodData?.addiction_manage_progress,
      });
      return;
    }

    try {
      const { access } = await API.refreshToken(refresh);
      AsyncStorage.setItem("access", access);
      const [moodData, userData, addictions] = await Promise.all([
        API.getMood(),
        API.getUser(),
        API.getAddictionOptions(),
      ]);
      set({
        access,
        refresh,
        restoreTokensLoading: false,
        user: userData,
        addictions,
        currentMoodValue: moodData?.current_mood_value,
        addictionManageProgressValue: moodData?.addiction_manage_progress,
      });
    } catch {
      set({ restoreTokensLoading: false });
    }
  },
}));
