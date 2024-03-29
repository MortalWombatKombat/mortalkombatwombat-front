import { AxiosHeaders, AxiosResponse } from "axios";
import { client } from "./client";
import {
  BackendMoodData,
  CredentialsData,
  TokensData,
  UserData,
} from "../auth/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddictionOption, ChallengeType } from "../../types/types";

class API {
  async login(payload: CredentialsData): Promise<TokensData> {
    const { data } = await this.request<TokensData>({
      url: "/auth/jwt/create/",
      method: "POST",
      payload,
    });

    return data;
  }

  async register(payload: CredentialsData): Promise<void> {
    await this.request(
      {
        url: "/auth/users/",
        method: "POST",
        payload,
      },
      true
    );
  }

  async refreshToken(refresh: string): Promise<{ access: string }> {
    const { data } = await this.request<TokensData>({
      url: "/auth/jwt/refresh/",
      method: "POST",
      payload: { refresh },
    });

    return data;
  }

  async verifyToken(token: string): Promise<void> {
    await this.request<void>({
      url: "/auth/jwt/verify/",
      method: "POST",
      payload: { token },
    });
  }

  async getAddictionOptions(): Promise<Array<AddictionOption>> {
    const { data } = await this.request<Array<AddictionOption>>({
      method: "GET",
      url: "/addictions/", // temporarly
    });
    return data;
  }

  async editUser(payload: UserData): Promise<void> {
    await this.request({
      payload,
      method: "PATCH",
      url: "/auth/users/me/", // temporarly
    });
  }

  async getMood(): Promise<BackendMoodData | undefined> {
    const { data } = await this.request<BackendMoodData>({
      url: "/mood_entry/current_mood/",
      method: "GET",
    });
    return data;
  }

  async getUser(): Promise<UserData> {
    const { data } = await this.request<UserData>({
      url: "/auth/users/me/",
      method: "GET",
    });
    return data;
  }

  async postMood(payload: BackendMoodData): Promise<void> {
    await this.request<void>({
      url: "/mood_entry/",
      method: "POST",
      payload: { ...payload },
    });
  }

  async drawChallenge(): Promise<ChallengeType | null> {
    const { data } = await this.request<ChallengeType | null>({
      url: "/challenges/draw/",
      method: "GET",
    });
    return data || null;
  }

  async finishChallenge(): Promise<void> {
    this.request<void>({
      url: "/challenges/finish_challenge/",
      method: "POST",
    });
  }

  async request<T>(
    {
      url,
      method,
      headers,
      payload,
    }: {
      url: string;
      method: "GET" | "POST" | "PATCH";
      headers?: AxiosHeaders;
      payload?: any;
    },
    disableToken?: boolean
  ): Promise<AxiosResponse<T>> {
    const accessToken = await AsyncStorage.getItem("access");

    return client.request({
      url,
      method,
      headers: {
        ...(accessToken && !disableToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : {}),
        ...headers,
      },
      data: payload,
    });
  }
}

export default new API();
