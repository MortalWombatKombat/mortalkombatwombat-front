import { AxiosHeaders, AxiosResponse } from "axios";
import { client } from "./client";
import { BackendCredentialsData, TokensData } from "../auth/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

class API {
  async login(payload: BackendCredentialsData): Promise<TokensData> {
    const { data } = await this.request<TokensData>({
      url: "/auth/jwt/create/",
      method: "POST",
      payload,
    });

    return data;
  }

  async register(payload: BackendCredentialsData): Promise<void> {
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

  async request<T>(
    {
      url,
      method,
      headers,
      payload,
    }: {
      url: string;
      method: "GET" | "POST";
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
