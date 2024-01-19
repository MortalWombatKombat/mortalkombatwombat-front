import { create } from "zustand";
import { AuthStore, CredentialsData } from "./types";
import API from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { verifyAccessToken } from "./utils";

export const useAuth = create<AuthStore>((set) => ({
  access: null,
  refresh: null,
  username: null,
  loading: false,

  setLoadingOff: () => set({ loading: false }),
  setLoadingOn: () => set({ loading: true }),

  login: async (credentials: CredentialsData) => {
    set({ loading: true });
    try {
      const tokens = await API.login({
        username: credentials.username,
        password: credentials.password,
      });
      AsyncStorage.setItem("access", tokens.access);
      AsyncStorage.setItem("refresh", tokens.refresh);
      set({ ...tokens });
    } finally {
      set({ loading: false });
    }
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
      set({ ...tokens });
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
    const access = await AsyncStorage.getItem("access");
    const refresh = await AsyncStorage.getItem("refresh");

    if (!refresh) {
      set({ loading: false });
      return;
    }

    set({ loading: true });
    const verifiedAccess = await verifyAccessToken(access);
    if (verifiedAccess) {
      set({ access: verifiedAccess, refresh, loading: false });
      return;
    }

    try {
      const { access } = await API.refreshToken(refresh);
      AsyncStorage.setItem("access", access);
      set({ access, refresh, loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));
