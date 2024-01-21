import { AxiosHeaders, AxiosResponse } from "axios";
import { client } from "./client";
import { BackendCredentialsData, TokensData } from "../auth/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddictionOption } from "@/types/addiction";
import { EditUserPatchPayload } from "@/components/EditUserContainer/EditUserForm/EditUserForm";

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

  async getAddictionOptions(token: string) {
    const { data: AddictionOption } = await this.request<Array<AddictionOption>>({
      method: "GET",
      url: '/addictions/' // temporarly
    })

    const result = await Promise.all([this.request<Array<AddictionOption>>({
      method: "GET",
      url: '/addictions/' // temporarly
    }), this.request<{ last_name: string | null, first_name: string | null }>({
      payload: { token },
      method: "GET",
      url: '/auth/users/me/' // temporarly
    })])
    
    return result;
  }

  async editUser(payload: EditUserPatchPayload): Promise<void> {
    await this.request<{ addictionOptions: 
      Array<AddictionOption>
    }>({
      payload,
      method: "PATCH",
      url: '/auth/users/me/' // temporarly
    })
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
